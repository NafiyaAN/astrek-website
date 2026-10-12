/**
 * Canonical Lucide SVG strings for static HTML / DOM injection.
 * Paths match lucide-react v0.575; React pages use LucideIcons.tsx instead.
 */

export const ASTREK_ICON_COLOR = "#2FE0B5";
export const ASTREK_ICON_STROKE = 2;

type IconNode = [string, Record<string, string>];

function nodeToMarkup([tag, attrs]: IconNode): string {
  const parts = Object.entries(attrs)
    .filter(([key]) => key !== "key")
    .map(([key, value]) => `${key}="${value}"`)
    .join(" ");
  return `<${tag} ${parts}/>`;
}

export function lucideIconSvg(
  nodes: IconNode[],
  {
    size = 24,
    className = "astrek-lucide-icon",
    strokeWidth = ASTREK_ICON_STROKE,
    fill = "none",
  }: {
    size?: number;
    className?: string;
    strokeWidth?: number;
    fill?: string;
  } = {},
): string {
  const inner = nodes.map(nodeToMarkup).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="${fill}" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" class="${className}" aria-hidden="true">${inner}</svg>`;
}

const ICON_NODES = {
  asterisk: [
    ["path", { d: "M12 6v12" }],
    ["path", { d: "M17.196 9 6.804 15" }],
    ["path", { d: "m6.804 9 10.392 6" }],
  ],
  armchair: [
    ["path", { d: "M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3" }],
    [
      "path",
      {
        d: "M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0z",
      },
    ],
    ["path", { d: "M5 18v2" }],
    ["path", { d: "M19 18v2" }],
  ],
  "person-standing": [
    ["circle", { cx: "12", cy: "5", r: "1" }],
    ["path", { d: "m9 20 3-6 3 6" }],
    ["path", { d: "m6 8 6 2 6-2" }],
    ["path", { d: "M12 10v4" }],
  ],
  footprints: [
    [
      "path",
      {
        d: "M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z",
      },
    ],
    [
      "path",
      {
        d: "M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z",
      },
    ],
    ["path", { d: "M16 17h4" }],
    ["path", { d: "M4 13h4" }],
  ],
  activity: [
    [
      "path",
      {
        d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
      },
    ],
  ],
  circle: [["circle", { cx: "12", cy: "12", r: "10" }]],
} as const satisfies Record<string, IconNode[]>;

export type LucideIconName = keyof typeof ICON_NODES;

export function lucideNamedIcon(
  name: LucideIconName,
  size = 24,
  className = "astrek-lucide-icon",
): string {
  return lucideIconSvg(ICON_NODES[name], { size, className });
}

export const LUCIDE_ASTERISK_SVG = lucideNamedIcon("asterisk", 24, "astrek-lucide-icon astrek-ticker-separator");
export const LUCIDE_ARMCHAIR_SVG = lucideNamedIcon("armchair", 20, "astrek-lucide-icon astrek-mode-icon");
export const LUCIDE_PERSON_STANDING_SVG = lucideNamedIcon("person-standing", 20, "astrek-lucide-icon astrek-mode-icon");
export const LUCIDE_FOOTPRINTS_SVG = lucideNamedIcon("footprints", 20, "astrek-lucide-icon astrek-mode-icon");
export const LUCIDE_ACTIVITY_SVG = lucideNamedIcon("activity", 20, "astrek-lucide-icon astrek-mode-icon");

/** Pill-shaped carousel indicator (preserves w-8 / w-3 layout). */
export const CAROUSEL_DOT_SVG =
  '<svg viewBox="0 0 100 6" preserveAspectRatio="none" class="astrek-dot-icon" aria-hidden="true"><rect width="100" height="6" rx="3" fill="currentColor"/></svg>';

/** Round spec / showcase indicator using Lucide circle geometry. */
export const SPEC_DOT_SVG =
  '<svg viewBox="0 0 24 24" class="astrek-dot-icon astrek-spec-dot__icon" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="currentColor" stroke="none"/></svg>';

export const MODE_CARD_ICONS: Record<string, string> = {
  "mode-card-sit": LUCIDE_ARMCHAIR_SVG,
  "mode-card-stand": LUCIDE_PERSON_STANDING_SVG,
  "mode-card-walk": LUCIDE_FOOTPRINTS_SVG,
  "mode-card-exercise": LUCIDE_ACTIVITY_SVG,
};
