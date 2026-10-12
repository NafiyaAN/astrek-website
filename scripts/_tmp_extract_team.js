const fs = require("fs");
const h = fs.readFileSync("src/site/mech-mirror/emergent-body.html", "utf8");
const j = h.indexOf("people-section");
const mentors = h.indexOf(">Mentors</p>");
console.log("people-section at", j);
console.log("mentors at", mentors);
console.log(h.slice(mentors - 200, mentors + 800));
