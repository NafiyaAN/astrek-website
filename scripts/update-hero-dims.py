from pathlib import Path

p = Path("src/site/mech-mirror/emergent-body.html")
h = p.read_text(encoding="utf-8")
h = h.replace('width="2560" height="1544"', 'width="3200" height="1929"')
h = h.replace('width="2560" height="215"', 'width="2880" height="241"')
p.write_text(h, encoding="utf-8")
print("ok")
