import { createFileRoute } from "@tanstack/react-router";

import { AboutPage } from "../site/AboutPage";
import { hreflangLinks } from "../site/seo";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Astrek Innovations" },
      {
        name: "description",
        content:
          "Astrek Innovations is a robotics startup specializing in lower limb exoskeletons for rehabilitation and mobility support. UNIKEXO is our robotic exoskeleton for lower limb rehabilitation.",
      },
    ],
    links: hreflangLinks("/about"),
  }),
  component: () => <AboutPage locale="en" />,
});
