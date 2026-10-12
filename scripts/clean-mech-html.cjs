const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "..", "src", "site", "mech-mirror", "emergent-body.html");
let html = fs.readFileSync(file, "utf8");

// Strip Emergent editor / cursor attrs
html = html
  .replace(/\s+x-[a-z0-9-]+="[^"]*"/gi, "")
  .replace(/\s+data-cursor-ref="[^"]*"/gi, "")
  .replace(/\s+style="transform:\s*none;?"/gi, "")
  .replace(/\s+style="opacity:\s*1;\s*transform:\s*none;?"/gi, "");

// Ensure images that still point at remote host are local
html = html.replace(
  /https:\/\/mech-showcase-13\.preview\.emergentagent\.com\/images\//g,
  "/images/mech/",
);

fs.writeFileSync(file, html);
console.log("cleaned", file, html.length);
