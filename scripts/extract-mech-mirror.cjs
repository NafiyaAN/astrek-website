const fs = require("fs");
const path = require("path");
const https = require("https");

const browserLog =
  "C:\\Users\\DELL\\.cursor\\browser-logs\\cdp-response-Runtime.evaluate-2026-08-29T06-46-51-583Z.json";
const outHtml = path.join(
  __dirname,
  "..",
  "src",
  "site",
  "mech-mirror",
  "emergent-body.html",
);
const imgDir = path.join(__dirname, "..", "public", "images", "mech");
const base = "https://mech-showcase-13.preview.emergentagent.com/images/";

const j = JSON.parse(fs.readFileSync(browserLog, "utf8"));
const html = j.result?.value || j.result?.result?.value;
if (!html || typeof html !== "string") {
  console.error("No HTML in CDP response");
  process.exit(1);
}
fs.writeFileSync(outHtml, html);
console.log("Wrote HTML", outHtml, html.length);

const names = [
  ...new Set(
    [...html.matchAll(/\/images\/mech\/([^"'\s>]+)/g)].map((m) => m[1]),
  ),
];
console.log("Images to fetch:", names.length);

fs.mkdirSync(imgDir, { recursive: true });

function fetchFile(name) {
  return new Promise((resolve) => {
    const dest = path.join(imgDir, name);
    if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
      console.log("skip", name);
      return resolve();
    }
    const url = base + name;
    const file = fs.createWriteStream(dest);
    https
      .get(url, (res) => {
        if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          https.get(res.headers.location, (res2) => {
            res2.pipe(file);
            file.on("finish", () => {
              file.close();
              console.log("ok", name);
              resolve();
            });
          }).on("error", () => resolve());
          return;
        }
        res.pipe(file);
        file.on("finish", () => {
          file.close();
          console.log("ok", name, res.statusCode);
          resolve();
        });
      })
      .on("error", (err) => {
        console.log("fail", name, err.message);
        resolve();
      });
  });
}

(async () => {
  for (const name of names) {
    await fetchFile(name);
  }
  console.log("done");
})();
