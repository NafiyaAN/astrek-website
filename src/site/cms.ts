import { BLOG_CATEGORIES, BLOG_POSTS, type BlogPost } from "./blog-data";

export type SiteContent = {
  heroTitle: string;
  heroSub: string;
  aboutLead: string;
  aboutBody: string;
  vision: string;
  technology: string;
};

export type CmsPayload = {
  posts: BlogPost[];
  content: SiteContent;
  images: Record<string, string>;
};

export const DEFAULT_CONTENT: SiteContent = {
  heroTitle: "Take your first steps again",
  heroSub:
    "A robotic exoskeleton for lower-limb rehabilitation, built to help patients stand, walk, and regain independence.",
  aboutLead:
    "Astrek Innovations builds wearable robotic exoskeletons that restore lower-limb mobility. We work with rehabilitation centres to help patients stand, walk, and regain independence.",
  aboutBody:
    "Our systems are validated in real clinics — used with 120+ patients across 15+ centres — and recognized through innovation awards. From this foundation we are expanding into broader robotics.",
  vision: "Scalable robotic solutions across diverse fields.",
  technology: "Protocol-based gait training under clinical supervision.",
};

export const IMAGE_SLOTS = [
  { id: "hero", label: "Hero photo", hint: "Landing page", fallback: "/images/device/1589.jpg" },
  { id: "about", label: "About photo", hint: "Who we are", fallback: "/images/device/1566.jpg" },
  { id: "mobility", label: "Enhanced mobility", hint: "Chapter 01", fallback: "/images/device/1550.jpg" },
  { id: "ai", label: "Advanced AI", hint: "Chapter 02", fallback: "/images/device/1632.jpg" },
  { id: "fit", label: "Human-centered fit", hint: "Chapter 03", fallback: "/images/device/1594.jpg" },
  { id: "product", label: "Product stage", hint: "Unik Exo studio view", fallback: "/images/device/1674.jpg" },
  { id: "sit", label: "Sit mode", hint: "Rehabilitation card", fallback: "/images/device/sit.webp" },
  { id: "stand", label: "Stand mode", hint: "Rehabilitation card", fallback: "/images/device/1570.jpg" },
  { id: "walk", label: "Walk mode", hint: "Rehabilitation card", fallback: "/images/device/1582.jpg" },
  { id: "exercise", label: "Exercise mode", hint: "Rehabilitation card", fallback: "/images/device/1579.jpg" },
  { id: "hip", label: "Hip module", hint: "Specs", fallback: "/images/device/1626.jpg" },
  { id: "knee", label: "Knee actuator", hint: "Specs", fallback: "/images/device/1601.jpg" },
  { id: "ankle", label: "Ankle support", hint: "Specs", fallback: "/images/device/1693.jpg" },
  { id: "comfort", label: "Comfortable fit", hint: "Specs", fallback: "/images/device/1689.jpg" },
  { id: "control", label: "Smart control", hint: "Specs", fallback: "/images/device/1632.jpg" },
  { id: "clinician", label: "Clinician interface", hint: "Specs", fallback: "/images/device/1618.jpg" },
] as const;

export type ImageSlotId = (typeof IMAGE_SLOTS)[number]["id"];

export const BLOG_CATEGORY_OPTIONS = BLOG_CATEGORIES;

export function defaultPosts(): BlogPost[] {
  return BLOG_POSTS.map((post) => ({ ...post }));
}

export function emptyStore(): { posts: BlogPost[] | null; content: Partial<SiteContent>; images: Record<string, string> } {
  return { posts: null, content: {}, images: {} };
}
