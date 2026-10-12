/**
 * Full-featured interactions for the Emergent mirror homepage.
 * Wires your existing Astrek infrastructure: i18n, forms, stats, carousel.
 */

import { submitEnquiry, submitNewsletter } from "../forms-api";
import {
  localizeHref,
  persistLocale,
  switchLocalePath,
  type Locale,
} from "../i18n";
import { CAROUSEL_DOT_SVG, SPEC_DOT_SVG } from "../lucide-icons";
import { applyCmsContent, applyCmsImages, applyHomepagePosts, loadCms } from "../apply-cms";
import { applyHomepageImageMap, SPECS_IMAGE_ASSETS } from "./image-map";
import { initCookieConsent } from "../cookie-consent";
import { translate as tr, tryTranslate } from "../translations";

const STAT_TARGETS: Record<string, { value: number; suffix: string }> = {
  "stat-patients-tra": { value: 120, suffix: "+" },
  "stat-rehabilitati": { value: 15, suffix: "+" },
  "stat-therapy-sess": { value: 10, suffix: "K+" },
  "stat-would-recomm": { value: 90, suffix: "%" },
};

let specAssetsLive: Array<{ title: string; src: string }> | null = null;
let specActiveIndex = 0;

const SPEC_SLOT_IDS = ["hip", "knee", "ankle", "comfort", "control", "clinician"] as const;

function applySpecImageOverrides(images: Record<string, string>) {
  if (!specAssetsLive) return;
  SPEC_SLOT_IDS.forEach((slot, index) => {
    const next = images[slot];
    if (next && specAssetsLive?.[index]) specAssetsLive[index].src = next;
  });
  const img = document.querySelector<HTMLImageElement>("[data-testid='specs-stage'] img");
  const current = specAssetsLive[specActiveIndex];
  if (img && current) img.src = current.src;
}

const TESTIMONIALS = [
  {
    name: "Ramesh N.",
    role: "Stroke Survivor · Kochi, India",
    quote:
      "After months in a wheelchair, standing upright in Unik Exo felt like getting a piece of my life back. The therapists could adjust support in real time, and I felt safe every step.",
  },
  {
    name: "Priya M.",
    role: "Caregiver · Bengaluru, India",
    quote:
      "We tried many devices. Unik Exo was the first that felt designed for real clinics. Setup was fast, and the team trained our physiotherapist thoroughly.",
  },
  {
    name: "Dr. Anil K.",
    role: "Rehabilitation Specialist · Kochi, India",
    quote:
      "Gait training needs repeatability. Unik Exo gives me step-wise control and clear feedback, and it fits into our protocol instead of fighting it.",
  },
  {
    name: "Suresh V.",
    role: "SCI Patient · Kannur, India",
    quote:
      "Walk mode assistance adapted as I improved. Each session built confidence, from supported steps to walking the length of the clinic.",
  },
];

export function initMechMirror(locale: Locale = "en"): () => void {
  const root = document.querySelector<HTMLElement>("[data-testid='astrek-site']");
  if (!root) return () => {};

  try {
    return initMechMirrorInner(root, locale);
  } catch (err) {
    console.error("[mech-mirror] init failed:", err);
    return () => {};
  }
}

function initMechMirrorInner(root: HTMLElement, locale: Locale): () => void {
  root.id = "astrek-site";

  const cleanups: Array<() => void> = [initMechChrome(root, locale)];

  /* Apply canonical Astrek image map + eager load */
  applyHomepageImageMap(root);
  root.querySelectorAll<HTMLImageElement>("img").forEach((img) => {
    if (img.loading === "lazy") img.loading = "eager";
  });

  removeDecorativeSymbols(root);

  cleanups.push(initPartnersSection(root, locale));
  cleanups.push(initPressSection(root, locale));
  cleanups.push(initBlogSection(root, locale));
  cleanups.push(initScrollReveal(root));
  cleanups.push(initJourneyHero(root));
  cleanups.push(initStatsCounter(root));
  cleanups.push(initFaq(root, locale));
  cleanups.push(initSpecs(root));
  cleanups.push(initTestimonials(root, locale));
  cleanups.push(initProductSection(root));
  cleanups.push(initModesSection(root));
  cleanups.push(initPageTranslation(root, locale));

  const cmsAbort = new AbortController();
  loadCms(cmsAbort.signal)
    .then((cms) => {
      if (!cms || cmsAbort.signal.aborted) return;
      applyCmsImages(root, cms.images);
      applySpecImageOverrides(cms.images);
      if (locale === "en") {
        applyCmsContent(root, cms.content);
        applyHomepagePosts(root, cms.posts);
      }
    })
    .catch(() => {});
  cleanups.push(() => cmsAbort.abort());

  return () => cleanups.forEach((fn) => fn());
}

const MARQUEE_DOT = '<span class="astrek-marquee-dot" aria-hidden="true"></span>';
const PRESS_DOT = '<span class="astrek-press-dot" aria-hidden="true"></span>';

/** Remove decorative symbols the user flagged: asterisks, watermarks, mode icons, press arrows. */
function removeDecorativeSymbols(root: HTMLElement): void {
  root.querySelectorAll<SVGElement>('[data-testid="editorial-marquee"] svg.lucide-asterisk').forEach((svg) => {
    svg.outerHTML = MARQUEE_DOT;
  });

  root.querySelectorAll<HTMLElement>(".mech-ticker-star").forEach((el) => {
    el.outerHTML = MARQUEE_DOT;
  });

  root.querySelectorAll<HTMLElement>('[data-testid^="chapter-"] > span[aria-hidden="true"]').forEach((el) => {
    el.remove();
  });

  root.querySelectorAll<HTMLElement>('[data-testid^="mode-card-"] .mb-3.flex.h-10.w-10').forEach((el) => {
    el.remove();
  });

  root.querySelectorAll<SVGElement>(
    '[data-testid="press-section"] svg.lucide-arrow-up-right, #press svg.lucide-arrow-up-right',
  ).forEach((svg) => {
    svg.outerHTML = PRESS_DOT;
  });

  root.querySelectorAll<HTMLButtonElement>('[data-testid^="testimonial-dot-"], button[aria-label^="Go to story"]').forEach((btn) => {
    if (btn.querySelector(".astrek-dot-icon")) return;
    const active = btn.classList.contains("bg-brand") || btn.getAttribute("aria-current") === "true";
    btn.classList.remove("bg-brand", "bg-zinc-700", "bg-zinc-800", "hover:bg-zinc-500");
    btn.classList.add("astrek-carousel-dot");
    if (active) btn.classList.add("astrek-carousel-dot--active");
    btn.innerHTML = CAROUSEL_DOT_SVG;
  });

  root.querySelectorAll<HTMLElement>('[data-testid^="spec-item-"] span.rounded-full').forEach((dot) => {
    if (dot.querySelector(".astrek-spec-dot__icon")) return;
    const active = dot.classList.contains("bg-brand");
    dot.classList.remove("bg-brand", "bg-zinc-800", "h-2", "w-2", "rounded-full");
    dot.classList.add("astrek-spec-dot");
    if (active) dot.classList.add("astrek-dot--active");
    dot.innerHTML = SPEC_DOT_SVG;
  });
}

type PartnerCell = { href: string; alt: string; src: string };

const PARTNERS_PREV_ICON =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5"/><path d="m11 6-6 6 6 6"/></svg>';
const PARTNERS_NEXT_ICON =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>';

function extractPartnerCells(section: HTMLElement): PartnerCell[] {
  return [...section.querySelectorAll<HTMLAnchorElement>("a[data-testid^='partner-']")]
    .filter((a) => a.dataset.testid !== "partner-cta")
    .map((a) => {
      const img = a.querySelector("img");
      return {
        href: a.href,
        alt: img?.alt || a.getAttribute("aria-label") || "",
        src: img?.getAttribute("src") || "",
      };
    })
    .filter((p) => p.src);
}

function createPartnerLogoLink(p: PartnerCell): HTMLAnchorElement {
  const link = document.createElement("a");
  link.className = "astrek-partners__logo";
  link.href = p.href;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.setAttribute("aria-label", p.alt);

  const img = document.createElement("img");
  img.src = p.src;
  img.alt = p.alt;
  img.loading = "lazy";
  img.decoding = "async";
  link.appendChild(img);
  return link;
}

function buildPartnerRow(cells: PartnerCell[]): HTMLElement {
  const wrap = document.createElement("div");
  wrap.className = "astrek-partners__row-wrap";

  const row = document.createElement("div");
  row.className = "astrek-partners__row";

  cells.forEach((p) => row.appendChild(createPartnerLogoLink(p)));

  wrap.appendChild(row);
  return wrap;
}

