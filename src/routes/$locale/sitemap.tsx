import { createFileRoute, notFound } from "@tanstack/react-router";

import { isLocale } from "../../site/i18n";
import { SitemapPage } from "../../site/SitemapPage";
import { hreflangLinks } from "../../site/seo";

export const Route = createFileRoute("/$locale/sitemap")({
  beforeLoad: ({ params }) => {
    if (!isLocale(params.locale)) throw notFound();
  },
  head: () => ({
    meta: [
      { title: "Site Map | Astrek Innovations" },
      {
        name: "description",
        content:
          "Site map of the Astrek Innovations website, covering major pages and homepage sections.",
      },
    ],
    links: hreflangLinks("/sitemap"),
  }),
  component: LocaleSitemap,
});

function LocaleSitemap() {
  const { locale } = Route.useParams();
  if (!isLocale(locale)) return null;
  return <SitemapPage locale={locale} />;
}
