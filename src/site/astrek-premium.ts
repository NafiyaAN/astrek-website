// @ts-nocheck
/* eslint-disable */
/**
 * Premium enhancement layer: additive micro-interactions only.
 * Scroll progress rail, cursor spotlight, active nav tracking,
 * product-media tilt and extra scroll reveals.
 */
import { CAROUSEL_DOT_SVG } from "./lucide-icons";

export function initAstrekPremium(): () => void {
  const ac = new AbortController();
  const signal = ac.signal;
  const created: HTMLElement[] = [];
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // 1. scroll progress rail
  const rail = document.createElement("div");
  rail.className = "premium-progress";
  document.body.appendChild(rail);
  created.push(rail);

  const onScroll = () => {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    rail.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + "%";
  };
  window.addEventListener("scroll", onScroll, { passive: true, signal });
  onScroll();

  // 2. cursor spotlight (desktop, pointer devices only)
  if (!reduce && window.matchMedia("(hover: hover) and (min-width: 861px)").matches) {
    const spot = document.createElement("div");
    spot.className = "premium-spot";
    document.body.appendChild(spot);
    created.push(spot);
    let x = 0;
    let y = 0;
    let cx = 0;
    let cy = 0;
    let raf = 0;
    const loop = () => {
      cx += (x - cx) * 0.09;
      cy += (y - cy) * 0.09;
      spot.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener(
      "pointermove",
      (e: PointerEvent) => {
        x = e.clientX;
        y = e.clientY;
        document.body.classList.add("premium-pointer");
      },
      { passive: true, signal },
    );
    raf = requestAnimationFrame(loop);
    signal.addEventListener("abort", () => cancelAnimationFrame(raf));
  }

  // 3. active nav link tracking
  const navAnchors = Array.from(
    document.querySelectorAll<HTMLAnchorElement>("#navLinks a[href^='#']"),
  );
  const sections = navAnchors
    .map((a) => document.querySelector(a.getAttribute("href") || ""))
    .filter(Boolean) as Element[];
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navAnchors.forEach((a) =>
          a.classList.toggle("is-active", a.getAttribute("href") === "#" + entry.target.id),
        );
      });
    },
    { rootMargin: "-45% 0px -50% 0px" },
  );
  sections.forEach((s) => navObserver.observe(s));

  // 4. extra scroll reveals for blocks the original markup did not mark
  const extras = document.querySelectorAll<HTMLElement>(
    ".press-card, .partner-marquee, .footer-top, .footer-bottom, .waveform-row, .hero-divider, .elvin-mode, .elvin-cap-card, .elvin-part-card, .person, .blog-card, .elvin-featured, .elvin-stats, .partner-grid, .elvin-product-stage, .contact-visual, .tech-visual, .elvin-press, .elvin-side, .partners-foot, .tech-features, .hero-stats",
  );
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in");
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.01, rootMargin: "120px 0px 45% 0px" },
  );
  const vh = window.innerHeight || 0;
  extras.forEach((el) => {
    if (el.classList.contains("hero-anim")) return;
    if (el.classList.contains("reveal") || el.closest(".reveal-stagger")) return;
    el.classList.add("premium-reveal");
    const r = el.getBoundingClientRect();
    if (r.top < vh * 1.35 && r.bottom > -vh * 0.2) {
      el.classList.add("in");
      return;
    }
    revealObserver.observe(el);
  });
  document.documentElement.classList.add("js-reveals");

  // 5. subtle tilt on the product render
  const media = document.querySelector<HTMLElement>(".product-media");
  if (media && !reduce) {
    media.addEventListener(
      "pointermove",
      (e: PointerEvent) => {
        const r = media.getBoundingClientRect();
        const rx = ((e.clientY - r.top) / r.height - 0.5) * -5;
        const ry = ((e.clientX - r.left) / r.width - 0.5) * 6;
        media.style.transform = `perspective(1100px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      },
      { signal },
    );
    media.addEventListener(
      "pointerleave",
      () => {
        media.style.transform = "";
      },
      { signal },
    );
  }

  // 5b. pointer tilt on the 3D product stage (front/back faces)
  const product3DStage = document.getElementById("product3DStage") as HTMLElement | null;
  if (
    product3DStage &&
    !reduce &&
    window.matchMedia("(hover: hover) and (min-width: 861px)").matches
  ) {
    let raf = 0;
    let nextRx = 0;
    let nextRy = 0;
    const apply = () => {
      raf = 0;
      product3DStage.style.setProperty("--tiltX", `${nextRx}deg`);
      product3DStage.style.setProperty("--tiltY", `${nextRy}deg`);
    };
    product3DStage.addEventListener(
      "pointermove",
      (e: PointerEvent) => {
        const r = product3DStage.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        nextRx = (0.5 - py) * 6;
        nextRy = (px - 0.5) * 10;
        if (!raf) raf = requestAnimationFrame(apply);
      },
      { signal },
    );
    product3DStage.addEventListener(
      "pointerleave",
      () => {
        product3DStage.style.setProperty("--tiltX", `0deg`);
        product3DStage.style.setProperty("--tiltY", `0deg`);
      },
      { signal },
    );
  }

  // 6. hero + product parallax (no scroll-jacking)
  const heroSection = document.querySelector<HTMLElement>(".hero.rf-hero") || document.querySelector<HTMLElement>(".hero");
  const heroVisualEl = document.querySelector<HTMLElement>(".rf-hero-visual");

  let heroTiltX = 0;
  let heroTiltY = 0;
  const applyHeroStage = () => {
    if (!heroVisualEl || reduce) return;
    const y = window.scrollY;
    const par = Math.max(-20, Math.min(20, y * 0.06));
    heroVisualEl.style.setProperty("--hero-par-y", `${par}px`);
    heroVisualEl.style.setProperty("--hero-tilt-x", `${heroTiltX}deg`);
    heroVisualEl.style.setProperty("--hero-tilt-y", `${heroTiltY}deg`);
  };

  const heroEmblem = document.querySelector<HTMLElement>(".hero-emblem");
  const heroProductImg = document.getElementById("heroProductImg") as HTMLImageElement | null;
  const heroProductStage = document.getElementById("heroProductStage") as HTMLElement | null;
  const heroVisual = document.querySelector<HTMLElement>(".hero-visual");
  const heroVisualGlow = document.querySelector<HTMLElement>(".hero-visual-glow");
  const techProductImg = document.getElementById("techProductImg") as HTMLImageElement | null;
  const techVisual = document.querySelector<HTMLElement>(".tech-visual");
  const techSection = document.getElementById("about");
  const productImg = document.getElementById("productHeroImg") as HTMLImageElement | null;
  const productBackImg = document.getElementById("productHeroImgBack") as HTMLImageElement | null;
  const productLeftImg = document.getElementById("productHeroImgLeft") as HTMLImageElement | null;
  const productRightImg = document.getElementById("productHeroImgRight") as HTMLImageElement | null;
  const rtl = document.documentElement.dir === "rtl";

  if (techVisual && techProductImg && !reduce) {
    const techIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          techVisual.classList.add("is-visible");
          techProductImg.classList.add("is-visible");
          techIo.unobserve(entry.target);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    techIo.observe(techVisual);
    signal.addEventListener("abort", () => techIo.disconnect());
  }

  const onParallax = () => {
    if (reduce) return;
    const y = window.scrollY;
    const view = window.innerHeight || 1;
    applyHeroStage();
    if (heroVisualGlow && y < view * 1.25) {
      heroVisualGlow.style.transform = `translate3d(0, ${y * 0.04}px, 0) scale(${1 + y * 0.00008})`;
    }
    if (heroEmblem) {
      const x = rtl ? y * 0.04 : y * -0.04;
      heroEmblem.style.transform = `translate3d(${x}px, calc(-50% + ${y * 0.08}px), 0)`;
    }
    if (techProductImg && techSection && techVisual?.classList.contains("is-visible")) {
      const rect = techSection.getBoundingClientRect();
      if (rect.top < view && rect.bottom > 0) {
        const span = rect.height + view;
        const progress = Math.max(0, Math.min(1, (view - rect.top) / span));
        const drift = progress * 20;
        const scale = 0.97 + progress * 0.03;
        techProductImg.style.transform = `translate3d(0, ${drift}px, 0) scale(${scale})`;
      }
    }
    if (product3DStage) {
      const productSection = document.getElementById("product");
      const rect = product3DStage.getBoundingClientRect();
      const view = window.innerHeight || 1;
      let progress = Math.max(-1, Math.min(1, (view / 2 - rect.top) / view));

      // Full rotation while scrolling through the product section
      if (productSection) {
        const sec = productSection.getBoundingClientRect();
        const span = Math.max(1, sec.height - view * 0.35);
        const sectionProgress = Math.max(0, Math.min(1, (view * 0.25 - sec.top) / span));
        progress = sectionProgress * 2 - 1;
        product3DStage.classList.toggle("is-spinning", sectionProgress > 0.08 && sectionProgress < 0.92);
      }

      const spinY = progress * (rtl ? -360 : 360);
      product3DStage.style.setProperty("--spinY", `${spinY}deg`);
      product3DStage.style.setProperty("--spinX", `${Math.sin(progress * Math.PI) * -12}deg`);
      product3DStage.style.setProperty("--floatY", `${Math.abs(progress) * -18}px`);

      const hudAxis = document.getElementById("hudAxis");
      if (hudAxis) {
        const deg = Math.round(((spinY % 360) + 360) % 360);
        hudAxis.textContent = `AXIS Y · ${deg}°`;
      }
    } else if (productImg) {
      // Fallback if the 3D wrapper isn't present for some reason.
      const rect = productImg.getBoundingClientRect();
      const view = window.innerHeight || 1;
      const progress = Math.max(-1, Math.min(1, (view / 2 - rect.top) / view));
      productImg.style.transform = `scale(${1 + progress * 0.06}) rotate(${progress * (rtl ? -3 : 3)}deg)`;
    }
  };
  if (!reduce) {
    window.addEventListener("scroll", onParallax, { passive: true, signal });
    onParallax();
  }

  if (heroVisualEl && !reduce && window.matchMedia("(hover: hover) and (min-width: 1024px)").matches) {
    let tiltRaf = 0;
    const queueTilt = () => {
      if (tiltRaf) return;
      tiltRaf = requestAnimationFrame(() => {
        tiltRaf = 0;
        applyHeroStage();
      });
    };
    heroVisualEl.addEventListener(
      "pointermove",
      (event: PointerEvent) => {
        const rect = heroVisualEl.getBoundingClientRect();
        const px = (event.clientX - rect.left) / Math.max(1, rect.width) - 0.5;
        const py = (event.clientY - rect.top) / Math.max(1, rect.height) - 0.5;
        heroTiltX = py * -5;
        heroTiltY = px * 6;
        queueTilt();
      },
      { signal },
    );
    heroVisualEl.addEventListener(
      "pointerleave",
      () => {
        heroTiltX = 0;
        heroTiltY = 0;
        queueTilt();
      },
      { signal },
    );
  }

  if (heroVisual && heroProductStage && !reduce) {
    heroVisual.addEventListener(
      "pointermove",
      (event) => {
        const rect = heroVisual.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        heroProductStage.style.transform = `translate3d(${x * 14}px, ${y * 10}px, 0)`;
      },
      { signal },
    );
    heroVisual.addEventListener(
      "pointerleave",
      () => {
        heroProductStage.style.transform = "";
      },
      { signal },
    );
  }

  // hero feature ticks + rail (Elvin pattern)
  const heroTicks = Array.from(document.querySelectorAll<HTMLButtonElement>("#heroTicks button"));
  const heroRails = Array.from(document.querySelectorAll<HTMLAnchorElement>(".hero .hero-rail-item"));
  let heroPinned = false;
  const setHeroFeature = (i: number, src?: string) => {
    const index = Math.max(0, Math.min(heroRails.length - 1, i));
    heroTicks.forEach((t, n) => t.classList.toggle("is-active", n === index));
    heroRails.forEach((t, n) => t.classList.toggle("is-active", n === index));
    const nextSrc = src || heroRails[index]?.dataset.src;
    if (heroProductImg && nextSrc) {
      const abs = new URL(nextSrc, window.location.href).href;
      if (heroProductImg.src !== abs) heroProductImg.src = nextSrc;
    }
  };
  heroRails.forEach((item, i) => {
    const activate = () => {
      heroPinned = true;
      setHeroFeature(i, item.dataset.src);
    };
    item.addEventListener("mouseenter", activate, { signal });
    item.addEventListener("focus", activate, { signal });
  });
  document.querySelector(".hero-rail")?.addEventListener(
    "mouseleave",
    () => {
      heroPinned = false;
    },
    { signal },
  );
  heroTicks.forEach((btn) => {
    btn.addEventListener(
      "click",
      () => {
        heroPinned = true;
        setHeroFeature(Number(btn.dataset.index || 0));
      },
      { signal },
    );
  });
  const syncHeroTicksFromScroll = () => {
    if (!heroSection || heroPinned || !heroRails.length) return;
    const r = heroSection.getBoundingClientRect();
    const span = Math.max(1, r.height * 0.8);
    const progress = Math.max(0, Math.min(0.999, -r.top / span));
    setHeroFeature(Math.floor(progress * heroRails.length));
  };
  window.addEventListener("scroll", syncHeroTicksFromScroll, { passive: true, signal });

  // 7. hero stat count-up
  if (!reduce) {
    const stats = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".hero-stats [data-count], .rf-hero-stats [data-count], .ux-stats [data-count]",
      ),
    );
    const runCount = (el: HTMLElement) => {
      const target = Number(el.dataset.count || 0);
      const suffix = el.dataset.suffix || "";
      if (!target) return;
      const start = performance.now();
      const dur = 1100;
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    if (stats.length) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.querySelectorAll<HTMLElement>("[data-count]").forEach(runCount);
            io.unobserve(entry.target);
          });
        },
        { threshold: 0.4 },
      );
      const wrap = document.querySelector(".hero-stats, .rf-hero-stats, .ux-stats");
      if (wrap) io.observe(wrap);
      signal.addEventListener("abort", () => io.disconnect());
    }
  }

  // 8. product angles + pinned callouts
  const setProductSrc = (src?: string, alt?: string) => {
    if (!src) return;
    if (productImg) {
      productImg.src = src;
      if (alt) productImg.alt = alt;
    }
    // Keep back-face texture in sync for the 3D rotate illusion.
    if (productBackImg) {
      productBackImg.src = src;
    }
    if (productLeftImg) {
      productLeftImg.src = src;
    }
    if (productRightImg) {
      productRightImg.src = src;
    }
  };
  document.querySelectorAll<HTMLButtonElement>(".product-angle-btn").forEach((btn) => {
    btn.addEventListener(
      "click",
      () => {
        document.querySelectorAll(".product-angle-btn").forEach((b) => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        setProductSrc(btn.dataset.src, btn.dataset.alt);
      },
      { signal },
    );
  });
  const callouts = Array.from(document.querySelectorAll<HTMLElement>(".product-callout"));
  const hudJoint = document.getElementById("hudJoint");
  const hudMode = document.getElementById("hudMode");
  const jointLabels = ["HIP MODULE", "KNEE ACTUATOR", "ANKLE SUPPORT", "CONTROL UNIT"];
  const modeLabels = ["ASSIST", "WALK", "STAND", "EXERCISE"];
  if (callouts.length && !reduce && !document.querySelector("#astrek-site #productCallouts")) {
    const calloutIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          callouts.forEach((c, i) => {
            const active = c === entry.target;
            c.classList.toggle("is-active", active);
            if (active) {
              if (hudJoint) hudJoint.textContent = `JOINT · ${jointLabels[i] || "SYSTEM"}`;
              if (hudMode) hudMode.textContent = `MODE · ${modeLabels[i] || "ASSIST"}`;
            }
          });
          const src = (entry.target as HTMLElement).dataset.src;
          if (src) setProductSrc(src);
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0.4 },
    );
    callouts.forEach((c) => calloutIo.observe(c));
    signal.addEventListener("abort", () => calloutIo.disconnect());
  }

  // 8. testimonial carousel
  const track = document.getElementById("testimonialGrid");
  const dotsWrap = document.getElementById("testimonialDots");
  const prev = document.getElementById("testimonialPrev");
  const next = document.getElementById("testimonialNext");
  if (track && dotsWrap) {
    const quoteEl = document.getElementById("storyQuote");
    const nameEl = document.getElementById("storyName");
    const roleEl = document.getElementById("storyRole");
    const cards = () => Array.from(track.querySelectorAll<HTMLElement>(".testimonial-card"));
    let index = 0;
    const go = (i: number) => {
      const items = cards();
      if (!items.length) return;
      index = (i + items.length) % items.length;
      items.forEach((card, di) => card.classList.toggle("is-active", di === index));
      const active = items[index];
      const text = active.querySelector(".testimonial-text")?.textContent?.trim() || "";
      const name = active.querySelector(".testimonial-author strong")?.textContent?.trim() || "";
      const role = active.querySelector(".testimonial-author span")?.textContent?.trim() || "";
      if (quoteEl) quoteEl.textContent = text;
      if (nameEl) nameEl.textContent = name;
      if (roleEl) roleEl.textContent = role;
      dotsWrap.querySelectorAll("button").forEach((d, di) => d.classList.toggle("is-active", di === index));
    };
    const rebuildDots = () => {
      dotsWrap.innerHTML = cards()
        .map(
          (_, i) =>
            `<button type="button" aria-label="Story ${i + 1}"${i === 0 ? ' class="is-active"' : ""}>${CAROUSEL_DOT_SVG}</button>`,
        )
        .join("");
      dotsWrap.querySelectorAll("button").forEach((d, i) =>
        d.addEventListener("click", () => go(i), { signal }),
      );
    };
    rebuildDots();
    prev?.addEventListener("click", () => go(index - 1), { signal });
    next?.addEventListener("click", () => go(index + 1), { signal });
    track.addEventListener("testimonials:updated", () => {
      rebuildDots();
      go(0);
    });
  }

  // 8. partners logo cascade spotlight on scroll
  const partnersSection = document.getElementById("partners");
  const partnerGrid = partnersSection?.querySelector<HTMLElement>(".partner-grid");
  const partnerLogos = partnerGrid?.querySelectorAll<HTMLElement>(".partner-logo");
  if (partnersSection && partnerGrid && partnerLogos?.length && !reduce) {
    let cascaded = false;
    const runCascade = () => {
      if (cascaded) return;
      cascaded = true;
      partnerLogos.forEach((logo, i) => {
        window.setTimeout(() => {
          logo.classList.add("is-lit");
          window.setTimeout(() => logo.classList.remove("is-lit"), 780);
        }, 520 + i * 62);
      });
    };
    const startCascade = () => {
      if (partnerGrid.classList.contains("in")) {
        runCascade();
        return;
      }
      const mo = new MutationObserver(() => {
        if (!partnerGrid.classList.contains("in")) return;
        mo.disconnect();
        runCascade();
      });
      mo.observe(partnerGrid, { attributes: true, attributeFilter: ["class"] });
      signal.addEventListener("abort", () => mo.disconnect());
    };
    const partnersIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          startCascade();
          partnersIo.disconnect();
        });
      },
      { threshold: 0.22 },
    );
    partnersIo.observe(partnersSection);
    signal.addEventListener("abort", () => partnersIo.disconnect());
  }

  // finishing touch: header gains a "scrolled" state for glass/shadow styling
  const header = document.getElementById("siteHeader");
  if (header) {
    const onHeaderScroll = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    window.addEventListener("scroll", onHeaderScroll, { passive: true, signal });
    onHeaderScroll();
  }

  // finishing touch: subtle magnetic lift on primary CTAs (desktop pointer only)
  if (!reduce && window.matchMedia("(hover: hover) and (min-width: 861px)").matches) {
    const magnets = document.querySelectorAll<HTMLElement>(".cta-btn, .hero-cta");
    magnets.forEach((el) => {
      const onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const mx = e.clientX - r.left - r.width / 2;
        const my = e.clientY - r.top - r.height / 2;
        el.style.transform = `translate(${mx * 0.08}px, ${my * 0.16 - 2}px)`;
      };
      const onLeave = () => {
        el.style.transform = "";
      };
      el.addEventListener("pointermove", onMove, { signal });
      el.addEventListener("pointerleave", onLeave, { signal });
    });
  }

  // Hero HUD telemetry flicker (robotic live readout)
  const heroHudTorque = document.getElementById("heroHudTorque");
  const heroHudStatus = document.getElementById("heroHudStatus");
  if (!reduce && (heroHudTorque || heroHudStatus)) {
    const statuses = ["Gait assist online", "Joint sync active", "Stride calibrated", "Assist mode ready"];
    let tick = 0;
    const hudTimer = window.setInterval(() => {
      tick += 1;
      if (heroHudTorque) {
        const v = 88 + Math.round(Math.sin(tick * 0.7) * 6 + Math.random() * 4);
        heroHudTorque.textContent = `TORQUE ${v}%`;
      }
      if (heroHudStatus && tick % 4 === 0) {
        heroHudStatus.textContent = statuses[(tick / 4) % statuses.length];
      }
    }, 900);
    signal.addEventListener("abort", () => window.clearInterval(hudTimer));
  }

  return () => {
    ac.abort();
    navObserver.disconnect();
    revealObserver.disconnect();
    created.forEach((el) => el.remove());
    document.body.classList.remove("premium-pointer");
  };
}
