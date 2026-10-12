import { createFileRoute } from "@tanstack/react-router";

import { BlogListPage } from "../../site/BlogPages";
import { hreflangLinks } from "../../site/seo";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog | Astrek Innovations" },
      {
        name: "description",
        content: "Field notes, engineering deep-dives and updates from the Astrek team.",
      },
    ],
    links: hreflangLinks("/blog"),
  }),
  component: () => <BlogListPage locale="en" />,
});
