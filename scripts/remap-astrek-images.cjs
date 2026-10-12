const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "..", "src", "site", "mech-mirror", "emergent-body.html");
let html = fs.readFileSync(file, "utf8");

/** Replace img src when alt matches (case-insensitive substring). */
function replaceByAlt(altNeedle, newSrc) {
  const re = new RegExp(
    `(<img[^>]*alt="[^"]*${altNeedle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[^"]*"[^>]*src=")([^"]+)(")`,
    "gi",
  );
  html = html.replace(re, `$1${newSrc}$3`);
}

/** Global path swap. */
function swap(from, to) {
  html = html.split(from).join(to);
}

// Logo — Astrek brand mark from original site
swap("/images/mech/astrek-logo.png", "/images/inline-b213c3cc37.webp");

// Hero + features
swap("/images/mech/hero-banner.jpg", "/images/walk-mode.webp");
swap("/images/mech/yt-hq2.jpg", "/images/unikexo-control.webp");
replaceByAlt("Human-centered fit", "/images/unikexo-fit.webp");
// Modes — prefer WebP
replaceByAlt("Sit mode", "/images/sit-mode.webp");
replaceByAlt("Stand mode", "/images/stand-mode.webp");
replaceByAlt("Walk mode", "/images/walk-mode.webp");

// Product intro — studio shot (distinct from hero)
replaceByAlt("Unik Exo exoskeleton, studio view", "/images/studio-product.webp");
replaceByAlt("lower-limb exoskeleton, studio view", "/images/unik-exo-product.jpg");

// Modes
swap("/images/mech/yt-hq1.jpg", "/images/sit-mode.png");
swap("/images/mech/yt-maxresdefault.jpg", "/images/stand-mode.png");
replaceByAlt("Walk mode", "/images/walk-mode.png");
replaceByAlt("Exercise mode", "/images/exercise-mode.png");

// Specs + stories
replaceByAlt("module detail", "/images/unikexo-hip.webp");
replaceByAlt("clinical session", "/images/clinical-pilot.webp");

// Team
swap("/images/mech/robin.jpg", "/images/robin.jpeg");
swap("/images/mech/jithin.jpg", "/images/jithin.jpeg");
swap("/images/mech/alex.jpg", "/images/alex.jpeg");
swap("/images/mech/vishnu.jpg", "/images/vishnu.jpeg");
swap("/images/mech/ishaan.jpg", "/images/Ishaan-Khosla.jpg");
swap("/images/mech/pradeep.jpg", "/images/pradeep_k_jaisingh.jpg");
swap("/images/mech/sanil.jpg", "/images/Sanil_Sq.jpeg");

// Partners — original SVG logos
swap("/images/mech/p-makervillage.png", "/images/maker-village.svg");
swap("/images/mech/p-ksum.png", "/images/ksum.svg");
swap("/images/mech/p-startupchile.png", "/images/startup-chile.svg");
swap("/images/mech/p-huddle.png", "/images/huddle.svg");
swap("/images/mech/p-healthstart.png", "/images/healthstart.svg");
swap("/images/mech/p-iiit.png", "/images/iiit-hyderabad.svg");
swap("/images/mech/p-cie.png", "/images/cie-iiit.svg");
swap("/images/mech/p-nidhi.png", "/images/nidhi-prayas.svg");
swap("/images/mech/p-ian.png", "/images/indian-angel-network.svg");
swap("/images/mech/p-meity.png", "/images/meity.svg");
swap("/images/mech/p-oist.png", "/images/oist.svg");

// Press + journal
swap("/images/mech/press-ian.png", "/images/astrek-lab.webp");
replaceByAlt("Inside Our First Clinical Pilot", "/images/clinical-pilot.png");
replaceByAlt("Motion Capture Teaches Us About Gait", "/images/motion-capture-gait.jpg");
swap("/images/mech/press-wearracon.jpg", "/images/astrek-lab.jpg");

// Any remaining Emergent placeholders
swap("/images/mech/yt-hq3.jpg", "/images/walk-mode.png");
swap("/images/mech/yt-sddefault.jpg", "/images/clinical-pilot.webp");
swap("/images/mech/unik-exo-product.jpg", "/images/hero-exo-product.png");

fs.writeFileSync(file, html);
console.log("Remapped images in", file);

const remaining = [...new Set([...html.matchAll(/\/images\/mech\/[^"'\s)]+/g)].map((m) => m[0]))];
console.log("Remaining /images/mech paths:", remaining.length ? remaining.join(", ") : "none");
