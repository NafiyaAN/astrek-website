"""Build exact flat partner strip from colleague snip 2 + HD cell logos."""
from pathlib import Path
import numpy as np
from PIL import Image, ImageFilter, ImageEnhance

src = Path(
    r"C:\Users\DELL\.cursor\projects\c-Users-DELL-Desktop-Astrek-website-elevate-suite-main-updated1"
    r"\assets\c__Users_DELL_AppData_Roaming_Cursor_User_workspaceStorage_"
    r"d3c6222aa29da69b802ef08289b7ed6a_images_image-aa6536df-555d-4e09-be05-17631c19a710.png"
)
root = Path(__file__).resolve().parents[1]
out_images = root / "public" / "images"
hd = out_images / "partners-hd"
hd.mkdir(parents=True, exist_ok=True)

im = Image.open(src).convert("RGBA")
w, h = im.size
print("src", w, h)

# Snip is mostly floor + logos. Logos sit in lower ~28%.
y0 = int(h * 0.70)
y1 = min(h, int(h * 0.98))
strip = im.crop((0, y0, w, y1))
# Upscale hard for retina HD
strip = strip.resize((strip.width * 4, strip.height * 4), Image.Resampling.LANCZOS)
# Mild clarity boost
strip = ImageEnhance.Contrast(strip).enhance(1.12)
strip = ImageEnhance.Sharpness(strip).enhance(1.35)
strip_path = out_images / "hero-partners-panel.png"
strip.save(strip_path, optimize=True)
print("strip", strip.size, "->", strip_path.name)

# Also cut individual cells as white-on-transparent for hover lift look
bw, bh = strip.size
arr = np.array(strip).astype(np.float32)
lum = 0.2126 * arr[:, :, 0] + 0.7152 * arr[:, :, 1] + 0.0722 * arr[:, :, 2]
# Logos are bright white on dark grey — keep bright ink only
alpha = np.clip((lum - 110.0) * (255.0 / 70.0), 0, 255)
white = np.zeros_like(arr)
white[:, :, 0] = 255
white[:, :, 1] = 255
white[:, :, 2] = 255
white[:, :, 3] = alpha
panel = Image.fromarray(white.astype(np.uint8), "RGBA")

names = [
    "maker-village",
    "ksum",
    "iiit-hyderabad",
    "healthstart",
    "meity",
    "oist",
]
for i, name in enumerate(names):
    x0 = int(bw * i / 6) + int(bw * 0.02)
    x1 = int(bw * (i + 1) / 6) - int(bw * 0.02)
    crop = panel.crop((x0, int(bh * 0.08), x1, int(bh * 0.92)))
    a = np.array(crop)
    gate = 50 if name == "oist" else 30
    ys, xs = np.where(a[:, :, 3] > gate)
    if len(xs):
        pad = 16
        crop = crop.crop(
            (
                max(0, xs.min() - pad),
                max(0, ys.min() - pad),
                min(a.shape[1], xs.max() + pad + 1),
                min(a.shape[0], ys.max() + pad + 1),
            )
        )
        if name == "oist":
            ca = np.array(crop).astype(np.float32)
            ca[:, :, 3] = np.where(ca[:, :, 3] < 90, 0, np.minimum(255, ca[:, :, 3] * 1.15))
            crop = Image.fromarray(ca.astype(np.uint8), "RGBA")
    nh = 180
    nw = max(72, int(nh * crop.width / max(1, crop.height)))
    crop = crop.resize((nw, nh), Image.Resampling.LANCZOS)
    crop = crop.filter(ImageFilter.UnsharpMask(radius=1.0, percent=130, threshold=2))
    crop.save(hd / f"{name}.png", optimize=True)
    print(name, crop.size)