/** Rebuild #partners to Neura-style layout with logo hover glow */
function initPartnersSection(root: HTMLElement, locale: Locale): () => void {
  const section = root.querySelector<HTMLElement>("#partners");
  if (!section || section.dataset.astrekPartnersBuilt === "true") return () => {};

  const partners = extractPartnerCells(section);
  if (!partners.length) return () => {};

  const ctaHref = localizeHref(locale, "/partner");

  const row1 = partners.slice(0, 5);
  const row2 = partners.slice(5);

  section.dataset.astrekPartnersBuilt = "true";
  section.dataset.testid = "partners-section";
  section.id = "partners";
  section.className = "astrek-partners";

  const titleBuilt = tr(locale, "Built with the right");
  const titlePartners = tr(locale, "partners.");
  const lead = tr(
    locale,
    "Incubated at Maker Village and CIE IIIT Hyderabad, supported by Kerala Startup Mission, with acceleration from HealthStart, Huddle, Startup Chile, and the OIST Innovation Accelerator.",
  );
  const ctaBtn = tr(locale, "Partner With Us");
  const aside = tr(
    locale,
    "From Maker Village in Kochi to OIST in Japan, and with backing from IAN Fund and MeitY, our partners help take Unik Exo from the lab into clinics.",
  );
  const bannerLead = tr(locale, "Partnerships that inspire innovation.");
  const bannerStrong = tr(locale, "Together, we create impact that lasts.");
  const bannerMuted = tr(
    locale,
    "We are always open to meaningful collaborations that drive technology for good.",
  );
  const bannerLink = tr(locale, "Partner with us →").replace(/\s*[↗→←]\s*$/, "");

  section.innerHTML = `
    <div class="astrek-partners__inner">
      <div class="astrek-partners__top">
        <div class="astrek-partners__intro">
          <p class="astrek-partners__eyebrow">${tr(locale, "Partners")}</p>
          <h2 class="astrek-partners__title">${titleBuilt} <em>${titlePartners}</em></h2>
          <p class="astrek-partners__lead">${lead}</p>
          <a class="astrek-partners__cta-btn" href="${ctaHref}">${ctaBtn}</a>
        </div>
        <div class="astrek-partners__aside">
          <p class="astrek-partners__aside-text">${aside}</p>
          <div class="astrek-partners__showcase">
            <div class="astrek-partners__rows" data-astrek-partners-rows></div>
            <div class="astrek-partners__controls">
              <button type="button" class="astrek-partners__control" data-astrek-partners-prev aria-label="Scroll partners left">${PARTNERS_PREV_ICON}</button>
              <button type="button" class="astrek-partners__control" data-astrek-partners-next aria-label="Scroll partners right">${PARTNERS_NEXT_ICON}</button>
            </div>
          </div>
        </div>
      </div>
      <div class="astrek-partners__banner">
        <p class="astrek-partners__banner-copy">${bannerLead} <strong>${bannerStrong}</strong></p>
        <div class="astrek-partners__banner-divider" aria-hidden="true"></div>
        <p class="astrek-partners__banner-muted">${bannerMuted}</p>
        <a class="astrek-partners__banner-link" href="${ctaHref}">${bannerLink}</a>
      </div>
    </div>
  `;

  const rowsHost = section.querySelector<HTMLElement>("[data-astrek-partners-rows]");
  if (rowsHost) {
    rowsHost.appendChild(buildPartnerRow(row1));
    if (row2.length) {
      const glow = document.createElement("div");
      glow.className = "astrek-partners__glow-line";
      glow.setAttribute("aria-hidden", "true");
      rowsHost.appendChild(glow);
      rowsHost.appendChild(buildPartnerRow(row2));
    }
  }

  const cleanups: Array<() => void> = [];

  const prevBtn = section.querySelector<HTMLButtonElement>("[data-astrek-partners-prev]");
  const nextBtn = section.querySelector<HTMLButtonElement>("[data-astrek-partners-next]");
  const scrollWraps = [...section.querySelectorAll<HTMLElement>(".astrek-partners__row-wrap")];

  const scrollRows = (direction: -1 | 1) => {
    scrollWraps.forEach((wrap) => {
      wrap.scrollBy({
        left: direction * Math.max(140, wrap.clientWidth * 0.38),
        behavior: "smooth",
      });
    });
  };

  if (prevBtn) {
    const onPrev = () => scrollRows(-1);
    prevBtn.addEventListener("click", onPrev);
    cleanups.push(() => prevBtn.removeEventListener("click", onPrev));
  }

  if (nextBtn) {
    const onNext = () => scrollRows(1);
    nextBtn.addEventListener("click", onNext);
    cleanups.push(() => nextBtn.removeEventListener("click", onNext));
  }

  scrollWraps.forEach((wrap) => {
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      e.preventDefault();
      wrap.scrollBy({ left: e.deltaY, behavior: "auto" });
    };
    wrap.addEventListener("wheel", onWheel, { passive: false });
    cleanups.push(() => wrap.removeEventListener("wheel", onWheel));

    let dragging = false;
    let startX = 0;
    let startScroll = 0;

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      dragging = true;
      startX = e.clientX;
      startScroll = wrap.scrollLeft;
      wrap.classList.add("is-dragging");
      wrap.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      wrap.scrollLeft = startScroll - (e.clientX - startX);
    };

    const endDrag = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      wrap.classList.remove("is-dragging");
      wrap.releasePointerCapture(e.pointerId);
    };

    wrap.addEventListener("pointerdown", onPointerDown);
    wrap.addEventListener("pointermove", onPointerMove);
    wrap.addEventListener("pointerup", endDrag);
    wrap.addEventListener("pointercancel", endDrag);
    cleanups.push(() => {
      wrap.removeEventListener("pointerdown", onPointerDown);
      wrap.removeEventListener("pointermove", onPointerMove);
      wrap.removeEventListener("pointerup", endDrag);
      wrap.removeEventListener("pointercancel", endDrag);
    });
  });

  const logos = [...section.querySelectorAll<HTMLElement>(".astrek-partners__logo")];
  const clearLit = (except?: HTMLElement | null) => {
    logos.forEach((el) => {
      if (except && el === except) return;
      el.classList.remove("is-lit");
    });
  };

  const highlightNearest = (wrap: HTMLElement, clientX: number, clientY: number) => {
    const rowLogos = [...wrap.querySelectorAll<HTMLElement>(".astrek-partners__logo")];
    let best: HTMLElement | null = null;
    let bestDist = Number.POSITIVE_INFINITY;

    for (const el of rowLogos) {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dist = Math.hypot(clientX - cx, clientY - cy);
      if (dist < bestDist) {
        bestDist = dist;
        best = el;
      }
    }

    if (best && bestDist < 110) {
      clearLit(best);
      best.classList.add("is-lit");
      return;
    }

    clearLit();
  };

  scrollWraps.forEach((wrap) => {
    const onApproach = (e: MouseEvent) => highlightNearest(wrap, e.clientX, e.clientY);
    const onLeave = () => clearLit();

    wrap.addEventListener("mousemove", onApproach);
    wrap.addEventListener("mouseleave", onLeave);
    cleanups.push(() => {
      wrap.removeEventListener("mousemove", onApproach);
      wrap.removeEventListener("mouseleave", onLeave);
    });
  });

  logos.forEach((logo) => {
    const onFocus = () => {
      clearLit(logo);
      logo.classList.add("is-lit");
    };
    const onBlur = () => logo.classList.remove("is-lit");

    logo.addEventListener("focus", onFocus);
    logo.addEventListener("blur", onBlur);
    cleanups.push(() => {
      logo.removeEventListener("focus", onFocus);
      logo.removeEventListener("blur", onBlur);
    });
  });

  cleanups.push(() => {
    section.classList.remove("astrek-partners");
    delete section.dataset.astrekPartnersBuilt;
  });

  return () => cleanups.forEach((fn) => fn());
}

type SpotlightItem = {
  title: string;
  url: string;
  source: string;
  summary: string;
  image?: string;
};

type SpotlightFeed = {
  featured: SpotlightItem;
  items: SpotlightItem[];
};

const PRESS_SEARCH_URL =
  "https://news.google.com/search?q=%22Astrek+Innovations%22+OR+%22Unik+Exo%22&hl=en-IN&gl=IN&ceid=IN:en";
