import fs from "fs";

const html = fs.readFileSync("src/site/mech-mirror/emergent-body.html", "utf8");
const idx = html.indexOf("data-testid=\"product-section\"");
console.log(html.slice(idx, idx + 4500));

const stats = html.indexOf("Real robotics");
console.log("\n=== stats ===\n", html.slice(stats - 200, stats + 800));
