/**
 * Professional motion layer: section-aware scroll animation.
 * Never hides a whole section (avoids the “black void” failure).
 * Photographs and logos are not swapped; images only receive transform.
 */
import { CAROUSEL_DOT_SVG } from "./lucide-icons";

export function initAstrekPro(): () => void {
  const ac = new AbortController();
  const { signal } = ac;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const root = document.documentElement;
  const site =
    document.getElementById("astrek-site") || document.querySelector("#astrek-site");

  if (!site) {
    return () => ac.abort();
  }

  const uniqueSections = [
    ...new Set(
      Array.from(
        site.querySelectorAll<HTMLElement>(
          ":scope > section, :scope > .rf-cta-band, :scope > footer.rf-footer, :scope > .rf-footer",
        ),
      ),
    ),
  ];

  const markIn = (el: Element) => {
    el.classList.add("pro-in", "sec-in", "in");
  };

  /** Keep polish.css `.reveal:not(.in)` from leaving section content invisible. */
  const markRevealIn = (root: Element) => {
    if (root.matches(".reveal, .premium-reveal, .reveal-stagger")) {
      root.classList.add("in");
    }
    root.querySelectorAll(".reveal, .premium-reveal").forEach((el) => el.classList.add("in"));
    root.querySelectorAll(".reveal-stagger").forEach((el) => {
      el.classList.add("in");
      el.querySelectorAll(":scope > *").forEach((child) => child.classList.add("in"));
    });
  };

  if (reduce) {
    uniqueSections.forEach(markIn);
    root.classList.add("pro-reduced");
    return () => ac.abort();
  }

  const tagChildren = (section: HTMLElement) => {
    const id = section.id || "";

    const add = (nodes: NodeListOf<Element> | Element[], variant?: string) => {
      nodes.forEach((node) => {
        const el = node as HTMLElement;
        if (el.closest(".hero, .page-hero, .rf-product-hero")) return;
        if (el.classList.contains("pro-anim")) return;
        el.classList.add("pro-anim");
        if (variant) el.classList.add(variant);
      });
    };

    add(section.querySelectorAll(".rf-section-head, .page-hero .wrap > *, .elvin-head-row"));
    add(section.querySelectorAll(".ux-feature-row, .ux-feature-row--reverse"));
    add(section.querySelectorAll(".ux-feature-media"), "pro-anim--clip");
    add(section.querySelectorAll(".ux-feature-copy"), "pro-anim--right");
    add(section.querySelectorAll(".ux-feature-row--reverse .ux-feature-copy"), "pro-anim--left");
    add(section.querySelectorAll(".rf-product-intro, .rf-product-hero-copy"), "pro-anim--left");
    add(section.querySelectorAll(".rf-product-stage, .rf-product-media, #product3DStage"), "pro-anim--scale");
    add(section.querySelectorAll(".rf-point, .product-callout"), "pro-anim--right");
    add(section.querySelectorAll(".ux-stat, .rf-stats-grid > div"));
    add(section.querySelectorAll(".rf-mode-card, .rf-part-card, .rf-feature-card, .rf-spec-card"));
    add(section.querySelectorAll(".rf-story-media"), "pro-anim--clip");
    add(section.querySelectorAll(".rf-story-copy"), "pro-anim--right");
    add(section.querySelectorAll(".rf-person, .person"));
    add(section.querySelectorAll(".partner-logo"));
    add(section.querySelectorAll(".rf-press-featured"), "pro-anim--left");
    add(section.querySelectorAll(".rf-press-side a"), "pro-anim--right");
    add(section.querySelectorAll(".rf-blog-featured, .rf-blog-card, .blog-card"));
    add(section.querySelectorAll(".rf-blog-row, .elvin-blog-row"));
    add(section.querySelectorAll(".rf-faq-item"));
    add(section.querySelectorAll(".rf-cta-inner > *"));
    add(section.querySelectorAll(".rf-contact-grid > div, .rf-form, .elvin-form"));
    add(section.querySelectorAll(".rf-foot > div, .footer-bottom"));
    add(section.querySelectorAll(".elvin-story-visual"), "pro-anim--clip");
    add(section.querySelectorAll(".elvin-story-copy"), "pro-anim--right");
    add(section.querySelectorAll(".elvin-story-chip"));

    if (id === "about") {
      section.querySelectorAll(".ux-feature-row").forEach((row, i) => {
        row.classList.add("pro-anim");
        row.classList.toggle("pro-anim--left", i % 2 === 0);
        row.classList.toggle("pro-anim--right", i % 2 === 1);
      });
    }
  };

  uniqueSections.forEach(tagChildren);

  const inViewport = (el: Element) => {
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight || 0;
    return r.top < vh * 1.2 && r.bottom > -80;
  };

  const reveal = (section: Element) => {
    markIn(section);
    section.querySelectorAll(".pro-anim").forEach((el) => el.classList.add("is-in"));
    markRevealIn(section);
  };

  uniqueSections.slice(0, 1).forEach(reveal);
  uniqueSections.forEach((section) => {
    if (section.matches(".page-hero, .hero, .rf-product-hero") || inViewport(section)) {
      reveal(section);
    }
  });

  root.classList.add("js-pro");
  requestAnimationFrame(() => {
    uniqueSections.forEach((section) => {
      if (inViewport(section)) reveal(section);
    });
  });

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const target = entry.target as HTMLElement;
        reveal(target);
        io.unobserve(target);
      });
    },
    { threshold: 0.05, rootMargin: "0px 0px 12% 0px" },
  );

  uniqueSections.forEach((section) => {
    if (!section.classList.contains("pro-in")) io.observe(section);
  });

  let scrollRevealRaf = 0;
  const onScrollReveal = () => {
    if (scrollRevealRaf) return;
    scrollRevealRaf = requestAnimationFrame(() => {
      scrollRevealRaf = 0;
      revealNearViewport();
    });
  };
  window.addEventListener("scroll", onScrollReveal, { passive: true, signal });

  const childIo = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        childIo.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "40px 0px 10% 0px" },
  );

  site.querySelectorAll(".pro-anim").forEach((el) => {
    if (inViewport(el)) el.classList.add("is-in");
    else childIo.observe(el);
  });

  const revealNearViewport = () => {
    uniqueSections.forEach((section) => {
      const r = section.getBoundingClientRect();
      if (r.top < window.innerHeight * 2.2 && r.bottom > -240) reveal(section);
    });
    site.querySelectorAll(".reveal:not(.in), .reveal-stagger:not(.in)").forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 1.8 && r.bottom > -120) {
        el.classList.add("in");
        if (el.classList.contains("reveal-stagger")) {
          el.querySelectorAll(":scope > *").forEach((child) => child.classList.add("in"));
        }
      }
    });
    site.querySelectorAll(".pro-anim:not(.is-in)").forEach((el) => {
      if (inViewport(el) || (el as HTMLElement).getBoundingClientRect().top < window.innerHeight * 2) {
        el.classList.add("is-in");
      }
    });
  };

  const failsafe = window.setTimeout(revealNearViewport, 900);
  window.addEventListener("load", revealNearViewport, { once: true, signal });

  const onHash = () => {
    const id = location.hash.slice(1);
    if (!id) return;
    const section = document.getElementById(id);
    if (!section) return;
    markIn(section);
    section.querySelectorAll(".pro-anim").forEach((el) => el.classList.add("is-in"));
    markRevealIn(section);
  };
  window.addEventListener("hashchange", onHash, { signal });
  onHash();

  const countEls = Array.from(
    site.querySelectorAll<HTMLElement>(
      ".ux-stat strong[data-count], [data-count], .rf-stats-grid strong, .ux-stat strong",
    ),
  );

  const parseStat = (el: HTMLElement) => {
    if (el.dataset.count) {
      return {
        target: Number(el.dataset.count),
        suffix: el.dataset.suffix ?? "",
      };
    }
    const raw = (el.textContent || "").trim();
    const match = raw.match(/^([\d.]+)(.*)$/);
    if (!match) return null;
    return { target: Number(match[1]), suffix: match[2] };
  };

  const runCount = (el: HTMLElement) => {
    if (el.dataset.counted === "1") return;
    const parsed = parseStat(el);
    if (!parsed || !Number.isFinite(parsed.target) || parsed.target <= 0) return;
    el.dataset.counted = "1";
    const start = performance.now();
    const dur = 1200;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = `${Math.round(parsed.target * eased)}${parsed.suffix}`;
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  if (countEls.length) {
    const countIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          if (el.matches("strong, [data-count]")) runCount(el);
          el.querySelectorAll<HTMLElement>("strong[data-count], [data-count], strong").forEach(runCount);
          countIo.unobserve(el);
        });
      },
      { threshold: 0.4 },
    );
    countEls.forEach((el) => {
      const wrap = el.closest(".ux-stat, .rf-stats-grid, .ux-impact") || el;
      countIo.observe(wrap);
    });
    signal.addEventListener("abort", () => countIo.disconnect());
  }

  const parallaxImgs = Array.from(
    site.querySelectorAll<HTMLElement>(
      ".ux-feature-media img, .ux-feature-media img, .rf-mode-card img, .rf-part-card img, .rf-story-media img, .rf-press-media img, .rf-contact-visual img, .elvin-story-visual img",
    ),
  ).filter((img) => !img.closest(".partner-logo, .logo, .rf-foot-logo, .rf-logo-link"));

  parallaxImgs.forEach((img) => img.classList.add("pro-parallax"));

  let pxRaf = 0;
  const onParallax = () => {
    if (pxRaf) return;
    pxRaf = requestAnimationFrame(() => {
      pxRaf = 0;
      const vh = window.innerHeight || 1;
      parallaxImgs.forEach((img) => {
        const r = img.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        const p = (r.top / vh - 0.35) * -12;
        img.style.transform = `translate3d(0, ${p.toFixed(1)}px, 0) scale(1.04)`;
      });
    });
  };
  window.addEventListener("scroll", onParallax, { passive: true, signal });
  onParallax();

  const spot = document.querySelector(".premium-spot");
  if (spot instanceof HTMLElement) spot.style.display = "none";

  /* ---- Flagship: cursor-aware hero, hotspots, mode rail, line icons ---- */
  const heroVisual = site.querySelector<HTMLElement>(".rf-hero-visual, #heroProductStage");
  if (heroVisual && window.matchMedia("(hover: hover) and (min-width: 1024px)").matches) {
    heroVisual.addEventListener(
      "pointermove",
      (e: PointerEvent) => {
        const r = heroVisual.getBoundingClientRect();
        const px = (e.clientX - r.left) / Math.max(1, r.width) - 0.5;
        const py = (e.clientY - r.top) / Math.max(1, r.height) - 0.5;
        heroVisual.style.setProperty("--flag-tilt-x", `${(-py * 6).toFixed(2)}deg`);
        heroVisual.style.setProperty("--flag-tilt-y", `${(px * 8).toFixed(2)}deg`);
      },
      { signal },
    );
    heroVisual.addEventListener(
      "pointerleave",
      () => {
        heroVisual.style.setProperty("--flag-tilt-x", "0deg");
        heroVisual.style.setProperty("--flag-tilt-y", "0deg");
      },
      { signal },
    );
  }

  const wireShowcase = (config: {
    list: HTMLElement;
    itemSelector: string;
    stage: HTMLElement;
    img: HTMLImageElement | null;
    caption: HTMLElement;
    dotsContainer: HTMLElement | null;
  }) => {
    try {
    const items = Array.from(config.list.querySelectorAll<HTMLElement>(config.itemSelector)).map((el) => ({
      el,
      src: el.dataset.src || "",
      idx: el.dataset.idx || el.querySelector(".idx")?.textContent?.trim() || "",
      title: el.dataset.title || el.querySelector("h3")?.textContent?.trim() || "",
      body: el.dataset.body || el.querySelector("p")?.textContent?.trim() || "",
    }));
    const { stage, img, caption, dotsContainer } = config;
    if (!items.length) return;

    let activeIndex = 0;
    const prevBtn = stage.querySelector<HTMLButtonElement>(".fe-showcase-nav--prev");
    const nextBtn = stage.querySelector<HTMLButtonElement>(".fe-showcase-nav--next");

    if (dotsContainer) {
      dotsContainer.innerHTML = "";
      items.forEach((item, i) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = `fe-showcase-dot${i === 0 ? " is-active" : ""}`;
        dot.innerHTML = CAROUSEL_DOT_SVG;
        dot.setAttribute("role", "tab");
        dot.setAttribute("aria-label", item.title || `Slide ${i + 1}`);
        dot.setAttribute("aria-selected", i === 0 ? "true" : "false");
        dot.addEventListener("click", (e) => {
          e.stopPropagation();
          goTo(i);
        }, { signal });
        dotsContainer.appendChild(dot);
      });
    }

    const crossfadeImage = (src: string, alt: string) => {
      if (!img || !src) return;
      const current = img.getAttribute("src") || "";
      if (current === src || current.endsWith(src)) return;
      img.classList.add("fe-img-out");
      window.setTimeout(() => {
        img.src = src;
        img.alt = alt;
        img.classList.remove("fe-img-out");
        img.classList.add("fe-img-in");
        window.setTimeout(() => img.classList.remove("fe-img-in"), 420);
      }, 180);
    };

    const updateCaption = (item: (typeof items)[0], forward: boolean) => {
      const idxEl = caption.querySelector(".idx");
      const h3 = caption.querySelector("h3");
      const p = caption.querySelector("p");
      caption.classList.remove("fe-caption-in-forward", "fe-caption-in-backward");
      void caption.offsetWidth;
      if (idxEl) idxEl.textContent = item.idx;
      if (h3) h3.textContent = item.title;
      if (p) p.textContent = item.body;
      caption.classList.add(forward ? "fe-caption-in-forward" : "fe-caption-in-backward");
    };

    const goTo = (index: number) => {
      const nextIndex = ((index % items.length) + items.length) % items.length;
      if (nextIndex === activeIndex) return;
      const forward = nextIndex > activeIndex || (activeIndex === items.length - 1 && nextIndex === 0);
      activeIndex = nextIndex;
      const item = items[activeIndex];
      if (!item) return;

      items.forEach((it, i) => it.el.classList.toggle("is-active", i === activeIndex));
      dotsContainer?.querySelectorAll(".fe-showcase-dot").forEach((dot, i) => {
        dot.classList.toggle("is-active", i === activeIndex);
        dot.setAttribute("aria-selected", i === activeIndex ? "true" : "false");
      });

      crossfadeImage(item.src, item.title);
      updateCaption(item, forward);
      stage.setAttribute(
        "aria-label",
        `${item.title}, slide ${activeIndex + 1} of ${items.length}`,
      );
    };

    const next = () => goTo(activeIndex + 1);
    const prev = () => goTo(activeIndex - 1);

    prevBtn?.addEventListener("click", (e) => {
      e.stopPropagation();
      prev();
    }, { signal });
    nextBtn?.addEventListener("click", (e) => {
      e.stopPropagation();
      next();
    }, { signal });

    stage.addEventListener("click", (e) => {
      if ((e.target as HTMLElement).closest(".fe-showcase-nav")) return;
      next();
    }, { signal });

    let touchStartX = 0;
    stage.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.changedTouches[0]?.clientX ?? 0;
      },
      { passive: true, signal },
    );
    stage.addEventListener(
      "touchend",
      (e) => {
        const dx = (e.changedTouches[0]?.clientX ?? 0) - touchStartX;
        if (Math.abs(dx) < 48) return;
        if (dx < 0) next();
        else prev();
      },
      { signal },
    );

    stage.addEventListener(
      "keydown",
      (e) => {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          next();
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          prev();
        }
      },
      { signal },
    );

    goTo(0);
    } catch (err) {
      console.error("[wireShowcase]", err);
    }
  };

  const featureList = document.getElementById("featureCallouts");
  const featureRoot = document.getElementById("featureExplode");
  if (featureList && featureRoot) {
    const featureStage = featureRoot.querySelector<HTMLElement>(".fe-showcase-stage");
    const featureCaption = featureRoot.querySelector<HTMLElement>("#featurePanel");
    if (featureStage && featureCaption) {
      wireShowcase({
        list: featureList,
        itemSelector: ".flag-explode-item",
        stage: featureStage,
        img: featureStage.querySelector<HTMLImageElement>("img"),
        caption: featureCaption,
        dotsContainer: featureRoot.querySelector("#featureDots"),
      });
    }
  }

  const productList = document.getElementById("productCallouts");
  const productStage = document.getElementById("productStage");
  const productCaption = document.getElementById("productCaption");
  if (productList && productStage && productCaption) {
    wireShowcase({
      list: productList,
      itemSelector: ".product-callout, .rf-point",
      stage: productStage,
      img: document.getElementById("productHeroImg") as HTMLImageElement | null,
      caption: productCaption,
      dotsContainer: document.getElementById("productDots"),
    });
  }

  const specsList = document.getElementById("specsCallouts");
  const specsRoot = document.getElementById("specsExplode");
  if (specsList && specsRoot) {
    const specsStage = specsRoot.querySelector<HTMLElement>(".fe-showcase-stage");
    const specsCaption = specsRoot.querySelector<HTMLElement>("#specsPanel");
    if (specsStage && specsCaption) {
      wireShowcase({
        list: specsList,
        itemSelector: ".flag-explode-item",
        stage: specsStage,
        img: specsStage.querySelector<HTMLImageElement>("#specsStageImg") ?? specsStage.querySelector<HTMLImageElement>("img"),
        caption: specsCaption,
        dotsContainer: specsRoot.querySelector("#specsDots"),
      });
    }
  }

  const modes = site.querySelector("#modes");
  if (modes && !document.querySelector(".flag-mode-rail")) {
    const rail = document.createElement("div");
    rail.className = "flag-mode-rail";
    const pills = document.createElement("div");
    pills.className = "flag-mode-pills";
    const labels = Array.from(modes.querySelectorAll(".rf-mode-card h3, .rf-mode-meta h3")).map((h) => h.textContent || "");
    const cards = Array.from(modes.querySelectorAll<HTMLElement>(".rf-mode-card"));
    labels.forEach((label, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = `flag-mode-pill${i === 0 ? " is-on" : ""}`;
      b.textContent = label.replace(/\s*mode/i, "");
      b.addEventListener(
        "click",
        () => cards[i]?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" }),
        { signal },
      );
      pills.appendChild(b);
    });
    rail.appendChild(pills);
    modes.appendChild(rail);
    const modeIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === modes) rail.classList.toggle("is-on", entry.isIntersecting);
          const idx = cards.indexOf(entry.target as HTMLElement);
          if (idx >= 0 && entry.isIntersecting) {
            pills.querySelectorAll(".flag-mode-pill").forEach((p, i) => p.classList.toggle("is-on", i === idx));
          }
        });
      },
      { threshold: 0.35 },
    );
    modeIo.observe(modes);
    cards.forEach((c) => modeIo.observe(c));
    signal.addEventListener("abort", () => {
      modeIo.disconnect();
      rail.remove();
    });
  }

  const iconSvg = `<svg class="flag-line-icon" viewBox="0 0 32 32" fill="none" aria-hidden="true"><circle cx="16" cy="16" r="11" stroke="currentColor" stroke-width="1.2"/><path d="M16 9v7l4 3" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>`;
  site.querySelectorAll(".ux-feature-copy .ux-eyebrow").forEach((el, i) => {
    if (el.querySelector(".flag-line-icon")) return;
    const wrap = document.createElement("span");
    wrap.innerHTML = iconSvg.replace(
      "M16 9v7l4 3",
      i === 0 ? "M10 18c2-4 4-7 6-7s4 3 6 7" : i === 1 ? "M11 16h10M16 11v10" : "M10 20c2-6 12-6 12 0",
    );
    el.prepend(wrap.firstElementChild as Node);
  });

  signal.addEventListener("abort", () => {
    window.clearTimeout(failsafe);
    io.disconnect();
    childIo.disconnect();
    root.classList.remove("js-pro", "pro-reduced");
  });

  return () => ac.abort();
}