const PRESS_LINKEDIN_URL = "https://www.linkedin.com/company/astrekinnovations";

function applySpotlightFeed(section: HTMLElement, feed: SpotlightFeed): void {
  const featured = section.querySelector<HTMLAnchorElement>('[data-testid="press-featured"]');
  if (featured && feed.featured) {
    featured.href = feed.featured.url;
    const img = featured.querySelector("img");
    if (img && feed.featured.image) img.src = feed.featured.image;
    const title = featured.querySelector("h3");
    if (title) title.textContent = feed.featured.title;
    const summary = featured.querySelector("h3 + p");
    if (summary) summary.textContent = feed.featured.summary;
  }

  feed.items.forEach((item, index) => {
    const link = section.querySelector<HTMLAnchorElement>(`[data-testid="press-item-${index}"]`);
    if (!link) return;
    link.href = item.url;
    const heading = link.querySelector("h4");
    if (heading) heading.textContent = item.title;
    const source = link.querySelector("span");
    if (source) source.textContent = item.source;
  });
}

function ensurePressLiveLinks(section: HTMLElement, locale: Locale): void {
  const header = section.querySelector<HTMLElement>(".mb-14.flex");
  if (!header || header.querySelector("[data-astrek-press-live]")) return;

  const actions = document.createElement("div");
  actions.dataset.astrekPressLive = "true";
  actions.className = "flex flex-col items-start gap-2 md:items-end";
  actions.innerHTML = `
    <a class="font-mono text-xs uppercase tracking-[0.2em] text-brand" href="${PRESS_SEARCH_URL}" target="_blank" rel="noopener noreferrer">${tr(locale, "View latest coverage")}</a>
    <a class="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500" href="${PRESS_LINKEDIN_URL}" target="_blank" rel="noopener noreferrer">${tr(locale, "Company updates")}</a>
    <p class="max-w-xs text-xs leading-relaxed text-zinc-500 md:text-right">${tr(locale, "Updated automatically from public news sources.")}</p>
  `;
  header.appendChild(actions);
}

function initPressSection(root: HTMLElement, locale: Locale): () => void {
  const section = root.querySelector<HTMLElement>("#press, [data-testid='press-section']");
  if (!section) return () => {};

  ensurePressLiveLinks(section, locale);

  const controller = new AbortController();
  fetch("/api/press", { signal: controller.signal })
    .then((res) => (res.ok ? res.json() : null))
    .then((data: SpotlightFeed | null) => {
      if (!data?.featured || !Array.isArray(data.items)) return;
      applySpotlightFeed(section, data);
    })
    .catch(() => {});

  return () => controller.abort();
}

function initBlogSection(root: HTMLElement, locale: Locale): () => void {
  const section = root.querySelector<HTMLElement>("#blog, [data-testid='blog-section']");
  if (!section) return () => {};

  const header = section.querySelector<HTMLElement>(".mb-14.flex");
  if (header && !header.querySelector("[data-astrek-blog-all]")) {
    const all = document.createElement("a");
    all.dataset.astrekBlogAll = "true";
    all.href = localizeHref(locale, "/blog");
    all.className = "font-mono text-xs uppercase tracking-[0.2em] text-brand";
    all.textContent = tr(locale, "View all articles");
    header.appendChild(all);
  }

  const cleanups: Array<() => void> = [];
  section.querySelectorAll<HTMLElement>("[data-testid^='blog-card-']").forEach((card) => {
    const onClick = (e: Event) => {
      const slug = card.dataset.cmsSlug || (card.dataset.testid || "").replace("blog-card-", "");
      if (!slug) return;
      e.preventDefault();
      window.location.href = localizeHref(locale, `/blog/${slug}`);
    };
    card.addEventListener("click", onClick);
    card.style.cursor = "pointer";
    cleanups.push(() => card.removeEventListener("click", onClick));
  });

  return () => cleanups.forEach((fn) => fn());
}

/** Journey hero: scroll cue + partner hover stay state */
function initJourneyHero(root: HTMLElement): () => void {
  const hero = root.querySelector<HTMLElement>('[data-hero="journey"]');
  if (!hero) return () => {};

  const heroSrc = "/images/device/1589.jpg";
  hero.querySelectorAll<HTMLSourceElement>("source").forEach((source) => {
    source.srcset = heroSrc;
  });
  const heroImg = hero.querySelector<HTMLImageElement>("[data-testid='hero-journey-image']");
  if (heroImg) {
    heroImg.src = heroSrc;
    heroImg.srcset = "";
  }

  const onScrollClick = (e: Event) => {
    e.preventDefault();
    const next =
      root.querySelector<HTMLElement>("#company-about, [data-testid='company-about-section'], #about, [data-testid='chapters-section'], #product") ||
      document.getElementById("company-about") ||
      document.getElementById("about") ||
      document.getElementById("product");
    if (!next) return;
    const y = Math.max(0, next.getBoundingClientRect().top + window.pageYOffset - 88);
    try {
      window.scrollTo({ top: y, behavior: "smooth" });
    } catch {
      window.scrollTo(0, y);
    }
    // Hard fallback after animation window if something cancels smooth scroll
    window.setTimeout(() => {
      if (Math.abs(window.pageYOffset - y) > 40) {
        window.scrollTo(0, y);
      }
    }, 700);
  };

  const scrollBtn = hero.querySelector<HTMLElement>("[data-ajh-scroll]");
  scrollBtn?.addEventListener("click", onScrollClick);

  const partnerRoot =
    root.querySelector<HTMLElement>("[data-ajh-partners], [data-testid='hero-partners']") ?? hero;
  const partners = Array.from(partnerRoot.querySelectorAll<HTMLElement>(".ajh-partner"));

  const clearPartnerLights = (except?: HTMLElement | null) => {
    partners.forEach((el) => {
      if (except && el === except) return;
      el.classList.remove("is-lit");
    });
  };

  const lightPartner = (partner: HTMLElement) => {
    // Only one logo lit at a time: previous highlight disappears
    clearPartnerLights(partner);
    if (partner.classList.contains("is-lit")) return;
    void partner.offsetWidth;
    partner.classList.add("is-lit");
  };

  const onPartnerEnter = (e: Event) => {
    const partner = (e.currentTarget as HTMLElement | null) ?? null;
    if (!partner) return;
    lightPartner(partner);
  };

  const onPartnerLeave = (e: Event) => {
    const partner = (e.currentTarget as HTMLElement | null) ?? null;
    partner?.classList.remove("is-lit");
  };

  partners.forEach((el) => {
    el.addEventListener("mouseenter", onPartnerEnter);
    el.addEventListener("mouseleave", onPartnerLeave);
    el.addEventListener("focus", onPartnerEnter);
    el.addEventListener("blur", onPartnerLeave);
  });

  // Approach highlight: nearest logo only; others clear as pointer moves
  const onPartnerApproach = (e: MouseEvent) => {
    if (!partners.length) return;
    let best: HTMLElement | null = null;
    let bestDist = Number.POSITIVE_INFINITY;
    for (const el of partners) {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
      if (dist < bestDist) {
        bestDist = dist;
        best = el;
      }
    }
    if (best && bestDist < 120) {
      lightPartner(best);
    } else {
      clearPartnerLights();
    }
  };
  const onPartnerStripLeave = () => clearPartnerLights();
  partnerRoot.addEventListener("mousemove", onPartnerApproach);
  partnerRoot.addEventListener("mouseleave", onPartnerStripLeave);

  const syncPartners = () => {
    const rect = hero.getBoundingClientRect();
    // Hide the fixed partner strip once the hero leaves the viewport
    partnerRoot.classList.toggle("is-away", rect.bottom < 120);
  };
  syncPartners();
  window.addEventListener("scroll", syncPartners, { passive: true });
  window.addEventListener("resize", syncPartners);

  return () => {
    scrollBtn?.removeEventListener("click", onScrollClick);
    partners.forEach((el) => {
      el.removeEventListener("mouseenter", onPartnerEnter);
      el.removeEventListener("mouseleave", onPartnerLeave);
      el.removeEventListener("focus", onPartnerEnter);
      el.removeEventListener("blur", onPartnerLeave);
    });
    partnerRoot.removeEventListener("mousemove", onPartnerApproach);
    partnerRoot.removeEventListener("mouseleave", onPartnerStripLeave);
    window.removeEventListener("scroll", syncPartners);
    window.removeEventListener("resize", syncPartners);
  };
}

