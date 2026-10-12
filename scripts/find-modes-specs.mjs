import fs from "fs";

const html = fs.readFileSync("src/site/mech-mirror/emergent-body.html", "utf8");

for (const key of ["impact-stats", "modes-section", "modes-learn-more", "specs-section", "id=\"modes\"", "id=\"specs\""]) {
  const i = html.indexOf(key);
  if (i >= 0) console.log(`\n=== ${key} @ ${i} ===\n`, html.slice(Math.max(0, i - 150), i + 400));
}
