import { chromium } from "playwright";

const browser = await chromium.launch({
  executablePath:
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  headless: true,
});
const page = await browser.newPage({ viewport: { width: 1440, height: 980 } });
await page.goto("http://127.0.0.1:8080/?v=realhero6", {
  waitUntil: "networkidle",
  timeout: 60000,
});
await page.waitForTimeout(1500);

const info = await page.evaluate(() => {
  const partners = document.querySelector("[data-ajh-partners]");
  const discover = document.querySelector('[data-testid="hero-cta-explore"]');
  const watch = document.querySelector('[data-testid="hero-cta-watch"]');
  const scroll = document.querySelector("[data-ajh-scroll]");
  const img = document.querySelector('[data-testid="hero-journey-image"]');
  const cs = partners ? getComputedStyle(partners) : null;
  const rect = partners?.getBoundingClientRect();
  return {
    hasPartners: !!partners,
    partnerDisplay: cs?.display,
    partnerVisibility: cs?.visibility,
    partnerOpacity: cs?.opacity,
    partnerPos: cs?.position,
    partnerRect: rect
      ? { top: rect.top, bottom: rect.bottom, height: rect.height, width: rect.width }
      : null,
    partnerCount: partners?.querySelectorAll(".ajh-partner").length ?? 0,
    discoverHref: discover?.getAttribute("href"),
    watchHref: watch?.getAttribute("href"),
    hasScroll: !!scroll,
    imgSrc: img?.getAttribute("src"),
    bodyClass: document.body.className,
  };
});

console.log(JSON.stringify(info, null, 2));
await page.screenshot({
  path: "c:/Users/DELL/Desktop/Astrek website/elevate-suite-main-updated1/.verify/hero-real.png",
  fullPage: false,
});
await browser.close();
