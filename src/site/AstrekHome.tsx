import { useLayoutEffect, useRef } from "react";

import type { Locale } from "./i18n";
import { initMechMirror } from "./mech-mirror/init-mech-mirror";

import bodyHtml from "./mech-mirror/emergent-body.html?raw";
import "./mech-mirror/emergent-teal.css";
import "./mech-mirror/mech-mirror-overrides.css";
import "./mech-mirror/mech-premium.css";
import "./mech-mirror/astrek-journey-hero.css";
import "./mech-mirror/astrek-journey-nav.css";
import "./mech-mirror/astrek-partners-section.css";
import "./mech-mirror/astrek-section-gaps.css";
import "./mech-mirror/astrek-rtl.css";
import "./mech-mirror/astrek-icons.css";
import "./mech-mirror/astrek-chapters.css";
import "./mech-mirror/astrek-product.css";
import "./mech-mirror/astrek-modes-specs.css";
import "./mech-mirror/astrek-company-about.css";
import "./mech-mirror/astrek-faq.css";
import "./mech-mirror/astrek-responsive.css";
import "./mech-mirror/astrek-nav-fix.css";
/* neura before polish so hero/muted overrides always win */
import "./mech-mirror/astrek-neura.css";
import "./mech-mirror/astrek-responsive-polish.css";
import "./mech-mirror/astrek-premium-atmosphere.css";
import "./mech-mirror/astrek-people-premium.css";
import "./mech-mirror/astrek-motion-forms.css";
import "./mech-mirror/astrek-clean-pro.css";

/**
 * Homepage mirrors the Emergent mech-showcase design exactly,
 * with brand orange remapped to Astrek teal/green.
 */
export function AstrekHome({ locale }: { locale?: Locale }) {
  const resolved = locale ?? "en";
  const hostRef = useRef<HTMLDivElement>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  useLayoutEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    document.documentElement.lang = resolved;
    document.documentElement.dir = resolved === "ar" ? "rtl" : "ltr";

    cleanupRef.current?.();
    cleanupRef.current = initMechMirror(resolved);

    return () => {
      cleanupRef.current?.();
      cleanupRef.current = null;
    };
  }, [resolved]);

  return (
    <div
      id="mech-mirror-root"
      className="mech-mirror-host"
      ref={hostRef}
      dangerouslySetInnerHTML={{ __html: bodyHtml }}
    />
  );
}
