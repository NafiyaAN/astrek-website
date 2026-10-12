/**
 * Astrek Atelier: product-page motion & annotation layer.
 * Framer Motion is loaded only in the browser (dynamic import) so SSR stays clean.
 */

export function initAstrekAtelier(): () => void {
  const ac = new AbortController();
  const { signal } = ac;
  const site = document.getElementById("astrek-site");
  if (!site) return () => ac.abort();

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  site.classList.add("js-atelier");

  paintAnnotationLines(site);
  enhanceFaq(site, signal, reduce);
  enhancePressPills(site);

  if (!reduce) {
    void import("framer-motion")
      .then((motion) => {
        if (signal.aborted) return;
        revealSections(site, signal, motion.animate, motion.inView);
      })
      .catch(() => {
        if (signal.aborted) return;
        revealSections(site, signal);
      });
  }

  const retry = window.setTimeout(() => paintAnnotationLines(site), 80);
  signal.addEventListener("abort", () => window.clearTimeout(retry));

  return () => ac.abort();
}

function revealSections(
  site: HTMLElement,
  signal: AbortSignal,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  animateFn?: (...args: any[]) => unknown,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  inViewFn?: (...args: any[]) => () => void,
) {
  const sections = Array.from(
    site.querySelectorAll<HTMLElement>(":scope > section, :scope > .rf-cta-band, :scope > footer"),
  );

  sections.forEach((section) => {
    if (section.matches(".hero, .hero--tronix")) return;
    pickChildren(section).forEach((el) => el.classList.add("atelier-wait"));
  });

  const played = new WeakSet<HTMLElement>();
  const play = (section: HTMLElement) => {
    if (played.has(section)) return;
    played.add(section);
    const kids = pickChildren(section);
    if (!kids.length) {
      section.classList.remove("atelier-wait");
      section.classList.add("atelier-in");
      return;
    }
    kids.forEach((el, i) => {
      el.style.setProperty("transition-delay", `${i * 80}ms`);
      el.classList.add("atelier-fade", "atelier-in");
      el.classList.remove("atelier-wait");
    });
    animateFn?.(
      kids,
      { opacity: [0, 1], y: [24, 0] },
      {
        duration: 0.5,
        delay: (i: number) => i * 0.08,
        ease: [0.16, 1, 0.3, 1],
      },
    );
  };

  const stops: Array<() => void> = [];

  if (inViewFn) {
    sections.forEach((section) => {
      if (section.matches(".hero, .hero--tronix")) return;
      const stop = inViewFn(
        section,
        () => {
          play(section);
        },
        { margin: "0px 0px -10% 0px", amount: 0.08 },
      );
      stops.push(stop);
    });
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          io.unobserve(entry.target);
          play(entry.target as HTMLElement);
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
    );
    sections.forEach((section) => {
      if (section.matches(".hero, .hero--tronix")) return;
      io.observe(section);
    });
    signal.addEventListener("abort", () => io.disconnect());
  }

  const failsafe = window.setTimeout(() => {
    site.querySelectorAll<HTMLElement>(".atelier-wait").forEach((el) => {
      el.classList.add("atelier-in");
      el.classList.remove("atelier-wait");
    });
  }, 2800);

  signal.addEventListener("abort", () => {
    stops.forEach((stop) => stop());
    window.clearTimeout(failsafe);
  });
}

function pickChildren(section: HTMLElement): HTMLElement[] {
  const selectors = [
    ".rf-section-head",
    ".rf-product-intro",
    ".flag-explode-stage",
    ".flag-explode-item",
    ".rf-product-stage",
    ".rf-point",
    ".ux-stat",
    ".rf-mode-card",
    ".rf-story-media",
    ".rf-story-copy",
    ".rf-person",
    ".partner-logo",
    ".rf-press-featured",
    ".rf-press-side > a",
    ".rf-blog-featured",
    ".rf-blog-card",
    ".rf-blog-row",
    ".rf-faq-item",
    ".rf-cta-inner > *",
    ".rf-contact-grid > *",
    ".rf-foot > div",
  ].join(", ");

  const found = Array.from(section.querySelectorAll<HTMLElement>(selectors));
  if (found.length) return found.slice(0, 16);

  return Array.from(section.querySelectorAll<HTMLElement>(":scope > .wrap > *, :scope > *")).filter(
    (el) => !el.matches("script, style, nav"),
  ).slice(0, 8);
}

