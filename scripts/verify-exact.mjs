import puppeteer from "puppeteer-core";
import fs from "fs";

const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });

let base = "http://127.0.0.1:8080";
for (const p of [8080, 8083, 8082, 8081]) {
  try {
    if ((await fetch(`http://127.0.0.1:${p}/`)).ok) {
      base = `http://127.0.0.1:${p}`;
      break;
    }
  } catch {}
}

await page.goto(`${base}/?v=exact1`, { waitUntil: "networkidle0", timeout: 60000 });
await new Promise((r) => setTimeout(r, 2200));
fs.mkdirSync(".verify", { recursive: true });
await page.screenshot({ path: ".verify/hero-exact.png" });

const info = await page.evaluate(() => {
  const headerInner = document.querySelector("[data-testid='site-header'] > div");
  const hs = headerInner ? getComputedStyle(headerInner) : null;
  const img = document.querySelector("[data-testid='hero-journey-image']");
  const discover = document.querySelector("[data-testid='hero-cta-explore']");
  const watch = document.querySelector("[data-testid='hero-cta-watch']");
  const scroll = document.querySelector("[data-ajh-scroll]");
  const partners = document.querySelector("[data-ajh-partners]");
  const art = document.querySelector(".ajh-partners-art");
  const langs = [...document.querySelectorAll(".ajh-lang button")].map((b) => b.textContent);
  return {
    heroSrc: img?.getAttribute("src"),
    headerRadius: hs?.borderRadius,
    headerBg: hs?.backgroundColor,
    langs,
    discoverHref: discover?.getAttribute("href"),
    watchHref: watch?.getAttribute("href"),
    scrollHref: scroll?.getAttribute("href"),
    partnersH: partners?.getBoundingClientRect().height,
    partnersTop: partners?.getBoundingClientRect().top,
    artSrc: art?.getAttribute("src"),
    artNatural: art ? { w: art.naturalWidth, h: art.naturalHeight } : null,
  };
});
console.log(info);

const before = await page.evaluate(() => window.scrollY);
await page.click("[data-ajh-scroll]");
await new Promise((r) => setTimeout(r, 1100));
const after = await page.evaluate(() => window.scrollY);
console.log({ before, after });

await page.goto(`${base}/?v=exact2`, { waitUntil: "domcontentloaded" });
await new Promise((r) => setTimeout(r, 1000));
await page.click("[data-testid='hero-cta-explore']");
await new Promise((r) => setTimeout(r, 1200));
console.log("discover ->", page.url());

await browser.close();
