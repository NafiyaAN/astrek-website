import { useEffect, useState } from "react";

import { BrandArrow, BrandChevDown, BrandChevUp } from "./BrandIcons";
import type { Locale } from "./i18n";
import { localizeHref } from "./i18n";
import { MechChrome } from "./MechChrome";
import type { Testimonial } from "./testimonial-data";
import { TESTIMONIALS } from "./testimonial-data";
import { translate as tr } from "./translations";

function getInitials(name: string): string {
  const words = name.replace(/^Dr\.?\s+/i, "").trim().split(/\s+/);
  const letters = words.slice(0, 2).map((w) => w[0]?.toUpperCase() ?? "");
  return letters.join("") || "?";
}

/** Initials (or a real portrait) for picker chips. Never falls back to a
 *  product photo: that reads as an inauthentic “face” for a named quote. */
function TestimonialAvatar({ testimonial }: { testimonial: Testimonial }) {
  if (testimonial.photo) {
    return <img src={testimonial.photo} alt="" className="testimonial-avatar-img" />;
  }
  return (
    <div className="testimonial-avatar testimonial-avatar--sm" aria-hidden="true">
      <span>{getInitials(testimonial.name)}</span>
    </div>
  );
}

export function TestimonialsPage({ locale }: { locale: Locale }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
      event.preventDefault();
      const delta = event.key === "ArrowRight" ? 1 : TESTIMONIALS.length - 1;
      setIndex((current) => (current + delta) % TESTIMONIALS.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const story = TESTIMONIALS[index];
  const go = (next: number) => {
    setIndex((next + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <MechChrome locale={locale}>
      <section className="page-hero">
        <div className="wrap">
          <div className="elvin-story">
            <div className={`elvin-story-visual${story.photo ? "" : " elvin-story-visual--solo"}`}>
              {story.photo ? <img src={story.photo} alt={story.name} /> : null}
              <img src={story.storyImage} alt="Unik Exo in a clinical session" />
            </div>
            <div className="elvin-story-copy">
              <span className="section-tag mono">{tr(locale, "Testimonials")}</span>
              <h1>{tr(locale, "Every step tells a story.")}</h1>
              <div className="quote-mark">“</div>
              <blockquote className="testimonial-text">{tr(locale, story.quote)}</blockquote>
              <div className="rule" />
              <div className="testimonial-author">
                <strong>{story.name}</strong>
                <span>{tr(locale, story.role)}</span>
                {story.location ? <span>{tr(locale, story.location)}</span> : null}
              </div>
            </div>
            <div className="elvin-pager">
              {TESTIMONIALS.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  className={i === index ? "is-active" : undefined}
                  aria-current={i === index ? "true" : undefined}
                  onClick={() => setIndex(i)}
                >
                  {String(i + 1).padStart(2, "0")}
                </button>
              ))}
              <button type="button" aria-label={tr(locale, "Previous story")} onClick={() => go(index - 1)}>
                <BrandChevUp />
              </button>
              <button type="button" aria-label={tr(locale, "Next story")} onClick={() => go(index + 1)}>
                <BrandChevDown />
              </button>
            </div>
          </div>

          <div className="elvin-story-picker">
            {TESTIMONIALS.map((item, i) => (
              <button
                key={item.id}
                type="button"
                className={`elvin-story-chip${i === index ? " is-active" : ""}`}
                aria-pressed={i === index}
                onClick={() => setIndex(i)}
              >
                <TestimonialAvatar testimonial={item} />
                <span>
                  <em>{String(i + 1).padStart(2, "0")}</em>
                  <strong>{item.name}</strong>
                  <small>
                  {tr(locale, item.role)}
                    {item.location ? ` · ${tr(locale, item.location)}` : ""}
                  </small>
                </span>
              </button>
            ))}
          </div>

          <div className="elvin-banner" style={{ marginTop: 36 }}>
            <div>
              {tr(locale, "Every recovery has a first step.")}
              <br />
              <strong>{tr(locale, "These are the people who took it.")}</strong>
            </div>
            <a className="elvin-link" href={localizeHref(locale, "/#contact")}>
              {tr(locale, "Share your story →").replace(/\s*[↗→←]\s*$/, "")}
              <BrandArrow />
            </a>
          </div>
        </div>
      </section>
    </MechChrome>
  );
}
