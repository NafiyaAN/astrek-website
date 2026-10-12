import { useLayoutEffect, useRef, type ReactNode } from "react";

import type { Locale } from "./i18n";
import { getMechFooterHtml, getMechHeaderHtml } from "./mech-mirror/mech-chrome";
import { initMechChrome, initPageReveals, initPageTranslation } from "./mech-mirror/init-mech-mirror";

export type MechActivePage = "home" | "product" | "blog" | "testimonials";

export function MechChrome({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  const shellRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  useLayoutEffect(() => {
    const shell = shellRef.current;
    const headerHost = headerRef.current;
    const footerHost = footerRef.current;
    if (!shell || !headerHost || !footerHost) return;

    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
    document.body.classList.toggle("lang-ar", locale === "ar");
    document.body.classList.toggle("lang-ja", locale === "ja");

    if (!headerHost.querySelector("[data-testid='site-header']")) {
      headerHost.innerHTML = getMechHeaderHtml(locale);
    }
    if (!footerHost.querySelector("footer")) {
      footerHost.innerHTML = getMechFooterHtml(locale);
    }

    cleanupRef.current?.();
    const disposeChrome = initMechChrome(shell, locale);
    const disposeReveals = initPageReveals(shell);
    const disposeTranslation = initPageTranslation(shell, locale);
    cleanupRef.current = () => {
      disposeTranslation();
      disposeReveals();
      disposeChrome();
    };

    return () => {
      cleanupRef.current?.();
      cleanupRef.current = null;
    };
  }, [locale]);

  return (
    <div
      ref={shellRef}
      data-testid="astrek-site"
      className="grain min-h-screen bg-ink text-white mech-page-shell"
    >
      <div ref={headerRef} />
      <div className="mech-inner-content page-shell">{children}</div>
      <div ref={footerRef} />
    </div>
  );
}