/** Shared header/footer chrome for homepage + inner pages */
function isPartnershipCta(link: HTMLAnchorElement): boolean {
  const href = link.getAttribute("href") || "";
  const text = (link.textContent || "").trim().replace(/\s*[↗→←]\s*$/, "");
  return (
    href.includes("partner-enquiry") ||
    href === "/partner" ||
    href.endsWith("/partner") ||
    /^(Partner With Us|Partner with us)$/i.test(text)
  );
}

function wirePartnershipCtas(root: HTMLElement, locale: Locale): void {
  const partnerHref = localizeHref(locale, "/partner");
  root.querySelectorAll<HTMLAnchorElement>("a[href]").forEach((link) => {
    if (!isPartnershipCta(link)) return;
    link.setAttribute("href", partnerHref);
    link.removeAttribute("data-astrek-partner-open");
  });

  if (window.location.hash === "#partner-enquiry") {
    window.location.replace(partnerHref);
  }
}

export function initMechChrome(root: HTMLElement, locale: Locale): () => void {
  document.body.classList.add("mech-mirror-active");
  document.documentElement.lang = locale;
  document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  document.body.classList.toggle("lang-ar", locale === "ar");
  document.body.classList.toggle("lang-ja", locale === "ja");

  const cleanups: Array<() => void> = [];

  localizeLinks(root, locale);
  initHeaderStructure(root);
  wirePartnershipCtas(root, locale);
  ensureSitemapFooterLink(root, locale);
  injectLanguageSwitcher(root, locale);
  translateNavLabels(root, locale);
  cleanups.push(initNavHoverHighlight(root));
  cleanups.push(initPremiumPolish(root));

  cleanups.push(initHeaderScroll(root));
  cleanups.push(initFooterHeaderFocus(root));
  cleanups.push(initSmoothAnchors(root));
  cleanups.push(initForms(root));
  cleanups.push(initMobileNav(root));
  cleanups.push(initCookieConsent());

  return () => {
    document.body.classList.remove("mech-mirror-active", "lang-ar", "lang-ja");
    cleanups.forEach((fn) => fn());
  };
}

/** Scroll reveals for legacy inner-page markup (.reveal, .reveal-stagger) */
export function initPageReveals(root: HTMLElement = document.documentElement): () => void {
  const revealEls = root.querySelectorAll<HTMLElement>(".reveal, .reveal-stagger");
  if (!revealEls.length) return () => {};

  const inView = (el: HTMLElement) => {
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight || 0;
    return r.top < vh * 1.2 && r.bottom > -vh * 0.15;
  };

  revealEls.forEach((el) => {
    if (inView(el)) el.classList.add("in");
  });

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -6% 0px" },
  );

  revealEls.forEach((el) => {
    if (!el.classList.contains("in")) io.observe(el);
  });

  return () => io.disconnect();
}

function localizeLinks(root: HTMLElement, locale: Locale) {
  root.querySelectorAll<HTMLAnchorElement>("a[href]").forEach((a) => {
    const href = a.getAttribute("href");
    if (!href || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) return;

    if (href.startsWith("#")) {
      a.setAttribute("href", localizeHref(locale, `/${href}`));
      return;
    }

    if (href.startsWith("/")) {
      a.setAttribute("href", localizeHref(locale, href));
    }
  });
}

/** Nav + language: highlight on approach, clear when moving to another / away */
function initNavHoverHighlight(root: HTMLElement): () => void {
  const header = root.querySelector<HTMLElement>("[data-testid='site-header']");
  if (!header) return () => {};

  const items = Array.from(
    header.querySelectorAll<HTMLElement>("nav.ajh-nav > a.ajh-nav-link, .ajh-lang button, .mech-lang-switcher button"),
  );

  const clearAll = (except?: HTMLElement | null) => {
    items.forEach((el) => {
      if (except && el === except) return;
      el.classList.remove("is-lit");
    });
  };

  const light = (el: HTMLElement) => {
    clearAll(el);
    if (!el.classList.contains("is-lit")) {
      void el.offsetWidth;
      el.classList.add("is-lit");
    }
  };

  const onEnter = (e: Event) => {
    const el = e.currentTarget as HTMLElement | null;
    if (el) light(el);
  };
  const onLeave = (e: Event) => {
    (e.currentTarget as HTMLElement | null)?.classList.remove("is-lit");
  };

  items.forEach((el) => {
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("focus", onEnter);
    el.addEventListener("blur", onLeave);
  });

  const onMove = (e: MouseEvent) => {
    if (!items.length) return;
    let best: HTMLElement | null = null;
    let bestDist = Number.POSITIVE_INFINITY;
    for (const el of items) {
      const r = el.getBoundingClientRect();
      const dist = Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2));
      if (dist < bestDist) {
        bestDist = dist;
        best = el;
      }
    }
    if (best && bestDist < 72) light(best);
    else clearAll();
  };

  const onHeaderLeave = () => clearAll();
  header.addEventListener("mousemove", onMove);
  header.addEventListener("mouseleave", onHeaderLeave);

  return () => {
    items.forEach((el) => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("focus", onEnter);
      el.removeEventListener("blur", onLeave);
    });
    header.removeEventListener("mousemove", onMove);
    header.removeEventListener("mouseleave", onHeaderLeave);
  };
}

function initHeaderStructure(root: HTMLElement): () => void {
  const header = root.querySelector<HTMLElement>("[data-testid='site-header']");
  const inner = header?.querySelector<HTMLElement>(":scope > div");
  const nav = root.querySelector<HTMLElement>("nav[aria-label='Primary']");
  if (!inner) return () => {};

  header?.setAttribute("data-ajh-nav", "true");
  inner.classList.add("mech-header-inner");

  const actions =
    inner.querySelector<HTMLElement>(".mech-header-actions") ??
    inner.querySelector<HTMLElement>(":scope > div.flex.items-center");
  actions?.classList.add("mech-header-actions");

  inner.querySelectorAll(".mech-burger").forEach((btn) => btn.remove());
  nav?.querySelectorAll(".mech-mobile-cta").forEach((link) => link.remove());

  const cta = header?.querySelector<HTMLAnchorElement>("[data-testid='nav-cta-contact']");
  if (nav && cta && !nav.querySelector(".mech-drawer-cta")) {
    const drawerCta = cta.cloneNode(true) as HTMLAnchorElement;
    drawerCta.classList.add("mech-drawer-cta");
    drawerCta.removeAttribute("data-testid");
    nav.appendChild(drawerCta);
  }
  // Colleague desktop nav has no CTA pill: keep clone for mobile drawer only
  cta?.setAttribute("hidden", "");
  cta?.setAttribute("aria-hidden", "true");

  nav?.classList.add("ajh-nav");
  nav?.setAttribute("id", "mech-mobile-nav");
  nav?.classList.remove("hidden", "lg:flex");

  return () => {};
}

function injectLanguageSwitcher(root: HTMLElement, locale: Locale) {
  const headerInner = root.querySelector<HTMLElement>("[data-testid='site-header'] > div");
  if (!headerInner) return;

  headerInner.querySelectorAll(".mech-lang-switcher, .ajh-lang").forEach((el) => el.remove());

  const switcher = document.createElement("div");
  switcher.className = "mech-lang-switcher ajh-lang items-center";
  switcher.setAttribute("role", "group");
  switcher.setAttribute("aria-label", tr(locale, "Language"));

  const labels: Record<"en" | "ar" | "ja", string> = {
    en: "EN",
    ar: "العربية",
    ja: "日本語",
  };

  (["en", "ar", "ja"] as const).forEach((code) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.dataset.lang = code;
    btn.textContent = labels[code];
    btn.className = code === locale ? "is-active" : "";
    btn.setAttribute("aria-pressed", code === locale ? "true" : "false");
    btn.addEventListener("click", () => {
      persistLocale(code);
      window.location.href = switchLocalePath(code, window.location.pathname, window.location.hash);
    });
    switcher.appendChild(btn);
  });

  const actions =
    headerInner.querySelector<HTMLElement>(".mech-header-actions") ??
    headerInner.querySelector<HTMLElement>(":scope > div.flex.items-center");
  const cta = actions?.querySelector<HTMLElement>("[data-testid='nav-cta-contact'], a.bg-brand");
  if (cta && actions) actions.insertBefore(switcher, cta);
  else actions?.appendChild(switcher);
}

