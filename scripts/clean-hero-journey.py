from PIL import Image, ImageFilter, ImageDraw
from pathlib import Path

src = Path(
    r"c:\Users\DELL\Desktop\Astrek website\elevate-suite-main-updated1\public\images\hero-journey.jpg"
)
im = Image.open(src).convert("RGB")
w, h = im.size

# Soften / obscure the baked mockup copy on the left so HTML typography owns that space.
overlay = Image.new("RGBA", (w, h), (0, 0, 0, 0))
draw = ImageDraw.Draw(overlay)
for x in range(int(w * 0.46)):
    t = x / (w * 0.46)
    # Strong cover near left, fade toward the people.
    alpha = int(245 * (1 - t) ** 1.35)
    draw.line([(x, 0), (x, h)], fill=(7, 11, 15, alpha))

# Also deepen the bottom strip so partner logos sit cleanly.
for y in range(int(h * 0.78), h):
    t = (y - h * 0.78) / (h * 0.22)
    alpha = int(160 * t)
    draw.line([(0, y), (w, y)], fill=(7, 11, 15, alpha))

out = Image.alpha_composite(im.convert("RGBA"), overlay).convert("RGB")
out_path = Path(
    r"c:\Users\DELL\Desktop\Astrek website\elevate-suite-main-updated1\public\images\hero-journey.jpg"
)
out.save(out_path, quality=93)
print("cleaned", out_path, out.size)
