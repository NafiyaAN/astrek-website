import { createFileRoute, notFound } from "@tanstack/react-router";

import { isLocale } from "../../site/i18n";
import { PartnershipPage } from "../../site/PartnershipPage";
import { hreflangLinks } from "../../site/seo";

export const Route = createFileRoute("/$locale/partner")({
  beforeLoad: ({ params }) => {
    if (!isLocale(params.locale)) throw notFound();
  },
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
  component: LocalePartner,
});

function LocalePartner() {
  const { locale } = Route.useParams();
  if (!isLocale(locale)) return null;
  return <PartnershipPage locale={locale} />;
}
