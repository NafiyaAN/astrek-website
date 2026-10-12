import { createFileRoute, notFound } from "@tanstack/react-router";

import { AstrekHome } from "../../site/AstrekHome";
import { isLocale } from "../../site/i18n";
import { hreflangLinks } from "../../site/seo";

export const Route = createFileRoute("/$locale/")({
  beforeLoad: ({ params }) => {
    if (!isLocale(params.locale)) throw notFound();
  },
  head: ({ params }) => ({
    meta: [
      { title: "Astrek Innovations | Wearable Robotic Exoskeletons" },
      {
        name: "description",
        content:
          "Astrek Innovations builds Unik Exo, a wearable robotic exoskeleton that restores lower-limb mobility through robotics, machine learning and motion capture.",
      },
    ],
    links: hreflangLinks("/"),
  }),
  component: LocaleHome,
});

function LocaleHome() {
  const { locale } = Route.useParams();
  if (!isLocale(locale)) return null;
  return <AstrekHome locale={locale} />;
}
