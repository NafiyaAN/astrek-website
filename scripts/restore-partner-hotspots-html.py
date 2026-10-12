from pathlib import Path
import re

p = Path(__file__).resolve().parents[1] / "src/site/mech-mirror/emergent-body.html"
t = p.read_text(encoding="utf-8")

new_block = (
    '<div class="ajh-partners" data-testid="hero-partners" data-ajh-partners '
    'aria-label="Trusted partners"> '
    '<img class="ajh-partners-visual" src="/images/hero-partners-panel.png?v=2" '
    'alt="" aria-hidden="true" width="4096" height="212" loading="eager" decoding="async" /> '
    '<div class="ajh-partners-hotspots"> '
    '<a class="ajh-partner" href="https://makervillage.in/" target="_blank" '
    'rel="noopener noreferrer" aria-label="Maker Village"></a> '
    '<a class="ajh-partner" href="https://startupmission.kerala.gov.in/" target="_blank" '
    'rel="noopener noreferrer" aria-label="Kerala Startup Mission"></a> '
    '<a class="ajh-partner" href="https://www.iiit.ac.in/" target="_blank" '
    'rel="noopener noreferrer" aria-label="IIIT Hyderabad"></a> '
    '<a class="ajh-partner" href="http://www.healthstart.co.in/" target="_blank" '
    'rel="noopener noreferrer" aria-label="HealthStart India"></a> '
    '<a class="ajh-partner" href="https://www.meity.gov.in/" target="_blank" '
    'rel="noopener noreferrer" aria-label="MeitY"></a> '
    '<a class="ajh-partner" href="https://www.oist.jp/" target="_blank" '
    'rel="noopener noreferrer" aria-label="OIST"></a> '
    "</div> </div>"
)

pat = re.compile(
    r'<div class="ajh-partners" data-testid="hero-partners"[^>]*>.*?</div>\s*</div>\s*</section>',
    re.DOTALL,
)
m = pat.search(t)
if not m:
    pat = re.compile(
        r'<div class="ajh-partners" data-testid="hero-partners"[^>]*>.*?</div>\s*</section>',
        re.DOTALL,
    )
    m = pat.search(t)
if not m:
    raise SystemExit("partners block not found")

t = t[: m.start()] + new_block + " </section>" + t[m.end() :]
p.write_text(t, encoding="utf-8")
assert "hero-partners-panel.png" in p.read_text(encoding="utf-8")
print("restored exact strip + hotspots")
