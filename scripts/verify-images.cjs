const fs = require("fs");
const path = require("path");
const http = require("http");

const htmlPath = path.join(__dirname, "..", "src", "site", "mech-mirror", "emergent-body.html");
const publicDir = path.join(__dirname, "..", "public");

const html = fs.readFileSync(htmlPath, "utf8");
const srcs = [...new Set([...html.matchAll(/src="(\/images\/[^"]+)"/g)].map((m) => m[1]))];

console.log("Checking", srcs.length, "unique image paths...\n");

let missing = [];
let ok = 0;

for (const src of srcs) {
  const filePath = path.join(publicDir, src.replace(/^\//, ""));
  if (fs.existsSync(filePath) && fs.statSync(filePath).size > 0) {
    ok++;
  } else {
    missing.push({ src, filePath, exists: fs.existsSync(filePath) });
  }
}

console.log(`OK: ${ok}/${srcs.length}`);
if (missing.length) {
  console.log("\nMISSING OR EMPTY:");
  missing.forEach((m) => console.log(" ", m.src, m.exists ? "(empty)" : "(not found)"));
} else {
  console.log("All referenced images exist on disk.");
}
