import { createFileRoute, notFound } from "@tanstack/react-router";

import { isLocale } from "../../site/i18n";
import { ProductPage } from "../../site/ProductPage";
import { hreflangLinks } from "../../site/seo";

export const Route = createFileRoute("/$locale/product")({
  beforeLoad: ({ params }) => {
    if (!isLocale(params.locale)) throw notFound();
  },
  head: () => ({
    meta: [{ title: "Unik Exo | Astrek Innovations" }],
    links: hreflangLinks("/product"),
  }),
  component: LocaleProduct,
});

function LocaleProduct() {
  const { locale } = Route.useParams();
  if (!isLocale(locale)) return null;
  return <ProductPage locale={locale} />;
}
