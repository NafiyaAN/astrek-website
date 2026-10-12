from pathlib import Path

html = Path(r"src/site/mech-mirror/emergent-body.html").read_text(encoding="utf-8")
for key in ["people-section", "mentors-section", "team-card-jithin", "mt-6 font-display"]:
    idx = 0
    while True:
        i = html.find(key, idx)
        if i == -1:
            break
        print("---", key, "@", i, "---")
        print(html[max(0, i - 40) : i + 500])
        print()
        idx = i + len(key)
        if idx > 0 and key != "mt-6 font-display":
            break
