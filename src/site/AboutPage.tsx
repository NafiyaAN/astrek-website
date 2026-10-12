import { useEffect } from "react";

import type { Locale } from "./i18n";
import { applyCmsContent, applyCmsImages, loadCms } from "./apply-cms";
import { MechChrome } from "./MechChrome";
import companyAboutHtml from "./mech-mirror/company-about-section.html?raw";
import "./mech-mirror/emergent-teal.css";
import "./mech-mirror/astrek-neura.css";
import "./mech-mirror/astrek-company-about.css";

export function AboutPage({ locale }: { locale: Locale }) {
  useEffect(() => {
    const root = document.querySelector(".aco-page");
    if (!root) return;
    const ac = new AbortController();
    loadCms(ac.signal)
      .then((cms) => {
        if (!cms || ac.signal.aborted) return;
        applyCmsImages(root, cms.images);
        if (locale === "en") applyCmsContent(root, cms.content);
      })
      .catch(() => {});
    return () => ac.abort();
  }, [locale]);

  return (
    <MechChrome locale={locale}>
      <div className="aco-page" dangerouslySetInnerHTML={{ __html: companyAboutHtml }} />
    </MechChrome>
  );
}
