"""Build exact hero plate from colleague reference.
Crops baked nav off the top; clears bottom partner strip for live logos.
"""
from pathlib import Path
import sys

try:
    from PIL import Image, ImageFilter
except ImportError:
    import subprocess

    subprocess.check_call([sys.executable, "-m", "pip", "install", "pillow", "-q"])
    from PIL import Image, ImageFilter

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
    if not alts:
        raise SystemExit("reference image missing")
    src = alts[-1]

orig = Image.open(src).convert("RGB")
ow, oh = orig.size
print("source", src.name, ow, oh)

# Partner logos from original bottom band
logos = orig.convert("RGBA").crop((0, int(oh * 0.875), ow, oh))
logos = logos.resize((1920, max(90, int(logos.height * (1920 / ow)))), Image.Resampling.LANCZOS)
logos_path = root / "public" / "images" / "hero-partners-bar.png"
logos.save(logos_path, optimize=True)

# Crop away baked nav (top ~9.5%) so live HTML nav floats over the scene
top = int(oh * 0.095)
im = orig.crop((0, top, ow, oh))
w, h = im.size

# Clear partner strip on the cropped plate
partner_top = int(h * 0.88)
floor = im.crop((0, partner_top - 16, w, partner_top - 2)).resize(
    (w, h - partner_top), Image.Resampling.LANCZOS
)
floor = floor.filter(ImageFilter.GaussianBlur(5))
dark_floor = Image.new("RGB", (w, h - partner_top), (32, 34, 36))
floor = Image.blend(floor, dark_floor, 0.28)
im.paste(floor, (0, partner_top))

# Soft top vignette so HTML nav stays readable
vignette = Image.new("RGB", (w, int(h * 0.14)), (8, 12, 16))
top_band = im.crop((0, 0, w, int(h * 0.14)))
top_band = Image.blend(top_band, vignette, 0.45)
im.paste(top_band, (0, 0))

target_w = 1920
out = im.resize((target_w, int(h * (target_w / w))), Image.Resampling.LANCZOS)
jpg = root / "public" / "images" / "hero-journey-exact.jpg"
png = root / "public" / "images" / "hero-journey-exact.png"
out.save(jpg, quality=96, optimize=True, progressive=True)
out.save(png, optimize=True)
print("partners", logos.size)
print("plate", out.size, jpg.stat().st_size)
