from pathlib import Path
h = Path(__file__).resolve().parents[1].joinpath("src/site/mech-mirror/emergent-body.html").read_text(encoding="utf-8")
i = h.find("<footer")
print(h[i:i+4500])
