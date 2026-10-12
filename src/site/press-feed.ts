export type PressKind = "company" | "media" | "industry";

export type PressItem = {
  id: string;
  title: string;
  url: string;
  source: string;
  summary: string;
  date: string;
  image?: string;
  kind: PressKind;
  live: boolean;
};

export type PressFeed = {
  featured: PressItem;
  items: PressItem[];
  updatedAt: string;
  sources: string[];
};

const ARCHIVE: PressItem[] = [
  {
    id: "archive-hindu-seeding",
    title: "Startups attract ₹80 crore in investments at Seeding Kerala summit",
    url: "https://www.thehindubusinessline.com/news/start-ups-attract-80-crore-investments-at-seeding-kerala-summit/article64966466.ece",
    source: "The Hindu Businessline",
    summary: "The Hindu Businessline on Kerala’s seeding summit, and the healthtech teams in the room.",
    date: "2022-02-16T00:00:00.000Z",
    image: "/images/astrek-lab.webp",
    kind: "media",
    live: false,
  },
  {
    id: "archive-restofworld-chile",
    title: "Why Indian startup founders are flocking to Chile",
    url: "https://restofworld.org/2022/india-startup-founders-chile/",
    source: "Rest of World",
    summary: "Rest of World on Indian founders in Startup Chile, including Astrek Innovations.",
    date: "2022-03-01T00:00:00.000Z",
    kind: "media",
    live: false,
  },
  {
    id: "archive-vccircle-ian",
    title: "IAN Fund backs healthcare startup Astrek Innovations",
    url: "https://www.vccircle.com/ian-fund-backs-healthcare-startup-astrek-innovations",
    source: "VCCircle",
    summary: "IAN Fund’s investment in Astrek Innovations and its rehabilitation robotics work.",
    date: "2021-11-15T00:00:00.000Z",
    kind: "media",
    live: false,
  },
  {
    id: "archive-bt-meity",
    title: "MeitY felicitates winners of the Swadeshi Microprocessor Challenge",
    url: "https://www.businesstoday.in/latest/economy/story/meity-felicitates-winners-of-microprocessor-challenge-participants-get-financial-support-314698-2021-12-07",
    source: "Business Today",
    summary: "Business Today on MeitY’s recognition of challenge winners, including Astrek.",
    date: "2021-12-07T00:00:00.000Z",
    kind: "media",
    live: false,
  },
  {
    id: "archive-techcircle-chile",
    title: "Astrek selected to Startup Chile programme Seed G22",
    url: "https://www.techcircle.in/2019/07/04/healthtech-startup-astrek-innovations-to-participate-in-startup-chile-programme-seed-g22",
    source: "TechCircle",
    summary: "TechCircle on Astrek Innovations joining Startup Chile Seed G22.",
    date: "2019-07-04T00:00:00.000Z",
    kind: "company",
    live: false,
  },
];

const GOOGLE_NEWS_ASTREK =
  "https://news.google.com/rss/search?q=%22Astrek+Innovations%22+OR+%22Unik+Exo%22+OR+%22Astrek+Innovations%22+exoskeleton&hl=en-IN&gl=IN&ceid=IN:en";

/** Medical / wearable-robotics industry only — not generic “exoskeleton” biology. */
const GOOGLE_NEWS_INDUSTRY =
  "https://news.google.com/rss/search?q=%28%22wearable+robotics%22+OR+%22robotic+exoskeleton%22+OR+%22gait+rehabilitation%22+OR+%22rehab+exoskeleton%22%29+%28patient+OR+clinic+OR+hospital+OR+stroke+OR+medical+OR+FDA%29+when:90d&hl=en&gl=US&ceid=US:en";

const ASTREK_RE = /\bastrek\b|unik\s*exo|unikexo/i;
const INDUSTRY_RE =
  /(?:robotic\s+)?exoskeleton|wearable robotics|gait rehab|rehabilitation robot|robotic (?:gait|assist|exoskeleton)|lower[- ]limb|assistive (?:robot|device)/i;
