import puppeteer from "puppeteer-core";
import fs from "fs";

const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto("http://127.0.0.1:8080/?v=hd1", {
  waitUntil: "networkidle0",
  timeout: 60000,
});
await new Promise((r) => setTimeout(r, 2200));
fs.mkdirSync(".verify", { recursive: true });
await page.screenshot({ path: ".verify/hero-hd.png" });

const info = await page.evaluate(() => {
  const img = document.querySelector("[data-testid='hero-journey-image']");
  const partners = [...document.querySelectorAll(".ajh-partner img")];
  const first = document.querySelector(".ajh-partner");
  first?.dispatchEvent(new MouseEvent("mouseenter", { bubbles: true }));
  return {
    src: img?.getAttribute("src"),
    natural: img ? { w: img.naturalWidth, h: img.naturalHeight } : null,
    partnerCount: partners.length,
    partner0: partners[0]?.currentSrc || partners[0]?.src,
    lit: first?.classList.contains("is-lit"),
  };
});
console.log(info);
await page.screenshot({ path: ".verify/hero-hd-lit.png" });
await browser.close();
