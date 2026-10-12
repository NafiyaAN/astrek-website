import fs from "fs";

const path = "src/site/astrek-body.html";
let html = fs.readFileSync(path, "utf8");

const svgStar =
  /<span class="mech-ticker-star" aria-hidden="true"><svg[^>]*class="astrek-lucide-icon astrek-ticker-separator"[^>]*>[\s\S]*?<\/svg><\/span>/g;

const dot = '<span class="mech-ticker-star" aria-hidden="true"><span class="astrek-marquee-dot"></span></span>';
html = html.replace(svgStar, dot);

fs.writeFileSync(path, html);
console.log("Replaced", (html.match(/astrek-marquee-dot/g) || []).length, "ticker dots");
