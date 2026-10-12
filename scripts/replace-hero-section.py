from pathlib import Path

html_path = Path(
    r"c:\Users\DELL\Desktop\Astrek website\elevate-suite-main-updated1\src\site\mech-mirror\emergent-body.html"
)
html = html_path.read_text(encoding="utf-8")

start = html.find('<section id="top" data-testid="hero-section"')
if start < 0:
    raise SystemExit("hero section start not found")
close = html.find("</section>", start)
if close < 0:
    raise SystemExit("hero section end not found")
close += len("</section>")

new_hero = r'''<section id="top" data-testid="hero-section" data-hero="journey" class="astrek-journey-hero" aria-label="Introduction">
  <div class="ajh-media" aria-hidden="true">
    <img
      class="ajh-media-img"
      src="/images/hero-journey-hd.png"
      alt=""
      width="1536"
      height="1024"
      fetchpriority="high"
      decoding="async"
      data-testid="hero-journey-image"
    />
    <div class="ajh-media-shade"></div>
  </div>

  <div class="ajh-shell">
    <div class="ajh-copy">
      <h1 class="ajh-title" data-testid="hero-heading" data-editable="hero-h1" data-i18n="hero-h1">
        <span class="ajh-title-line">Take your</span>
        <span class="ajh-title-line">first steps</span>
        <span class="ajh-title-line ajh-title-accent">again</span>
      </h1>

      <p class="ajh-sub" data-testid="hero-subcopy" data-editable="hero-sub">
        Advanced robotics that restore mobility. Dignity. Independence.
      </p>

      <div class="ajh-actions">
        <a href="/product" data-testid="hero-cta-explore" class="ajh-btn ajh-btn--primary">
          Discover Unik Exo <span aria-hidden="true">→</span>
        </a>
        <a
          href="https://youtu.be/NpqgceuA6IM"
          target="_blank"
          rel="noopener noreferrer"
          data-testid="hero-cta-watch"
          class="ajh-btn ajh-btn--ghost"
        >
          <span aria-hidden="true">▶</span> Watch film
        </a>
      </div>

      <button type="button" class="ajh-scroll" data-ajh-scroll data-testid="hero-scroll" aria-label="Scroll to explore">
        <span class="ajh-scroll-label">Scroll to explore</span>
        <span class="ajh-scroll-track" aria-hidden="true">
          <span class="ajh-scroll-dot"></span>
        </span>
      </button>
    </div>
  </div>

  <div class="ajh-partners" data-ajh-partners data-testid="hero-partners" aria-label="Trusted partners">
    <a class="ajh-partner" href="https://makervillage.in/" target="_blank" rel="noopener noreferrer" aria-label="Maker Village">
      <img src="/images/maker-village.svg" alt="Maker Village" />
    </a>
    <a class="ajh-partner" href="https://startupmission.kerala.gov.in/" target="_blank" rel="noopener noreferrer" aria-label="Kerala Startup Mission">
      <img src="/images/ksum.svg" alt="Kerala Startup Mission" />
    </a>
    <a class="ajh-partner" href="https://www.iiit.ac.in/" target="_blank" rel="noopener noreferrer" aria-label="IIIT Hyderabad">
      <img src="/images/iiit-hyderabad.svg" alt="IIIT Hyderabad" />
    </a>
    <a class="ajh-partner" href="http://www.healthstart.co.in/" target="_blank" rel="noopener noreferrer" aria-label="HealthStart India">
      <img src="/images/healthstart.svg" alt="HealthStart India" />
    </a>
    <a class="ajh-partner" href="https://www.meity.gov.in/" target="_blank" rel="noopener noreferrer" aria-label="MeitY">
      <img src="/images/meity.svg" alt="MeitY" />
    </a>
    <a class="ajh-partner" href="https://www.oist.jp/" target="_blank" rel="noopener noreferrer" aria-label="OIST">
      <img src="/images/oist.svg" alt="OIST" />
    </a>
  </div>
</section>'''

compact = " ".join(new_hero.split())
html_path.write_text(html[:start] + compact + html[close:], encoding="utf-8")
print("ok", close - start, "->", len(compact))
