"""Build HD partner panel EXACTLY from the zoomed snip 2 image."""
from pathlib import Path
from PIL import Image, ImageEnhance, ImageFilter

src = Path(
    r"C:\Users\DELL\.cursor\projects\c-Users-DELL-Desktop-Astrek-website-elevate-suite-main-updated1"
    r"\assets\c__Users_DELL_AppData_Roaming_Cursor_User_workspaceStorage_"
    r"d3c6222aa29da69b802ef08289b7ed6a_images_image-adb9f1fd-3c26-432c-9453-107be7399089.png"
)
out = Path(__file__).resolve().parents[1] / "public" / "images" / "hero-partners-panel.png"

im = Image.open(src).convert("RGBA")
w, h = im.size
print("src", w, h)

# Snip is almost entirely the logo bar — trim only tiny letterbox edges if any
# Keep full width; slight vertical trim of outer fade if needed
y0 = 0
y1 = h
# Detect content band by luminance variance
import numpy as np

arr = np.array(im.convert("RGB"))
row_var = arr.reshape(h, -1).std(axis=1)
# rows with logos have higher variance than empty fade
active = np.where(row_var > row_var.max() * 0.18)[0]
if len(active):
    y0 = max(0, int(active[0]) - 4)
    y1 = min(h, int(active[-1]) + 6)
band = im.crop((0, y0, w, y1))
print("cropped", band.size, "y", y0, y1)

# Ultra HD upscale (6x) + clarity
band = band.resize((band.width * 6, band.height * 6), Image.Resampling.LANCZOS)
band = ImageEnhance.Contrast(band).enhance(1.08)
band = ImageEnhance.Sharpness(band).enhance(1.45)
band = band.filter(ImageFilter.UnsharpMask(radius=1.4, percent=140, threshold=2))

band.save(out, optimize=True)
print("wrote", out, band.size)
