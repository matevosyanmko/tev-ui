import * as React from "react";

import { cn } from "../../../utils.js";
import { AnalyticsNote } from "../AnalyticsNote/AnalyticsNote.js";
import { isAnalyticsComponentKey } from "../AnalyticsCatalog/AnalyticsCatalog.js";
import { BarChart } from "../BarChart/BarChart.js";
import { BarList } from "../BarList/BarList.js";
import { BreakdownBars } from "../BreakdownBars/BreakdownBars.js";
import { ChartCard } from "../ChartCard/ChartCard.js";
import { DonutChart } from "../DonutChart/DonutChart.js";
import { Heatmap } from "../Heatmap/Heatmap.js";
import { KpiTile } from "../KpiTile/KpiTile.js";
import { LineChart } from "../LineChart/LineChart.js";
import { ScatterChart } from "../ScatterChart/ScatterChart.js";
import { Scorecard } from "../Scorecard/Scorecard.js";
import { StatTile } from "../StatTile/StatTile.js";
import { ANALYTICS_WIDGET_SAMPLES } from "./AnalyticsWidget.samples.js";
import type { AnalyticsWidgetPreviewProps, AnalyticsWidgetProps } from "./AnalyticsWidget.types.js";

// Bare tiles keep their figure but drop the card chrome around it.
const BARE_TILE = "rounded-none border-0 p-0";

function chartBody(props: AnalyticsWidgetProps): React.ReactNode {
  switch (props.componentKey) {
    case "donut":
      return <DonutChart {...props.data} variant="legend" />;
    case "donut_center_total":
      return <DonutChart {...props.data} variant="total" />;
    case "bar_vertical":
    case "bar_grouped_vertical":
      return <BarChart {...props.data} orientation="vertical" />;
    case "bar_horizontal":
    case "bar_grouped_horizontal":
      return <BarChart {...props.data} orientation="horizontal" />;
    case "bar_funnel":
      return <BarChart {...props.data} orientation="horizontal" colorByCategory />;
    case "bar_stacked_horizontal":
      return <BarChart {...props.data} orientation="horizontal" stacked />;
    case "bar_stacked_100_vertical":
      return <BarChart {...props.data} orientation="vertical" stacked percent />;
    case "line_multi":
      return <LineChart {...props.data} />;
    case "line_score_reference": {
      const { referenceLabel = "Neutral", ...data } = props.data;
      return (
        <LineChart
          {...data}
          yDomain={[0, 100]}
          yTicks={[0, 25, 50, 75, 100]}
          referenceLine={{ y: 50, label: referenceLabel }}
        />
      );
    }
    case "scatter_bubble":
    case "scatter":
      return <ScatterChart {...props.data} />;
    case "heatmap_matrix":
      return <Heatmap {...props.data} variant="cells" />;
    case "heatmap_week_hour":
      return <Heatmap {...props.data} variant="dense" />;
    case "breakdown_100_rows":
      return <BreakdownBars {...props.data} />;
    case "bar_list":
      return <BarList {...props.data} />;
    case "scorecard_table":
      return <Scorecard {...props.data} />;
    // Drawn without a card by AnalyticsWidget itself.
    case "kpi_stat":
    case "kpi_icon":
    case "note_info":
    case "note_warning":
      return null;
    default: {
      // A key added to the catalog without a case here fails the build.
      const unhandled: never = props;
      return unhandled;
    }
  }
}

/**
 * Renders a stored widget: its `componentKey` picks the component, `title` and
 * `description` fill the card, `data` supplies the figures. One renderer, so
 * every app draws a given key the same way.
 */
function AnalyticsWidget(props: AnalyticsWidgetProps) {
  const { title, description, bare = false, className } = props;

  switch (props.componentKey) {
    case "kpi_stat":
      return (
        <StatTile
          {...props.data}
          label={bare ? undefined : title}
          meta={bare ? undefined : description}
          className={cn(bare && BARE_TILE, className)}
        />
      );
    case "kpi_icon":
      return (
        <KpiTile
          {...props.data}
          label={bare ? undefined : title}
          meta={bare ? undefined : description}
          className={cn(bare && BARE_TILE, className)}
        />
      );
    case "note_info":
    case "note_warning":
      return (
        <AnalyticsNote
          tone={props.componentKey === "note_info" ? "info" : "warning"}
          title={bare ? undefined : title}
          className={className}
        >
          {(bare ? undefined : description) || props.data.text}
        </AnalyticsNote>
      );
    default: {
      const body = chartBody(props);
      if (bare) return <div className={className}>{body}</div>;
      return (
        <ChartCard title={title} subtitle={description} className={className}>
          {body}
        </ChartCard>
      );
    }
  }
}

/**
 * A widget drawn with the catalog's sample figures, for editors and
 * catalogues. Takes any stored key and shows a placeholder for an unknown one,
 * so a stale key is visible rather than blank.
 */
function AnalyticsWidgetPreview({ componentKey, ...rest }: AnalyticsWidgetPreviewProps) {
  if (!isAnalyticsComponentKey(componentKey)) {
    return (
      <div
        data-slot="analytics-widget-unknown"
        className={cn(
          "rounded-2xl border border-dashed border-red-300 bg-red-50 p-5 text-[12px] text-red-700",
          rest.className,
        )}
      >
        {componentKey
          ? `No analytics component is registered for "${componentKey}".`
          : "Pick a component to see the preview."}
      </div>
    );
  }
  // The key and its sample come from the same record, so they always agree;
  // TypeScript cannot correlate the two through a union-typed index.
  const props = {
    ...rest,
    componentKey,
    data: ANALYTICS_WIDGET_SAMPLES[componentKey],
  } as AnalyticsWidgetProps;
  return <AnalyticsWidget {...props} />;
}

export { AnalyticsWidget, AnalyticsWidgetPreview };
