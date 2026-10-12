import { useEffect, useState } from "react";

import type { Locale } from "./i18n";
import { localizeHref } from "./i18n";
import { BLOG_POSTS, getPublishedPosts } from "./blog-data";
import { MechChrome } from "./MechChrome";
import { translate as tr } from "./translations";
import "./mech-mirror/emergent-teal.css";
import "./mech-mirror/astrek-neura.css";
import "./mech-mirror/astrek-sitemap.css";

type SitemapLink = { href: string; label: string; external?: boolean };

function SitemapColumn({
  title,
  links,
}: {
  title: string;
  links: SitemapLink[];
}) {
  return (
    <div className="smp-col">
      <h3>{title}</h3>
      <ul>
        {links.map((link) => (
          <li key={`${link.href}-${link.label}`}>
            <a
              href={link.href}
              {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SitemapPage({ locale }: { locale: Locale }) {
  const [posts, setPosts] = useState(BLOG_POSTS);

  useEffect(() => {
    setPosts(getPublishedPosts());
  }, []);

  const pages: SitemapLink[] = [
    { href: localizeHref(locale, "/"), label: tr(locale, "Home") },
    { href: localizeHref(locale, "/about"), label: tr(locale, "About Astrek Innovations") },
    { href: localizeHref(locale, "/product"), label: tr(locale, "Unik Exo") },
    { href: localizeHref(locale, "/blog"), label: tr(locale, "Blog") },
    { href: localizeHref(locale, "/testimonials"), label: tr(locale, "Testimonials") },
    { href: localizeHref(locale, "/partner"), label: tr(locale, "Partner With Us") },
    { href: localizeHref(locale, "/#contact"), label: tr(locale, "Contact") },
    {
      href: "http://careers.astrekinnovations.com/",
      label: tr(locale, "Careers"),
      external: true,
    },
    { href: localizeHref(locale, "/sitemap"), label: tr(locale, "Site Map") },
  ];

  const homeSections: SitemapLink[] = [
    { href: localizeHref(locale, "/#top"), label: tr(locale, "Introduction") },
    { href: localizeHref(locale, "/#company-about"), label: tr(locale, "About Astrek Innovations") },
    { href: localizeHref(locale, "/#about"), label: tr(locale, "Research / Technology") },
    { href: localizeHref(locale, "/#product"), label: tr(locale, "Introducing Unik Exo") },
    { href: localizeHref(locale, "/#modes"), label: tr(locale, "Solutions") },
    { href: localizeHref(locale, "/#specs"), label: tr(locale, "Technology") },
    { href: localizeHref(locale, "/#testimonials"), label: tr(locale, "Testimonials") },
    { href: localizeHref(locale, "/#team"), label: tr(locale, "Team") },
    { href: localizeHref(locale, "/#partners"), label: tr(locale, "Partners") },
    { href: localizeHref(locale, "/partner"), label: tr(locale, "Partner With Us") },
    { href: localizeHref(locale, "/#press"), label: tr(locale, "Media / Press") },
    { href: localizeHref(locale, "/#blog"), label: tr(locale, "Insights") },
    { href: localizeHref(locale, "/#faq"), label: tr(locale, "FAQ") },
    { href: localizeHref(locale, "/#contact"), label: tr(locale, "Contact") },
  ];

  const productSections: SitemapLink[] = [
    { href: localizeHref(locale, "/product#product"), label: tr(locale, "Product overview") },
    { href: localizeHref(locale, "/product#capabilities"), label: tr(locale, "Capabilities") },
    { href: localizeHref(locale, "/product#modes"), label: tr(locale, "Modes") },
    { href: localizeHref(locale, "/product#specs"), label: tr(locale, "Technology") },
  ];

  const insights: SitemapLink[] = posts.map((post) => ({
    href: localizeHref(locale, `/blog/${post.slug}`),
    label: post.title,
  }));

  return (
    <MechChrome locale={locale}>
      <section
        id="sitemap"
        data-testid="sitemap-section"
        className="smp-page"
        aria-label={tr(locale, "Site Map")}
      >
        <div className="smp-wrap">
          <p className="smp-kicker">{tr(locale, "Site Map")}</p>
          <h1 className="smp-title">{tr(locale, "Site Map")}</h1>
          <p className="smp-lead">
            {tr(locale, "All major pages and sections of the Astrek Innovations website.")}
          </p>
          <div className="smp-grid">
            <SitemapColumn title={tr(locale, "Pages")} links={pages} />
            <SitemapColumn title={tr(locale, "Home sections")} links={homeSections} />
            <SitemapColumn title={tr(locale, "Unik Exo page")} links={productSections} />
            <SitemapColumn title={tr(locale, "Insights")} links={insights} />
          </div>
        </div>
      </section>
    </MechChrome>
  );
}
