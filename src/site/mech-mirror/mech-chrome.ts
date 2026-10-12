import bodyHtml from "./emergent-body.html?raw";
import { localizeHref, type Locale } from "../i18n";

type ChromeParts = { header: string; footer: string };

let cached: ChromeParts | null = null;

function extractChrome(): ChromeParts {
  if (cached) return cached;

  const header =
    bodyHtml.match(/<header[^>]*data-testid="site-header"[\s\S]*?<\/header>/)?.[0] ?? "";
  const footer = bodyHtml.match(/<footer[\s\S]*?<\/footer>/)?.[0] ?? "";

  cached = { header, footer };
  return cached;
}

function localizeChromeHtml(html: string, locale: Locale): string {
  return html
    .replace(/href="#([^"]+)"/g, (_, anchor) => `href="${localizeHref(locale, `/#${anchor}`)}"`)
    .replace(/href="\/#([^"]+)"/g, (_, anchor) => `href="${localizeHref(locale, `/#${anchor}`)}"`)
    .replace(/href="\/blog"/g, `href="${localizeHref(locale, "/blog")}"`)
    .replace(/href="\/sitemap"/g, `href="${localizeHref(locale, "/sitemap")}"`)
    .replace(/href="\/partner"/g, `href="${localizeHref(locale, "/partner")}"`)
    .replace(/href="\/about"/g, `href="${localizeHref(locale, "/about")}"`)
    .replace(/href="\/product"/g, `href="${localizeHref(locale, "/product")}"`)
    .replace(/href="\/testimonials"/g, `href="${localizeHref(locale, "/testimonials")}"`)
    .replace(/href="\/"/g, `href="${localizeHref(locale, "/")}"`);
}

export function getMechHeaderHtml(locale: Locale): string {
  return localizeChromeHtml(extractChrome().header, locale);
}

export function getMechFooterHtml(locale: Locale): string {
  return localizeChromeHtml(extractChrome().footer, locale);
}
