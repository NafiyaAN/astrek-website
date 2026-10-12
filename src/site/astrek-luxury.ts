/**
 * Premium robotics luxury layer: motion & micro-interactions.
 * CSS-driven motion (Framer-quality easing) for static HTML content.
 */
export function initAstrekLuxury(): () => void {
  const ac = new AbortController();
  const { signal } = ac;
  const site = document.getElementById("astrek-site");
  const root = document.documentElement;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!site) return () => ac.abort();

  site.classList.add("lux-site");
  site.querySelectorAll("section, .rf-cta-band").forEach((el) => el.classList.add("lux-section"));

  /* ---- Ambient: noise + floating gradients ---- */
  if (!document.querySelector(".lux-ambient")) {
    const ambient = document.createElement("div");
    ambient.className = "lux-ambient";
    ambient.setAttribute("aria-hidden", "true");
    ambient.innerHTML = `
      <div class="lux-ambient__noise"></div>
      <div class="lux-ambient__glow lux-ambient__glow--a"></div>
      <div class="lux-ambient__glow lux-ambient__glow--b"></div>
      <div class="lux-ambient__streak"></div>
    `;
    site.prepend(ambient);
  }

  /* ---- Hero cinematic layers ---- */
  const hero = site.querySelector<HTMLElement>(".hero.rf-hero");
  const heroStage = hero?.querySelector<HTMLElement>(".rf-hero-stage") ?? hero;
  const heroVisual = hero?.querySelector<HTMLElement>("#heroProductStage, .rf-hero-visual");

  /* Static hero: strip legacy video / poster / streak layers */
  hero?.classList.remove("hero-video-fallback");
  hero?.querySelectorAll("video.hero-video, #heroVideo, .lux-hero-streak").forEach((el) => el.remove());
  hero?.querySelector(".hero-bg")?.classList.add("hero-bg--static");

  if (heroVisual && !heroVisual.querySelector(".lux-hero-spot")) {
    const spot = document.createElement("span");
    spot.className = "lux-hero-spot";
    spot.setAttribute("aria-hidden", "true");
    const core = document.createElement("span");
    core.className = "lux-hero-core";
    core.setAttribute("aria-hidden", "true");
    heroVisual.prepend(core);
    heroVisual.prepend(spot);
  }

  if (heroStage && !heroStage.querySelector(".lux-particles")) {
    const particles = document.createElement("div");
    particles.className = "lux-particles";
    particles.setAttribute("aria-hidden", "true");
    const count = reduce ? 0 : window.innerWidth < 768 ? 16 : 42;
    for (let i = 0; i < count; i++) {
      const p = document.createElement("span");
      const size = 1 + Math.random() * 2.6;
      p.style.setProperty("--x", `${6 + Math.random() * 88}%`);
      p.style.setProperty("--y", `${8 + Math.random() * 80}%`);
      p.style.setProperty("--s", `${size}px`);
      p.style.setProperty("--d", `${7 + Math.random() * 11}s`);
      p.style.setProperty("--delay", `${Math.random() * 9}s`);
      p.style.setProperty("--drift", `${10 + Math.random() * 28}px`);
      if (i % 5 === 0) p.classList.add("is-bright");
      particles.appendChild(p);
    }
    heroStage.appendChild(particles);
  }

  if (hero && !hero.querySelector(".lux-hero-vignette")) {
    const vignette = document.createElement("div");
    vignette.className = "lux-hero-vignette";
    vignette.setAttribute("aria-hidden", "true");
    hero.appendChild(vignette);
  }

  /* ---- Breathing radial glow (behind robot, z-index 1) ---- */
  if (heroVisual && !heroVisual.querySelector(".lux-hero-breath")) {
    const breath = document.createElement("span");
    breath.className = "lux-hero-breath";
    breath.setAttribute("aria-hidden", "true");
    heroVisual.prepend(breath);
  }

  /* ---- Soft reflection below robot ---- */
  if (heroVisual && !heroVisual.querySelector(".lux-hero-reflection")) {
    const reflection = document.createElement("span");
    reflection.className = "lux-hero-reflection";
    reflection.setAttribute("aria-hidden", "true");
    heroVisual.appendChild(reflection);
  }

  /* Floating light streaks removed: static gradient hero only */

  /* ---- Status dot + "Next-generation rehabilitation robotics" badge ---- */
  const heroStageEl = hero?.querySelector<HTMLElement>(".rf-hero-stage");
  if (heroStageEl && !heroStageEl.querySelector(".lux-hero-badge")) {
    const badge = document.createElement("div");
    badge.className = "lux-hero-badge";
    badge.setAttribute("aria-hidden", "true");
    badge.innerHTML = `<span class="lux-hero-badge__dot"></span><span>Next-generation rehabilitation robotics</span>`;
    const headline = heroStageEl.querySelector("h1");
    if (headline) heroStageEl.insertBefore(badge, headline);
    else heroStageEl.appendChild(badge);
  }

  /* ---- Divider below CTA ---- */
  const heroActions = hero?.querySelector<HTMLElement>(".rf-hero-actions");
  if (heroActions && !heroActions.querySelector(".lux-hero-divider")) {
    const divider = document.createElement("div");
    divider.className = "lux-hero-divider";
    divider.setAttribute("aria-hidden", "true");
    heroActions.insertAdjacentElement("afterend", divider);
  }

  /* ---- Scroll indicator ---- */
  if (hero && !hero.querySelector(".lux-scroll-hint")) {
    const hint = document.createElement("div");
    hint.className = "lux-scroll-hint";
    hint.setAttribute("aria-hidden", "true");
    hint.innerHTML = `<span>Scroll</span><span class="lux-scroll-hint__arrow"></span>`;
    hero.appendChild(hint);
  }

  /* ---- Hero entry animation (trigger class on hero) ---- */
  const triggerHeroIn = () => {
    if (!hero) return;
    requestAnimationFrame(() => {
      hero.classList.add("lux-hero-in");
      const badge = hero.querySelector<HTMLElement>(".lux-hero-badge");
      if (badge) {
        badge.classList.add("lux-in");
      }
    });
  };

  if (document.readyState === "complete" || document.readyState === "interactive") {
    setTimeout(triggerHeroIn, 60);
  } else {
    window.addEventListener("load", () => setTimeout(triggerHeroIn, 60), { once: true, signal });
  }

  /* ---- Section radial glows ---- */
  const glowSections = ["#about", "#product", "#testimonials", "#partners", ".rf-cta-band"];
  glowSections.forEach((sel) => {
    site.querySelectorAll(sel).forEach((section) => {
      if (section.querySelector(".lux-section-glow")) return;
      const glow = document.createElement("div");
      glow.className = "lux-section-glow";
      glow.setAttribute("aria-hidden", "true");
      section.prepend(glow);
    });
  });

  /* ---- Magnetic buttons (desktop): stronger pull on hero CTA ---- */
  if (!reduce && window.matchMedia("(hover: hover) and (min-width: 1024px)").matches) {
    site.querySelectorAll<HTMLElement>(".rf-btn, .header-cta, button.submit-btn").forEach((btn) => {
      if (btn.closest(".rf-hero-copy")) return;
      btn.classList.add("lux-magnetic");
      btn.addEventListener(
        "pointermove",
        (e: PointerEvent) => {
          const r = btn.getBoundingClientRect();
          const x = ((e.clientX - r.left) / r.width - 0.5) * 10;
          const y = ((e.clientY - r.top) / r.height - 0.5) * 8;
          btn.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) scale(1.02)`;
        },
        { signal },
      );
      btn.addEventListener(
        "pointerleave",
        () => {
          btn.style.transform = "";
        },
        { signal },
      );
    });

    site.querySelectorAll<HTMLElement>(".rf-hero-copy .rf-btn").forEach((btn) => {
      btn.classList.add("lux-magnetic", "lux-hero-cta");
      btn.addEventListener(
        "pointermove",
        (e: PointerEvent) => {
          const r = btn.getBoundingClientRect();
          const x = ((e.clientX - r.left) / r.width - 0.5) * 20;
          const y = ((e.clientY - r.top) / r.height - 0.5) * 16;
          btn.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) scale(1.05)`;
          btn.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
          btn.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
        },
        { signal },
      );
      btn.addEventListener(
        "pointerleave",
        () => {
          btn.style.transform = "";
        },
        { signal },
      );
    });
  }

  /* ---- Partners: compact glass grid + background marquee (never wrap the grid) ---- */
  site.querySelectorAll(".lux-marquee-wrap").forEach((wrap) => {
    const liveGrid = Array.from(wrap.querySelectorAll<HTMLElement>(".partner-grid, .ux-partners-row")).find(
      (el) => !el.hasAttribute("aria-hidden"),
    );
    if (liveGrid) wrap.parentNode?.insertBefore(liveGrid, wrap);
    wrap.remove();
  });

  const partnersSection = site.querySelector<HTMLElement>("#partners");
  const partnerGrid = partnersSection?.querySelector<HTMLElement>(".partner-grid, .ux-partners-row");
  if (partnersSection && partnerGrid && !partnersSection.querySelector(".lux-partners-stage")) {
    const stage = document.createElement("div");
    stage.className = "lux-partners-stage";
    partnerGrid.parentNode?.insertBefore(stage, partnerGrid);

    const marquee = document.createElement("div");
    marquee.className = "lux-partners-marquee";
    marquee.setAttribute("aria-hidden", "true");
    const track = document.createElement("div");
    track.className = "lux-partners-marquee-track";
    const logos = Array.from(partnerGrid.querySelectorAll("img"))
      .map((img) => `<img src="${img.getAttribute("src") ?? ""}" alt="" />`)
      .join("");
    track.innerHTML = logos + logos;
    marquee.appendChild(track);
    stage.appendChild(marquee);
    stage.appendChild(partnerGrid);
    if (!reduce) marquee.classList.add("is-on");
  }

  /* ---- FAQ: smooth height + rotating icon ---- */
  site.querySelectorAll<HTMLDetailsElement>(".rf-faq-item").forEach((item) => {
    item.classList.add("lux-faq");
    item.addEventListener(
      "toggle",
      () => {
        if (item.open) {
          site.querySelectorAll(".rf-faq-item[open]").forEach((other) => {
            if (other !== item) (other as HTMLDetailsElement).open = false;
          });
        }
      },
      { signal },
    );
  });

  /* ---- Engineering timeline connector ---- */
  const specsList = site.querySelector("#specsCallouts");
  if (specsList && !specsList.querySelector(".lux-timeline-line")) {
    const line = document.createElement("div");
    line.className = "lux-timeline-line";
    line.setAttribute("aria-hidden", "true");
    specsList.prepend(line);
  }

  /* ---- Blog reading time (estimate from excerpt) ---- */
  site.querySelectorAll<HTMLElement>(".rf-blog-row, .rf-blog-featured").forEach((card) => {
    if (card.querySelector(".lux-read-time")) return;
    const body = card.dataset.body || card.dataset.excerpt || card.querySelector("p")?.textContent || "";
    const words = body.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length || 120;
    const mins = Math.max(1, Math.round(words / 200));
    const meta = card.querySelector(".date.mono, .blog-body .date");
    if (meta) {
      const span = document.createElement("span");
      span.className = "lux-read-time";
      span.textContent = `${mins} min read`;
      meta.appendChild(document.createTextNode(" · "));
      meta.appendChild(span);
    }
  });

  /* ---- Hero parallax (desktop only: avoid fighting mobile stacked layout) ---- */
  if (!reduce && window.matchMedia("(min-width: 901px)").matches) {
    const heroVisualEl = site.querySelector<HTMLElement>("#heroProductStage, .rf-hero-visual");
    const heroTitle = site.querySelector<HTMLElement>(".hero.rf-hero h1");
    let parallaxRaf = 0;
    const onParallax = () => {
      if (parallaxRaf) return;
      parallaxRaf = requestAnimationFrame(() => {
        parallaxRaf = 0;
        if (!heroVisualEl) return;
        heroVisualEl.style.transform = "";
        const r = heroVisualEl.getBoundingClientRect();
        const vh = window.innerHeight || 1;
        if (r.bottom < 0 || r.top > vh) return;
        const p = Math.max(-1, Math.min(1, (vh / 2 - r.top) / vh));
        heroVisualEl.style.setProperty("--hero-par-y", `${(p * -28).toFixed(1)}px`);
        heroVisualEl.style.setProperty("--hero-par-s", `${(1 + p * 0.025).toFixed(3)}`);
        if (heroTitle) heroTitle.style.setProperty("--hero-title-y", `${(p * -10).toFixed(1)}px`);
      });
    };
    window.addEventListener("scroll", onParallax, { passive: true, signal });
    onParallax();
  }

  root.classList.add("lux-ready");

  signal.addEventListener("abort", () => {
    root.classList.remove("lux-ready");
    site.classList.remove("lux-site");
  });

  return () => ac.abort();
}
