/**
 * Canonical Astrek image map for the mech-mirror homepage.
 * Source of truth: src/site/astrek-body.html + public/images/
 */

export type ImageRule = {
  /** Match img alt text (case-insensitive substring) */
  altIncludes?: string;
  /** Exact alt match */
  alt?: string;
  /** Match data-testid on img or ancestor section */
  testId?: string;
  src: string;
  /** Optional WebP/PNG fallback chain */
  fallbacks?: string[];
};

/** Ordered rules: first match wins */
export const HOMEPAGE_IMAGE_RULES: ImageRule[] = [
  // Brand
  { alt: "Astrek Innovations", src: "/images/inline-b213c3cc37.webp" },

  // Hero: wearer from behind, X-01 control unit (Drive 7K0A1589)
  {
    testId: "hero-journey-image",
    src: "/images/device/1589.jpg",
    fallbacks: ["/images/device/1614.jpg", "/images/hero-journey-photo.jpg"],
  },

  {
    altIncludes: "lower-limb",
    src: "/images/device/1566.jpg",
    fallbacks: ["/images/device/1674.jpg", "/images/hero-exo-product.png"],
  },

  // Key features
  { altIncludes: "Enhanced mobility", src: "/images/device/1550.jpg", fallbacks: ["/images/device/1570.jpg"] },
  { altIncludes: "Advanced AI", src: "/images/device/1632.jpg", fallbacks: ["/images/device/1618.jpg"] },
  { altIncludes: "Human-centered fit", src: "/images/device/1594.jpg", fallbacks: ["/images/device/1582.jpg"] },

  // Product section — device-only studio angle
  {
    altIncludes: "exoskeleton, studio view",
    src: "/images/device/1674.jpg",
    fallbacks: ["/images/device/1662.jpg", "/images/device/1653.jpg"],
  },

  // Rehabilitation modes
  { altIncludes: "Sit mode", src: "/images/device/sit.webp", fallbacks: ["/images/device/1582.jpg", "/images/sit-mode.png"] },
  { altIncludes: "Stand mode", src: "/images/device/1570.jpg", fallbacks: ["/images/device/1550.jpg"] },
  { altIncludes: "Walk mode", src: "/images/device/1582.jpg", fallbacks: ["/images/device/1566.jpg"] },
  { altIncludes: "Exercise mode", src: "/images/device/1579.jpg", fallbacks: ["/images/device/1594.jpg"] },

  // Specs stage (default: accordion swaps in init-mech-mirror)
  { altIncludes: "module detail", src: "/images/device/1626.jpg" },

  // Testimonials
  { altIncludes: "clinical session", src: "/images/clinical-pilot.webp", fallbacks: ["/images/clinical-pilot.png"] },

  // Team: founders
  { alt: "Robin Kanattu Thomas", src: "/images/robin.jpeg" },
  { alt: "Jithin Vidya Ajith", src: "/images/jithin.jpeg" },
  { alt: "Alex M Sunny", src: "/images/alex.jpeg" },
  { alt: "Vishnu Sankar", src: "/images/vishnu.jpeg" },

  // Team: mentors
  { alt: "Ishaan Khosla", src: "/images/Ishaan-Khosla.jpg" },
  { alt: "Dr Pradeep K Jaisingh", src: "/images/pradeep_k_jaisingh.jpg" },
  { alt: "Sanil Sachar", src: "/images/Sanil_Sq.jpeg" },
  { alt: "Akhil", src: "/images/mentor-advisor.svg" },

  // Partners (SVG logos)
  { alt: "Maker Village", src: "/images/maker-village.png" },
  { alt: "Kerala Startup Mission", src: "/images/ksum.png" },
  { alt: "Startup Chile", src: "/images/startup-chile.png" },
  { alt: "Huddle", src: "/images/huddle.png" },
  { alt: "HealthStart India", src: "/images/healthstart.png" },
  { alt: "IIIT Hyderabad", src: "/images/iiit-hyderabad.svg" },
  { alt: "CIE IIIT Hyderabad", src: "/images/cie-iiit.png" },
  { alt: "NIDHI PRAYAS", src: "/images/nidhi-prayas.png" },
  { alt: "Indian Angel Network", src: "/images/ian.png" },
  { alt: "MeitY", src: "/images/meity.png" },
  { alt: "OIST", src: "/images/oist.png" },

  // Press
  { altIncludes: "press coverage", src: "/images/astrek-lab.webp", fallbacks: ["/images/astrek-lab.jpg"] },

  // Journal / insights
  {
    altIncludes: "Inside Our First Clinical Pilot",
    src: "/images/clinical-pilot.png",
    fallbacks: ["/images/blog-clinical.svg"],
  },
  {
    altIncludes: "Motion Capture Teaches Us About Gait",
    src: "/images/motion-capture-gait.jpg",
    fallbacks: ["/images/motion-capture-gait.png", "/images/blog-gait.svg"],
  },
  {
    altIncludes: "Building Astrek",
    src: "/images/astrek-lab.jpg",
    fallbacks: ["/images/astrek-lab.webp", "/images/blog-lab.svg"],
  },
];

