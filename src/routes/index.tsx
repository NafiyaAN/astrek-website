import { createFileRoute } from "@tanstack/react-router";

import { AstrekHome } from "../site/AstrekHome";
import { hreflangLinks } from "../site/seo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Astrek Innovations | Wearable Robotic Exoskeletons" },
      {
        name: "description",
        content:
          "Astrek Innovations builds Unik Exo, a wearable robotic exoskeleton that restores lower-limb mobility through robotics, machine learning and motion capture.",
      },
      { property: "og:title", content: "Astrek Innovations | Take Your First Steps, Again" },
      {
        property: "og:description",
        content:
          "Clinically structured gait training with Unik Exo: wearable robotic exoskeletons engineered in Kannur, Kerala.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: hreflangLinks("/"),
  }),
  component: () => <AstrekHome />,
});
