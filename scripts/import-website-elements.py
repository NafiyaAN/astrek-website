"""Import high-res Unik Exo photos from website elements into public/images."""
from pathlib import Path

from PIL import Image

SRC = Path(r"C:\Users\DELL\Desktop\Astrek website\website elements\website elements")
DST = Path(__file__).resolve().parents[1] / "public" / "images"
MAX_EDGE = 2400
WEBP_Q = 88


def src_file(name: str) -> Path:
    exact = SRC / name
    if exact.exists():
        return exact
    for path in SRC.iterdir():
        if path.name == name or path.name.startswith(name):
            return path
    raise FileNotFoundError(name)


def crop_dark(im: Image.Image, threshold: int = 18, pad: float = 0.07) -> Image.Image:
    gray = im.convert("L")
    mask = gray.point(lambda p: 255 if p > threshold else 0)
    bbox = mask.getbbox()
    if not bbox:
        return im
    left, top, right, bottom = bbox
    width, height = im.size
    pad_x = int((right - left) * pad)
    pad_y = int((bottom - top) * pad)
    return im.crop(
        (
            max(0, left - pad_x),
            max(0, top - pad_y),
            min(width, right + pad_x),
            min(height, bottom + pad_y),
        )
    )


def crop_ratio(im: Image.Image, ratio: float = 0.72, top_bias: float = 0.18) -> Image.Image:
    width, height = im.size
    current = width / height
    if current > ratio:
        new_w = int(height * ratio)
        x = (width - new_w) // 2
        return im.crop((x, 0, x + new_w, height))
    new_h = int(width / ratio)
    max_y = max(0, height - new_h)
    y = int(max_y * top_bias)
    return im.crop((0, y, width, y + new_h))


def resize_max(im: Image.Image, max_edge: int = MAX_EDGE) -> Image.Image:
    width, height = im.size
    long_edge = max(width, height)
    if long_edge <= max_edge:
        return im
    scale = max_edge / long_edge
    return im.resize((int(width * scale), int(height * scale)), Image.Resampling.LANCZOS)


def save_pair(im: Image.Image, stem: str) -> tuple[int, int]:
    im = resize_max(im)
    if im.mode not in ("RGB", "RGBA"):
        im = im.convert("RGBA")
    png_path = DST / f"{stem}.png"
    webp_path = DST / f"{stem}.webp"
    im.save(png_path, "PNG", optimize=True, compress_level=6)
    im.save(webp_path, "WEBP", quality=WEBP_Q, method=6)
    print(f"{stem}: {im.size[0]}x{im.size[1]}  png={png_path.stat().st_size} webp={webp_path.stat().st_size}")
    return im.size


def save_webp(im: Image.Image, name: str, max_edge: int = MAX_EDGE) -> tuple[int, int]:
    im = resize_max(im, max_edge)
    if im.mode == "P":
        im = im.convert("RGBA")
    elif im.mode not in ("RGB", "RGBA"):
        im = im.convert("RGB")
    path = DST / name
    im.save(path, "WEBP", quality=WEBP_Q, method=6)
    print(f"{name}: {im.size[0]}x{im.size[1]}  {path.stat().st_size}")
    return im.size


def open_rgba(path: Path) -> Image.Image:
    im = Image.open(path)
    im.load()
    return im.convert("RGBA")


def main() -> None:
    DST.mkdir(parents=True, exist_ok=True)

    untitled = next(p for p in SRC.iterdir() if p.name.startswith("Untitled"))

    walk = crop_ratio(crop_dark(open_rgba(src_file("exoman walk.png"))), 0.72, 0.22)
    save_pair(walk, "walk-mode")

    stand = crop_ratio(crop_dark(open_rgba(src_file("UnikExo V3 JP wearing.png"))), 0.62, 0.08)
    save_pair(stand, "stand-mode")

    kid = crop_ratio(open_rgba(src_file("kid using unikexo 1.png")), 0.62, 0.12)
    save_pair(kid, "clinical-pilot")

    studio = crop_dark(open_rgba(untitled), threshold=12, pad=0.04)
    save_webp(studio, "inline-4bcc708993.webp", 2200)
    save_pair(crop_ratio(studio, 0.62, 0.05), "studio-product")

    w, h = studio.size
    hip = studio.crop((int(w * 0.18), int(h * 0.08), int(w * 0.82), int(h * 0.62)))
    save_webp(hip, "unikexo-hip.webp", 1600)

    ankle = studio.crop((int(w * 0.22), int(h * 0.52), int(w * 0.78), int(h * 0.98)))
    save_webp(ankle, "unikexo-ankle.webp", 1600)

    fit = studio.crop((int(w * 0.12), 0, int(w * 0.88), int(h * 0.42)))
    save_webp(fit, "unikexo-fit.webp", 1600)

    save_webp(Image.open(src_file("IMG20250901184426.jpg")).convert("RGB"), "unikexo-knee.webp", 1800)
    save_webp(Image.open(src_file("IMG20250901184516.jpg")).convert("RGB"), "unikexo-control.webp", 1800)
    save_webp(Image.open(src_file("IMG20250901184353.jpg")).convert("RGB"), "unikexo-front.webp", 1800)
    save_webp(Image.open(src_file("IMG20250901184334.jpg")).convert("RGB"), "astrek-lab.webp", 1800)

    lab = Image.open(src_file("IMG20250901184334.jpg")).convert("RGB")
    lab = resize_max(lab, 1800)
    lab.save(DST / "astrek-lab.png", "PNG", optimize=True)
    print(f"astrek-lab.png: {lab.size}")


if __name__ == "__main__":
    main()
