from pathlib import Path

h = Path("src/site/mech-mirror/emergent-body.html").read_text(encoding="utf-8")
checks = {
    "journey hero": 'data-hero="journey"' in h,
    "hd image": "hero-journey-hd.png" in h,
    "discover /product": 'data-testid="hero-cta-explore"' in h and 'href="/product"' in h,
    "watch youtube": "youtu.be/NpqgceuA6IM" in h,
    "scroll anchor": 'a href="#about" class="ajh-scroll"' in h,
    "partners bar": "hero-partners-bar.png" in h,
    "partner hotspots": 'class="ajh-partners-hotspots"' in h,
}
for k, v in checks.items():
    print(("OK" if v else "FAIL"), k)
i = h.find("ajh-partners")
print(h[i : i + 700])
