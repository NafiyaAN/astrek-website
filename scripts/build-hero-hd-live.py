"""Build crisp live-hero assets: HD photo background + individual partner logos."""
from pathlib import Path
import sys

try:
    from PIL import Image, ImageFilter, ImageEnhance, ImageOps
except ImportError:
    import subprocess

    subprocess.check_call([sys.executable, "-m", "pip", "install", "pillow", "-q"])
    from PIL import Image, ImageFilter, ImageEnhance, ImageOps

try:
    import cv2
    import numpy as np

    HAS_CV = True
except ImportError:
    HAS_CV = False

root = Path(__file__).resolve().parents[1]
images = root / "public" / "images"
hd = images / "partners-hd"
hd.mkdir(parents=True, exist_ok=True)

# ── Partner logos: split the bar into sharp individual PNGs ──
bar_path = images / "hero-partners-bar.png"
if bar_path.exists():
    bar = Image.open(bar_path).convert("RGBA")
    bw, bh = bar.size
    # Upscale bar first for retina clarity
    bar_hi = bar.resize((3840, max(200, int(bh * (3840 / bw)))), Image.Resampling.LANCZOS)
    bar_hi = bar_hi.filter(ImageFilter.UnsharpMask(radius=1.1, percent=160, threshold=1))
    bar_hi.save(bar_path, optimize=True)
    bw, bh = bar_hi.size

    names = ["maker-village", "ksum", "iiit-hyderabad", "healthstart", "meity", "oist"]
    pad_x = int(bw * 0.012)
    pad_y = int(bh * 0.06)
    for i, name in enumerate(names):
        x0 = int(bw * i / 6) + pad_x
        x1 = int(bw * (i + 1) / 6) - pad_x
        cell = bar_hi.crop((x0, pad_y, x1, bh - pad_y))
        target_h = 260
        target_w = max(80, int(target_h * cell.width / max(1, cell.height)))
        cell = cell.resize((target_w, target_h), Image.Resampling.LANCZOS)
        cell = cell.filter(ImageFilter.UnsharpMask(radius=0.9, percent=140, threshold=1))
        cell.save(hd / f"{name}.png", optimize=True)
        print("partner", name, cell.size)
else:
    print("skip partners — bar missing")

# ── Hero photo: sharpen scene plate (no UI — live HTML covers left column) ──
src_candidates = [
    images / "hero-journey-hd.png",
    images / "hero-journey-exact.png",
    images / "hero-journey-exact.jpg",
]
src = next((p for p in src_candidates if p.exists()), None)
if not src:
    raise SystemExit("no hero source image found")

im = Image.open(src).convert("RGB")
print("photo source", src.name, im.size)

target_w = 2560
if HAS_CV:
    arr = np.array(im)[:, :, ::-1]
    if arr.shape[1] < target_w:
        nh = int(arr.shape[0] * (target_w / arr.shape[1]))
        arr = cv2.resize(arr, (target_w, nh), interpolation=cv2.INTER_LANCZOS4)
    blur = cv2.GaussianBlur(arr, (0, 0), 0.85)
    arr = cv2.addWeighted(arr, 1.35, blur, -0.35, 0)
    out = Image.fromarray(arr[:, :, ::-1])
else:
    out = im
    if out.width < target_w:
        out = out.resize((target_w, int(out.height * (target_w / out.width))), Image.Resampling.LANCZOS)
    out = out.filter(ImageFilter.UnsharpMask(radius=1.2, percent=130, threshold=1))

out = ImageEnhance.Contrast(out).enhance(1.04)
out = ImageEnhance.Sharpness(out).enhance(1.08)

jpg = images / "hero-journey-photo.jpg"
webp = images / "hero-journey-photo.webp"
out.save(jpg, quality=95, optimize=True, progressive=True, subsampling=0)
out.save(webp, quality=90, method=6)
print("photo", out.size, "jpg", jpg.stat().st_size, "webp", webp.stat().st_size)
