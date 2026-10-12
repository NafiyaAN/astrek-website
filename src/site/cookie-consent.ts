import {
  applyCookieConsent,
  readCookieConsent,
  writeCookieConsent,
  type CookieConsentValue,
} from "./clarity";
import type { Locale } from "./i18n";
import { translate as tr } from "./translations";

import "./mech-mirror/astrek-consent.css";

function currentLocale(): Locale {
  const lang = document.documentElement.lang;
  if (lang === "ar" || lang === "ja") return lang;
  return "en";
}

function renderBanner(): HTMLElement {
  const locale = currentLocale();
  const banner = document.createElement("div");
  banner.id = "astrek-consent";
  banner.className = "astrek-consent";
  banner.setAttribute("role", "dialog");
  banner.setAttribute("aria-label", tr(locale, "Cookie notice"));
  banner.innerHTML = `
    <div class="astrek-consent__inner">
      <p class="astrek-consent__copy">${tr(
        locale,
        "We use essential cookies to remember your language. With your permission we also use Microsoft Clarity to understand page visits, sessions, scrolling, clicks, and mobile usability issues. You can decline analytics cookies.",
      )}</p>
      <div class="astrek-consent__actions">
        <button type="button" class="astrek-consent__accept" data-consent="analytics">${tr(locale, "Accept analytics")}</button>
        <button type="button" class="astrek-consent__essential" data-consent="essential">${tr(locale, "Essential only")}</button>
      </div>
    </div>
  `;
  return banner;
}

function setOpen(banner: HTMLElement, open: boolean): void {
  banner.classList.toggle("is-open", open);
  banner.setAttribute("aria-hidden", open ? "false" : "true");
}

export function openCookieSettings(): void {
  const banner = document.getElementById("astrek-consent");
  if (banner) setOpen(banner, true);
}

let consentStarted = false;
let settingsClickWired = false;

function injectSettingsButton(): void {
  const locale = currentLocale();
  if (document.querySelector("[data-testid='cookie-settings']")) return;

  const footerLegal =
    document.querySelector("footer [data-testid='footer-legal']") ??
    document.querySelector("footer .rf-foot-bottom") ??
    [...document.querySelectorAll("footer span, footer p, footer div")].find((el) =>
      /All rights reserved/i.test(el.textContent || ""),
    );
  if (!footerLegal) return;

  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "astrek-cookie-settings";
  btn.setAttribute("data-testid", "cookie-settings");
  btn.textContent = tr(locale, "Cookie settings");
  footerLegal.appendChild(btn);
}

function onSettingsClick(event: Event): void {
  const target = event.target as HTMLElement | null;
  if (!target?.closest("[data-testid='cookie-settings'], .astrek-cookie-settings")) return;
  event.preventDefault();
  openCookieSettings();
}

function wireSettingsControls(): () => void {
  injectSettingsButton();
  if (settingsClickWired) return () => {};
  settingsClickWired = true;
  document.addEventListener("click", onSettingsClick);
  return () => {
    document.removeEventListener("click", onSettingsClick);
    settingsClickWired = false;
  };
}

export function initCookieConsent(): () => void {
  if (typeof document === "undefined") return () => {};
  if (consentStarted) {
    const current = readCookieConsent();
    if (current) applyCookieConsent(current);
    wireSettingsControls();
    return () => {};
  }
  consentStarted = true;

  const existing = readCookieConsent();
  if (existing) applyCookieConsent(existing);

  let banner = document.getElementById("astrek-consent");
  if (!banner) {
    banner = renderBanner();
    document.body.appendChild(banner);
  }

  setOpen(banner, !existing);

  const onClick = (event: Event) => {
    const target = event.target as HTMLElement | null;
    const choice = target?.closest<HTMLElement>("[data-consent]")?.dataset.consent;
    if (choice !== "analytics" && choice !== "essential") return;
    writeCookieConsent(choice as CookieConsentValue);
    applyCookieConsent(choice as CookieConsentValue);
    setOpen(banner!, false);
  };

  banner.addEventListener("click", onClick);
  const unwireSettings = wireSettingsControls();

  return () => {
    banner?.removeEventListener("click", onClick);
    unwireSettings();
  };
}
