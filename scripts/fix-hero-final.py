from pathlib import Path
import re
import sys

try:
    from PIL import Image
except ImportError:
    import subprocess

    subprocess.check_call([sys.executable, "-m", "pip", "install", "pillow", "-q"])
    from PIL import Image

root = Path(__file__).resolve().parents[1]
html_path = root / "src" / "site" / "mech-mirror" / "emergent-body.html"
h = html_path.read_text(encoding="utf-8")

old_btn = (
    '<button type="button" class="ajh-scroll" data-ajh-scroll '
    'data-testid="hero-scroll" aria-label="Scroll to explore">'
)
new_btn = (
    '<a href="#about" class="ajh-scroll" data-ajh-scroll '
    'data-testid="hero-scroll" aria-label="Scroll to explore">'
)
if old_btn in h:
    h = h.replace(old_btn, new_btn, 1)
    for old_close, new_close in (
        (
            '</button> </div> </div> <div class="ajh-partners"',
            '</a> </div> </div> <div class="ajh-partners"',
        ),
        (
            "</button></div></div><div class=\"ajh-partners\"",
            "</a></div></div><div class=\"ajh-partners\"",
        ),
    ):
        if old_close in h:
            h = h.replace(old_close, new_close, 1)
            break
    print("scroll -> anchor OK")
else:
    print("scroll markup already updated or missing button")

partners_new = """<div class="ajh-partners" data-ajh-partners data-testid="hero-partners" aria-label="Trusted partners"> <img class="ajh-partners-art" src="/images/hero-partners-bar.png" alt="" width="1600" height="180" decoding="async" aria-hidden="true" /> <div class="ajh-partners-hotspots"> <a class="ajh-partner" href="https://makervillage.in/" target="_blank" rel="noopener noreferrer" aria-label="Maker Village"></a> <a class="ajh-partner" href="https://startupmission.kerala.gov.in/" target="_blank" rel="noopener noreferrer" aria-label="Kerala Startup Mission"></a> <a class="ajh-partner" href="https://www.iiit.ac.in/" target="_blank" rel="noopener noreferrer" aria-label="IIIT Hyderabad"></a> <a class="ajh-partner" href="http://www.healthstart.co.in/" target="_blank" rel="noopener noreferrer" aria-label="HealthStart India"></a> <a class="ajh-partner" href="https://www.meity.gov.in/" target="_blank" rel="noopener noreferrer" aria-label="MeitY"></a> <a class="ajh-partner" href="https://www.oist.jp/" target="_blank" rel="noopener noreferrer" aria-label="OIST"></a> </div> </div>"""

pattern = r'<div class="ajh-partners" data-ajh-partners data-testid="hero-partners" aria-label="Trusted partners">.*?</div>\s*</section>'
m = re.search(pattern, h, flags=re.DOTALL)
if m:
    h = h[: m.start()] + partners_new + " </section>" + h[m.end() :]
    print("partners markup replaced")
else:
    print("partners block not found")

html_path.write_text(h, encoding="utf-8")

asset_dirs = [
    Path(
        r"C:\Users\DELL\.cursor\projects\c-Users-DELL-Desktop-Astrek-website-elevate-suite-main-updated1\assets"
    ),
    root / "public" / "images",
]
src_img = None
for d in asset_dirs:
    for name in (
        "c__Users_DELL_AppData_Roaming_Cursor_User_workspaceStorage_d3c6222aa29da69b802ef08289b7ed6a_images_image-4795f7f5-1394-4de2-8992-23abe3fc19c4.png",
        "hero-partners-strip.png",
        "hero-partners-logos.png",
    ):
        p = d / name
        if p.exists():
            src_img = p
            break
    if src_img:
        break

if not src_img:
    raise SystemExit("No partner strip source image found")

im = Image.open(src_img).convert("RGBA")
w, hgt = im.size
# Logo row sits in the lower band of the reference snip
top = int(hgt * 0.55)
crop = im.crop((0, top, w, hgt))
out = root / "public" / "images" / "hero-partners-bar.png"
crop.save(out, optimize=True)
print(f"partners bar saved {out.name} {crop.size} from {src_img.name}")

hd = root / "public" / "images" / "hero-journey-hd.png"
print("hd exists", hd.exists(), "bytes", hd.stat().st_size if hd.exists() else 0)