/** On phones, tuck sticky header while footer is in view so brand isn’t doubled. */
function initFooterHeaderFocus(root: HTMLElement): () => void {
  const footer =
    root.querySelector<HTMLElement>("footer[data-testid='site-footer']") ??
    root.querySelector<HTMLElement>("footer");
  if (!footer || typeof IntersectionObserver === "undefined") return () => {};

  const mq = window.matchMedia("(max-width: 767px)");
  const sync = (inView: boolean) => {
    document.body.classList.toggle("mech-footer-focus", mq.matches && inView);
  };

  let visible = false;
  const io = new IntersectionObserver(
    (entries) => {
      visible = entries.some((e) => e.isIntersecting);
      sync(visible);
    },
    { root: null, threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
  );
  io.observe(footer);

  const onMq = () => sync(visible);
  mq.addEventListener?.("change", onMq);
  return () => {
    io.disconnect();
    mq.removeEventListener?.("change", onMq);
    document.body.classList.remove("mech-footer-focus");
  };
}

function ensureSitemapFooterLink(root: HTMLElement, locale: Locale): void {
  if (root.querySelector('[data-testid="footer-link-sitemap"]')) return;
  const footer = root.querySelector("footer");
  if (!footer) return;

  const careers = footer.querySelector<HTMLAnchorElement>('[data-testid="footer-link-careers"]');
  const list =
    careers?.closest("ul") ??
    footer.querySelector("ul") ??
    careers?.parentElement?.parentElement;
  if (!list) return;

  const item = document.createElement(careers?.parentElement?.tagName === "LI" ? "li" : "div");
  const link = document.createElement("a");
  link.href = localizeHref(locale, "/sitemap");
  link.dataset.testid = "footer-link-sitemap";
  link.className =
    careers?.className ||
    "text-sm text-zinc-400 transition-colors duration-300 hover:text-brand";
  link.textContent = tr(locale, "Site Map");
  item.appendChild(link);

  if (careers?.parentElement?.tagName === "LI") {
    careers.parentElement.after(item);
    return;
  }
  list.appendChild(item);
}

function translateNavLabels(root: HTMLElement, locale: Locale) {
  if (locale === "en") return;

  const navMap: Record<string, string> = {
    Home: tr(locale, "Home"),
    About: tr(locale, "About"),
    "Unik Exo": tr(locale, "Unik Exo"),
    Solutions: tr(locale, "Solutions"),
    Research: tr(locale, "Research"),
    "Research / Technology": tr(locale, "Research / Technology"),
    Company: tr(locale, "Company"),
    Partners: tr(locale, "Partners"),
    Media: tr(locale, "Media"),
    Contact: tr(locale, "Contact"),
    Technology: tr(locale, "Technology"),
    Product: tr(locale, "Product"),
    Modes: tr(locale, "Modes"),
    Stories: tr(locale, "Stories"),
    Team: tr(locale, "Team"),
    Journal: tr(locale, "Journal"),
    Blog: tr(locale, "Blog"),
    "Talk to our team": tr(locale, "Talk to our team"),
    "Explore Unik Exo": tr(locale, "Explore Unik Exo"),
    "Partner With Us": tr(locale, "Partner With Us"),
    "Site Map": tr(locale, "Site Map"),
  };

  root.querySelectorAll<HTMLElement>("[data-testid='site-header'] nav a, [data-testid='site-header'] a.ajh-nav-cta, [data-testid='site-header'] a.bg-brand").forEach((el) => {
    const text = (el.textContent || "").trim();
    if (navMap[text]) el.textContent = navMap[text];
  });

  root.querySelectorAll<HTMLElement>("footer a, footer h4, footer p.font-mono").forEach((el) => {
    const text = (el.textContent || "").trim();
    const translated = tryTranslate(locale, text);
    if (translated) el.textContent = translated;
  });
}

/** Walk visible text nodes and apply built-in translations (Arabic / Japanese). */
export function initPageTranslation(root: HTMLElement, locale: Locale): () => void {
  if (locale === "en") return () => {};

  const SKIP = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "TEXTAREA", "CODE", "PRE"]);

  const translateTextNodes = () => {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes: Text[] = [];
    let current: Node | null;
    while ((current = walker.nextNode())) {
      const parent = current.parentElement;
      if (!parent || SKIP.has(parent.tagName)) continue;
      if (parent.closest(".mech-lang-switcher")) continue;
      if (!current.nodeValue?.trim()) continue;
      nodes.push(current as Text);
    }

    for (const node of nodes) {
      const raw = node.nodeValue ?? "";
      const trimmed = raw.trim();
      const hit = tryTranslate(locale, trimmed);
      if (!hit) continue;
      const lead = raw.match(/^\s*/)?.[0] ?? "";
      const trail = raw.match(/\s*$/)?.[0] ?? "";
      node.nodeValue = `${lead}${hit}${trail}`;
    }
  };

  const translateAttrs = () => {
    root.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("input[placeholder], textarea[placeholder]").forEach((el) => {
      const key = el.getAttribute("placeholder") || "";
      const hit = tryTranslate(locale, key);
      if (hit) el.setAttribute("placeholder", hit);
    });

    root.querySelectorAll<HTMLElement>("[aria-label]").forEach((el) => {
      if (el.closest(".mech-lang-switcher")) return;
      const key = el.getAttribute("aria-label") || "";
      const hit = tryTranslate(locale, key);
      if (hit) el.setAttribute("aria-label", hit);
    });

    root.querySelectorAll<HTMLOptionElement>("option").forEach((el) => {
      const key = (el.textContent || "").trim();
      const hit = tryTranslate(locale, key);
      if (hit) el.textContent = hit;
    });

    root.querySelectorAll<HTMLElement>("[data-title]").forEach((el) => {
      const key = el.getAttribute("data-title") || "";
      const hit = tryTranslate(locale, key);
      if (hit) el.setAttribute("data-title", hit);
    });

    root.querySelectorAll<HTMLElement>("[data-body]").forEach((el) => {
      const key = el.getAttribute("data-body") || "";
      const hit = tryTranslate(locale, key);
      if (hit) el.setAttribute("data-body", hit);
    });
  };

  translateTextNodes();
  translateAttrs();

  return () => {};
}

function initHeaderScroll(root: HTMLElement): () => void {
  const header = root.querySelector<HTMLElement>("[data-testid='site-header'], header");
  if (!header) return () => {};

  const onScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  return () => window.removeEventListener("scroll", onScroll);
}

function initPremiumPolish(root: HTMLElement): () => void {
  root.classList.add("mech-premium");

  root.querySelectorAll<HTMLAnchorElement>('a[data-testid^="partner-"]').forEach((link) => {
    link.classList.add("mech-partner-cell");
  });

  root.querySelectorAll<HTMLElement>("#faq button h3").forEach((heading) => {
    const text = heading.textContent || "";
    heading.textContent = text.replace(/^(\d{2})(?=[A-Za-z])/, "$1 ");
  });

  return () => root.classList.remove("mech-premium");
}

function initSmoothAnchors(root: HTMLElement): () => void {
  const handler = (e: Event) => {
    const target = e.target as HTMLElement | null;
    const link = target?.closest<HTMLAnchorElement>("a[href*='#']");
    if (!link) return;

    const url = new URL(link.href, window.location.origin);
    if (url.pathname !== window.location.pathname) return;

    const id = url.hash.slice(1);
    const el = document.getElementById(id);
    if (!el) return;

    e.preventDefault();
    const top = el.getBoundingClientRect().top + window.scrollY - 88;
    window.scrollTo({ top, behavior: "smooth" });
    history.pushState(null, "", url.hash ? `${url.pathname}${url.hash}` : url.pathname);
  };

  root.addEventListener("click", handler);
  return () => root.removeEventListener("click", handler);
}

function initScrollReveal(root: HTMLElement): () => void {
  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  root
    .querySelectorAll<HTMLElement>("section:not([data-mech-stats]):not([data-hero='journey']), .studio-panel")
    .forEach((el, i) => {
      el.classList.add("mech-reveal");
      if (reduceMotion) {
        el.classList.add("mech-reveal--in");
        return;
      }
      el.style.setProperty("--mech-reveal-delay", `${Math.min(i * 28, 180)}ms`);
    });

  if (reduceMotion) return () => {};

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("mech-reveal--in");
        io.unobserve(entry.target);
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -6% 0px" },
  );

  root.querySelectorAll(".mech-reveal").forEach((el) => io.observe(el));
  return () => io.disconnect();
}

