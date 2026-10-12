import { useEffect, useMemo, useState } from "react";

import { BrandArrowExt, BrandChevLeft } from "./BrandIcons";
import { loadCms } from "./apply-cms";
import {
  BLOG_CATEGORIES,
  BLOG_POSTS,
  normalizeCategory,
  type BlogPost,
} from "./blog-data";
import type { Locale } from "./i18n";
import { localizeHref } from "./i18n";
import { MechChrome } from "./MechChrome";
import { translate as tr } from "./translations";

const FILTERS = ["All", ...BLOG_CATEGORIES] as const;

const READ_MINS: Record<string, string> = {
  "inside-our-first-clinical-pilot": "7 min read",
  "what-motion-capture-teaches-us-about-gait": "6 min read",
  "building-astrek-from-startup-chile-to-kannur": "4 min read",
  "astrek-at-huddle-2025": "4 min read",
  "showcasing-unik-exo-at-amala-medex": "3 min read",
  "designing-unik-exo-for-clinic-floor-donning": "4 min read",
  "what-clinics-look-for-in-lower-limb-robotics": "4 min read",
};

function linkText(locale: Locale, phrase: string) {
  return tr(locale, phrase).replace(/^[←→]\s*/, "").replace(/\s*[↗→←]\s*$/, "");
}

