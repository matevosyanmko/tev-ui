import type * as React from "react";

import type { AnalyticsComponentKey } from "../AnalyticsCatalog/AnalyticsCatalog.js";
import type { BarChartProps } from "../BarChart/BarChart.js";
import type { BarListProps } from "../BarList/BarList.js";
import type { BreakdownBarsProps } from "../BreakdownBars/BreakdownBars.js";
import type { DonutChartProps } from "../DonutChart/DonutChart.js";
import type { HeatmapProps } from "../Heatmap/Heatmap.js";
import type { KpiTileTone } from "../KpiTile/KpiTile.variants.js";
import type { LineChartProps } from "../LineChart/LineChart.js";
import type { ScatterChartProps } from "../ScatterChart/ScatterChart.js";
import type { ScorecardProps } from "../Scorecard/Scorecard.js";

type Bar<Fixed extends keyof BarChartProps = never> = Omit<BarChartProps, "orientation" | Fixed>;

/**
 * What each component type renders from. The title and description come from
 * the widget itself; this is the rest — the figures.
 */
export interface AnalyticsWidgetDataMap {
  kpi_stat: { value: React.ReactNode; accent?: string };
  kpi_icon: {
    value: React.ReactNode;
    unit?: React.ReactNode;
    tone?: KpiTileTone;
    icon?: React.ElementType;
  };
  donut: Omit<DonutChartProps, "variant">;
  donut_center_total: Omit<DonutChartProps, "variant">;
  bar_vertical: Bar<"stacked" | "colorByCategory">;
  bar_horizontal: Bar<"stacked" | "colorByCategory">;
  bar_funnel: Bar<"stacked" | "percent" | "colorByCategory">;
  bar_stacked_horizontal: Bar<"stacked" | "colorByCategory">;
  bar_stacked_100_vertical: Bar<"stacked" | "percent" | "colorByCategory">;
  bar_grouped_vertical: Bar<"stacked" | "colorByCategory">;
  bar_grouped_horizontal: Bar<"stacked" | "colorByCategory">;
  line_multi: LineChartProps;
  line_score_reference: Omit<LineChartProps, "yDomain" | "yTicks" | "referenceLine"> & {
    /** Label on the dashed line at 50. Defaults to "Neutral". */
    referenceLabel?: string;
  };
  scatter_bubble: ScatterChartProps & { size: NonNullable<ScatterChartProps["size"]> };
  scatter: Omit<ScatterChartProps, "size">;
  heatmap_matrix: Omit<HeatmapProps, "variant">;
  heatmap_week_hour: Omit<HeatmapProps, "variant">;
  breakdown_100_rows: BreakdownBarsProps;
  bar_list: BarListProps;
  scorecard_table: ScorecardProps;
  /** Body text when the widget has no description of its own. */
  note_info: { text?: React.ReactNode };
  note_warning: { text?: React.ReactNode };
}

interface AnalyticsWidgetCommonProps {
  /** Card title; a KPI tile's label; a note's bold lead-in. */
  title?: React.ReactNode;
  /** Card subtitle; a KPI tile's meta line; a note's text. */
  description?: React.ReactNode;
  /** Just the component: no title, description, card border or padding. */
  bare?: boolean;
  className?: string;
}

/** Discriminated on `componentKey`, so `data` is typed for the chosen key. */
export type AnalyticsWidgetProps = {
  [K in AnalyticsComponentKey]: AnalyticsWidgetCommonProps & {
    componentKey: K;
    data: AnalyticsWidgetDataMap[K];
  };
}[AnalyticsComponentKey];

export type AnalyticsWidgetPreviewProps = AnalyticsWidgetCommonProps & {
  /** Any stored key; an unknown one renders a visible placeholder. */
  componentKey: string;
};
