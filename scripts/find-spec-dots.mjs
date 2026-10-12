import fs from "fs";

const html = fs.readFileSync("src/site/mech-mirror/emergent-body.html", "utf8");
const keys = ["spec-item", "specs-section", "rounded-full bg-brand", "span.rounded-full", "h-2 w-2"];
for (const k of keys) {
  const i = html.indexOf(k);
  console.log(k, i >= 0 ? html.slice(i, i + 400) : "NOT FOUND");
}
