import type { BlogPost } from "./blog-data";
import { DEFAULT_CONTENT, type CmsPayload, type SiteContent } from "./cms";

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => {
    const map: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
    return map[char] || char;
  });
}

function setImg(img: HTMLImageElement | null | undefined, src: string | undefined) {
  if (!img || !src) return;
  img.src = src;
  img.removeAttribute("srcset");
}

export async function loadCms(signal?: AbortSignal): Promise<CmsPayload | null> {
  const res = await fetch("/api/cms", { signal, cache: "no-store" });
  if (!res.ok) return null;
  const data = (await res.json()) as CmsPayload;
  if (!data || !Array.isArray(data.posts)) return null;
  return data;
}

export function applyCmsImages(root: ParentNode, images: Record<string, string>) {
  if (images.hero) {
    const hero = root.querySelector<HTMLElement>('[data-hero="journey"]');
    hero?.querySelectorAll<HTMLSourceElement>("source").forEach((source) => {
      source.srcset = images.hero;
    });
    setImg(root.querySelector("[data-testid='hero-journey-image']"), images.hero);
  }

  setImg(root.querySelector(".aco-visual img"), images.about);
  setImg(root.querySelector("[data-testid='chapter-01'] img"), images.mobility);
  setImg(root.querySelector("[data-testid='chapter-02'] img"), images.ai);
  setImg(root.querySelector("[data-testid='chapter-03'] img"), images.fit);
  setImg(root.querySelector("[data-testid='product-stage'] img"), images.product);
  setImg(root.querySelector("[data-testid='mode-card-sit'] img"), images.sit);
  setImg(root.querySelector("[data-testid='mode-card-stand'] img"), images.stand);
  setImg(root.querySelector("[data-testid='mode-card-walk'] img"), images.walk);
  setImg(root.querySelector("[data-testid='mode-card-exercise'] img"), images.exercise);
}

export function applyCmsContent(root: ParentNode, content: Partial<SiteContent>) {
  const saved = stripEmpty(content);
  const merged = { ...DEFAULT_CONTENT, ...saved };
  const heading = root.querySelector<HTMLElement>("[data-testid='hero-heading']");
  if (heading && saved.heroTitle) {
    heading.textContent = merged.heroTitle.trim();
  }

  const sub = root.querySelector<HTMLElement>("[data-testid='hero-subcopy']");
  if (sub && saved.heroSub) sub.textContent = merged.heroSub;

  const lead = root.querySelector<HTMLElement>(".aco-lead");
  if (lead && saved.aboutLead) lead.textContent = merged.aboutLead;
  const body = root.querySelector<HTMLElement>(".aco-body");
  if (body && saved.aboutBody) body.textContent = merged.aboutBody;

  root.querySelectorAll<HTMLElement>(".aco-topic").forEach((topic) => {
    const title = topic.querySelector("h3")?.textContent?.trim().toLowerCase();
    const text = topic.querySelector<HTMLElement>(".aco-topic-text");
    if (!text) return;
    if (title === "vision" && saved.vision) text.textContent = merged.vision;
    if (title === "technology" && saved.technology) text.textContent = merged.technology;
  });
}

export function applyHomepagePosts(root: ParentNode, posts: BlogPost[]) {
  const cards = [...root.querySelectorAll<HTMLElement>("[data-testid^='blog-card-']")];
  posts.slice(0, cards.length).forEach((post, index) => {
    const card = cards[index];
    if (!card) return;
    card.dataset.cmsSlug = post.slug;
    const img = card.querySelector<HTMLImageElement>("img");
    if (img && post.image) {
      img.src = post.image;
      img.alt = post.title;
    }
    const badge = card.querySelector<HTMLElement>("span.absolute");
    if (badge) badge.textContent = post.tag;
    const date = card.querySelector<HTMLElement>(".font-mono.text-\\[10px\\]");
    if (date) date.textContent = post.date;
    const title = card.querySelector("h3");
    if (title) title.textContent = post.title;
    const excerpt = card.querySelector("p");
    if (excerpt) excerpt.textContent = post.excerpt;
  });
}

function stripEmpty(content: Partial<SiteContent>): Partial<SiteContent> {
  const next: Partial<SiteContent> = {};
  (Object.keys(DEFAULT_CONTENT) as Array<keyof SiteContent>).forEach((key) => {
    const value = content[key];
    if (typeof value === "string" && value.trim()) next[key] = value;
  });
  return next;
}
