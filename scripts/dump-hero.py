import urllib.request

html = urllib.request.urlopen("http://127.0.0.1:8080/?v=hd4", timeout=20).read().decode(
    "utf-8", "replace"
)
marker = 'data-hero="journey"'
i = html.find(marker)
print("idx", i)
if i < 0:
    raise SystemExit(1)
start = html.rfind("<section", 0, i + 1)
end = html.find("</section>", start) + len("</section>")
chunk = html[start:end]
out = open(
    r"c:\Users\DELL\Desktop\Astrek website\elevate-suite-main-updated1\.verify\hero-chunk.html",
    "w",
    encoding="utf-8",
)
out.write(chunk)
out.close()
print("wrote chunk", len(chunk))
print("has ajh-title", "ajh-title" in chunk)
print("has partners", "ajh-partners" in chunk)
print("has hd jpg", "hero-journey-hd.jpg" in chunk)
print("discover href", 'href="/product"' in chunk)
print("youtube", "youtu.be" in chunk)
print("title sample", "TAKE YOUR" in chunk.upper() or "Take your" in chunk)
