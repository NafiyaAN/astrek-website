"""Build exact full-width partner panel asset from colleague snip."""
from pathlib import Path
from PIL import Image

src = Path(
    r"C:\Users\DELL\.cursor\projects\c-Users-DELL-Desktop-Astrek-website-elevate-suite-main-updated1"
    r"\assets\c__Users_DELL_AppData_Roaming_Cursor_User_workspaceStorage_"
    r"d3c6222aa29da69b802ef08289b7ed6a_images_image-44724407-6e57-4d2b-aab0-366974a9cc72.png"
)
out_dir = Path(__file__).resolve().parents[1] / "public" / "images"

im = Image.open(src).convert("RGBA")
w, h = im.size
print("src", w, h)

# Snip already focuses on bottom; logo glass starts ~mid. Crop only frosted cells.
# Empirically: logos occupy lower ~48% of this snip.
y0 = int(h * 0.48)
band = im.crop((0, y0, w, h))
# Upscale for HD retina
band = band.resize((band.width * 4, band.height * 4), Image.Resampling.LANCZOS)

panel_path = out_dir / "hero-partners-panel.png"
band.save(panel_path, optimize=True)
print("wrote", panel_path, band.size)
