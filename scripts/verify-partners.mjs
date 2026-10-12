import puppeteer from "puppeteer-core";

const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto("http://127.0.0.1:8080/?v=hd5", {
  waitUntil: "networkidle0",
  timeout: 60000,
});
await new Promise((r) => setTimeout(r, 2200));

const nat = await page.$eval("[data-testid='hero-journey-image']", (img) => ({
  w: img.naturalWidth,
  h: img.naturalHeight,
  src: img.currentSrc,
}));
console.log("hero", nat);
await page.screenshot({ path: ".verify/hero-hd.png" });

const boxes = await page.$$eval(".ajh-partner", (els) =>
  els.map((el) => {
    const r = el.getBoundingClientRect();
    return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
  }),
);

await page.mouse.move(boxes[0].x, boxes[0].y);
await new Promise((r) => setTimeout(r, 350));
let lit = await page.$$eval(".ajh-partner", (els) =>
  els.map((e) => e.classList.contains("is-lit")),
);
console.log("on0", lit);

await page.mouse.move(boxes[2].x, boxes[2].y);
await new Promise((r) => setTimeout(r, 350));
lit = await page.$$eval(".ajh-partner", (els) =>
  els.map((e) => e.classList.contains("is-lit")),
);
console.log("on2", lit);

await page.mouse.move(boxes[5].x, boxes[5].y);
await new Promise((r) => setTimeout(r, 350));
lit = await page.$$eval(".ajh-partner", (els) =>
  els.map((e) => e.classList.contains("is-lit")),
);
console.log("on5", lit);

await page.mouse.move(120, 200);
await new Promise((r) => setTimeout(r, 300));
lit = await page.$$eval(".ajh-partner", (els) =>
  els.map((e) => e.classList.contains("is-lit")),
);
console.log("leave", lit);

await page.screenshot({
  path: ".verify/hero-hd-lit.png",
  clip: { x: 0, y: 780, width: 1440, height: 120 },
});
await browser.close();
