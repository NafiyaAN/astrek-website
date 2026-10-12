export const LOCALES = ["en", "ar", "ja"] as const;
export type Locale = (typeof LOCALES)[number];

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "EN",
  ar: "العربية",
  ja: "日本語",
};

export function isLocale(value: string | undefined): value is Locale {
  return value === "en" || value === "ar" || value === "ja";
}

export function detectBrowserLocale(): Locale {
  if (typeof navigator === "undefined") return "en";
  const langs = [...(navigator.languages || []), navigator.language].filter(Boolean);
  for (const raw of langs) {
    const code = raw.toLowerCase();
    if (code.startsWith("ar")) return "ar";
    if (code.startsWith("ja")) return "ja";
    if (code.startsWith("en")) return "en";
  }
  return "en";
}

export function localeFromPath(pathname: string): Locale | null {
  const match = pathname.match(/^\/(en|ar|ja)(?=\/|$)/);
  return match ? (match[1] as Locale) : null;
}

export function stripLocalePrefix(pathname: string): string {
  const stripped = pathname.replace(/^\/(en|ar|ja)(?=\/|$)/, "");
  return stripped || "/";
}

export function localizeHref(locale: Locale, path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (locale === "en") return clean;
  return `/${locale}${clean === "/" ? "" : clean}`;
}

export function switchLocalePath(next: Locale, pathname: string, hash = ""): string {
  return localizeHref(next, stripLocalePrefix(pathname)) + hash;
}

export function readSavedLocale(): Locale | null {
  try {
    const saved = localStorage.getItem("astrek_language");
    return isLocale(saved || "") ? saved : null;
  } catch {
    return null;
  }
}

export function persistLocale(locale: Locale) {
  try {
    localStorage.setItem("astrek_language", locale);
  } catch {
    /* ignore */
  }
}

export function resolveInitialLocale(pathname: string): Locale {
  return localeFromPath(pathname) || readSavedLocale() || detectBrowserLocale();
}
