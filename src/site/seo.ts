export const SITE_ORIGIN = "https://www.astrekinnovations.com";

export function hreflangLinks(path: string) {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return [
    { rel: "alternate", hrefLang: "en", href: `${SITE_ORIGIN}${clean === "/" ? "/" : clean}` },
    { rel: "alternate", hrefLang: "ar", href: `${SITE_ORIGIN}/ar${clean === "/" ? "" : clean}` },
    { rel: "alternate", hrefLang: "ja", href: `${SITE_ORIGIN}/ja${clean === "/" ? "" : clean}` },
    { rel: "alternate", hrefLang: "x-default", href: `${SITE_ORIGIN}${clean}` },
  ];
}
