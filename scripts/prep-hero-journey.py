from PIL import Image
from pathlib import Path

src = Path(
    r"C:\Users\DELL\.cursor\projects\c-Users-DELL-Desktop-Astrek-website-elevate-suite-main-updated1\assets\c__Users_DELL_AppData_Roaming_Cursor_User_workspaceStorage_d3c6222aa29da69b802ef08289b7ed6a_images_WhatsApp_Image_2026-08-14_at_4.26.01_AM-e27a061d-c043-4322-82a0-5a3f9989bd08.jpg"
)
out_dir = Path(r"c:\Users\DELL\Desktop\Astrek website\elevate-suite-main-updated1\public\images")
out_dir.mkdir(parents=True, exist_ok=True)

im = Image.open(src).convert("RGB")
w, h = im.size
print("size", w, h)

# Keep the designed hero canvas, but remove the mockup's top nav chrome
# and bottom partner strip so our live site header + partner row can own those bands.
top = int(h * 0.105)
bottom = int(h * 0.885)
cropped = im.crop((0, top, w, bottom))

# Upscale for sharper full-viewport display
scale = 2
up = cropped.resize((cropped.width * scale, cropped.height * scale), Image.Resampling.LANCZOS)
out = out_dir / "hero-journey.jpg"
up.save(out, quality=94, optimize=True)
print("saved", out, up.size)
