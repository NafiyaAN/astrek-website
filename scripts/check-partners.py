import urllib.request

html = urllib.request.urlopen("http://127.0.0.1:8080/?v=hd14", timeout=20).read().decode(
    "utf-8", "replace"
)
needle = 'data-testid="hero-partners"'
i = html.find(needle)
print("index", i)
if i < 0:
    raise SystemExit("missing")
print(html[i - 40 : i + 900])
