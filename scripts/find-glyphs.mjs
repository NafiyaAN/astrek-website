import fs from "fs";

const html = fs.readFileSync("src/site/mech-mirror/emergent-body.html", "utf8");

for (const key of ["Sit mode", "Stand mode", "Walk mode", "Exercise mode", "testimonial-dot", "rounded-full", "data-testid=\"modes", "chapter-"]) {
  const i = html.indexOf(key);
  if (i >= 0) console.log(`\n=== ${key} @ ${i} ===\n`, html.slice(Math.max(0, i - 300), i + 600));
}

const nonAscii = [...new Set([...html.matchAll(/[^\x00-\x7F]/g)].map((m) => m[0]))];
console.log("\nNon-ASCII:", nonAscii.join(" "));
