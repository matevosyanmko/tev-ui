/*
 * The analytics chart palette and Recharts styling, shared by every chart in
 * this group. Its own module because it exports values, not components (a Fast
 * Refresh boundary has to export components only).
 *
 * Recharts draws SVG and takes colours as attribute values, so these are
 * literal colours rather than Tailwind classes. They match the brand tokens in
 * tokens.css; the extra purples, greys and the lavender ramp are chart-only.
 */

export const CHART_PURPLE = "#5F02F4";
export const CHART_GREEN = "#8AFF87";
export const CHART_BLACK = "#151515";
export const CHART_VIOLET = "#A78BFA";
export const CHART_PURPLE_XLT = "#E4DBFB";
export const CHART_LAVENDER = "#C9B6F6";
export const CHART_GREY = "#9AA0A6";
export const CHART_CORAL = "#FF7B6A";
export const CHART_DARK_GREY = "#3D3D3D";
/** Ink for text on charts: values, labels, tooltip body. */
export const CHART_INK = "#241d33";

/**
 * Categorical order for series and slices. Assign in this order and never
 * cycle: a series past the end should fold into "Other" instead.
 */
export const CHART_CATEGORICAL = [
  CHART_PURPLE,
  CHART_VIOLET,
  CHART_GREEN,
  CHART_PURPLE_XLT,
  CHART_GREY,
  CHART_BLACK,
  "#7B3FF6",
  "#502DC9",
  "#B9FFB6",
  CHART_DARK_GREY,
] as const;

export const CHART_SENTIMENT = {
  positive: CHART_PURPLE,
  neutral: CHART_GREEN,
  negative: CHART_LAVENDER,
} as const;

/** Customer-feedback sentiment (Operators tab): a dark negative, light neutral. */
export const CHART_RIDE_SENTIMENT = {
  positive: CHART_PURPLE,
  neutral: CHART_PURPLE_XLT,
  negative: CHART_DARK_GREY,
} as const;

export const CHART_TOOLTIP_STYLE = {
  background: "#fff",
  border: "1px solid rgba(95,2,244,0.15)",
  borderRadius: 12,
  fontSize: 12,
  color: CHART_INK,
  boxShadow: "0 8px 24px rgba(95,2,244,0.10)",
} as const;

export const CHART_AXIS_TICK = { fontSize: 10, fill: "rgba(80,72,100,0.7)" } as const;
export const CHART_GRID = "rgba(95,2,244,0.08)";
export const CHART_CURSOR = { fill: "rgba(95,2,244,0.04)" } as const;

/** Recharts wants a fixed 4-tuple; an array literal widens and stops matching. */
export type ChartBarRadius = [number, number, number, number];
export const CHART_BAR_RADIUS_TOP: ChartBarRadius = [8, 8, 0, 0];
export const CHART_BAR_RADIUS_END: ChartBarRadius = [0, 8, 8, 0];

const RAMP_FROM = [245, 243, 251];
const RAMP_TO = [95, 2, 244];

/** Sequential lavender → brand purple, for heatmaps; `t` is clamped to 0..1. */
export function chartRamp(t: number): string {
  const k = Math.min(1, Math.max(0, t));
  const [r, g, b] = RAMP_FROM.map((from, i) => Math.round(from + (RAMP_TO[i] - from) * k));
  return `rgb(${r},${g},${b})`;
}

const NUMBER = new Intl.NumberFormat("en-US");

/** A share as a whole percent: 32.7 → "33%". */
export function formatChartShare(percent: number) {
  return `${Math.round(percent)}%`;
}

/** Default value formatter: grouped integers/decimals, en-US. */
export function formatChartNumber(value: number): string {
  return NUMBER.format(value);
}