function ensureStatValueNode(numEl: HTMLElement): HTMLElement {
  let valueNode = numEl.querySelector<HTMLElement>("[data-mech-stat-value]");
  if (valueNode) return valueNode;

  const brandSpan = numEl.querySelector("span.text-brand, span[class*='text-brand']");
  const textNode = [...numEl.childNodes].find((n) => n.nodeType === Node.TEXT_NODE);
  const initial = (textNode?.textContent || numEl.textContent || "0").replace(/\D/g, "") || "0";
  if (textNode) numEl.removeChild(textNode);

  valueNode = document.createElement("span");
  valueNode.dataset.mechStatValue = "";
  valueNode.textContent = initial;

  if (brandSpan) numEl.insertBefore(valueNode, brandSpan);
  else numEl.appendChild(valueNode);

  return valueNode;
}

function setStatValue(el: HTMLElement, value: number) {
  const numEl = el.querySelector<HTMLElement>("p.font-display") || el;
  const valueNode = ensureStatValueNode(numEl);
  valueNode.textContent = String(value);
}

function isStatInView(el: HTMLElement): boolean {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight || document.documentElement.clientHeight;
  return rect.top < vh * 0.92 && rect.bottom > vh * 0.08;
}

function initStatsCounter(root: HTMLElement): () => void {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const firstStat = root.querySelector<HTMLElement>("[data-testid^='stat-']");
  firstStat?.closest("section")?.setAttribute("data-mech-stats", "");

  const statEls = [...root.querySelectorAll<HTMLElement>("[data-testid^='stat-']")];

  const animate = (el: HTMLElement, end: number) => {
    const numEl = el.querySelector<HTMLElement>("p.font-display") || el;
    const valueNode = ensureStatValueNode(numEl);
    el.dataset.mechStatDone = "true";

    setStatValue(el, 0);

    const duration = 1600;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - 2 ** (-10 * progress);
      valueNode.textContent = String(Math.round(eased * end));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const runStat = (el: HTMLElement) => {
    if (el.dataset.mechStatDone === "true") return;
    const cfg = STAT_TARGETS[el.dataset.testid || ""];
    if (!cfg) return;

    if (reduce) {
      setStatValue(el, cfg.value);
      el.dataset.mechStatDone = "true";
      return;
    }

    animate(el, cfg.value);
  };

  /* Progressive enhancement: final values in HTML + for off-screen stats;
     count-up animation only when the section enters the viewport. */
  statEls.forEach((el) => {
    const cfg = STAT_TARGETS[el.dataset.testid || ""];
    if (!cfg) return;

    if (reduce || !isStatInView(el)) {
      setStatValue(el, cfg.value);
      el.dataset.mechStatDone = "true";
    }
  });

  const runVisibleStats = () => {
    statEls.forEach((el) => {
      if (el.dataset.mechStatDone === "true") return;
      if (isStatInView(el)) runStat(el);
    });
  };

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        runStat(entry.target as HTMLElement);
        io.unobserve(entry.target);
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -4% 0px" },
  );

  statEls.forEach((el) => {
    if (el.dataset.mechStatDone !== "true") io.observe(el);
  });

  runVisibleStats();
  requestAnimationFrame(runVisibleStats);
  window.addEventListener("load", runVisibleStats, { once: true });

  return () => io.disconnect();
}

const FAQ_ITEMS: Array<{ q: string; a: string }> = [
  {
    q: "What is Unik Exo?",
    a: "Unik Exo is Astrek Innovations’ wearable robotic exoskeleton for clinically structured lower-limb gait training. It supports sit, stand, walk and exercise under therapist control.",
  },
  {
    q: "Who are the intended users?",
    a: "Unik Exo is intended for people with lower-limb mobility impairment in a clinical setting, including stroke rehabilitation and structured gait therapy, always under clinician supervision.",
  },
  {
    q: "Which rehabilitation applications does it support?",
    a: "It is used for gait training, sit-to-stand practice, walking sessions and exercise protocols. Therapists set the mode and assistance level for each patient and session.",
  },
  {
    q: "Can hospitals and rehabilitation centers use Unik Exo?",
    a: "Yes. Unik Exo is built for clinic floors: therapist-controlled operation, clinic-ready portability, and session workflows a rehabilitation team can run without an engineer in the room.",
  },
  {
    q: "How can we arrange a product demonstration?",
    a: "Contact the Astrek team through the enquiry form or email info@astrekinnovations.com. We can schedule a supervised demonstration for clinicians, hospitals and rehabilitation centres.",
  },
  {
    q: "How do partnerships with Astrek work?",
    a: "We work with hospitals, rehabilitation centres, research groups, distributors and innovation partners. Use Partner With Us to open the dedicated partnership form.",
  },
  {
    q: "Are patient trials available?",
    a: "Structured clinical pilots and supervised patient sessions are arranged with partner centres. Reach out to discuss eligibility, clinical protocol and onboarding.",
  },
  {
    q: "How do I contact Astrek or send an enquiry?",
    a: "Use the contact form on this website, email info@astrekinnovations.com, or call +971 50 353 1304. Partnership enquiries should use the Partner With Us form.",
  },
  {
    q: "How does Unik Exo ensure safety?",
    a: "Safety is built in: emergency stop, motor-locked safety modes, mechanical hard limits, and step-wise therapist control throughout every session.",
  },
  {
    q: "What modes does Unik Exo support?",
    a: "Sit, Stand, Walk and Exercise, so therapists can take a patient through each stage of mobility training with one system.",
  },
];

function initFaq(root: HTMLElement, locale: Locale = "en"): () => void {
  const section = root.querySelector<HTMLElement>("#faq, [data-testid='faq-section']");
  if (!section) return () => {};

  section.id = "faq";
  section.dataset.testid = "faq-section";
  section.className = "astrek-faq";

  const items = FAQ_ITEMS.map((item, index) => {
    const num = String(index + 1).padStart(2, "0");
    const q = tr(locale, item.q);
    const a = tr(locale, item.a);
    return `
      <div class="astrek-faq__item${index === 0 ? " is-open" : ""}">
        <button type="button" class="astrek-faq__trigger" aria-expanded="${index === 0 ? "true" : "false"}" data-testid="faq-trigger-${index}">
          <span class="astrek-faq__num">${num}</span>
          <span class="astrek-faq__question">${q}</span>
          <span class="astrek-faq__icon" aria-hidden="true">${index === 0 ? "↑" : "↓"}</span>
        </button>
        <div class="astrek-faq__answer" data-testid="faq-content-${index}" ${index === 0 ? "" : "hidden"}>
          <p>${a}</p>
        </div>
      </div>`;
  }).join("");

  section.innerHTML = `
    <div class="astrek-faq__inner">
      <div class="astrek-faq__intro">
        <p class="astrek-faq__eyebrow">${tr(locale, "FAQ")}</p>
        <h2 class="astrek-faq__title">${tr(locale, "Frequently asked questions")}</h2>
        <p class="astrek-faq__lead">${tr(locale, "Answers about Unik Exo, intended users, rehabilitation use, hospitals, demonstrations, partnerships, patient trials and how to enquire.")}</p>
      </div>
      <div class="astrek-faq__list">${items}</div>
    </div>
  `;

  const cleanups: Array<() => void> = [];
  const rows = [...section.querySelectorAll<HTMLElement>(".astrek-faq__item")];

  const setOpen = (openRow: HTMLElement | null) => {
    rows.forEach((row) => {
      const open = row === openRow;
      const btn = row.querySelector<HTMLButtonElement>(".astrek-faq__trigger");
      const panel = row.querySelector<HTMLElement>(".astrek-faq__answer");
      const icon = row.querySelector<HTMLElement>(".astrek-faq__icon");
      row.classList.toggle("is-open", open);
      btn?.setAttribute("aria-expanded", open ? "true" : "false");
      if (panel) panel.hidden = !open;
      if (icon) icon.textContent = open ? "↑" : "↓";
    });
  };

  rows.forEach((row) => {
    const btn = row.querySelector<HTMLButtonElement>(".astrek-faq__trigger");
    if (!btn) return;
    const handler = () => setOpen(row.classList.contains("is-open") ? null : row);
    btn.addEventListener("click", handler);
    cleanups.push(() => btn.removeEventListener("click", handler));
  });

  return () => {
    section.classList.remove("astrek-faq");
    cleanups.forEach((fn) => fn());
  };
}

