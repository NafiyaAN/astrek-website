const CONSENT_KEY = "astrek_cookie_consent";
const SCRIPT_ID = "astrek-clarity-script";

type ClarityFn = (...args: unknown[]) => void;

declare global {
  interface Window {
    clarity?: ClarityFn & { q?: unknown[] };
  }
}

export type CookieConsentValue = "analytics" | "essential";

export function getClarityProjectId(): string {
  return String(import.meta.env.VITE_CLARITY_PROJECT_ID || "").trim();
}

export function readCookieConsent(): CookieConsentValue | null {
  try {
    const value = localStorage.getItem(CONSENT_KEY);
    if (value === "analytics" || value === "essential") return value;
    if (localStorage.getItem("astrek_cookies_ok") === "1") return "essential";
  } catch {
    /* private mode */
  }
  return null;
}

export function writeCookieConsent(value: CookieConsentValue): void {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* private mode */
  }
}

export function loadClarity(): void {
  if (typeof document === "undefined") return;
  const projectId = getClarityProjectId();
  if (!projectId || document.getElementById(SCRIPT_ID) || typeof window.clarity === "function") {
    if (typeof window.clarity === "function") {
      window.clarity("consent");
    }
    return;
  }

  const clarity: ClarityFn = (...args: unknown[]) => {
    (clarity.q = clarity.q || []).push(args);
  };
  window.clarity = clarity;

  const script = document.createElement("script");
  script.id = SCRIPT_ID;
  script.async = true;
  script.src = `https://www.clarity.ms/tag/${projectId}`;
  document.head.appendChild(script);
}

export function applyCookieConsent(value: CookieConsentValue): void {
  if (value === "analytics") {
    loadClarity();
    return;
  }

  if (typeof window.clarity === "function") {
    try {
      window.clarity("consent", false);
    } catch {
      /* ignore */
    }
  }
}
