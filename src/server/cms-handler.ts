import { createHash, randomBytes, timingSafeEqual } from "node:crypto";
import { existsSync, mkdirSync, readFileSync } from "node:fs";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { SignJWT, jwtVerify } from "jose";

import { normalizeStoredPost, slugifyTitle, type BlogPost } from "../site/blog-data";
import {
  DEFAULT_CONTENT,
  IMAGE_SLOTS,
  defaultPosts,
  emptyStore,
  type ImageSlotId,
  type SiteContent,
} from "../site/cms";

const COOKIE = "astrek_admin";
const JWT_ISSUER = "astrek-admin";
const JWT_AUDIENCE = "astrek-admin";
const MAX_IMAGE_BYTES = 8 * 1024 * 1024;
const SESSION_SECONDS = 7 * 24 * 60 * 60;
const STORE_FILE = () => path.join(process.cwd(), "data", "cms.json");
const UPLOAD_DIR = () => path.join(process.cwd(), "public", "uploads");

type Store = {
  posts: BlogPost[] | null;
  content: Partial<SiteContent>;
  images: Record<string, string>;
};

const loginAttempts = new Map<string, { count: number; resetAt: number }>();

let envReady = false;

function loadLocalEnv() {
  if (envReady) return;
  envReady = true;
  for (const name of [".env", ".env.local"]) {
    const file = path.join(process.cwd(), name);
    if (!existsSync(file)) continue;
    const text = readFileSync(file, "utf8");
    for (const line of text.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq < 1) continue;
      const key = trimmed.slice(0, eq).trim();
      let value = trimmed.slice(eq + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      if (!process.env[key]) process.env[key] = value;
    }
  }
}

function password() {
  loadLocalEnv();
  return process.env.ASTREK_ADMIN_PASSWORD || "";
}

function secret() {
  loadLocalEnv();
  return process.env.ASTREK_ADMIN_SECRET || process.env.ASTREK_ADMIN_PASSWORD || "astrek-dev-secret";
}

function usesBlob() {
  loadLocalEnv();
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

function safeEqual(a: string, b: string) {
  const left = createHash("sha256").update(a).digest();
  const right = createHash("sha256").update(b).digest();
  return timingSafeEqual(left, right);
}

function jwtKey() {
  return new TextEncoder().encode(secret());
}

function sessionToken(request: Request) {
  const auth = request.headers.get("authorization") || "";
  if (auth.toLowerCase().startsWith("bearer ")) return auth.slice(7).trim();
  const header = request.headers.get("cookie") || "";
  return header
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${COOKIE}=`))
    ?.slice(COOKIE.length + 1);
}

async function signSession() {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setSubject("admin")
    .setIssuer(JWT_ISSUER)
    .setAudience(JWT_AUDIENCE)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_SECONDS}s`)
    .sign(jwtKey());
}

async function readSession(request: Request) {
  const token = sessionToken(request);
  if (!token) return false;
  try {
    const { payload } = await jwtVerify(token, jwtKey(), {
      issuer: JWT_ISSUER,
      audience: JWT_AUDIENCE,
      algorithms: ["HS256"],
    });
    return payload.sub === "admin" && payload.role === "admin";
  } catch {
    return false;
  }
}

function cookie(value: string, maxAge: number) {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `${COOKIE}=${value}; HttpOnly; Path=/; SameSite=Lax; Max-Age=${maxAge}${secure}`;
}

function json(body: unknown, status = 200, extraHeaders?: HeadersInit) {
  const headers = new Headers(extraHeaders);
  headers.set("content-type", "application/json; charset=utf-8");
  headers.set("cache-control", "no-store");
  return new Response(JSON.stringify(body), { status, headers });
}

function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    return new URL(origin).host === new URL(request.url).host;
  } catch {
    return false;
  }
}

function clientIp(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
}

function tooManyAttempts(ip: string) {
  const now = Date.now();
  const entry = loginAttempts.get(ip);
  if (!entry || entry.resetAt < now) return false;
  return entry.count >= 8;
}

function noteAttempt(ip: string, ok: boolean) {
  const now = Date.now();
  if (ok) {
    loginAttempts.delete(ip);
    return;
  }
  const entry = loginAttempts.get(ip);
  if (!entry || entry.resetAt < now) {
    loginAttempts.set(ip, { count: 1, resetAt: now + 10 * 60 * 1000 });
    return;
  }
  entry.count += 1;
}

async function readBlobStore(): Promise<Store | null> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) return null;
  try {
    const { head } = await import("@vercel/blob");
    const meta = await head("cms/site.json", { token });
    const res = await fetch(meta.url, { cache: "no-store" });
    if (!res.ok) return null;
    return normalizeStore(await res.json());
  } catch {
    return null;
  }
}