/** Require clinical / medtech context for non-Astrek industry filler. */
const MEDICAL_CONTEXT_RE =
  /\b(?:patient|clinic|hospital|stroke|rehab(?:ilitation)?|medical|medtech|health(?:care|tech)?|therap(?:y|ist)|prosthetic|mobility|paralysis|spinal|FDA|ISO\s*13485|wearable robot)\b/i;
/** Drop biology / nature / entertainment false positives (e.g. insect molting). */
const NOISE_RE =
  /\b(?:grasshopper|insect|molt(?:ing)?|crustacean|arthropod|dinosaur|fossil|animal|wildlife|britannica|nat(?:ional)?\s*geo|pokemon|video\s*game|marvel|comic)\b/i;

const FETCH_HEADERS = {
  Accept: "application/rss+xml, application/xml, text/xml, */*",
  "User-Agent": "AstrekInnovationsWebsite/1.0 (+https://www.astrekinnovations.com)",
};

type CacheEntry = { at: number; feed: PressFeed };
let cache: CacheEntry | null = null;
const CACHE_MS = 30 * 60 * 1000;

function decodeXml(value: string): string {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function tag(block: string, name: string): string {
  const match = block.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`, "i"));
  return match ? decodeXml(match[1]) : "";
}

function sourceName(block: string, title: string, url: string): string {
  const fromTag = tag(block, "source");
  if (fromTag) return fromTag;
  const dashed = title.split(" - ");
  if (dashed.length > 1) return dashed[dashed.length - 1].trim();
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "News";
  }
}

function cleanTitle(title: string, source: string): string {
  const suffix = ` - ${source}`;
  return title.endsWith(suffix) ? title.slice(0, -suffix.length).trim() : title;
}

function toIso(value: string): string {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
}

function slugId(title: string, url: string): string {
  return `${title}|${url}`.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 80);
}

function parseRss(xml: string, kind: PressKind): PressItem[] {
  const items: PressItem[] = [];
  const blocks = xml.match(/<item>([\s\S]*?)<\/item>/gi) || [];
  for (const raw of blocks) {
    const titleRaw = tag(raw, "title");
    const url = tag(raw, "link") || tag(raw, "guid");
    if (!titleRaw || !url) continue;
    const source = sourceName(raw, titleRaw, url);
    const title = cleanTitle(titleRaw, source);
    const summary = tag(raw, "description") || title;
    items.push({
      id: slugId(title, url),
      title,
      url,
      source,
      summary: summary.slice(0, 220),
      date: toIso(tag(raw, "pubDate")),
      kind,
      live: true,
    });
  }
  return items;
}

async function fetchText(url: string): Promise<string | null> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 8000);
  try {
    const res = await fetch(url, { headers: FETCH_HEADERS, signal: ctrl.signal });
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

function extraRssFeeds(): string[] {
  const raw = (typeof process !== "undefined" && process.env.PRESS_RSS_FEEDS) || "";
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter((s) => /^https?:\/\//i.test(s));
}

async function fetchNewsApi(): Promise<PressItem[]> {
  const key = typeof process !== "undefined" ? process.env.NEWS_API_KEY : undefined;
  if (!key) return [];
  const url =
    "https://newsapi.org/v2/everything?" +
    new URLSearchParams({
      q: '"Astrek Innovations" OR "Unik Exo"',
      language: "en",
      sortBy: "publishedAt",
      pageSize: "12",
      apiKey: key,
    }).toString();
  const text = await fetchText(url);
  if (!text) return [];
  try {
    const data = JSON.parse(text) as {
      articles?: Array<{ title?: string; url?: string; source?: { name?: string }; description?: string; publishedAt?: string; urlToImage?: string }>;
    };
    return (data.articles || [])
      .filter((a) => a.title && a.url)
      .map((a) => ({
        id: slugId(a.title || "", a.url || ""),
        title: a.title || "",
        url: a.url || "",
        source: a.source?.name || "NewsAPI",
        summary: (a.description || a.title || "").slice(0, 220),
        date: toIso(a.publishedAt || ""),
        image: a.urlToImage || undefined,
        kind: "media" as const,
        live: true,
      }));
  } catch {
    return [];
  }
}

function itemText(item: PressItem): string {
  return `${item.title} ${item.summary} ${item.source} ${item.url}`;
}

function isNoiseItem(item: PressItem): boolean {
  return NOISE_RE.test(itemText(item));
}

function isAstrekItem(item: PressItem): boolean {
  if (isNoiseItem(item)) return false;
  return ASTREK_RE.test(itemText(item));
}

/** Credible medtech industry filler only — never biology or off-brand “exoskeleton” hits. */
function isIndustryItem(item: PressItem): boolean {
  if (isNoiseItem(item) || isAstrekItem(item)) return false;
  const text = itemText(item);
  return INDUSTRY_RE.test(text) && MEDICAL_CONTEXT_RE.test(text);
}

function dedupe(items: PressItem[]): PressItem[] {
  const seen = new Set<string>();
  const out: PressItem[] = [];
  for (const item of items) {
    const key = item.title.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
    let host = "";
    try {
      host = new URL(item.url).hostname.replace(/^www\./, "");
    } catch {
      host = item.url;
    }
    const id = `${key}|${host}`;
    if (seen.has(id) || seen.has(key)) continue;
    seen.add(id);
    seen.add(key);
    out.push(item);
  }
  return out;
}

function byDateDesc(a: PressItem, b: PressItem): number {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
}

export async function loadPressFeed(): Promise<PressFeed> {
  const now = Date.now();
  if (cache && now - cache.at < CACHE_MS) return cache.feed;

  const extra = extraRssFeeds();
  const [astrekXml, industryXml, newsApi, ...extraXml] = await Promise.all([
    fetchText(GOOGLE_NEWS_ASTREK),
    fetchText(GOOGLE_NEWS_INDUSTRY),
    fetchNewsApi(),
    ...extra.map((url) => fetchText(url)),
  ]);

  const sources = ["archive"];
  const live: PressItem[] = [];

  if (astrekXml) {
    live.push(...parseRss(astrekXml, "media").filter(isAstrekItem));
    sources.push("google-news");
  }
  if (newsApi.length) {
    live.push(...newsApi.filter(isAstrekItem));
    sources.push("newsapi");
  }
  extraXml.forEach((xml, i) => {
    if (!xml) return;
    // Extra RSS must still be Astrek-relevant — never dump unfiltered feed noise.
    live.push(...parseRss(xml, "company").filter(isAstrekItem));
    sources.push(`rss-${i + 1}`);
  });

  const industry = industryXml
    ? parseRss(industryXml, "industry").filter(isIndustryItem).slice(0, 1)
    : [];
  if (industry.length) sources.push("industry-news");

  // Prefer company coverage; curated archive before loose industry filler.
  const company = dedupe([...live, ...ARCHIVE].filter((item) => !isNoiseItem(item) && (isAstrekItem(item) || !item.live))).sort(
    byDateDesc,
  );
  const featured = company.find(isAstrekItem) || company[0] || ARCHIVE[0];
  const companyRest = company.filter((item) => item.id !== featured.id);
  const filler = industry.filter((item) => item.id !== featured.id);
  const items = dedupe([...companyRest, ...filler]).slice(0, 4);

  const feed: PressFeed = {
    featured,
    items,
    updatedAt: new Date().toISOString(),
    sources,
  };
  cache = { at: now, feed };
  return feed;
}

export function pressSearchUrl(): string {
  return "https://news.google.com/search?q=%22Astrek+Innovations%22+OR+%22Unik+Exo%22&hl=en-IN&gl=IN&ceid=IN:en";
}

export async function handlePressRequest(): Promise<Response> {
  try {
    const feed = await loadPressFeed();
    return Response.json(feed, {
      headers: {
        "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=3600",
      },
    });
  } catch (err) {
    console.error("[press-feed]", err);
    return Response.json(
      {
        featured: ARCHIVE[0],
        items: ARCHIVE.slice(1, 5),
        updatedAt: new Date().toISOString(),
        sources: ["archive"],
      } satisfies PressFeed,
      { status: 200, headers: { "Cache-Control": "public, max-age=120" } },
    );
  }
}
