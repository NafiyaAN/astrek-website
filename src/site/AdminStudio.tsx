import { useEffect, useState } from "react";

import { BLOG_CATEGORY_OPTIONS, DEFAULT_CONTENT, IMAGE_SLOTS, type SiteContent } from "./cms";
import type { BlogPost } from "./blog-data";

type Tab = "blog" | "images" | "content";

type Draft = {
  previousSlug: string;
  slug: string;
  title: string;
  tag: string;
  date: string;
  excerpt: string;
  body: string;
  image: string;
};

const emptyDraft = (): Draft => ({
  previousSlug: "",
  slug: "",
  title: "",
  tag: "Company updates",
  date: new Date().toLocaleString("en-US", { month: "long", year: "numeric" }),
  excerpt: "",
  body: "",
  image: "",
});

async function readError(res: Response) {
  const data = (await res.json().catch(() => null)) as { error?: string } | null;
  return data?.error || "Something went wrong.";
}

export function AdminStudio() {
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [tab, setTab] = useState<Tab>("blog");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [content, setContent] = useState<SiteContent>(DEFAULT_CONTENT);
  const [images, setImages] = useState<Record<string, string>>({});
  const [storage, setStorage] = useState<"file" | "blob">("file");
  const [draft, setDraft] = useState<Draft | null>(null);
  const [toast, setToast] = useState("");
  const [busy, setBusy] = useState(false);

  function notify(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2400);
  }

  useEffect(() => {
    let cancelled = false;
    fetch("/api/admin/session", { cache: "no-store" })
      .then(async (res) => {
        if (!res.ok) return null;
        return res.json();
      })
      .then((data) => {
        if (cancelled || !data?.ok) return;
        setPosts(data.posts || []);
        setContent({ ...DEFAULT_CONTENT, ...data.content });
        setImages(data.images || {});
        setStorage(data.storage === "blob" ? "blob" : "file");
        setAuthed(true);
      })
      .finally(() => {
        if (!cancelled) setReady(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  async function login() {
    setLoginError("");
    setBusy(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        setLoginError(await readError(res));
        return;
      }
      const session = await fetch("/api/admin/session", { cache: "no-store" });
      const data = await session.json();
      setPosts(data.posts || []);
      setContent({ ...DEFAULT_CONTENT, ...data.content });
      setImages(data.images || {});
      setStorage(data.storage === "blob" ? "blob" : "file");
      setAuthed(true);
      setPassword("");
    } finally {
      setBusy(false);
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthed(false);
    setDraft(null);
  }

  async function uploadFile(file: File) {
    const body = new FormData();
    body.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body });
    if (!res.ok) throw new Error(await readError(res));
    const data = (await res.json()) as { url: string };
    return data.url;
  }

  async function savePost() {
    if (!draft) return;
    setBusy(true);
    try {
      const res = await fetch("/api/admin/posts", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ post: draft }),
      });
      if (!res.ok) {
        notify(await readError(res));
        return;
      }
      const data = await res.json();
      setPosts(data.posts || []);
      setDraft(null);
      notify("Post saved");
    } finally {
      setBusy(false);
    }
  }

  async function deletePost(slug: string) {
    if (!window.confirm("Delete this post? It will disappear from the blog.")) return;
    const res = await fetch("/api/admin/posts", {
      method: "DELETE",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ slug }),
    });
    if (!res.ok) {
      notify(await readError(res));
      return;
    }
    const data = await res.json();
    setPosts(data.posts || []);
    notify("Post deleted");
  }

  async function saveContent() {
    setBusy(true);
    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ content }),
      });
      if (!res.ok) {
        notify(await readError(res));
        return;
      }
      notify("Site text saved");
    } finally {
      setBusy(false);
    }
  }

  async function resetContent() {
    setBusy(true);
    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ reset: true }),
      });
      if (!res.ok) {
        notify(await readError(res));
        return;
      }
      setContent(DEFAULT_CONTENT);
      notify("Reset to the original text");
    } finally {
      setBusy(false);
    }
  }

  async function onSlotFile(slot: string, file: File | undefined) {
    if (!file) return;
    setBusy(true);
    try {
      const url = await uploadFile(file);
      const res = await fetch("/api/admin/images", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ slot, url }),
      });
      if (!res.ok) {
        notify(await readError(res));
        return;
      }
      const data = await res.json();
      setImages(data.images || {});
      notify("Image updated");
    } catch (error) {
      notify(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  async function clearSlot(slot: string) {
    const res = await fetch("/api/admin/images", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ slot, url: "" }),
    });
    if (!res.ok) {
      notify(await readError(res));
      return;
    }
    const data = await res.json();
    setImages(data.images || {});
    notify("Image reset");
  }

  if (!ready) {
    return (
      <div id="loginScreen">
        <div className="login-card">
          <div className="mark" />
          <h1>Astrek Admin</h1>
          <p>Checking your session…</p>
        </div>
      </div>
    );
  }

  if (!authed) {
    return (
      <div id="loginScreen">
        <div className="login-card">
          <div className="mark" />
          <h1>Astrek Admin</h1>
          <p>Sign in to edit blog posts, homepage text, and photos. Changes show for every visitor.</p>
          <input
            type="password"
            value={password}
            placeholder="Password"
            autoComplete="current-password"
            onChange={(event) => setPassword(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") void login();
            }}
          />
          <button type="button" disabled={busy} onClick={() => void login()}>
            Unlock
          </button>
          {loginError ? (
            <div className="login-error" style={{ display: "block" }}>
              {loginError}
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div id="dashboard" style={{ display: "block" }}>
      <div className="topbar">
        <div className="brand">
          <span className="mark" /> Astrek Admin
        </div>
        <div className="actions">
          <a href="/" target="_blank" rel="noopener">
            View site ↗
          </a>
          <button type="button" onClick={() => void logout()}>
            Lock
          </button>
        </div>
      </div>
      <div className="tabs">
        {(
          [
            ["blog", "Blog Posts"],
            ["images", "Images"],
            ["content", "Site Content"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            className={tab === id ? "tab-btn active" : "tab-btn"}
            onClick={() => {
              setTab(id);
              setDraft(null);
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {storage === "file" ? (
        <div className="panel active" style={{ paddingBottom: 0 }}>
          <div className="callout">
            <strong>Saved on this computer.</strong> Visitors to this local site see the edits. To keep them on the
            live Vercel site, add a Blob store token named <span className="mono">BLOB_READ_WRITE_TOKEN</span>.
          </div>
        </div>
      ) : null}

      {tab === "blog" && !draft ? (
        <div className="panel active">
          <div className="panel-head">
            <div>
              <h2>Blog Posts</h2>
              <p>Add, edit, or remove posts. The blog page and the homepage cards use this list.</p>
            </div>
            <button type="button" className="btn" onClick={() => setDraft(emptyDraft())}>
              + New Post
            </button>
          </div>
          {posts.length === 0 ? (
            <div className="empty-state">No posts yet. Click “+ New Post” to add one.</div>
          ) : (
            posts.map((post) => (
              <div className="post-row" key={post.slug}>
                <div className="meta">
                  <div className="tag mono">
                    {post.tag} · {post.date}
                  </div>
                  <div className="title">{post.title}</div>
                </div>
                <div className="row-actions">
                  <button
                    type="button"
                    className="btn-outline"
                    onClick={() =>
                      setDraft({
                        previousSlug: post.slug,
                        slug: post.slug,
                        title: post.title,
                        tag: post.tag,
                        date: post.date,
                        excerpt: post.excerpt,
                        body: post.body,
                        image: post.image,
                      })
                    }
                  >
                    Edit
                  </button>
                  <button type="button" className="btn-outline btn-danger" onClick={() => void deletePost(post.slug)}>
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      ) : null}

      {tab === "blog" && draft ? (
        <div className="panel active">
          <div className="panel-head">
            <div>
              <h2>{draft.previousSlug ? "Edit Post" : "New Post"}</h2>
              <p>Fields marked * are required. Leave a blank line between paragraphs.</p>
            </div>
            <button type="button" className="btn-outline" onClick={() => setDraft(null)}>
              Cancel
            </button>
          </div>
          <div className="editor-card">
            <div className="field-row">
              <div className="field">
                <label>Title *</label>
                <input
                  value={draft.title}
                  onChange={(event) => setDraft({ ...draft, title: event.target.value })}
                />
              </div>
              <div className="field">
                <label>Category *</label>
                <select value={draft.tag} onChange={(event) => setDraft({ ...draft, tag: event.target.value })}>
                  {BLOG_CATEGORY_OPTIONS.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="field-row">
              <div className="field">
                <label>Date</label>
                <input value={draft.date} onChange={(event) => setDraft({ ...draft, date: event.target.value })} />
              </div>
              <div className="field">
                <label>Cover image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (!file || !draft) return;
                    setBusy(true);
                    uploadFile(file)
                      .then((url) => setDraft((current) => (current ? { ...current, image: url } : current)))
                      .catch((error: unknown) => notify(error instanceof Error ? error.message : "Upload failed"))
                      .finally(() => setBusy(false));
                  }}
                />
                {draft.image ? <img className="admin-thumb" src={draft.image} alt="" /> : null}
              </div>
            </div>
            <div className="field">
              <label>Excerpt *</label>
              <textarea
                rows={2}
                value={draft.excerpt}
                onChange={(event) => setDraft({ ...draft, excerpt: event.target.value })}
              />
            </div>
            <div className="field">
              <label>Full post body *</label>
              <textarea
                rows={10}
                value={draft.body}
                onChange={(event) => setDraft({ ...draft, body: event.target.value })}
              />
            </div>
            <button type="button" className="btn" disabled={busy} onClick={() => void savePost()}>
              Save Post
            </button>
          </div>
        </div>
      ) : null}

      {tab === "images" ? (
        <div className="panel active">
          <div className="panel-head">
            <div>
              <h2>Images</h2>
              <p>Replace a photo on the homepage. Reset brings back the current studio shot.</p>
            </div>
          </div>
          <div className="image-grid">
            {IMAGE_SLOTS.map((slot) => {
              const src = images[slot.id] || slot.fallback;
              return (
                <div className="editor-card image-card" key={slot.id}>
                  <h3>{slot.label}</h3>
                  <p className="hint">{slot.hint}</p>
                  <img src={src} alt="" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(event) => void onSlotFile(slot.id, event.target.files?.[0])}
                  />
                  {images[slot.id] ? (
                    <button type="button" className="btn-outline" onClick={() => void clearSlot(slot.id)}>
                      Reset
                    </button>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      ) : null}

      {tab === "content" ? (
        <div className="panel active">
          <div className="panel-head">
            <div>
              <h2>Site Content</h2>
              <p>Edit the homepage hero and the About section. English pages pick this up right away.</p>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button type="button" className="btn-outline btn-danger" onClick={() => void resetContent()}>
                Reset to defaults
              </button>
              <button type="button" className="btn" disabled={busy} onClick={() => void saveContent()}>
                Save all changes
              </button>
            </div>
          </div>
          <div className="editor-card">
            <h3>Hero</h3>
            <div className="field">
              <label>Headline</label>
              <textarea
                rows={2}
                value={content.heroTitle}
                onChange={(event) => setContent({ ...content, heroTitle: event.target.value })}
              />
              <div className="hint">The word “again” stays in the accent colour.</div>
            </div>
            <div className="field">
              <label>Subtext</label>
              <textarea
                rows={3}
                value={content.heroSub}
                onChange={(event) => setContent({ ...content, heroSub: event.target.value })}
              />
            </div>
          </div>
          <div className="editor-card">
            <h3>About</h3>
            <div className="field">
              <label>Lead</label>
              <textarea
                rows={3}
                value={content.aboutLead}
                onChange={(event) => setContent({ ...content, aboutLead: event.target.value })}
              />
            </div>
            <div className="field">
              <label>Second paragraph</label>
              <textarea
                rows={3}
                value={content.aboutBody}
                onChange={(event) => setContent({ ...content, aboutBody: event.target.value })}
              />
            </div>
            <div className="field">
              <label>Vision</label>
              <textarea
                rows={2}
                value={content.vision}
                onChange={(event) => setContent({ ...content, vision: event.target.value })}
              />
            </div>
            <div className="field">
              <label>Technology</label>
              <textarea
                rows={2}
                value={content.technology}
                onChange={(event) => setContent({ ...content, technology: event.target.value })}
              />
            </div>
          </div>
        </div>
      ) : null}

      <div className={toast ? "toast show" : "toast"}>{toast}</div>
    </div>
  );
}
