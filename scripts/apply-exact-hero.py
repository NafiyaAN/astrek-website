from pathlib import Path
import re

root = Path(__file__).resolve().parents[1]
html_path = root / "src" / "site" / "mech-mirror" / "emergent-body.html"
h = html_path.read_text(encoding="utf-8")

hero_new = """<section id="top" data-testid="hero-section" data-hero="journey" class="astrek-journey-hero ajh-exact" aria-label="Introduction">
  <div class="ajh-media" aria-hidden="true">
    <img class="ajh-media-img" src="/images/hero-journey-exact.png" alt="" width="2560" height="1544" fetchpriority="high" decoding="async" data-testid="hero-journey-image" />
  </div>
  <h1 class="ajh-sr-only" data-testid="hero-heading" data-editable="hero-h1" data-i18n="hero-h1">Take your first steps again</h1>
  <p class="ajh-sr-only" data-testid="hero-subcopy" data-editable="hero-sub">Advanced robotics that restore mobility. Dignity. Independence.</p>
  <a href="/product" class="ajh-hit ajh-hit--discover" data-testid="hero-cta-explore">Discover Unik Exo</a>
  <a href="https://youtu.be/NpqgceuA6IM" target="_blank" rel="noopener noreferrer" class="ajh-hit ajh-hit--watch" data-testid="hero-cta-watch">Watch film</a>
  <a href="#about" class="ajh-hit ajh-hit--scroll" data-ajh-scroll data-testid="hero-scroll" aria-label="Scroll to explore">Scroll to explore</a>
  <div class="ajh-partners" data-ajh-partners data-testid="hero-partners" aria-label="Trusted partners">
    <img class="ajh-partners-art" src="/images/hero-partners-bar.png" alt="" width="2560" height="215" decoding="async" aria-hidden="true" />
    <div class="ajh-partners-row">
      <a class="ajh-partner" href="https://makervillage.in/" target="_blank" rel="noopener noreferrer" aria-label="Maker Village"></a>
      <a class="ajh-partner" href="https://startupmission.kerala.gov.in/" target="_blank" rel="noopener noreferrer" aria-label="Kerala Startup Mission"></a>
      <a class="ajh-partner" href="https://www.iiit.ac.in/" target="_blank" rel="noopener noreferrer" aria-label="IIIT Hyderabad"></a>
      <a class="ajh-partner" href="http://www.healthstart.co.in/" target="_blank" rel="noopener noreferrer" aria-label="HealthStart India"></a>
      <a class="ajh-partner" href="https://www.meity.gov.in/" target="_blank" rel="noopener noreferrer" aria-label="MeitY"></a>
      <a class="ajh-partner" href="https://www.oist.jp/" target="_blank" rel="noopener noreferrer" aria-label="OIST"></a>
    </div>
  </div>
</section>"""

pattern = r'<section id="top" data-testid="hero-section" data-hero="journey".*?</section>'
m = re.search(pattern, h, flags=re.DOTALL)
if not m:
    raise SystemExit("hero section not found")
html_path.write_text(h[: m.start()] + hero_new + h[m.end() :], encoding="utf-8")
print("hero markup restored: HD png + partner bar + hotspot hover")
