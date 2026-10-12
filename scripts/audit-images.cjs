const fs = require("fs");
const path = require("path");

const htmlPath = path.join(__dirname, "..", "src", "site", "mech-mirror", "emergent-body.html");
const publicImages = path.join(__dirname, "..", "public", "images");

const html = fs.readFileSync(htmlPath, "utf8");
const imgs = [...html.matchAll(/<img[^>]+>/g)].map((m) => m[0]);

console.log("=== CURRENT IMAGE MAP ===\n");
imgs.forEach((tag, i) => {
  const src = tag.match(/src="([^"]+)"/)?.[1];
  const alt = tag.match(/alt="([^"]*)"/)?.[1] || "";
  console.log(`${String(i + 1).padStart(2, "0")}. ${src}`);
  console.log(`    alt: ${alt}\n`);
});

function walk(dir, base = "") {
  let out = [];
  for (const name of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = base ? `${base}/${name.name}` : name.name;
    if (name.isDirectory()) out = out.concat(walk(path.join(dir, name.name), rel));
    else out.push(rel);
  }
  return out;
}

const files = walk(publicImages).sort();
console.log("\n=== AVAILABLE IN public/images/ ===\n");
files.forEach((f) => console.log(f));
