import { createFileRoute, notFound } from "@tanstack/react-router";

import { isLocale } from "../../site/i18n";
import { TestimonialsPage } from "../../site/TestimonialsPage";
import { hreflangLinks } from "../../site/seo";

export const Route = createFileRoute("/$locale/testimonials")({
  beforeLoad: ({ params }) => {
    if (!isLocale(params.locale)) throw notFound();
  },
  head: () => ({
    meta: [{ title: "Testimonials | Astrek Innovations" }],
    links: hreflangLinks("/testimonials"),
  }),
  component: LocaleTestimonials,
});

function LocaleTestimonials() {
  const { locale } = Route.useParams();
  if (!isLocale(locale)) return null;
  return <TestimonialsPage locale={locale} />;
}
