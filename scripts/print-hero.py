from pathlib import Path

h = Path("src/site/mech-mirror/emergent-body.html").read_text(encoding="utf-8")
i = h.find('data-hero="journey"')
print(h[i : i + 2400])
print("---END---")
print("section close count around hero:", h[i : i + 3000].count("</section>"))
