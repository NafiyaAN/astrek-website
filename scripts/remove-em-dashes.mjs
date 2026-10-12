import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const TARGET_DIRS = ["src", "public"];
const EXT = new Set([
  ".tsx", ".ts", ".jsx", ".js", ".json", ".md", ".css", ".html", ".svg",
]);

const CONTENT_REPLACEMENTS = [
  ["UNIK EXO — A lower-limb exoskeleton that adapts to you — so you can move forward.", "UNIK EXO: a lower-limb exoskeleton that adapts to you, so you can move forward."],
  ["UNIK EXO — あなたに合わせて適応する下肢外骨格。前へ進むために。", "UNIK EXO: あなたに合わせて適応する下肢外骨格。前へ進むために。"],
  ["I thought I may never walk again. With Unik Exo, I took my first steps — and it changed everything.", "I thought I may never walk again. With Unik Exo, I took my first steps, and it changed everything."],
  ["Our mentors bring decades of expertise across robotics, healthcare, technology and innovation — guiding us as we build solutions that change lives.", "Our mentors bring decades of expertise across robotics, healthcare, technology and innovation, guiding us as we build solutions that change lives."],
  ["The Hindu Businessline on Kerala’s seeding summit — and the healthtech teams in the room.", "The Hindu Businessline on Kerala’s seeding summit, and the healthtech teams in the room."],
  ["The Hindu Businessline عن قمة كيرالا — وفرق التقنية الصحية في القاعة.", "The Hindu Businessline عن قمة كيرالا، وفرق التقنية الصحية في القاعة."],
  ["We share what we learn — from labs, clinics and real-world impact — to accelerate innovation that matters.", "We share what we learn from labs, clinics and real-world impact to accelerate innovation that matters."],
  ["نشارك ما نتعلمه — من المختبرات والعيادات والأثر الواقعي — لتسريع الابتكار الذي يهم.", "نشارك ما نتعلمه من المختبرات والعيادات والأثر الواقعي لتسريع الابتكار الذي يهم."],
  ["A short primer on how we use motion capture data to model human gait — and why average gait is a myth.", "A short primer on how we use motion capture data to model human gait, and why average gait is a myth."],
  ["A week with founders, clinicians and investors — and what we brought back to the lab.", "A week with founders, clinicians and investors, and what we brought back to the lab."],
  ["أسبوع مع مؤسسين وأطباء ومستثمرين — وما عدنا به إلى المختبر.", "أسبوع مع مؤسسين وأطباء ومستثمرين، وما عدنا به إلى المختبر."],
  ["Use the form in the footer — no spam. Unsubscribe anytime.", "Use the form in the footer. No spam. Unsubscribe anytime."],
  ["استخدم النموذج في التذييل — بدون رسائل مزعجة. يمكنك إلغاء الاشتراك في أي وقت.", "استخدم النموذج في التذييل. بدون رسائل مزعجة. يمكنك إلغاء الاشتراك في أي وقت."],
  ["Let’s connect — Let’s build", "Let’s connect. Let’s build"],
  ["Let's connect — Let's build", "Let's connect. Let's build"],
  ["Let’s connect — build what’s next", "Let’s connect. Let’s build what’s next"],
  ["Let's connect — build what's next", "Let's connect. Let's build what's next"],
  ["Whether you're a healthcare provider, researcher, investor or innovator — let's create meaningful impact together.", "Whether you're a healthcare provider, researcher, investor or innovator, let's create meaningful impact together."],
  ["سواء كنت مقدم رعاية صحية أو باحثًا أو مستثمرًا أو مبتكرًا — لنصنع أثرًا ذا معنى معًا.", "سواء كنت مقدم رعاية صحية أو باحثًا أو مستثمرًا أو مبتكرًا، لنصنع أثرًا ذا معنى معًا."],
  ["Whether you're a clinician, partner, or innovator — let's build mobility that matters.", "Whether you're a clinician, partner, or innovator, let's build mobility that matters."],
  ["Thanks — your message has been received. We'll be in touch shortly.", "Thank you. Your message has been received. We'll be in touch shortly."],
  ["Thanks — you're on the list.", "Thank you. You're on the list."],
  ["شكرًا — تم استلام رسالتك. سنتواصل معك قريبًا.", "شكرًا. تم استلام رسالتك. سنتواصل معك قريبًا."],
  ["شكرًا — تم تسجيلك.", "شكرًا. تم تسجيلك."],
  ["لنتواصل — لنبنِ", "لنتواصل. لنبنِ"],
  ["لنتواصل — لنبنِ <em>ما التالي.</em>", "لنتواصل. لنبنِ <em>ما التالي.</em>"],
  ["つながろう — 次を", "つながろう。次を"],
  ["つながろう — <em>次を</em>一緒につくろう。", "つながろう。<em>次を</em>一緒につくろう。"],
  ["Adaptive algorithms that understand the wearer, stride by stride — so assistance feels personal, not generic.", "Adaptive algorithms that understand the wearer, stride by stride, so assistance feels personal, not generic."],
  ["01 — Mobility", "01 Mobility"],
  ["02 — Intelligence", "02 Intelligence"],
  ["03 — Fit", "03 Fit"],
  [">01</span> — <span", ">01</span> <span"],
  [">02</span> — <span", ">02</span> <span"],
  [">03</span> — <span", ">03</span> <span"],
  ["11.8745° N / 75.3704° E — Kannur, IN", "11.8745° N / 75.3704° E, Kannur, IN"],
  ["Unik Exo — lower-limb exoskeleton, studio view", "Unik Exo, lower-limb exoskeleton, studio view"],
  ["Akhil — mentor portrait placeholder", "Akhil, mentor portrait placeholder"],
  ["Unik Exo supports individuals with lower-limb immobility under clinician supervision — including stroke rehabilitation, gait training, and structured therapy programs.", "Unik Exo supports individuals with lower-limb immobility under clinician supervision, including stroke rehabilitation, gait training, and structured therapy programs."],
  ["Sit, Stand, Walk, and Exercise modes — so therapists can guide patients through every stage of mobility training with one system.", "Sit, Stand, Walk, and Exercise modes, so therapists can guide patients through every stage of mobility training with one system."],
  ['<strong class="text-white">Head office — </strong>', '<strong class="text-white">Head office</strong><br />'],
  ['<strong class="text-white">Innovation hub — </strong>', '<strong class="text-white">Innovation hub</strong><br />'],
  ["every session — fit time, gait symmetry, fatigue, and subjective comfort.", "every session, including fit time, gait symmetry, fatigue, and subjective comfort."],
  ["compensatory movement — patients finding clever ways", "compensatory movement, with patients finding clever ways"],
  ["Every gait cycle looks a little different — cadence, stride length, and joint angles shift", "Every gait cycle looks a little different. Cadence, stride length, and joint angles shift"],
  ["first calibration session — a short walk that lets", "first calibration session, a short walk that lets"],
  ["people with zero context — investors, mentors, other founders — again and again.", "people with zero context: investors, mentors, and other founders, again and again."],
  ["After months in a wheelchair, standing upright in Unik Exo felt like getting a piece of my life back. The therapists could adjust support in real time — I felt safe every step.", "After months in a wheelchair, standing upright in Unik Exo felt like getting a piece of my life back. The therapists could adjust support in real time, and I felt safe every step."],
  ["We tried many devices. Unik Exo was the first that felt designed for real clinics — setup was fast, and the team trained our physiotherapist thoroughly.", "We tried many devices. Unik Exo was the first that felt designed for real clinics. Setup was fast, and the team trained our physiotherapist thoroughly."],
  ["Gait training needs repeatability. Unik Exo gives me step-wise control and clear feedback — it fits into our protocol instead of fighting it.", "Gait training needs repeatability. Unik Exo gives me step-wise control and clear feedback, and it fits into our protocol instead of fighting it."],
  ["Walk mode assistance adapted as I improved. Each session built confidence — from supported steps to walking the length of the clinic.", "Walk mode assistance adapted as I improved. Each session built confidence, from supported steps to walking the length of the clinic."],
  ["Eleven months after the accident I walked the length of the ward. The device disappears — the movement feels like mine.", "Eleven months after the accident I walked the length of the ward. The device disappears, and the movement feels like mine."],
  ["Why the hardest problem in rehabilitation robotics is not torque — it is confidence.", "Why the hardest problem in rehabilitation robotics is not torque. It is confidence."],
  ["people who run gait labs — the ones who asked", "people who run gait labs, the ones who asked"],
  ["a direction we were already taking — keep the system therapist-controlled", "a direction we were already taking: keep the system therapist-controlled"],
  ["Incorrect password — try again.", "Incorrect password. Try again."],
  ["<strong>How this works —</strong>", "<strong>How this works:</strong>"],
  ["<strong>Important —</strong>", "<strong>Important:</strong>"],
  ["No posts yet — add one from the admin panel.", "No posts yet. Add one from the admin panel."],
  ["No testimonials yet — add one from the admin panel.", "No testimonials yet. Add one from the admin panel."],
  ["Clinically structured gait training with Unik Exo — wearable robotic exoskeletons engineered in Kannur, Kerala.", "Clinically structured gait training with Unik Exo: wearable robotic exoskeletons engineered in Kannur, Kerala."],
  ["Astrek Innovations builds wearable robotic exoskeletons that restore lower-limb mobility — robotics, machine learning and motion capture, engineered in Kerala, India.", "Astrek Innovations builds wearable robotic exoskeletons that restore lower-limb mobility: robotics, machine learning and motion capture, engineered in Kerala, India."],
  ["Blog / Insights — Astrek Innovations", "Blog / Insights | Astrek Innovations"],
  ["Testimonials — Astrek Innovations", "Testimonials | Astrek Innovations"],
  ["Content Studio — Astrek Innovations", "Content Studio | Astrek Innovations"],
  ["Unik Exo — Astrek Innovations", "Unik Exo | Astrek Innovations"],
  ["Astrek Innovations — Wearable Robotic Exoskeletons", "Astrek Innovations | Wearable Robotic Exoskeletons"],
  ["Astrek Innovations — Take Your First Steps, Again", "Astrek Innovations | Take Your First Steps, Again"],
  ["${loaderData.title} — Astrek Innovations", "${loaderData.title} | Astrek Innovations"],
];

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === ".git") continue;
      walk(full, files);
    } else if (EXT.has(path.extname(entry.name))) {
      files.push(full);
    }
  }
  return files;
}

function processFile(filePath) {
  let text = fs.readFileSync(filePath, "utf8");
  if (!text.includes("—")) return false;
  const original = text;
  for (const [from, to] of CONTENT_REPLACEMENTS) text = text.split(from).join(to);
  if (text.includes("—")) {
    text = text.replace(/ — /g, ": ");
    text = text.replace(/—/g, ": ");
  }
  if (text !== original) {
    fs.writeFileSync(filePath, text, "utf8");
    return true;
  }
  return false;
}

const files = TARGET_DIRS.flatMap((d) => walk(path.join(ROOT, d)));
const modified = files.filter(processFile);
console.log(`Modified ${modified.length} files`);
modified.forEach((f) => console.log(" ", path.relative(ROOT, f)));

const remaining = files.filter((f) => {
  const t = fs.readFileSync(f, "utf8");
  return /—|&mdash;|&#8212;|&#x2014;/i.test(t);
});
if (remaining.length) {
  console.error("Remaining:", remaining.map((f) => path.relative(ROOT, f)));
  process.exit(1);
}
console.log("Verification passed.");
