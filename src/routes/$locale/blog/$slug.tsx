import { createFileRoute, notFound } from "@tanstack/react-router";

import { BlogArticlePage } from "../../../site/BlogPages";
import { getPostBySlug } from "../../../site/blog-data";
import { isLocale } from "../../../site/i18n";
import { hreflangLinks } from "../../../site/seo";

export const Route = createFileRoute("/$locale/blog/$slug")({
  beforeLoad: ({ params }) => {
    if (!isLocale(params.locale)) throw notFound();
  },
  loader: ({ params }) => {
    const post = getPostBySlug(params.slug) ?? null;
    return { slug: params.slug, post };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData.post?.title || "Blog"} | Astrek Innovations` },
      { name: "description", content: loaderData.post?.excerpt || "Astrek Innovations blog." },
    ],
    links: hreflangLinks(`/blog/${loaderData.slug}`),
  }),
  component: LocaleArticle,
});

function LocaleArticle() {
  const { locale } = Route.useParams();
  const { slug, post } = Route.useLoaderData();
  if (!isLocale(locale)) return null;
  return <BlogArticlePage locale={locale} post={post} slug={slug} />;
}
