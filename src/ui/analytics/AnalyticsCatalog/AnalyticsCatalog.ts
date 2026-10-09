/*
 * The analytics component catalog: every `componentKey` a stored widget can
 * name, with what it is and how wide it wants to be. Pure data — no React, no
 * Recharts — so an app can validate keys, fill a select or seed a database by
 * importing it without pulling a chart into its bundle.
 *
 * Keys are persisted (a widget row stores one), so a key is never renamed or
 * reused once released. Add new ones; retire old ones by leaving them here.
 */

export const ANALYTICS_COMPONENT_KEYS = [
  "kpi_stat",
  "kpi_icon",
  "donut",
  "donut_center_total",
  "bar_vertical",
  "bar_horizontal",
  "bar_funnel",
  "bar_stacked_horizontal",
  "bar_stacked_100_vertical",
  "bar_grouped_vertical",
  "bar_grouped_horizontal",
  "line_multi",
  "line_score_reference",
  "scatter_bubble",
  "scatter",
  "heatmap_matrix",
  "heatmap_week_hour",
  "breakdown_100_rows",
  "bar_list",
  "scorecard_table",
  "note_info",
  "note_warning",
] as const;

export type AnalyticsComponentKey = (typeof ANALYTICS_COMPONENT_KEYS)[number];

export type AnalyticsCategory = "kpi" | "chart" | "custom" | "note";

export const ANALYTICS_CATEGORY_ORDER: readonly AnalyticsCategory[] = [
  "kpi",
  "chart",
  "custom",
  "note",
];

export const ANALYTICS_CATEGORY_LABELS: Record<AnalyticsCategory, string> = {
  kpi: "KPI blocks",
  chart: "Charts",
  custom: "Custom blocks",
  note: "Notes",
};

export interface AnalyticsComponentMeta {
  key: AnalyticsComponentKey;
  label: string;
  category: AnalyticsCategory;
  description: string;
  /** The `@tev-ui/ui/analytics/<Name>` component that draws it. */
  component: string;
  /** Grid tracks it needs to stay readable: wide tables and heatmaps want more. */
  span: 1 | 2 | "full";
}

