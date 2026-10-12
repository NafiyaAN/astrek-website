from pathlib import Path
import re

root = Path(__file__).resolve().parents[1]
html_path = root / "src" / "site" / "mech-mirror" / "emergent-body.html"
h = html_path.read_text(encoding="utf-8")

hero_new = """<section id="top" data-testid="hero-section" data-hero="journey" class="astrek-journey-hero ajh-live" aria-label="Introduction">
  <div class="ajh-media" aria-hidden="true">
    <picture>
      <source type="image/webp" srcset="/images/hero-journey-photo.webp" />
      <img class="ajh-media-img" src="/images/hero-journey-photo.jpg" alt="" width="2560" height="1540" fetchpriority="high" decoding="async" data-testid="hero-journey-image" />
    </picture>
    <div class="ajh-media-shade"></div>
  </div>
  <div class="ajh-shell">
    <div class="ajh-copy">
      <p class="ajh-eyebrow">Astrek Innovations</p>
      <h1 class="ajh-title" data-testid="hero-heading" data-editable="hero-h1" data-i18n="hero-h1">
        <span class="ajh-title-line">Take your</span>
        <span class="ajh-title-line">first steps</span>
        <span class="ajh-title-line ajh-title-accent">again</span>
      </h1>
      <p class="ajh-sub" data-testid="hero-subcopy" data-editable="hero-sub">Advanced robotics that restore mobility. Dignity. Independence.</p>
      <div class="ajh-actions">
        <a href="/product" data-testid="hero-cta-explore" class="ajh-btn ajh-btn--primary">Discover Unik Exo <span class="ajh-btn-icon" aria-hidden="true">→</span></a>
        <a href="https://youtu.be/NpqgceuA6IM" target="_blank" rel="noopener noreferrer" data-testid="hero-cta-watch" class="ajh-btn ajh-btn--ghost"><span class="ajh-btn-icon" aria-hidden="true">▷</span> Watch film</a>
      </div>
      <button type="button" class="ajh-scroll" data-ajh-scroll data-testid="hero-scroll" aria-label="Scroll to explore">
        <span class="ajh-scroll-label">Scroll to explore</span>
        <span class="ajh-scroll-track" aria-hidden="true"><span class="ajh-scroll-dot"></span></span>
      </button>
    </div>
  </div>
  <div class="ajh-partners" data-ajh-partners data-testid="hero-partners" aria-label="Trusted partners">
    <a class="ajh-partner" href="https://makervillage.in/" target="_blank" rel="noopener noreferrer" aria-label="Maker Village"><img src="/images/partners-hd/maker-village.png" alt="" decoding="async" /></a>
    <a class="ajh-partner" href="https://startupmission.kerala.gov.in/" target="_blank" rel="noopener noreferrer" aria-label="Kerala Startup Mission"><img src="/images/partners-hd/ksum.png" alt="" decoding="async" /></a>
    <a class="ajh-partner" href="https://www.iiit.ac.in/" target="_blank" rel="noopener noreferrer" aria-label="IIIT Hyderabad"><img src="/images/partners-hd/iiit-hyderabad.png" alt="" decoding="async" /></a>
    <a class="ajh-partner" href="http://www.healthstart.co.in/" target="_blank" rel="noopener noreferrer" aria-label="HealthStart India"><img src="/images/partners-hd/healthstart.png" alt="" decoding="async" /></a>
    <a class="ajh-partner" href="https://www.meity.gov.in/" target="_blank" rel="noopener noreferrer" aria-label="MeitY"><img src="/images/partners-hd/meity.png" alt="" decoding="async" /></a>
    <a class="ajh-partner" href="https://www.oist.jp/" target="_blank" rel="noopener noreferrer" aria-label="OIST"><img src="/images/partners-hd/oist.png" alt="" decoding="async" /></a>
  </div>
</section>"""

pattern = r'<section id="top" data-testid="hero-section" data-hero="journey".*?</section>'
m = re.search(pattern, h, flags=re.DOTALL)
if not m:
    raise SystemExit("hero section not found")
html_path.write_text(h[: m.start()] + hero_new + h[m.end() :], encoding="utf-8")
print("live HTML hero applied")