async function writeBlobStore(store: Store) {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) return false;
  const { put } = await import("@vercel/blob");
  await put("cms/site.json", JSON.stringify(store), {
    access: "public",
    token,
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
  return true;
}

async function readFileStore(): Promise<Store | null> {
  try {
    const raw = await readFile(STORE_FILE(), "utf8");
    return normalizeStore(JSON.parse(raw));
  } catch {
    return null;
  }
}

async function writeFileStore(store: Store) {
  const file = STORE_FILE();
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, JSON.stringify(store, null, 2), "utf8");
}

function normalizeStore(raw: unknown): Store {
  const base = emptyStore();
  if (!raw || typeof raw !== "object") return base;
  const data = raw as Partial<Store>;
  if (Array.isArray(data.posts)) {
    base.posts = data.posts
      .map((item, index) =>
        item && typeof item === "object" ? normalizeStoredPost(item as Record<string, unknown>, index) : null,
      )
      .filter((item): item is BlogPost => Boolean(item));
  }
  if (data.content && typeof data.content === "object") {
    (Object.keys(DEFAULT_CONTENT) as Array<keyof SiteContent>).forEach((key) => {
      const value = (data.content as Partial<SiteContent>)[key];
      if (typeof value === "string") base.content[key] = value;
    });
  }
  if (data.images && typeof data.images === "object") {
    for (const [key, value] of Object.entries(data.images)) {
      if (typeof value === "string" && (value.startsWith("/") || value.startsWith("http"))) {
        base.images[key] = value;
      }
    }
  }
  return base;
}

async function readStore(): Promise<Store> {
  if (usesBlob()) {
    const remote = await readBlobStore();
    if (remote) return remote;
  }
  return (await readFileStore()) || emptyStore();
}

async function writeStore(store: Store) {
  let saved = false;
  try {
    await writeFileStore(store);
    saved = true;
  } catch {
    saved = false;
  }
  if (usesBlob()) {
    await writeBlobStore(store);
    saved = true;
  }
  if (!saved) {
    throw new Error("This server cannot store edits yet. Add BLOB_READ_WRITE_TOKEN for the live site.");
  }
}

function publicPayload(store: Store) {
  return {
    posts: store.posts && store.posts.length ? store.posts : defaultPosts(),
    content: store.content,
    images: store.images,
    storage: usesBlob() ? "blob" : "file",
  };
}

async function requireAdmin(request: Request) {
  if (!sameOrigin(request)) return json({ error: "Blocked request." }, 403);
  if (!(await readSession(request))) return json({ error: "Sign in required." }, 401);
  return null;
}

async function uploadImage(request: Request) {
  const denied = await requireAdmin(request);
  if (denied) return denied;
  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) return json({ error: "Choose an image file." }, 400);
  if (!file.type.startsWith("image/")) return json({ error: "Only image files can be uploaded." }, 400);
  if (file.size > MAX_IMAGE_BYTES) return json({ error: "Images must be 8 MB or smaller." }, 400);
  const ext = extensionFor(file.type, file.name);
  const filename = `${Date.now()}-${randomBytes(4).toString("hex")}${ext}`;
  const bytes = Buffer.from(await file.arrayBuffer());

  if (usesBlob()) {
    const { put } = await import("@vercel/blob");
    const blob = await put(`cms/images/${filename}`, bytes, {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN,
      contentType: file.type,
    });
    return json({ url: blob.url });
  }

  const dir = UPLOAD_DIR();
  mkdirSync(dir, { recursive: true });
  await writeFile(path.join(dir, filename), bytes);
  return json({ url: `/uploads/${filename}` });
}

function extensionFor(type: string, name: string) {
  if (type === "image/png") return ".png";
  if (type === "image/webp") return ".webp";
  if (type === "image/gif") return ".gif";
  if (type === "image/jpeg") return ".jpg";
  const match = name.toLowerCase().match(/\.(png|jpe?g|webp|gif)$/);
  return match ? `.${match[1] === "jpeg" ? "jpg" : match[1]}` : ".jpg";
}

function cleanPost(raw: unknown, posts: BlogPost[]): BlogPost | { error: string } {
  if (!raw || typeof raw !== "object") return { error: "Post is missing." };
  const data = raw as Record<string, unknown>;
  const title = String(data.title || "").trim();
  const excerpt = String(data.excerpt || "").trim();
  const body = String(data.body || "").trim();
  if (!title || !excerpt || !body) return { error: "Title, excerpt, and body are required." };
  if (body.length > 100_000) return { error: "That post is too long." };
  const requested = String(data.slug || "").trim();
  let slug = slugifyTitle(requested || title);
  if (!slug) return { error: "Give the post a title that can become a link." };
  const previous = String(data.previousSlug || "").trim();
  const taken = posts.some((post) => post.slug === slug && post.slug !== previous);
  if (taken) slug = `${slug}-${Date.now().toString(36)}`;
  const normalized = normalizeStoredPost(
    {
      slug,
      title,
      excerpt,
      body,
      tag: String(data.tag || "Company updates"),
      date: String(data.date || "").trim(),
      image: String(data.image || ""),
    },
    posts.length,
  );
  if (!normalized) return { error: "Could not save that post." };
  return normalized;
}

