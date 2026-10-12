export const BLOG_CATEGORIES = [
  "Company updates",
  "Technology",
  "Product development",
  "Rehabilitation robotics",
  "Industry insights",
  "Events",
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export type BlogPost = {
  slug: string;
  tag: string;
  date: string;
  title: string;
  excerpt: string;
  body: string;
  image: string;
};

const STORAGE_KEY = "astrek_blogPosts";
const FALLBACK_IMAGES = [
  "/images/clinical-pilot.webp",
  "/images/motion-capture-gait.png",
  "/images/astrek-lab.webp",
];

export function normalizeCategory(tag: string): BlogCategory {
  const raw = (tag || "").trim();
  const exact = BLOG_CATEGORIES.find((c) => c.toLowerCase() === raw.toLowerCase());
  if (exact) return exact;

  const t = raw.toUpperCase();
  if (t.includes("PRODUCT")) return "Product development";
  if (t.includes("INDUSTRY") || t.includes("INSIGHT")) return "Industry insights";
  if (t === "EVENTS" || t.includes("EVENT") || t.includes("ANNOUNCE")) return "Events";
  if (t === "CLINICAL" || t === "RESEARCH" || t.includes("REHAB")) return "Rehabilitation robotics";
  if (t === "ENGINEERING" || t === "TECHNOLOGY" || t.includes("TECH")) return "Technology";
  return "Company updates";
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "inside-our-first-clinical-pilot",
    tag: "Rehabilitation robotics",
    date: "March 2026",
    title: "Inside Our First Clinical Pilot",
    excerpt:
      "What we learned fitting Unik Exo on real patients for the first time, and what we changed as a result.",
    image: "/images/clinical-pilot.webp",
    body: `Our first clinical pilot ran across two partner rehabilitation centres over six weeks. Patients with varying degrees of lower-limb impairment used Unik Exo under supervision, and we logged every session, including fit time, gait symmetry, fatigue, and subjective comfort.

The biggest surprise wasn't mechanical. It was donning time. Our lab benchmark of under five minutes stretched to nearly fifteen in a real clinical setting, mostly due to clothing, transfers and staff familiarity. That single insight reshaped our next hardware revision more than any actuator tweak did.

We also learned to trust therapists' instincts over our own dashboards. A few sessions where the software reported 'normal' gait symmetry were flagged by therapists as compensatory movement, with patients finding clever ways to trick the metric without truly rehabilitating the pattern. We're now designing detection for exactly that.`,
  },
  {
    slug: "what-motion-capture-teaches-us-about-gait",
    tag: "Technology",
    date: "January 2026",
    title: "What Motion Capture Teaches Us About Gait",
    excerpt:
      "A short primer on how we use motion capture data to model human gait, and why average gait is a myth.",
    image: "/images/motion-capture-gait.png",
    body: `Every gait cycle looks a little different. Cadence, stride length, and joint angles shift with terrain, fatigue, mood, even footwear. When we started building Unik Exo's control model, we assumed there was a 'normal' gait curve we could design around. There isn't.

Instead, we capture gait across a wide population using marker-based motion capture, then train our assistive controller to recognise the shape of an individual's gait rather than match them to an average. This lets the exoskeleton assist the wearer's own pattern instead of forcing a generic one onto them.

It also means every new wearer effectively 'teaches' the device during their first calibration session, a short walk that lets the controller learn their baseline before assistance ramps up.`,
  },
  {
    slug: "building-astrek-from-startup-chile-to-kannur",
    tag: "Company updates",
    date: "November 2025",
    title: "Building Astrek: From Startup Chile to Kannur",
    excerpt:
      "A short history of how a college robotics project became a rehabilitation hardware company.",
    image: "/images/astrek-lab.webp",
    body: `Astrek began as a robotics project between engineering students trying to solve a problem close to home. What started as a proof-of-concept leg brace grew, slowly and with a lot of failed prototypes, into Unik Exo.

A turning point came at Startup Chile, where we were forced to explain our technology to people with zero context: investors, mentors, and other founders, again and again. It sharpened both the product and the pitch. We came back with a clearer roadmap and, more importantly, a clearer idea of who we were building for.

Today the team is based out of Kannur and the Maker Village in Kalamassery, closer to the clinics and rehabilitation centres we work with. That proximity has shaped nearly every design decision since.`,
  },
  {
    slug: "astrek-at-huddle-2025",
    tag: "Events",
    date: "February 2025",
    title: "Astrek at Huddle 2025: Building Connections, Driving Impact",
    excerpt:
      "A week with founders, clinicians and investors, and what we brought back to the lab.",
    image: "/images/astrek-lab.webp",
    body: `Huddle is where a lot of our early conversations happened, so returning in 2025 felt like a checkpoint. We showed Unik Exo, sat with rehabilitation specialists, and talked honestly about donning time, therapist control and what “clinic ready” actually means.

The most useful sessions were not on stage. They were the hallway conversations with people who run gait labs, the ones who asked how long it takes to switch patients, how we log compensatory movement, and whether a therapist can operate the system without an engineer in the room.

We came back with a shorter demo protocol, a clearer clinical pitch, and two new centre conversations that are now in follow-up.`,
  },
  {
    slug: "showcasing-unik-exo-at-amala-medex",
    tag: "Events",
    date: "January 2024",
    title: "Showcasing Unik Exo at Amala MedEx Expo 2024",
    excerpt:
      "What happens when you put a lower-limb exoskeleton in front of practising clinicians for two days.",
    image: "/images/clinical-pilot.webp",
    body: `Amala MedEx put Unik Exo in a room full of people who treat gait impairment every week. That is a different audience from a startup showcase. Questions were specific: weight limits, sit-to-stand assistance, how we handle spasticity, and whether the device stays on the clinic floor or tries to follow a patient home.

We ran short supervised demos and spent most of the time listening. The feedback confirmed a direction we were already taking: keep the system therapist-controlled, keep donning simple, and make session data readable without a data scientist.

It also reminded us why we show the work in Kerala first. The clinics we want to serve are here.`,
  },
  {
    slug: "designing-unik-exo-for-clinic-floor-donning",
    tag: "Product development",
    date: "April 2026",
    title: "Designing Unik Exo for clinic-floor donning",
    excerpt:
      "How lab timings fell apart in real clinics, and the hardware changes that followed.",
    image: "/images/clinical-pilot.webp",
    body: `In the lab, a practised engineer can fit Unik Exo in under five minutes. On a clinic floor that number stretched toward fifteen. Clothing, transfers, staff familiarity and the simple fact that the person in the device is not a test dummy all add time.

That gap became a product brief. We simplified strap paths, marked size references where therapists actually look, and cut steps that only made sense if you already knew the prototype. The next revision is being judged on donning time with a new therapist, not with us.

Product development here is not a feature list. It is whether a clinician can get a patient standing without calling an engineer into the room.`,
  },
  {
    slug: "what-clinics-look-for-in-lower-limb-robotics",
    tag: "Industry insights",
    date: "May 2026",
    title: "What clinics look for in lower-limb robotics",
    excerpt:
      "A field note on the questions rehabilitation centres ask before they take a device seriously.",
    image: "/images/motion-capture-gait.png",
    body: `The industry conversation around wearable robotics often starts with degrees of freedom and actuator counts. Clinic conversations start somewhere else: how long to switch patients, whether a therapist can run the session alone, what happens if tone spikes, and whether the data is readable without a data scientist.

Those questions are consistent across centres we visit in Kerala and beyond. They are also the ones that decide whether an exoskeleton stays in a demo room or moves onto the gait-training floor.

Industry progress in rehabilitation robotics will be measured less by lab records and more by whether devices survive a Tuesday afternoon caseload.`,
  },
];