function initSpecs(root: HTMLElement): () => void {
  const cleanups: Array<() => void> = [];
  const specsSection = root.querySelector<HTMLElement>("#specs, [data-testid='specs-section']");
  const specBtns = specsSection?.querySelectorAll<HTMLButtonElement>("[data-testid^='spec-item-']") ?? [];
  const specStage = specsSection?.querySelector<HTMLElement>("[data-testid='specs-stage']");
  const specStageImg = specStage?.querySelector<HTMLImageElement>("img") ??
    specsSection?.querySelector<HTMLImageElement>(".studio-panel img");

  const specAssets = SPECS_IMAGE_ASSETS.map((asset) => ({ title: asset.title, src: asset.src }));
  specAssetsLive = specAssets;

  if (!specBtns.length || !specStageImg) return () => {};

  let activeIndex = -1;

  const pulseStage = () => {
    if (!specStage) return;
    specStage.classList.remove("astrek-specs-stage-active");
    void specStage.offsetWidth;
    specStage.classList.add("astrek-specs-stage-active");
  };

  const activateSpec = (index: number) => {
    const asset = specAssets[index];
    if (!asset) return;

    const shouldAnimate = activeIndex !== -1 && activeIndex !== index;
    activeIndex = index;
    specActiveIndex = index;

    specBtns.forEach((btn, i) => {
      const active = i === index;
      btn.classList.toggle("bg-white/[0.02]", active);
      const idx = btn.querySelector("span.font-mono");
      const title = btn.querySelector("h3");
      const dot = btn.querySelector<HTMLElement>(".astrek-spec-dot, span.rounded-full");
      const panel = btn.querySelector<HTMLElement>(".overflow-hidden");

      idx?.classList.toggle("text-brand", active);
      idx?.classList.toggle("text-zinc-600", !active);
      title?.classList.toggle("text-white", active);
      title?.classList.toggle("text-zinc-500", !active);
      dot?.classList.toggle("astrek-dot--active", active);
      dot?.classList.toggle("bg-brand", active);
      dot?.classList.toggle("bg-zinc-800", !active);
      if (panel) panel.style.height = active ? "auto" : "0px";
    });

    specStageImg.src = asset.src;
    const label = specsSection?.querySelector<HTMLElement>("[data-testid='specs-stage'] .font-mono.text-white\\/80");
    if (label) {
      label.innerHTML = `<span data-ve-dynamic="true" style="display: contents;">${String(index + 1).padStart(2, "0")}</span> / <span data-ve-dynamic="true" style="display: contents;">${asset.title}</span>`;
    }

    if (shouldAnimate) pulseStage();
  };

  specBtns.forEach((btn, index) => {
    const handler = () => activateSpec(index);
    btn.addEventListener("click", handler);
    cleanups.push(() => btn.removeEventListener("click", handler));
  });

  activateSpec(0);
  return () => cleanups.forEach((fn) => fn());
}

function initProductSection(root: HTMLElement): () => void {
  const cleanups: Array<() => void> = [];
  const section = root.querySelector<HTMLElement>('[data-testid="product-section"]');
  if (!section) return () => {};

  const h2 = section.querySelector<HTMLElement>("h2");
  if (h2 && /introducing/i.test(h2.textContent || "")) {
    h2.textContent = "Introducing Unik Exo";
    h2.classList.add("astrek-product-heading");
  }

  const stageImg = section.querySelector<HTMLImageElement>("[data-testid='product-stage'] img");
  if (stageImg) {
    stageImg.src = "/images/device/1674.jpg";
    stageImg.loading = "eager";
    stageImg.decoding = "sync";
    stageImg.classList.add("astrek-product-stage-img");
    stageImg.onerror = () => {
      if (!stageImg.src.includes("1662.jpg")) {
        stageImg.src = "/images/device/1662.jpg";
      }
    };
  }

  const callouts = section.querySelectorAll<HTMLElement>("[data-testid^='product-callout-']");
  if (callouts.length) {
    callouts[0].classList.add("astrek-callout-active");
    callouts.forEach((callout) => {
      const handler = () => {
        callouts.forEach((c) => c.classList.remove("astrek-callout-active"));
        callout.classList.add("astrek-callout-active");
      };
      callout.addEventListener("mouseenter", handler);
      cleanups.push(() => callout.removeEventListener("mouseenter", handler));
    });
  }

  return () => cleanups.forEach((fn) => fn());
}

function initModesSection(root: HTMLElement): () => void {
  const cleanups: Array<() => void> = [];
  const section = root.querySelector<HTMLElement>("[data-testid='modes-section']");
  if (!section) return () => {};

  const cards = section.querySelectorAll<HTMLElement>("[data-testid^='mode-card-']");
  cards.forEach((card) => {
    const img = card.querySelector<HTMLImageElement>("img");
    if (img) {
      img.loading = "eager";
      img.decoding = "sync";
      img.classList.add("astrek-mode-card-img");
    }

    const handler = () => {
      cards.forEach((c) => c.classList.remove("astrek-mode-card-active"));
      card.classList.add("astrek-mode-card-active");
    };
    card.addEventListener("mouseenter", handler);
    cleanups.push(() => card.removeEventListener("mouseenter", handler));
  });

  const leaveHandler = () => {
    cards.forEach((c) => c.classList.remove("astrek-mode-card-active"));
  };
  section.addEventListener("mouseleave", leaveHandler);
  cleanups.push(() => section.removeEventListener("mouseleave", leaveHandler));

  return () => cleanups.forEach((fn) => fn());
}

function initTestimonials(root: HTMLElement, locale: Locale = "en"): () => void {
  const cleanups: Array<() => void> = [];
  const section = root.querySelector<HTMLElement>("#testimonials, [data-testid='testimonials-section']");
  if (!section) return () => {};

  const quoteEl = section.querySelector<HTMLElement>("blockquote, [data-testid='testimonial-quote'], p.text-xl, p.text-2xl");
  const nameEl = section.querySelector<HTMLElement>("[data-testid='testimonial-name'], h3, h4");
  const roleEl = section.querySelector<HTMLElement>("[data-testid='testimonial-role'], .text-zinc-500");
  const prev = section.querySelector<HTMLButtonElement>("[data-testid='testimonial-prev']");
  const next = section.querySelector<HTMLButtonElement>("[data-testid='testimonial-next']");
  const dots = section.querySelectorAll<HTMLButtonElement>("[data-testid^='testimonial-dot-'], button[aria-label^='Go to story']");

  let index = 0;

  const render = () => {
    const story = TESTIMONIALS[index];
    if (!story) return;
    if (quoteEl) quoteEl.textContent = `"${tr(locale, story.quote)}"`;
    if (nameEl) nameEl.textContent = tr(locale, story.name);
    if (roleEl) roleEl.textContent = tr(locale, story.role);
    dots.forEach((dot, i) => {
      const active = i === index;
      dot.classList.toggle("astrek-carousel-dot--active", active);
      dot.classList.toggle("bg-brand", active);
      dot.classList.toggle("bg-zinc-700", !active);
      dot.setAttribute("aria-current", active ? "true" : "false");
    });
  };

  const go = (delta: number) => {
    index = (index + delta + TESTIMONIALS.length) % TESTIMONIALS.length;
    render();
  };

  if (prev) {
    const onPrev = () => go(-1);
    prev.addEventListener("click", onPrev);
    cleanups.push(() => prev.removeEventListener("click", onPrev));
  }
  if (next) {
    const onNext = () => go(1);
    next.addEventListener("click", onNext);
    cleanups.push(() => next.removeEventListener("click", onNext));
  }
  dots.forEach((dot, i) => {
    const handler = () => { index = i; render(); };
    dot.addEventListener("click", handler);
    cleanups.push(() => dot.removeEventListener("click", handler));
  });

  render();
  return () => cleanups.forEach((fn) => fn());
}

