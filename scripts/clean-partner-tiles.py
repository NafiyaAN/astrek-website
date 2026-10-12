"""Make partner logo tile backgrounds transparent so white logos pop on the strip."""
from pathlib import Path
import sys

try:
    from PIL import Image
except ImportError:
    import subprocess

    subprocess.check_call([sys.executable, "-m", "pip", "install", "pillow", "-q"])
    from PIL import Image

root = Path(__file__).resolve().parents[1]
partner_dir = root / "public" / "images" / "partners"

for path in sorted(partner_dir.glob("*.png")):
    im = Image.open(path).convert("RGBA")
    pixels = im.load()
    w, h = im.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = pixels[x, y]
            # Dark / mid-gray panel -> transparent; keep light logo strokes
            luma = 0.2126 * r + 0.7152 * g + 0.0722 * b
            if luma < 95:
                pixels[x, y] = (r, g, b, 0)
            elif luma < 140:
                # soft edge
                alpha = int(max(0, min(255, (luma - 95) * 5.5)))
                pixels[x, y] = (255, 255, 255, alpha)
            else:
                # boost logo to clean white
                pixels[x, y] = (255, 255, 255, 255)
    path.write_bytes(b"")  # ensure replace
    im.save(path, optimize=True)
    print("cleaned", path.name)
