from pathlib import Path

p = Path(__file__).resolve().parents[1] / "src/site/mech-mirror/emergent-body.html"
t = p.read_text(encoding="utf-8")
if "hero-partners-panel.png?v=zoom3" in t:
    print("already busted")
elif "hero-partners-panel.png?v=2" in t:
    t = t.replace("hero-partners-panel.png?v=2", "hero-partners-panel.png?v=zoom3")
    p.write_text(t, encoding="utf-8")
    print("replaced v=2")
elif 'src="/images/hero-partners-panel.png"' in t:
    t = t.replace(
        'src="/images/hero-partners-panel.png"',
        'src="/images/hero-partners-panel.png?v=zoom3"',
    )
    p.write_text(t, encoding="utf-8")
    print("added query")
else:
    raise SystemExit("panel src not found")