export function BlogListPage({ locale }: { locale: Locale }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [allPosts, setAllPosts] = useState<BlogPost[]>(BLOG_POSTS);

  useEffect(() => {
    const ac = new AbortController();
    loadCms(ac.signal)
      .then((cms) => {
        if (cms?.posts.length) setAllPosts(cms.posts);
      })
      .catch(() => {});
    return () => ac.abort();
  }, []);

  const posts = useMemo(
    () =>
      filter === "All"
        ? allPosts
        : allPosts.filter((p) => normalizeCategory(p.tag) === filter),
    [filter, allPosts],
  );
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <MechChrome locale={locale}>
      <section className="page-hero">
        <div className="wrap">
          <div className="elvin-head-row">
            <div className="section-head">
              <span className="section-tag mono">{tr(locale, "Blog")}</span>
              <h1>
                {tr(locale, "Blog")}
              </h1>
              <p>
                {tr(
                  locale,
                  "Company updates, technology articles, product stories, rehabilitation robotics, industry insights, and event announcements from Astrek Innovations.",
                )}
              </p>
            </div>
            <p style={{ color: "var(--lo)" }}>
              {tr(
                locale,
                "We share what we learn from labs, clinics and real-world impact to accelerate innovation that matters.",
              )}
            </p>
          </div>
          <div className="elvin-filters">
            {FILTERS.map((item) => (
              <button
                key={item}
                type="button"
                className={item === filter ? "is-active" : undefined}
                onClick={() => setFilter(item)}
              >
                {tr(locale, item)}
              </button>
            ))}
            <span style={{ flex: 1 }} />
            <a className="elvin-outline" href={localizeHref(locale, "/blog")}>
              {linkText(locale, "View all articles ↗")}
              <BrandArrowExt />
            </a>
          </div>
          <div className="elvin-blog">
            {!featured ? (
              <p className="blog-empty" style={{ color: "var(--lo)" }}>
                {tr(locale, "No posts in this category yet.")}
              </p>
            ) : null}
            {featured ? (
              <a
                href={localizeHref(locale, `/blog/${featured.slug}`)}
                className="blog-card"
                style={{ textDecoration: "none" }}
              >
                <div
                  className="blog-cover"
                  style={{ backgroundImage: `url(${featured.image})`, minHeight: 280 }}
                >
                  <span className="tag mono">{tr(locale, "FEATURED")}</span>
                </div>
                <div className="blog-body">
                  <div className="date mono" style={{ color: "var(--teal)" }}>
                    {tr(locale, normalizeCategory(featured.tag))}
                  </div>
                  <h4>{tr(locale, featured.title)}</h4>
                  <p>{tr(locale, featured.excerpt)}</p>
                  <div className="date mono">
                    {tr(locale, featured.date)} · {tr(locale, READ_MINS[featured.slug] || "5 min read")}
                  </div>
                  <span className="elvin-link">
                    {linkText(locale, "Read article ↗")}
                    <BrandArrowExt />
                  </span>
                </div>
              </a>
            ) : null}
            <div className="elvin-blog-list">
              {rest.map((post) => (
                <a
                  key={post.slug}
                  href={localizeHref(locale, `/blog/${post.slug}`)}
                  className="elvin-blog-row"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div className="thumb" style={{ backgroundImage: `url(${post.image})` }} />
                  <div>
                    <div className="date mono" style={{ color: "var(--teal)" }}>
                    {tr(locale, normalizeCategory(post.tag))}
                    </div>
                    <h4>{tr(locale, post.title)}</h4>
                    <div className="date mono">
                      {tr(locale, post.date)} · {tr(locale, READ_MINS[post.slug] || "5 min read")}
                    </div>
                    <span className="elvin-link">
                    {linkText(locale, "Read article ↗")}
                    <BrandArrowExt />
                  </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
          <div className="elvin-news">
            <div>
              {tr(locale, "We believe in sharing knowledge")}{" "}
              <em>{tr(locale, "that creates meaningful progress.")}</em>
            </div>
            <p style={{ color: "var(--lo)", margin: 0 }}>
              {tr(locale, "Stay updated with our latest insights on robotics, research and impact.")}
            </p>
            <p style={{ color: "var(--lo2)", fontSize: 12, margin: 0 }}>
              {tr(locale, "Use the form in the footer. No spam. Unsubscribe anytime.")}
            </p>
          </div>
        </div>
      </section>
    </MechChrome>
  );
}

export function BlogArticlePage({
  locale,
  post,
  slug,
}: {
  locale: Locale;
  post?: BlogPost | null;
  slug?: string;
}) {
  const [resolved, setResolved] = useState<BlogPost | null>(post ?? null);
  const [checked, setChecked] = useState(Boolean(post));

  useEffect(() => {
    const ac = new AbortController();
    loadCms(ac.signal)
      .then((cms) => {
        const found = cms?.posts.find((item) => item.slug === slug);
        if (found) setResolved(found);
        else if (!post) setResolved(null);
      })
      .catch(() => {})
      .finally(() => setChecked(true));
    return () => ac.abort();
  }, [slug, post]);

  if (!resolved && !checked) {
    return (
      <MechChrome locale={locale}>
        <article className="article-wrap">
          <p>{tr(locale, "Loading article…")}</p>
        </article>
      </MechChrome>
    );
  }

  if (!resolved) {
    return (
      <MechChrome locale={locale}>
        <article className="article-wrap">
          <a href={localizeHref(locale, "/blog")} className="back-link">
            <BrandChevLeft />
            {linkText(locale, "← Back to journal")}
          </a>
          <h1>{tr(locale, "Article not found")}</h1>
          <p>{tr(locale, "This post is not available. Return to the blog for the latest articles.")}</p>
        </article>
      </MechChrome>
    );
  }

  return (
    <MechChrome locale={locale}>
      <article className="article-wrap">
        <a href={localizeHref(locale, "/blog")} className="back-link">
          <BrandChevLeft />
          {linkText(locale, "← Back to journal")}
        </a>
        <span className="tag mono">{tr(locale, normalizeCategory(resolved.tag))}</span>
        <h1>{tr(locale, resolved.title)}</h1>
        <div className="date mono">{tr(locale, resolved.date)}</div>
        <div className="article-cover" style={{ backgroundImage: `url(${resolved.image})` }} />
        <div className="article-body">{tr(locale, resolved.body)}</div>
      </article>
    </MechChrome>
  );
}