function initForms(root: HTMLElement): () => void {
  const cleanups: Array<() => void> = [];

  const enquiryForm =
    root.querySelector<HTMLFormElement>("#contactForm") ??
    root.querySelector<HTMLFormElement>("[data-testid='contact-section'] form") ??
    [...root.querySelectorAll<HTMLFormElement>("form")].find((f) =>
      f.querySelector("[data-testid='enquiry-submit-button']"),
    );
  if (enquiryForm) {
    enquiryForm.id = "contactForm";
    const handler = async (e: Event) => {
      e.preventDefault();
      const entry = {
        name:
          enquiryForm.querySelector<HTMLInputElement>("[data-testid='enquiry-name-input'], input[name='name']")?.value.trim() ||
          "",
        email:
          enquiryForm.querySelector<HTMLInputElement>("[data-testid='enquiry-email-input'], input[type='email']")?.value.trim() ||
          "",
        organisation:
          enquiryForm.querySelector<HTMLInputElement>("[data-testid='enquiry-org-input']")?.value.trim() || "",
        subject:
          enquiryForm.querySelector<HTMLSelectElement>("[data-testid='enquiry-subject-input'], select")?.value || "",
        message:
          enquiryForm.querySelector<HTMLTextAreaElement>("[data-testid='enquiry-message-input'], textarea")?.value.trim() ||
          "",
      };

      if (!entry.name || !entry.email || !entry.message) return;

      let status = enquiryForm.querySelector<HTMLElement>(".mech-form-status");
      if (!status) {
        status = document.createElement("p");
        status.className = "mech-form-status mt-3 text-sm text-brand";
        enquiryForm.appendChild(status);
      }

      status.textContent = "Sending…";

      try {
        await submitEnquiry(entry);
        status.textContent = "Thank you. Your message has been received. We'll be in touch shortly.";
        enquiryForm.reset();
      } catch {
        status.textContent = "Something went wrong. Please email info@astrekinnovations.com directly.";
      }
    };
    enquiryForm.addEventListener("submit", handler);
    cleanups.push(() => enquiryForm.removeEventListener("submit", handler));
  }

  const newsletterForm =
    root.querySelector<HTMLFormElement>("#newsletterForm") ??
    [...root.querySelectorAll<HTMLFormElement>("form")].find(
      (f) =>
        f !== enquiryForm &&
        f.id !== "partnerEnquiryForm" &&
        f.dataset.testid !== "partner-enquiry-form" &&
        !f.closest("#partner-enquiry, [data-testid='partnership-section']") &&
        f.querySelector("input[type='email'], input[placeholder*='email']"),
    );
  if (newsletterForm && newsletterForm !== enquiryForm) {
    newsletterForm.id = "newsletterForm";
    const handler = async (e: Event) => {
      e.preventDefault();
      const email = newsletterForm.querySelector<HTMLInputElement>("input[type='email'], input")?.value.trim();
      if (!email) return;

      let status = newsletterForm.querySelector<HTMLElement>(".mech-form-status");
      if (!status) {
        status = document.createElement("p");
        status.className = "mech-form-status mt-3 text-sm text-brand";
        newsletterForm.appendChild(status);
      }

      status.textContent = "Sending…";

      try {
        await submitNewsletter({ email });
        status.textContent = "Thank you. You're on the list.";
        newsletterForm.reset();
      } catch {
        status.textContent = "Something went wrong. Please try again later.";
      }
    };
    newsletterForm.addEventListener("submit", handler);
    cleanups.push(() => newsletterForm.removeEventListener("submit", handler));
  }

  return () => cleanups.forEach((fn) => fn());
}

function initMobileNav(root: HTMLElement): () => void {
  const header = root.querySelector<HTMLElement>("[data-testid='site-header']");
  const nav = root.querySelector<HTMLElement>("nav[aria-label='Primary']");
  const burger = header?.querySelector<HTMLButtonElement>("[data-testid='nav-menu-toggle']");
  if (!header || !nav || !burger) return () => {};

  nav.id = "mech-mobile-nav";
  nav.classList.remove("hidden", "lg:flex");
  burger.setAttribute("aria-controls", "mech-mobile-drawer");
  burger.type = "button";

  /* Dedicated drawer on body: avoids Tailwind hidden / nav display conflicts */
  let drawer = document.body.querySelector<HTMLElement>("#mech-mobile-drawer");
  if (!drawer) {
    drawer = document.createElement("nav");
    drawer.id = "mech-mobile-drawer";
    drawer.className = "mech-mobile-drawer";
    drawer.setAttribute("aria-label", "Mobile navigation");
    drawer.setAttribute("aria-hidden", "true");

    const panel = document.createElement("div");
    panel.className = "mech-mobile-drawer__panel";

    nav.querySelectorAll<HTMLAnchorElement>("a.ajh-nav-link, a[data-testid^='nav-link-']").forEach((link) => {
      const item = link.cloneNode(true) as HTMLAnchorElement;
      item.classList.add("mech-mobile-drawer__link");
      item.removeAttribute("data-testid");
      panel.appendChild(item);
    });

    header.querySelectorAll<HTMLAnchorElement>(".ajh-nav-cta").forEach((link) => {
      const item = link.cloneNode(true) as HTMLAnchorElement;
      item.classList.add("mech-mobile-drawer__cta");
      if (link.classList.contains("ajh-nav-cta--ghost")) {
        item.classList.add("mech-mobile-drawer__cta--ghost");
      }
      item.classList.remove("ajh-nav-cta", "ajh-nav-cta--primary", "ajh-nav-cta--ghost");
      panel.appendChild(item);
    });

    if (!panel.querySelector(".mech-mobile-drawer__cta")) {
      const drawerCta = nav.querySelector<HTMLAnchorElement>(".mech-drawer-cta");
      if (drawerCta) {
        const cta = drawerCta.cloneNode(true) as HTMLAnchorElement;
        cta.classList.add("mech-mobile-drawer__cta");
        panel.appendChild(cta);
      }
    }

    drawer.appendChild(panel);
    document.body.appendChild(drawer);
  }

  let backdrop = document.body.querySelector<HTMLElement>(".mech-nav-backdrop");
  if (!backdrop) {
    backdrop = document.createElement("button");
    backdrop.type = "button";
    backdrop.className = "mech-nav-backdrop";
    backdrop.setAttribute("aria-label", "Close menu");
    backdrop.tabIndex = -1;
    document.body.appendChild(backdrop);
  }

  const cleanups: Array<() => void> = [];
  let isOpen = false;

  const setOpen = (open: boolean) => {
    isOpen = open;
    header.classList.toggle("mech-nav-open", open);
    document.body.classList.toggle("mech-nav-open", open);
    drawer?.classList.toggle("is-open", open);
    backdrop?.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.classList.toggle("mech-nav-locked", open);
    drawer?.setAttribute("aria-hidden", open ? "false" : "true");
  };

  setOpen(false);

  const toggle = () => setOpen(!isOpen);

  const onBurger = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    toggle();
  };

  burger.addEventListener("click", onBurger);
  cleanups.push(() => burger.removeEventListener("click", onBurger));

  const onBackdrop = (e: Event) => {
    e.preventDefault();
    setOpen(false);
  };
  backdrop.addEventListener("click", onBackdrop);
  cleanups.push(() => backdrop.removeEventListener("click", onBackdrop));

  const onDrawerOutside = (e: Event) => {
    const panel = drawer?.querySelector(".mech-mobile-drawer__panel");
    const target = e.target as Node | null;
    if (!panel || !target) return;
    if (!panel.contains(target)) {
      e.preventDefault();
      setOpen(false);
    }
  };
  drawer?.addEventListener("click", onDrawerOutside);
  cleanups.push(() => drawer?.removeEventListener("click", onDrawerOutside));

  drawer?.querySelectorAll("a").forEach((a) => {
    const close = () => setOpen(false);
    a.addEventListener("click", close);
    cleanups.push(() => a.removeEventListener("click", close));
  });

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") setOpen(false);
  };
  window.addEventListener("keydown", onKey);
  cleanups.push(() => window.removeEventListener("keydown", onKey));

  const syncHeaderNavVisibility = () => {
    const mobile = window.innerWidth < 1024;
    if (mobile) {
      nav.setAttribute("hidden", "");
      nav.setAttribute("aria-hidden", "true");
      nav.style.setProperty("display", "none", "important");
      nav.style.setProperty("visibility", "hidden", "important");
      nav.style.setProperty("pointer-events", "none", "important");
    } else {
      nav.removeAttribute("hidden");
      nav.removeAttribute("aria-hidden");
      nav.style.removeProperty("display");
      nav.style.removeProperty("visibility");
      nav.style.removeProperty("pointer-events");
    }
  };

  const onResize = () => {
    if (window.innerWidth >= 1024) setOpen(false);
    syncHeaderNavVisibility();
  };

  syncHeaderNavVisibility();
  window.addEventListener("resize", onResize);
  cleanups.push(() => window.removeEventListener("resize", onResize));

  return () => {
    cleanups.forEach((fn) => fn());
    document.body.classList.remove("mech-nav-locked", "mech-nav-open");
    header.classList.remove("mech-nav-open");
    nav.removeAttribute("hidden");
    nav.removeAttribute("aria-hidden");
    nav.style.removeProperty("display");
    nav.style.removeProperty("visibility");
    nav.style.removeProperty("pointer-events");
    drawer?.remove();
    backdrop?.remove();
  };
}
