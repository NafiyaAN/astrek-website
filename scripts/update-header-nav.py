"""Replace homepage header nav labels/links to match colleague design."""
from pathlib import Path
import re

html_path = Path(
    r"c:\Users\DELL\Desktop\Astrek website\elevate-suite-main-updated1\src\site\mech-mirror\emergent-body.html"
)
html = html_path.read_text(encoding="utf-8")

# Replace primary nav block
nav_start = html.find('<nav class="hidden items-center gap-8 lg:flex" aria-label="Primary">')
if nav_start < 0:
    raise SystemExit("primary nav not found")
nav_end = html.find("</nav>", nav_start)
if nav_end < 0:
    raise SystemExit("nav end not found")
nav_end += len("</nav>")

new_nav = (
    '<nav class="ajh-nav hidden items-center lg:flex" aria-label="Primary" data-ajh-nav>'
    '<a href="#about" data-testid="nav-link-about" class="ajh-nav-link">About</a>'
    '<a href="/product" data-testid="nav-link-unik-exo" class="ajh-nav-link">Unik Exo</a>'
    '<a href="#about" data-testid="nav-link-research" class="ajh-nav-link">Research</a>'
    '<a href="#team" data-testid="nav-link-company" class="ajh-nav-link">Company</a>'
    '<a href="#blog" data-testid="nav-link-media" class="ajh-nav-link">Media</a>'
    '<a href="#contact" data-testid="nav-link-contact-nav" class="ajh-nav-link">Contact</a>'
    "</nav>"
)

html = html[:nav_start] + new_nav + html[nav_end:]

# Hide the desktop "Talk to our team" CTA visually via class (keep for mobile drawer clone)
html = html.replace(
    'data-testid="nav-cta-contact"',
    'data-testid="nav-cta-contact" data-ajh-hide-desktop',
    1,
)

# Replace partners strip inside journey hero with individual HD logo marks
partners_start = html.find('<div class="ajh-partners"')
if partners_start < 0:
    raise SystemExit("partners not found")

# Walk to outer closing div
i = partners_start
depth = 0
while i < len(html):
    if html.startswith("<div", i):
        depth += 1
        i = html.find(">", i) + 1
        continue
    if html.startswith("</div>", i):
        depth -= 1
        i += len("</div>")
        if depth == 0:
            partners_end = i
            break
        continue
    i += 1
else:
    raise SystemExit("partners end not found")

new_partners = """
<div class="ajh-partners" data-testid="hero-partners" data-ajh-partners aria-label="Trusted partners">
  <div class="ajh-partners-row">
    <a class="ajh-partner" href="https://makervillage.in/" target="_blank" rel="noopener noreferrer" aria-label="Maker Village">
      <img src="/images/partners-hd/maker-village.png" alt="Maker Village" width="240" height="64" loading="eager" decoding="async" />
    </a>
    <a class="ajh-partner" href="https://startupmission.kerala.gov.in/" target="_blank" rel="noopener noreferrer" aria-label="Kerala Startup Mission">
      <img src="/images/partners-hd/ksum.png" alt="Kerala Startup Mission" width="240" height="64" loading="eager" decoding="async" />
    </a>
    <a class="ajh-partner" href="https://www.iiit.ac.in/" target="_blank" rel="noopener noreferrer" aria-label="IIIT Hyderabad">
      <img src="/images/partners-hd/iiit-hyderabad.png" alt="IIIT Hyderabad" width="240" height="64" loading="eager" decoding="async" />
    </a>
    <a class="ajh-partner" href="http://www.healthstart.co.in/" target="_blank" rel="noopener noreferrer" aria-label="HealthStart India">
      <img src="/images/partners-hd/healthstart.png" alt="HealthStart India" width="240" height="64" loading="eager" decoding="async" />
    </a>
    <a class="ajh-partner" href="https://www.meity.gov.in/" target="_blank" rel="noopener noreferrer" aria-label="MeitY">
      <img src="/images/partners-hd/meity.png" alt="MeitY" width="240" height="64" loading="eager" decoding="async" />
    </a>
    <a class="ajh-partner" href="https://www.oist.jp/" target="_blank" rel="noopener noreferrer" aria-label="OIST">
      <img src="/images/partners-hd/oist.png" alt="OIST" width="240" height="64" loading="eager" decoding="async" />
    </a>
  </div>
</div>
"""
new_partners = " ".join(new_partners.split())
html = html[:partners_start] + new_partners + html[partners_end:]

html_path.write_text(html, encoding="utf-8")
print("header + partners updated")
