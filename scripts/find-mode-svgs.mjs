import fs from "fs";

const html = fs.readFileSync("src/site/mech-mirror/emergent-body.html", "utf8");

for (const id of ["mode-card-sit", "mode-card-stand", "mode-card-walk", "mode-card-exercise"]) {
  const start = html.indexOf(`data-testid="${id}"`);
  const chunk = html.slice(start, start + 2500);
  const svgMatch = chunk.match(/<svg[^>]*class="lucide[^"]*"[^>]*>[\s\S]*?<\/svg>/);
  console.log(`\n=== ${id} ===`);
  console.log(svgMatch ? svgMatch[0] : "no lucide svg");
  // also check for emoji/text in icon div
  const iconDiv = chunk.match(/mb-3 flex h-10 w-10[\s\S]{0,800}/);
  if (iconDiv) console.log("Icon area:", iconDiv[0].slice(0, 600));
}

// Marquee asterisk
const mar = html.indexOf("editorial-marquee");
console.log("\n=== MARQUEE sample ===");
console.log(html.slice(mar, mar + 1200));