export async function handleCmsRequest(request: Request): Promise<Response | null> {
  const url = new URL(request.url);
  const pathName = url.pathname;
  if (pathName !== "/api/cms" && !pathName.startsWith("/api/admin")) return null;

  try {
    if (pathName === "/api/cms" && request.method === "GET") {
      return json(publicPayload(await readStore()));
    }

    if (pathName === "/api/admin/session" && request.method === "GET") {
      if (!(await readSession(request))) return json({ ok: false }, 401);
      const payload = publicPayload(await readStore());
      return json({ ok: true, ...payload });
    }

    if (pathName === "/api/admin/login" && request.method === "POST") {
      if (!sameOrigin(request)) return json({ error: "Blocked request." }, 403);
      const ip = clientIp(request);
      if (tooManyAttempts(ip)) return json({ error: "Too many attempts. Wait a few minutes." }, 429);
      const body = (await request.json().catch(() => null)) as { password?: string } | null;
      const expected = password();
      if (!expected) return json({ error: "Admin password is not configured on the server." }, 500);
      const ok = safeEqual(String(body?.password || ""), expected);
      noteAttempt(ip, ok);
      if (!ok) return json({ error: "Incorrect password." }, 401);
      const token = await signSession();
      return json({ ok: true, token }, 200, { "set-cookie": cookie(token, SESSION_SECONDS) });
    }

    if (pathName === "/api/admin/logout" && request.method === "POST") {
      return json({ ok: true }, 200, { "set-cookie": cookie("", 0) });
    }

    if (pathName === "/api/admin/upload" && request.method === "POST") {
      return await uploadImage(request);
    }

    if (pathName === "/api/admin/posts" && request.method === "PUT") {
      const denied = await requireAdmin(request);
      if (denied) return denied;
      const body = (await request.json().catch(() => null)) as { post?: unknown } | null;
      const store = await readStore();
      const posts = store.posts ? [...store.posts] : defaultPosts();
      const saved = cleanPost(body?.post, posts);
      if ("error" in saved) return json(saved, 400);
      const previous = String((body?.post as { previousSlug?: string } | undefined)?.previousSlug || "");
      const index = posts.findIndex((post) => post.slug === previous || post.slug === saved.slug);
      if (index >= 0) posts[index] = saved;
      else posts.unshift(saved);
      store.posts = posts;
      await writeStore(store);
      return json({ ok: true, post: saved, posts });
    }

    if (pathName === "/api/admin/posts" && request.method === "DELETE") {
      const denied = await requireAdmin(request);
      if (denied) return denied;
      const body = (await request.json().catch(() => null)) as { slug?: string } | null;
      const slug = String(body?.slug || "").trim();
      if (!slug) return json({ error: "Missing post." }, 400);
      const store = await readStore();
      const posts = (store.posts ? [...store.posts] : defaultPosts()).filter((post) => post.slug !== slug);
      store.posts = posts;
      await writeStore(store);
      return json({ ok: true, posts });
    }

    if (pathName === "/api/admin/content" && request.method === "PUT") {
      const denied = await requireAdmin(request);
      if (denied) return denied;
      const body = (await request.json().catch(() => null)) as { content?: Partial<SiteContent>; reset?: boolean } | null;
      const store = await readStore();
      if (body?.reset) {
        store.content = {};
      } else if (body?.content && typeof body.content === "object") {
        const next: Partial<SiteContent> = { ...store.content };
        (Object.keys(DEFAULT_CONTENT) as Array<keyof SiteContent>).forEach((key) => {
          const value = body.content?.[key];
          if (typeof value === "string") next[key] = value.trim();
        });
        store.content = next;
      }
      await writeStore(store);
      return json({ ok: true, content: { ...DEFAULT_CONTENT, ...store.content } });
    }

    if (pathName === "/api/admin/images" && request.method === "PUT") {
      const denied = await requireAdmin(request);
      if (denied) return denied;
      const body = (await request.json().catch(() => null)) as { slot?: string; url?: string } | null;
      const slot = String(body?.slot || "");
      if (!IMAGE_SLOTS.some((item) => item.id === slot)) return json({ error: "Unknown image slot." }, 400);
      const store = await readStore();
      const urlValue = String(body?.url || "").trim();
      if (!urlValue) delete store.images[slot as ImageSlotId];
      else if (urlValue.startsWith("/") || urlValue.startsWith("http")) store.images[slot] = urlValue;
      else return json({ error: "That image address is not allowed." }, 400);
      await writeStore(store);
      return json({ ok: true, images: store.images });
    }

    return json({ error: "Not found." }, 404);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not save.";
    return json({ error: message }, 500);
  }
}