export const SPECS_IMAGE_ASSETS = [
  { title: "Hip module", src: "/images/device/1626.jpg" },
  { title: "Knee actuator", src: "/images/device/1601.jpg" },
  { title: "Ankle support", src: "/images/device/1693.jpg" },
  { title: "Comfortable fit", src: "/images/device/1689.jpg" },
  { title: "Smart control", src: "/images/device/1632.jpg" },
  { title: "Clinician interface", src: "/images/device/1618.jpg" },
] as const;

function matchesRule(img: HTMLImageElement, rule: ImageRule): boolean {
  const alt = (img.alt || "").trim();
  if (rule.alt && alt === rule.alt) return true;
  if (rule.altIncludes && alt.toLowerCase().includes(rule.altIncludes.toLowerCase())) return true;
  if (rule.testId) {
    if (img.getAttribute("data-testid") === rule.testId) return true;
    const el = img.closest(`[data-testid="${rule.testId}"]`);
    if (el) return true;
  }
  return false;
}

/** Apply canonical src to every homepage img; wire onerror fallbacks. */
export function applyHomepageImageMap(root: HTMLElement): void {
  root.querySelectorAll<HTMLImageElement>("img").forEach((img) => {
    // Keep journey hero photography + partner strip assets untouched
    if (img.matches('[data-testid="hero-journey-image"]')) return;
    if (img.closest(".ajh-media, [data-ajh-partners], .ajh-partner")) return;
    if ((img.getAttribute("src") || "").includes("/partners-hd/")) return;
    if ((img.getAttribute("src") || "").includes("hero-partners-panel")) return;
    if ((img.getAttribute("src") || "").includes("hero-partners-bar")) return;
    if ((img.getAttribute("src") || "").includes("partners-hd/")) return;
    if ((img.getAttribute("src") || "").includes("/images/partners/")) return;
    if ((img.getAttribute("src") || "").includes("hero-journey-photo")) return;
    if ((img.getAttribute("src") || "").includes("hero-journey-exact")) return;
    if ((img.getAttribute("src") || "").includes("hero-journey-hd")) return;

    const rule = HOMEPAGE_IMAGE_RULES.find((r) => matchesRule(img, r));
    if (!rule) return;

    if (img.getAttribute("src") !== rule.src) {
      img.src = rule.src;
    }

    if (rule.fallbacks?.length) {
      let fallbackIndex = 0;
      img.onerror = () => {
        if (fallbackIndex < rule.fallbacks!.length) {
          img.src = rule.fallbacks![fallbackIndex++];
        } else {
          img.onerror = null;
        }
      };
    }
  });
}
