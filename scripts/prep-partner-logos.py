"""Crop individual partner marks from the reference strip and save crisp PNGs."""
from pathlib import Path
from PIL import Image

src = Path(
    r"c:\Users\DELL\Desktop\Astrek website\elevate-suite-main-updated1\public\images\hero-partners-logos.png"
)
out_dir = Path(
    r"c:\Users\DELL\Desktop\Astrek website\elevate-suite-main-updated1\public\images\partners-hd"
)
out_dir.mkdir(parents=True, exist_ok=True)

im = Image.open(src).convert("RGBA")
w, h = im.size
print("source", w, h)

# Six roughly equal logo columns across the strip
names = [
    "maker-village",
    "ksum",
    "iiit-hyderabad",
    "healthstart",
    "meity",
    "oist",
]

# Trim a little vertical padding, then slice columns with slight overlap margins
top = int(h * 0.08)
bottom = int(h * 0.92)
band = im.crop((0, top, w, bottom))
bw, bh = band.size

for i, name in enumerate(names):
    x0 = int(bw * i / 6)
    x1 = int(bw * (i + 1) / 6)
    # inset slightly so we don't clip neighbors
    pad = int(bw * 0.01)
    crop = band.crop((x0 + pad, 0, x1 - pad, bh))
    # Upscale 2x for crispness on retina
    up = crop.resize((crop.width * 2, crop.height * 2), Image.Resampling.LANCZOS)
    out = out_dir / f"{name}.png"
    up.save(out, optimize=True)
    print("saved", out.name, up.size)

# Also save a tighter full strip for fallback
tight = band.resize((min(1600, bw * 2), int(bh * 2 * min(1600, bw * 2) / (bw * 2))), Image.Resampling.LANCZOS)
strip = Path(
    r"c:\Users\DELL\Desktop\Astrek website\elevate-suite-main-updated1\public\images\hero-partners-logos.png"
)
# Rebuild a cleaner, shorter strip: dark transparent-ish by keeping as-is but smaller canvas
tight.save(strip, optimize=True)
print("updated strip", tight.size)
