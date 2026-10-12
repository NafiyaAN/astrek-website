import puppeteer from "puppeteer-core";
import fs from "fs";

const ports = [8080, 8083, 8082, 8081];
const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });

let base = null;
for (const p of ports) {
  try {
    const res = await fetch(`http://127.0.0.1:${p}/`);
    if (res.ok) {
      base = `http://127.0.0.1:${p}`;
      break;
    }
  } catch {
    /* try next */
  }
}
if (!base) throw new Error("No local server");

await page.goto(`${base}/?v=verify3`, { waitUntil: "networkidle0", timeout: 60000 });
await new Promise((r) => setTimeout(r, 1800));

fs.mkdirSync(".verify", { recursive: true });
await page.screenshot({ path: ".verify/hero-final.png", fullPage: false });

const meta = await page.evaluate(() => {
  const scroll = document.querySelector("[data-ajh-scroll]");
  const partnersArt = document.querySelector(".ajh-partners-art");
  const discover = document.querySelector('[data-testid="hero-cta-explore"]');
  const watch = document.querySelector('[data-testid="hero-cta-watch"]');
  const img = document.querySelector('[data-testid="hero-journey-image"]');
  const heading = document.querySelector('[data-testid="hero-heading"]');
  return {
    base: location.origin,
    scrollTag: scroll?.tagName,
    scrollHref: scroll?.getAttribute("href"),
    partnersSrc: partnersArt?.getAttribute("src"),
    partnersVisible: !!partnersArt && partnersArt.getBoundingClientRect().height > 20,
    discoverHref: discover?.getAttribute("href"),
    watchHref: watch?.getAttribute("href"),
    heroSrc: img?.getAttribute("src"),
    headingText: heading?.textContent?.replace(/\s+/g, " ").trim(),
    hasRealButtons: !!discover && !!watch,
  };
});
console.log("meta", meta);

const before = await page.evaluate(() => window.scrollY);
await page.click("[data-ajh-scroll]");
await new Promise((r) => setTimeout(r, 1200));
const afterScroll = await page.evaluate(() => window.scrollY);
console.log({ before, afterScroll, scrolled: afterScroll > 100 });

await page.goto(`${base}/?v=verify4`, { waitUntil: "domcontentloaded", timeout: 60000 });
await new Promise((r) => setTimeout(r, 1000));
await page.click('[data-testid="hero-cta-explore"]');
await new Promise((r) => setTimeout(r, 1500));
console.log("discover ->", page.url());

// Partner hover class
await page.goto(`${base}/?v=verify5`, { waitUntil: "domcontentloaded", timeout: 60000 });
await new Promise((r) => setTimeout(r, 1000));
const lit = await page.evaluate(() => {
  const p = document.querySelector(".ajh-partner");
  if (!p) return false;
  p.dispatchEvent(new MouseEvent("mouseenter", { bubbles: true }));
  return p.classList.contains("is-lit");
});
console.log("partner is-lit on hover:", lit);

await browser.close();
