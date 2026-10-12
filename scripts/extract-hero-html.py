from pathlib import Path

h = Path("src/site/mech-mirror/emergent-body.html").read_text(encoding="utf-8")
# header + hero
start = h.find("<header")
end = h.find("</section>")
chunk = h[start : end + len("</section>")]
Path("scripts/_hero-chunk.html").write_text(chunk, encoding="utf-8")
print("wrote", len(chunk), "chars")
