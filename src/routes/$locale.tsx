import { Outlet, createFileRoute, notFound } from "@tanstack/react-router";

import { isLocale } from "../site/i18n";

export const Route = createFileRoute("/$locale")({
  beforeLoad: ({ params }) => {
    if (!isLocale(params.locale)) throw notFound();
  },
  component: () => <Outlet />,
});
