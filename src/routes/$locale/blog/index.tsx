import { createFileRoute, notFound } from "@tanstack/react-router";

import { BlogListPage } from "../../../site/BlogPages";
import { isLocale } from "../../../site/i18n";
import { hreflangLinks } from "../../../site/seo";

export const Route = createFileRoute("/$locale/blog/")({
  beforeLoad: ({ params }) => {
    if (!isLocale(params.locale)) throw notFound();
  },
  head: () => ({
    meta: [{ title: "Blog | Astrek Innovations" }],
    links: hreflangLinks("/blog"),
  }),
  component: LocaleBlogList,
});

function LocaleBlogList() {
  const { locale } = Route.useParams();
  if (!isLocale(locale)) return null;
  return <BlogListPage locale={locale} />;
}