export function slugifyTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getPublishedPosts().find((post) => post.slug === slug);
}

export function normalizeStoredPost(raw: Record<string, unknown>, index = 0): BlogPost | null {
  return asPost(raw, index);
}

function asPost(raw: Record<string, unknown>, index: number): BlogPost | null {
  const title = String(raw.title || "").trim();
  if (!title) return null;
  const slug = String(raw.slug || slugifyTitle(title));
  if (!slug) return null;
  return {
    slug,
    tag: normalizeCategory(String(raw.tag || "Company updates")),
    date: String(raw.date || ""),
    title,
    excerpt: String(raw.excerpt || ""),
    body: String(raw.body || raw.excerpt || ""),
    image: String(raw.image || FALLBACK_IMAGES[index % FALLBACK_IMAGES.length]),
  };
}

export function getStoredPosts(): BlogPost[] {
  if (typeof localStorage === "undefined") return [];
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw === null) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((item, index) => (item && typeof item === "object" ? asPost(item as Record<string, unknown>, index) : null))
      .filter((item): item is BlogPost => Boolean(item));
  } catch {
    return [];
  }
}

export function getPublishedPosts(): BlogPost[] {
  const stored = getStoredPosts();
  if (!stored.length) return BLOG_POSTS;
  const seen = new Set(stored.map((post) => post.slug));
  return [...stored, ...BLOG_POSTS.filter((post) => !seen.has(post.slug))];
}
