import { createFileRoute } from "@tanstack/react-router";

import { SitemapPage } from "../site/SitemapPage";
import { hreflangLinks } from "../site/seo";

export const Route = createFileRoute("/sitemap")({
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
  component: () => <SitemapPage locale="en" />,
});
