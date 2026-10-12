"""Stronger professional HD upscale + sharpen for the exact hero plate."""
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
    try:
        import subprocess

        subprocess.check_call(
            [sys.executable, "-m", "pip", "install", "opencv-python-headless", "-q"]
        )
        import cv2
        import numpy as np

        HAS_CV = True
    except Exception:
        HAS_CV = False

root = Path(__file__).resolve().parents[1]
assets = Path(
    r"C:\Users\DELL\.cursor\projects\c-Users-DELL-Desktop-Astrek-website-elevate-suite-main-updated1\assets"
)
src = assets / (
    "c__Users_DELL_AppData_Roaming_Cursor_User_workspaceStorage_"
    "d3c6222aa29da69b802ef08289b7ed6a_images_"
    "WhatsApp_Image_2026-08-14_at_4.26.01_AM-8c80d96d-25e2-4d1b-8d2f-43a744971cfc.jpg"
)
if not src.exists():
    alts = sorted(assets.glob("*WhatsApp_Image*"))
    src = alts[-1]

orig = Image.open(src).convert("RGB")
ow, oh = orig.size
print("source", src.name, ow, oh, "opencv", HAS_CV)

# Partner strip — crisp upscale
logos_band = orig.crop((0, int(oh * 0.875), ow, oh)).convert("RGBA")
logos_hi = logos_band.resize(
    (2880, max(140, int(logos_band.height * (2880 / ow)))),
    Image.Resampling.LANCZOS,
)
logos_hi = logos_hi.filter(ImageFilter.UnsharpMask(radius=1.5, percent=160, threshold=2))
logos_hi = ImageEnhance.Contrast(logos_hi).enhance(1.08)
logos_hi = ImageEnhance.Sharpness(logos_hi).enhance(1.25)
(root / "public" / "images" / "hero-partners-bar.png").write_bytes(b"")
logos_hi.save(root / "public" / "images" / "hero-partners-bar.png", optimize=True)
print("partners", logos_hi.size)

# Hero plate
top = int(oh * 0.095)
im = orig.crop((0, top, ow, oh))
w, h = im.size

partner_top = int(h * 0.88)
floor = im.crop((0, partner_top - 16, w, partner_top - 2)).resize(
    (w, h - partner_top), Image.Resampling.LANCZOS
)
floor = floor.filter(ImageFilter.GaussianBlur(5))
dark_floor = Image.new("RGB", (w, h - partner_top), (32, 34, 36))
floor = Image.blend(floor, dark_floor, 0.28)
im.paste(floor, (0, partner_top))

vignette = Image.new("RGB", (w, int(h * 0.14)), (8, 12, 16))
top_band = im.crop((0, 0, w, int(h * 0.14)))
top_band = Image.blend(top_band, vignette, 0.42)
im.paste(top_band, (0, 0))

target_w = 3200

if HAS_CV:
    arr = np.array(im)[:, :, ::-1]  # RGB->BGR
    # Gentle denoise before upscale (keeps edges, kills WhatsApp mush)
    arr = cv2.bilateralFilter(arr, d=5, sigmaColor=25, sigmaSpace=25)
    # Multi-step INTER_LANCZOS4 upscale
    cur = arr
    while cur.shape[1] < target_w:
        nw = min(target_w, int(cur.shape[1] * 1.75))
        nh = int(cur.shape[0] * (nw / cur.shape[1]))
        cur = cv2.resize(cur, (nw, nh), interpolation=cv2.INTER_LANCZOS4)
    if cur.shape[1] != target_w:
        nh = int(cur.shape[0] * (target_w / cur.shape[1]))
        cur = cv2.resize(cur, (target_w, nh), interpolation=cv2.INTER_LANCZOS4)

    # CLAHE local contrast for "pro" clarity
    lab = cv2.cvtColor(cur, cv2.COLOR_BGR2LAB)
    l, a, b = cv2.split(lab)
    clahe = cv2.createCLAHE(clipLimit=1.8, tileGridSize=(8, 8))
    l = clahe.apply(l)
    cur = cv2.cvtColor(cv2.merge([l, a, b]), cv2.COLOR_LAB2BGR)

    # Unsharp mask via OpenCV
    blur = cv2.GaussianBlur(cur, (0, 0), 1.15)
    cur = cv2.addWeighted(cur, 1.55, blur, -0.55, 0)

    # Mild saturation / value lift
    hsv = cv2.cvtColor(cur, cv2.COLOR_BGR2HSV).astype(np.float32)
    hsv[:, :, 1] = np.clip(hsv[:, :, 1] * 1.06, 0, 255)
    hsv[:, :, 2] = np.clip(hsv[:, :, 2] * 1.02, 0, 255)
    cur = cv2.cvtColor(hsv.astype(np.uint8), cv2.COLOR_HSV2BGR)

    out = Image.fromarray(cur[:, :, ::-1])
else:
    cur = im
    while cur.width < target_w:
        nw = min(target_w, int(cur.width * 1.6))
        nh = int(cur.height * (nw / cur.width))
        cur = cur.resize((nw, nh), Image.Resampling.LANCZOS)
        cur = cur.filter(ImageFilter.UnsharpMask(radius=1.2, percent=125, threshold=2))
    if cur.width != target_w:
        cur = cur.resize(
            (target_w, int(cur.height * (target_w / cur.width))),
            Image.Resampling.LANCZOS,
        )
    out = ImageEnhance.Sharpness(cur).enhance(1.45)
    out = ImageEnhance.Contrast(out).enhance(1.1)
    out = ImageEnhance.Color(out).enhance(1.05)
    out = out.filter(ImageFilter.UnsharpMask(radius=1.8, percent=170, threshold=2))

# Final polish
out = ImageEnhance.Sharpness(out).enhance(1.12)
out = ImageOps.autocontrast(out, cutoff=0.4)

jpg = root / "public" / "images" / "hero-journey-exact.jpg"
png = root / "public" / "images" / "hero-journey-exact.png"
out.save(jpg, quality=98, optimize=True, progressive=True, subsampling=0)
out.save(png, optimize=True)
print("plate", out.size, "jpg", jpg.stat().st_size, "png", png.stat().st_size)
