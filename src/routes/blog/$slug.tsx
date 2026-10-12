import { createFileRoute } from "@tanstack/react-router";

import { BlogArticlePage } from "../../site/BlogPages";
import { getPostBySlug } from "../../site/blog-data";
import { hreflangLinks } from "../../site/seo";

export const Route = createFileRoute("/blog/$slug")({
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
  component: Article,
});

function Article() {
  const { slug, post } = Route.useLoaderData();
  return <BlogArticlePage locale="en" post={post} slug={slug} />;
}
