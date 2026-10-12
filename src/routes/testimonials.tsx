import { createFileRoute } from "@tanstack/react-router";

import { TestimonialsPage } from "../site/TestimonialsPage";
import { hreflangLinks } from "../site/seo";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Testimonials | Astrek Innovations" },
      {
        name: "description",
        content:
          "Stories from patients, therapists and clinical partners using Unik Exo to restore mobility.",
      },
    ],
    links: hreflangLinks("/testimonials"),
  }),
  component: () => <TestimonialsPage locale="en" />,
});
