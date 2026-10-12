import fs from "fs";

const html = fs.readFileSync("src/site/mech-mirror/emergent-body.html", "utf8");

// Find all lucide icon classes
const lucideClasses = [...html.matchAll(/class="lucide lucide-([^"\s]+)/g)].map((m) => m[1]);
const counts = {};
for (const c of lucideClasses) counts[c] = (counts[c] || 0) + 1;
console.log("Lucide icons in emergent-body:", counts);

// Find rounded-full dots (pagination)
const dotButtons = html.match(/data-testid="[^"]*dot[^"]*"[^>]*class="[^"]*"/g) || [];
console.log("\nDot buttons:", dotButtons.length);
dotButtons.slice(0, 5).forEach((d) => console.log(d));

// FAQ accordion icons
const faqIdx = html.indexOf("data-testid=\"faq");
if (faqIdx >= 0) console.log("\nFAQ sample:", html.slice(faqIdx, faqIdx + 800));

// Spec accordion dots
const specDots = [...html.matchAll(/rounded-full[^>]{0,120}/g)].slice(0, 15);
console.log("\nrounded-full samples:", specDots.map((m) => m[0]));
