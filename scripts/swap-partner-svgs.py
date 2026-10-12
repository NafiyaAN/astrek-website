from pathlib import Path

p = Path(__file__).resolve().parents[1] / "src/site/mech-mirror/emergent-body.html"
t = p.read_text(encoding="utf-8")

replacements = {
    "/images/partners-hd/maker-village.png": "/images/maker-village.svg",
    "/images/partners-hd/ksum.png": "/images/ksum.svg",
    "/images/partners-hd/iiit-hyderabad.png": "/images/iiit-hyderabad.svg",
    "/images/partners-hd/healthstart.png": "/images/healthstart.svg",
    "/images/partners-hd/meity.png": "/images/meity.svg",
    "/images/partners-hd/oist.png": "/images/oist.svg",
}

for old, new in replacements.items():
    if old not in t:
        raise SystemExit(f"missing {old}")
    t = t.replace(old, new)

p.write_text(t, encoding="utf-8")
print("swapped partner logos to SVG")
