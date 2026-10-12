const fs = require("fs");
const path = "src/site/mech-mirror/emergent-body.html";
let html = fs.readFileSync(path, "utf8");

const targets = {
  "stat-patients-tra": "120",
  "stat-rehabilitati": "15",
  "stat-therapy-sess": "10",
  "stat-would-recomm": "90",
};

for (const [id, value] of Object.entries(targets)) {
  const marker = `data-testid="${id}"`;
  const idx = html.indexOf(marker);
  if (idx === -1) {
    console.warn("missing", id);
    continue;
  }
  const slice = html.slice(idx, idx + 400);
  const patched = slice.replace(/(<p[^>]*>)0(<span class="text-brand">)/, `$1${value}$2`);
  if (patched === slice) {
    console.warn("no change for", id);
    continue;
  }
  html = html.slice(0, idx) + patched + html.slice(idx + 400);
}

fs.writeFileSync(path, html);
console.log("patched stat defaults in emergent-body.html");
