import { createFileRoute } from "@tanstack/react-router";

import { ProductPage } from "../site/ProductPage";
import { hreflangLinks } from "../site/seo";

export const Route = createFileRoute("/product")({
  head: () => ({
    meta: [
      { title: "Unik Exo | Astrek Innovations" },
      {
        name: "description",
        content:
          "Unik Exo is Astrek's flagship wearable robotic exoskeleton for clinically structured gait training and lower-limb rehabilitation.",
      },
    ],
    links: hreflangLinks("/product"),
  }),
  component: () => <ProductPage locale="en" />,
});
