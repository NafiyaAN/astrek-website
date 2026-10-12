import puppeteer from "puppeteer-core";

const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto("http://127.0.0.1:8080/?v=nav1", {
  waitUntil: "networkidle0",
  timeout: 60000,
});
await new Promise((r) => setTimeout(r, 2000));

const meta = await page.evaluate(() => {
  const header = document.querySelector("[data-testid='site-header']");
  const inner = header?.querySelector(":scope > div");
  const hs = header ? getComputedStyle(header) : null;
  const is = inner ? getComputedStyle(inner) : null;
  const link = document.querySelector("nav.ajh-nav a.ajh-nav-link");
  const ls = link ? getComputedStyle(link) : null;
  const langs = [...document.querySelectorAll(".ajh-lang button")].map((b) => ({
    text: b.textContent,
    color: getComputedStyle(b).color,
    active: b.classList.contains("is-active"),
  }));
  const logo = document.querySelector("[data-testid='nav-logo'] img");
  return {
    headerBg: hs?.backgroundColor,
    innerRadius: is?.borderRadius,
    innerBg: is?.backgroundColor,
    linkColor: ls?.color,
    linkTransform: ls?.textTransform,
    logoH: logo ? getComputedStyle(logo).height : null,
    langs,
  };
});
console.log(meta);

await page.screenshot({
  path: ".verify/nav-bar.png",
  clip: { x: 0, y: 0, width: 1440, height: 90 },
});

const boxes = await page.$$eval("nav.ajh-nav a.ajh-nav-link", (els) =>
  els.map((el) => {
    const r = el.getBoundingClientRect();
    return { x: r.x + r.width / 2, y: r.y + r.height / 2, t: el.textContent?.trim() };
  }),
);
await page.mouse.move(boxes[0].x, boxes[0].y);
await new Promise((r) => setTimeout(r, 300));
let lit = await page.$$eval("nav.ajh-nav a.ajh-nav-link", (els) =>
  els.map((e) => e.classList.contains("is-lit")),
);
console.log("nav on0", lit);

await page.mouse.move(boxes[2].x, boxes[2].y);
await new Promise((r) => setTimeout(r, 300));
lit = await page.$$eval("nav.ajh-nav a.ajh-nav-link", (els) =>
  els.map((e) => e.classList.contains("is-lit")),
);
console.log("nav on2", lit);

const langBoxes = await page.$$eval(".ajh-lang button", (els) =>
  els.map((el) => {
    const r = el.getBoundingClientRect();
    return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
  }),
);
await page.mouse.move(langBoxes[1].x, langBoxes[1].y);
await new Promise((r) => setTimeout(r, 300));
const langLit = await page.$$eval(".ajh-lang button", (els) =>
  els.map((e) => e.classList.contains("is-lit")),
);
console.log("lang on1", langLit);

await page.mouse.move(200, 200);
await new Promise((r) => setTimeout(r, 250));
lit = await page.$$eval("nav.ajh-nav a.ajh-nav-link", (els) =>
  els.map((e) => e.classList.contains("is-lit")),
);
console.log("leave", lit);

await browser.close();
