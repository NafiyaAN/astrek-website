import fs from "fs";

const html = fs.readFileSync("src/site/mech-mirror/emergent-body.html", "utf8");
const idx = html.indexOf("data-testid=\"product-section\"");
console.log(html.slice(idx, idx + 2500));
