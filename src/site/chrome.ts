import type { Locale } from "./i18n";
import { localizeHref } from "./i18n";
import { translate as tr } from "./translations";

export type ChromeActive = "home" | "product" | "blog" | "testimonials" | "contact";

export function chromeHeader(
  locale: Locale,
  active: ChromeActive = "home",
): string {
  const home = localizeHref(locale, "/");
  const contact = localizeHref(locale, "/#contact");
  const technology = localizeHref(locale, "/#about");
  const productAnchor = localizeHref(locale, "/#product");
  const modes = localizeHref(locale, "/#modes");
  const stories = localizeHref(locale, "/#testimonials");
  const team = localizeHref(locale, "/#team");
  const journal = localizeHref(locale, "/blog");
  const unik = localizeHref(locale, "/product");

  const langBtns = (["en", "ar", "ja"] as const)
    .map(
      (code) =>
        `<button type="button" data-lang="${code}"${code === locale ? ' class="active" aria-pressed="true"' : ' aria-pressed="false"'}>${code.toUpperCase()}</button>`,
    )
    .join("");

  return `<header id="siteHeader" class="rf-header ux-header mech-header">
  <div class="rf-header-inner">
    <a href="${home}" class="logo rf-logo-link"><img src="/images/inline-b213c3cc37.webp" alt="Unik Exo by Astrek Innovations" /></a>
    <nav class="links" id="navLinks" aria-label="${tr(locale, "Primary")}">
      <a href="${technology}">${tr(locale, "Technology")}</a>
      <a href="${productAnchor}"${active === "product" ? ' class="is-active"' : ""}>${tr(locale, "Product")}</a>
      <a href="${modes}">${tr(locale, "Modes")}</a>
      <a href="${stories}">${tr(locale, "Stories")}</a>
      <a href="${team}">${tr(locale, "Team")}</a>
      <a href="${journal}"${active === "blog" ? ' class="is-active"' : ""}>${tr(locale, "Blog")}</a>
      <a href="${unik}">${tr(locale, "Unik Exo")}</a>
      <div class="mobile-lang-row">
        <div class="language-switcher" id="languageSwitcherMobile" role="group" aria-label="${tr(locale, "Language")}">${langBtns}</div>
      </div>
      <a class="rf-btn mobile-menu-cta" href="${contact}">${tr(locale, "Talk to our team")}</a>
    </nav>
    <div class="nav-right">
      <div class="language-switcher rf-lang" id="languageSwitcher" role="group" aria-label="${tr(locale, "Language")}">${langBtns}</div>
      <a class="rf-btn rf-btn--nav header-cta" href="${contact}">${tr(locale, "Talk to our team")}</a>
      <button class="burger" id="burgerBtn" type="button" aria-label="${tr(locale, "Open menu")}" aria-expanded="false" aria-controls="navLinks"><span></span><span></span><span></span></button>
    </div>
  </div>
</header>`;
}

export function chromeFooter(locale: Locale = "en"): string {
  const homeAbout = localizeHref(locale, "/#company-about");
  const homeTeam = localizeHref(locale, "/#team");
  const homePartners = localizeHref(locale, "/#partners");
  const product = localizeHref(locale, "/product");
  const specs = localizeHref(locale, "/#specs");
  const homeProduct = localizeHref(locale, "/#product");
  const press = localizeHref(locale, "/#press");
  const blog = localizeHref(locale, "/blog");
  const testimonials = localizeHref(locale, "/testimonials");
  const contact = localizeHref(locale, "/#contact");
  return `<footer class="rf-footer">
  <div class="wrap">
    <div class="rf-foot elvin-foot">
      <div>
        <img src="/images/inline-b213c3cc37.webp" alt="Astrek Innovations" class="rf-foot-logo" />
        <p>${tr(locale, "We develop intelligent exoskeleton systems and data-driven solutions that restore mobility and dignity.")}</p>
      </div>
      <div>
        <h5>${tr(locale, "Technology")}</h5>
        <a href="${homeProduct}">${tr(locale, "Unik Exo")}</a>
        <a href="${specs}">${tr(locale, "Research")}</a>
        <a href="${product}">${tr(locale, "Product")}</a>
      </div>
      <div>
        <h5>${tr(locale, "About")}</h5>
        <a href="${homeAbout}">${tr(locale, "About Us")}</a>
        <a href="${homeTeam}">${tr(locale, "Team")}</a>
        <a href="${homePartners}">${tr(locale, "Partners")}</a>
        <a href="http://careers.astrekinnovations.com/" target="_blank" rel="noopener">${tr(locale, "Careers")}</a>
        <a href="${localizeHref(locale, "/sitemap")}">${tr(locale, "Site Map")}</a>
      </div>
      <div>
        <h5>${tr(locale, "Insights")}</h5>
        <a href="${press}">${tr(locale, "Media / Press")}</a>
        <a href="${blog}">${tr(locale, "Blog")}</a>
        <a href="${testimonials}">${tr(locale, "Testimonials")}</a>
      </div>
      <div>
        <h5>${tr(locale, "Contact")}</h5>
        <a href="${contact}">${tr(locale, "Talk to our team")}</a>
        <a href="https://www.linkedin.com/company/astrekinnovations" target="_blank" rel="noopener">${tr(locale, "LinkedIn")}</a>
        <a href="https://www.instagram.com/astrek_innovations" target="_blank" rel="noopener">${tr(locale, "Instagram")}</a>
        <div class="footer-newsletter rf-newsletter">
          <form id="newsletterForm">
            <input id="nlEmail" type="email" name="email" placeholder="${tr(locale, "Enter your email")}" required autocomplete="email" />
            <button type="submit" class="rf-btn rf-btn--sm">${tr(locale, "Subscribe")}</button>
          </form>
          <div class="nl-status" id="nlStatus"></div>
        </div>
      </div>
    </div>
    <div class="footer-bottom rf-foot-bottom">
      <span>${tr(locale, "© 2026 Astrek Innovations Pvt. Ltd. All rights reserved.")}</span>
      <span>
        <a href="${contact}">${tr(locale, "Privacy")}</a>
        ·
        <a href="${contact}">${tr(locale, "Terms")}</a>
      </span>
    </div>
  </div>
</footer>
<div class="cookie-notice" id="cookieNotice" role="dialog" aria-label="${tr(locale, "Cookie notice")}">
  <p>${tr(locale, "We use cookies to remember your language and keep the site fast.")}</p>
  <button type="button" id="cookieAccept">${tr(locale, "OK")}</button>
</div>`;
}
