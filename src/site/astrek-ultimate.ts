/**
 * Astrek Ultimate: premium JS layer.
 * Scroll reveal · stats counter · nav scroll state · team hover.
 * Pure vanilla, no dependencies. Loads once per page.
 */

export function initAstrekUltimate(): () => void {
  const ac = new AbortController();
  const { signal } = ac;
  const site = document.getElementById("astrek-site");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!site) return () => ac.abort();

  /* ---- Deduplicate headers (Strict Mode / double inject) ---- */
  const allHeaders = Array.from(document.querySelectorAll<HTMLElement>("header#siteHeader, header.rf-header"));
  allHeaders.forEach((h, i) => {
    if (i > 0) h.remove();
  });
  // Never allow a header to live inside page content
  site.querySelectorAll("header.rf-header, #siteHeader").forEach((h) => h.remove());

  /* ------------------------------------------------------------------ */
  /*  1. Navigation scroll state                                          */
  /* ------------------------------------------------------------------ */
  const header = document.getElementById("siteHeader");
  if (header) {
    header.style.position = "fixed";
    header.style.top = "0";
    header.style.left = "0";
    header.style.right = "0";
    header.style.zIndex = "10000";
    const updateNav = () => {
      if (window.scrollY > 48) {
        header.classList.add("is-scrolled", "scrolled");
      } else {
        header.classList.remove("is-scrolled", "scrolled");
      }
    };
    window.addEventListener("scroll", updateNav, { passive: true, signal });
    updateNav();
  }

  /* ---- Force hero product visible (guards against opacity/blend regressions) ---- */
  const heroSection = site.querySelector<HTMLElement>(".hero.rf-hero");
  const heroVisual = site.querySelector<HTMLElement>("#heroProductStage, .rf-hero-visual");
  const heroImg = site.querySelector<HTMLImageElement>("#heroProductImg");
  if (heroSection) heroSection.classList.add("lux-hero-in");
  if (heroImg) {
    heroImg.style.opacity = "1";
    heroImg.style.visibility = "visible";
    heroImg.style.display = "block";
    heroImg.style.mixBlendMode = "normal";
    heroImg.style.setProperty("width", "100%", "important");
    heroImg.style.setProperty("max-width", "100%", "important");
    heroImg.style.setProperty("min-height", "0", "important");
    heroImg.style.setProperty("min-width", "0", "important");
    heroImg.style.setProperty("height", "auto", "important");
    heroImg.style.setProperty("margin", "0 auto", "important");
    heroImg.style.setProperty("-webkit-mask-image", "none", "important");
    heroImg.style.setProperty("mask-image", "none", "important");
    heroImg.style.setProperty("animation", "none", "important");
    heroImg.style.setProperty("transform", "none", "important");
    /* Let CSS control max-height per breakpoint: avoid inline override on mobile */
    heroImg.style.removeProperty("max-height");
  }
  const isMechHero = !!site.querySelector(".hero--mech");

  if (heroVisual) {
    heroVisual.style.opacity = "1";
    heroVisual.style.visibility = "visible";
    if (!isMechHero) {
      heroVisual.style.setProperty("display", "flex", "important");
      heroVisual.style.setProperty("align-items", "center", "important");
      heroVisual.style.setProperty("justify-content", "center", "important");
      heroVisual.style.setProperty("padding", "clamp(16px, 3vw, 32px)", "important");
    } else {
      heroVisual.style.removeProperty("display");
      heroVisual.style.removeProperty("align-items");
      heroVisual.style.removeProperty("justify-content");
      heroVisual.style.removeProperty("padding");
    }
  }

  /* Hero typography: enforce readable contrast over animation/gradient layers */
  const heroH1 = site.querySelector<HTMLElement>(".hero--tronix h1.ux-h1");
  const heroSub = site.querySelector<HTMLElement>(".hero--tronix .rf-hero-copy .sub");
  const heroBtn = site.querySelector<HTMLElement>(".hero--tronix .rf-hero-actions .rf-btn");
  const heroEyebrow = site.querySelector<HTMLElement>(".hero--tronix .rf-hero-copy .hero-eyebrow");
  if (heroH1) {
    heroH1.style.setProperty("background", "none", "important");
    heroH1.style.setProperty("background-image", "none", "important");
    heroH1.style.setProperty("-webkit-background-clip", "unset", "important");
    heroH1.style.setProperty("opacity", "1", "important");
    heroH1.style.setProperty("visibility", "visible", "important");
    heroH1.style.setProperty("animation", "none", "important");
    if (!isMechHero) {
      heroH1.style.setProperty("color", "#ffffff", "important");
      heroH1.style.setProperty("-webkit-text-fill-color", "#ffffff", "important");
    } else {
      /* Mech hero uses outlined EXO span: don't force solid fill on the whole h1 */
      heroH1.style.removeProperty("color");
      heroH1.style.removeProperty("-webkit-text-fill-color");
      const outline = heroH1.querySelector<HTMLElement>(".mech-hero-line--outline");
      const solid = heroH1.querySelector<HTMLElement>(".mech-hero-line:not(.mech-hero-line--outline)");
      const dot = heroH1.querySelector<HTMLElement>(".mech-hero-dot");
      if (solid) {
        solid.style.setProperty("color", "#ffffff", "important");
        solid.style.setProperty("-webkit-text-fill-color", "#ffffff", "important");
        solid.style.setProperty("-webkit-text-stroke", "0", "important");
      }
      if (outline) {
        outline.style.setProperty("color", "transparent", "important");
        outline.style.setProperty("-webkit-text-fill-color", "transparent", "important");
        outline.style.setProperty("-webkit-text-stroke", "1.5px rgba(63, 224, 197, 0.7)", "important");
      }
      if (dot) {
        dot.style.setProperty("color", "#3fe0c5", "important");
        dot.style.setProperty("-webkit-text-fill-color", "#3fe0c5", "important");
        dot.style.setProperty("-webkit-text-stroke", "0", "important");
      }
    }
  }
  if (heroEyebrow) {
    heroEyebrow.style.setProperty("opacity", "1", "important");
    heroEyebrow.style.setProperty("visibility", "visible", "important");
    heroEyebrow.style.setProperty("animation", "none", "important");
  }
  if (heroSub) {
    heroSub.style.setProperty("color", isMechHero ? "#a1a1aa" : "#f2f2f2", "important");
    heroSub.style.setProperty("-webkit-text-fill-color", isMechHero ? "#a1a1aa" : "#f2f2f2", "important");
    if (!isMechHero) {
      heroSub.style.setProperty("text-shadow", "0 1px 8px rgba(0,0,0,0.4)", "important");
    } else {
      heroSub.style.removeProperty("text-shadow");
    }
    heroSub.style.setProperty("opacity", "1", "important");
    heroSub.style.setProperty("visibility", "visible", "important");
    heroSub.style.setProperty("animation", "none", "important");
  }
  if (heroBtn) {
    const brand = "#2fe0b5";
    heroBtn.style.setProperty("background", brand, "important");
    heroBtn.style.setProperty("background-color", brand, "important");
    heroBtn.style.setProperty("color", "#041210", "important");
    heroBtn.style.setProperty("opacity", "1", "important");
  }

  /* Mech studio panel image must fill the rounded card */
  if (isMechHero && heroImg) {
    heroImg.style.removeProperty("width");
    heroImg.style.removeProperty("max-width");
    heroImg.style.removeProperty("height");
    heroImg.style.removeProperty("margin");
    heroImg.style.setProperty("width", "100%", "important");
    heroImg.style.setProperty("height", "100%", "important");
    heroImg.style.setProperty("object-fit", "cover", "important");
  }

  /* ------------------------------------------------------------------ */
  /*  2. Scroll reveal: add ult-in class when element enters viewport   */
  /* ------------------------------------------------------------------ */
  if (!reduce) {
    const revealEls = site.querySelectorAll<HTMLElement>(
      ".reveal, .reveal-stagger, .premium-reveal, .ult-reveal",
    );

    const revealObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("ult-in", "in");
            revealObs.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "80px 0px 25% 0px", threshold: 0.01 },
    );

    revealEls.forEach((el) => revealObs.observe(el));

    // Immediately reveal anything already near the viewport (avoids stuck opacity:0)
    revealEls.forEach((el) => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      if (r.top < vh * 1.5 && r.bottom > -120) {
        el.classList.add("ult-in", "in");
        revealObs.unobserve(el);
      }
    });

    signal.addEventListener("abort", () => revealObs.disconnect());
  } else {
    // Reduced motion: just make everything visible immediately
    site.querySelectorAll<HTMLElement>(".reveal, .reveal-stagger, .ult-reveal, .premium-reveal").forEach((el) => {
      el.classList.add("ult-in", "in");
    });
  }

  /* ------------------------------------------------------------------ */
  /*  3. Stats counter animation                                          */
  /* ------------------------------------------------------------------ */
  const statsObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        statsObs.unobserve(entry.target);

        const target = entry.target as HTMLElement;
        const end = parseInt(target.dataset["count"] ?? "0", 10);
        const suffix = target.dataset["suffix"] ?? "";
        if (reduce) {
          target.textContent = end + suffix;
          return;
        }

        const duration = 1600;
        const startTime = performance.now();
        const tick = (now: number) => {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // ease-out expo
          const eased = 1 - Math.pow(2, -10 * progress);
          const current = Math.round(eased * end);
          target.textContent = current + suffix;
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    },
    { threshold: 0.5 },
  );

  site.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => statsObs.observe(el));

  signal.addEventListener("abort", () => statsObs.disconnect());

  /* ------------------------------------------------------------------ */
  /*  4. Section number annotations (subtle technical labels)            */
  /* ------------------------------------------------------------------ */
  const sectionOrder: Record<string, string> = {
    "about":        "01",
    "product":      "02",
    "modes":        "03",
    "specs":        "04",
    "testimonials": "05",
    "team":         "06",
    "partners":     "07",
    "press":        "08",
    "blog":         "09",
    "faq":          "10",
    "contact":      "11",
  };

  Object.entries(sectionOrder).forEach(([id, num]) => {
    const section = site.querySelector<HTMLElement>(`#${id}`);
    if (!section || section.querySelector(".ult-section-num")) return;
    const label = document.createElement("span");
    label.className = "ult-section-num";
    label.setAttribute("aria-hidden", "true");
    label.textContent = num;
    section.appendChild(label);
  });

  /* ------------------------------------------------------------------ */
  /*  5. Team / mentor person card keyboard + hover polish               */
  /* ------------------------------------------------------------------ */
  const headshotGrade = "grayscale(20%) contrast(1.05) brightness(0.95)";
  site.querySelectorAll<HTMLImageElement>("#team img, #mentors img").forEach((img) => {
    if (!img.closest(".rf-person-media, .person-img")) return;
    img.style.setProperty("filter", headshotGrade, "important");
    img.style.setProperty("object-fit", "cover", "important");
    img.style.setProperty("object-position", "center 18%", "important");
    img.style.setProperty("width", "100%", "important");
    img.style.setProperty("height", "100%", "important");
  });

  site.querySelectorAll<HTMLElement>(".rf-person").forEach((card) => {
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "article");

    card.addEventListener(
      "focusin",
      () => card.classList.add("ult-focus"),
      { signal },
    );
    card.addEventListener(
      "focusout",
      () => card.classList.remove("ult-focus"),
      { signal },
    );
  });

  /* ------------------------------------------------------------------ */
  /*  6. Mode cards: touch / keyboard activation                        */
  /* ------------------------------------------------------------------ */
  site.querySelectorAll<HTMLElement>(".rf-mode-card").forEach((card) => {
    card.setAttribute("tabindex", "0");

    card.addEventListener(
      "keydown",
      (e: KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          const link = card.querySelector<HTMLAnchorElement>("a");
          if (link) link.click();
        }
      },
      { signal },
    );
  });

  /* ------------------------------------------------------------------ */
  /*  7. FAQ smooth open / close                                         */
  /* ------------------------------------------------------------------ */
  site.querySelectorAll<HTMLDetailsElement>(".rf-faq-item").forEach((item) => {
    item.addEventListener(
      "toggle",
      () => {
        if (item.open) {
          // Close siblings
          site.querySelectorAll<HTMLDetailsElement>(".rf-faq-item[open]").forEach((other) => {
            if (other !== item) other.open = false;
          });
        }
      },
      { signal },
    );
  });

  /* ------------------------------------------------------------------ */
  /*  8. Feature explode: keep existing logic intact, add ult-active     */
  /* ------------------------------------------------------------------ */
  // The existing astrek-pro.ts handles explode; we just ensure the first
  // item is active on page load if the JS hasn't fired yet.
  const firstExplode = site.querySelector<HTMLButtonElement>(".flag-explode-item");
  if (firstExplode && !firstExplode.classList.contains("is-active")) {
    firstExplode.classList.add("is-active");
  }

  /* ------------------------------------------------------------------ */
  /*  9. Horizontal scroll containers: keyboard arrow support           */
  /* ------------------------------------------------------------------ */
  site.querySelectorAll<HTMLElement>(".flag-explode-list--scroll").forEach((list) => {
    list.addEventListener(
      "keydown",
      (e: KeyboardEvent) => {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          list.scrollBy({ top: 80, behavior: "smooth" });
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          list.scrollBy({ top: -80, behavior: "smooth" });
        }
      },
      { signal },
    );
  });

  /* ------------------------------------------------------------------ */
  /* 10. Blog modal close on backdrop click                              */
  /* ------------------------------------------------------------------ */
  const blogModal = site.querySelector<HTMLElement>("#blogModal");
  if (blogModal) {
    blogModal.addEventListener(
      "click",
      (e: MouseEvent) => {
        if (e.target === blogModal) blogModal.classList.remove("is-open");
      },
      { signal },
    );

    // ESC key
    document.addEventListener(
      "keydown",
      (e: KeyboardEvent) => {
        if (e.key === "Escape" && blogModal.classList.contains("is-open")) {
          blogModal.classList.remove("is-open");
        }
      },
      { signal },
    );
  }

  /* ------------------------------------------------------------------ */
  /* 11. Partner logo section: accessibility labels                     */
  /* ------------------------------------------------------------------ */
  site.querySelectorAll<HTMLElement>(".partner-logo").forEach((logo) => {
    const img = logo.querySelector("img");
    if (img && !logo.getAttribute("aria-label")) {
      logo.setAttribute("aria-label", img.alt || "Partner");
    }
  });

  /* ------------------------------------------------------------------ */
  /* Cleanup                                                              */
  /* ------------------------------------------------------------------ */
  return () => ac.abort();
}
