"""Upscale Unik Exo mode photos to 4K long-edge using LANCZOS + unsharp."""
from pathlib import Path

from PIL import Image, ImageFilter, ImageEnhance

ROOT = Path(__file__).resolve().parents[1] / "public" / "images"
TARGET_LONG_EDGE = 2160
FILES = ["sit-mode.png", "stand-mode.png", "walk-mode.png"]


def upscale(path: Path) -> None:
    src = Image.open(path).convert("RGBA")
    w, h = src.size
    long_edge = max(w, h)
    if long_edge >= TARGET_LONG_EDGE:
        print(f"skip {path.name}: already {w}x{h}")
        return

    scale = TARGET_LONG_EDGE / long_edge
    nw, nh = int(round(w * scale)), int(round(h * scale))
    print(f"{path.name}: {w}x{h} -> {nw}x{nh}")

    backup = path.with_suffix(".original.png")
    if not backup.exists():
        src.save(backup, "PNG")

    out = src.resize((nw, nh), Image.Resampling.LANCZOS)
    rgb = out.convert("RGB")
    rgb = rgb.filter(ImageFilter.UnsharpMask(radius=1.6, percent=140, threshold=2))
    rgb = ImageEnhance.Contrast(rgb).enhance(1.06)
    rgb = ImageEnhance.Sharpness(rgb).enhance(1.12)
    alpha = out.getchannel("A")
    merged = rgb.convert("RGBA")
    merged.putalpha(alpha)

    merged.save(path, "PNG", optimize=True, compress_level=9)
    webp = path.with_suffix(".webp")
    merged.save(webp, "WEBP", quality=92, method=6)
    print(f"  wrote {path.name} ({path.stat().st_size} bytes) and {webp.name}")


if __name__ == "__main__":
    for name in FILES:
        upscale(ROOT / name)