/** Every component type, keyed by `componentKey`. */
export const AnalyticsCatalog: Record<AnalyticsComponentKey, AnalyticsComponentMeta> = {
  kpi_stat: {
    key: "kpi_stat",
    label: "Stat tile",
    category: "kpi",
    description: "Label and one big coloured number. No icon.",
    component: "StatTile",
    span: 1,
  },
  kpi_icon: {
    key: "kpi_icon",
    label: "Icon KPI tile",
    category: "kpi",
    description: "Icon chip, value with optional unit, and a muted meta line.",
    component: "KpiTile",
    span: 1,
  },
  donut: {
    key: "donut",
    label: "Donut chart",
    category: "chart",
    description: "Share of a whole across a few categories, with a legend below.",
    component: "DonutChart",
    span: 1,
  },
  donut_center_total: {
    key: "donut_center_total",
    label: "Donut with centre total",
    category: "chart",
    description: "Donut with the total in the hole and a share list beside it.",
    component: "DonutChart",
    span: 1,
  },
  bar_vertical: {
    key: "bar_vertical",
    label: "Vertical bar chart",
    category: "chart",
    description: "One value per category or time bucket, as columns.",
    component: "BarChart",
    span: 1,
  },
  bar_horizontal: {
    key: "bar_horizontal",
    label: "Horizontal bar chart",
    category: "chart",
    description: "Ranked categories with long names, as rows.",
    component: "BarChart",
    span: 1,
  },
  bar_funnel: {
    key: "bar_funnel",
    label: "Funnel bars",
    category: "chart",
    description: "Sequential stages as horizontal bars, one colour per stage.",
    component: "BarChart",
    span: 1,
  },
  bar_stacked_horizontal: {
    key: "bar_stacked_horizontal",
    label: "Stacked horizontal bars",
    category: "chart",
    description: "Parts of each row's total stacked end to end.",
    component: "BarChart",
    span: 1,
  },
  bar_stacked_100_vertical: {
    key: "bar_stacked_100_vertical",
    label: "100% stacked columns",
    category: "chart",
    description: "Each column splits to 100%, for comparing mixes across categories.",
    component: "BarChart",
    span: 1,
  },
  bar_grouped_vertical: {
    key: "bar_grouped_vertical",
    label: "Grouped columns",
    category: "chart",
    description: "Several series side by side for each category.",
    component: "BarChart",
    span: 1,
  },
  bar_grouped_horizontal: {
    key: "bar_grouped_horizontal",
    label: "Grouped horizontal bars",
    category: "chart",
    description: "Two series side by side along each row.",
    component: "BarChart",
    span: 2,
  },
  line_multi: {
    key: "line_multi",
    label: "Multi-line trend",
    category: "chart",
    description: "A few series over time.",
    component: "LineChart",
    span: 1,
  },
  line_score_reference: {
    key: "line_score_reference",
    label: "Score trend with reference line",
    category: "chart",
    description: '0–100 score per entity over time, with a dashed "Neutral" line at 50.',
    component: "LineChart",
    span: 2,
  },
  scatter_bubble: {
    key: "scatter_bubble",
    label: "Bubble scatter",
    category: "chart",
    description: "Two measures on x and y; bubble size shows volume.",
    component: "ScatterChart",
    span: 1,
  },
  scatter: {
    key: "scatter",
    label: "Scatter plot",
    category: "chart",
    description: "Two percentages on x and y, equal-sized points.",
    component: "ScatterChart",
    span: 1,
  },
  heatmap_matrix: {
    key: "heatmap_matrix",
    label: "Matrix heatmap",
    category: "custom",
    description: "Two categorical axes; darker cells hold more.",
    component: "Heatmap",
    span: 1,
  },
  heatmap_week_hour: {
    key: "heatmap_week_hour",
    label: "Weekday × hour heatmap",
    category: "custom",
    description: "7 × 24 activity grid with a colour scale.",
    component: "Heatmap",
    span: 2,
  },
  breakdown_100_rows: {
    key: "breakdown_100_rows",
    label: "100% breakdown rows",
    category: "custom",
    description: "One full-width bar per row, split by share, with in-bar percentages.",
    component: "BreakdownBars",
    span: 1,
  },
  bar_list: {
    key: "bar_list",
    label: "Bar list",
    category: "custom",
    description: "Axis-free ranked list: label, thin bar, share and count.",
    component: "BarList",
    span: 1,
  },
  scorecard_table: {
    key: "scorecard_table",
    label: "Scorecard table",
    category: "custom",
    description: "One row per entity with counts, rates and a muted secondary figure.",
    component: "Scorecard",
    span: "full",
  },
  note_info: {
    key: "note_info",
    label: "Info note",
    category: "note",
    description: "Neutral one-line explanation shown above a group of widgets.",
    component: "AnalyticsNote",
    span: "full",
  },
  note_warning: {
    key: "note_warning",
    label: "Warning note",
    category: "note",
    description: "Amber caveat banner, e.g. a heuristic disclaimer.",
    component: "AnalyticsNote",
    span: "full",
  },
};

/** The catalog in key order, for lists and selects. */
export const ANALYTICS_COMPONENTS: readonly AnalyticsComponentMeta[] = ANALYTICS_COMPONENT_KEYS.map(
  (key) => AnalyticsCatalog[key],
);

export function isAnalyticsComponentKey(value: unknown): value is AnalyticsComponentKey {
  return typeof value === "string" && Object.prototype.hasOwnProperty.call(AnalyticsCatalog, value);
}

/** The catalog entry for a stored key, or undefined for an unknown one. */
export function getAnalyticsComponent(key: unknown): AnalyticsComponentMeta | undefined {
  return isAnalyticsComponentKey(key) ? AnalyticsCatalog[key] : undefined;
}
