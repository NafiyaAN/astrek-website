import { createFileRoute } from "@tanstack/react-router";

import { PartnershipPage } from "../site/PartnershipPage";
import { hreflangLinks } from "../site/seo";

export const Route = createFileRoute("/partner")({
  head: () => ({
    meta: [
      { title: "Partner With Us | Astrek Innovations" },
      {
        name: "description",
        content:
          "Let’s Build the Future of Rehabilitation. Learn more about UNIKEXO, request a demo or collaboration, or explore partnership opportunities.",
      },
    ],
    links: hreflangLinks("/partner"),
  }),
  component: () => <PartnershipPage locale="en" />,
});