function paintAnnotationLines(site: HTMLElement) {
  site.querySelectorAll<HTMLElement>(".flag-hotspots").forEach((layer) => {
    if (layer.querySelector(".atelier-anno")) return;
    const pins = Array.from(layer.querySelectorAll<HTMLElement>(".flag-hot"));
    if (!pins.length) return;

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "atelier-anno");
    svg.setAttribute("viewBox", "0 0 100 100");
    svg.setAttribute("preserveAspectRatio", "none");
    svg.setAttribute("aria-hidden", "true");

    const lines: SVGLineElement[] = [];
    pins.forEach((pin, i) => {
      const x = parseFloat(pin.style.getPropertyValue("--x")) || 50;
      const y = parseFloat(pin.style.getPropertyValue("--y")) || 50;
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", String(x));
      line.setAttribute("y1", String(y));
      line.setAttribute("x2", "97");
      line.setAttribute("y2", String(y));
      line.setAttribute("class", `atelier-anno-line${i === 0 ? " is-on" : ""}`);
      svg.appendChild(line);
      lines.push(line);
    });

    layer.prepend(svg);

    const sync = () => {
      pins.forEach((pin, i) => {
        lines[i]?.classList.toggle("is-on", pin.classList.contains("is-on"));
      });
    };

    pins.forEach((pin) => {
      pin.addEventListener("click", () => window.setTimeout(sync, 0));
    });

    const stage = layer.closest(".rf-product-stage, .flag-explode-stage");
    stage
      ?.querySelectorAll(".rf-point, .flag-explode-item")
      .forEach((el) => el.addEventListener("click", () => window.setTimeout(sync, 0)));

    const parent = layer.closest("#product, #about, #specs") ?? site;
    parent.querySelectorAll(".rf-point, .flag-explode-item").forEach((el) => {
      el.addEventListener("click", () => window.setTimeout(sync, 0));
    });
  });
}

function enhanceFaq(site: HTMLElement, signal: AbortSignal, reduce: boolean) {
  site.querySelectorAll<HTMLDetailsElement>(".rf-faq-item").forEach((item) => {
    const summary = item.querySelector("summary");
    if (!summary) return;

    let body = item.querySelector<HTMLElement>(".rf-faq-body");
    if (!body) {
      body = document.createElement("div");
      body.className = "rf-faq-body";
      const rest = Array.from(item.childNodes).filter((n) => n !== summary);
      rest.forEach((n) => body!.appendChild(n));
      item.appendChild(body);
    }

    if (reduce) return;

    body.style.gridTemplateRows = item.open ? "1fr" : "0fr";
    body.style.opacity = item.open ? "1" : "0";
    if (item.open) item.classList.add("is-open");

    summary.addEventListener(
      "click",
      (e) => {
        e.preventDefault();
        const opening = !item.open;
        site.querySelectorAll<HTMLDetailsElement>(".rf-faq-item").forEach((other) => {
          if (other !== item && other.open) closeFaq(other);
        });
        if (opening) openFaq(item);
        else closeFaq(item);
      },
      { signal },
    );
  });
}

function openFaq(item: HTMLDetailsElement) {
  const body = item.querySelector<HTMLElement>(".rf-faq-body");
  item.open = true;
  item.classList.add("is-open");
  if (!body) return;
  body.style.gridTemplateRows = "1fr";
  body.style.opacity = "1";
}

function closeFaq(item: HTMLDetailsElement) {
  const body = item.querySelector<HTMLElement>(".rf-faq-body");
  item.classList.remove("is-open");
  if (body) {
    body.style.gridTemplateRows = "0fr";
    body.style.opacity = "0";
  }
  window.setTimeout(() => {
    item.open = false;
  }, 200);
}

function enhancePressPills(site: HTMLElement) {
  site.querySelectorAll<HTMLAnchorElement>(".rf-press-side > a").forEach((link) => {
    if (link.querySelector(".atelier-pill")) return;
    const source = link.querySelector(".rf-text-link")?.textContent?.trim();
    if (!source) return;
    const pill = document.createElement("span");
    pill.className = "atelier-pill";
    pill.textContent = source;
    link.prepend(pill);
  });
}
