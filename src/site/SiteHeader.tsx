import { memo, useEffect } from "react";

import { chromeHeader, type ChromeActive } from "./chrome";
import type { Locale } from "./i18n";

/** Renders the one site header as a body-level sibling of `#astrek-site`. */
export const SiteHeader = memo(function SiteHeader({
  locale,
  active,
}: {
  locale: Locale;
  active: ChromeActive;
}) {
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
    document.body.classList.toggle("lang-ar", locale === "ar");
  }, [locale]);

  return (
    <div
      id="site-header-host"
      dangerouslySetInnerHTML={{ __html: chromeHeader(locale, active) }}
    />
  );
});
