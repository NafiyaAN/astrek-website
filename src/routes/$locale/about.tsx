import { createFileRoute, notFound } from "@tanstack/react-router";

import { AboutPage } from "../../site/AboutPage";
import { isLocale } from "../../site/i18n";
import { hreflangLinks } from "../../site/seo";

export const Route = createFileRoute("/$locale/about")({
  beforeLoad: ({ params }) => {
    if (!isLocale(params.locale)) throw notFound();
  },
  head: () => ({
    meta: [
      { title: "About Astrek Innovations" },
      {
        name: "description",
        content:
          "Astrek Innovations is a robotics startup specializing in lower limb exoskeletons for rehabilitation and mobility support.",
      },
    ],
    links: hreflangLinks("/about"),
  }),
  component: LocaleAbout,
});

function LocaleAbout() {
  const { locale } = Route.useParams();
  if (!isLocale(locale)) return null;
  return <AboutPage locale={locale} />;
}
