import fs from "fs";

const html = fs.readFileSync("src/site/mech-mirror/emergent-body.html", "utf8");
const idx = html.indexOf("Key features");
console.log(html.slice(idx - 600, idx + 200));

// find about section id
const aboutIdx = html.lastIndexOf("<section", idx);
console.log("\nSection tag:", html.slice(aboutIdx, aboutIdx + 300));
