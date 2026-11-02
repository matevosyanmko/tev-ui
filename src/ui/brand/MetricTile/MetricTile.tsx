import { cn } from "../../../utils.js";
import type { MetricTileProps } from "./MetricTile.types.js";
import { metricTileVariants } from "./MetricTile.variants.js";

/**
 * One headline number on the usage screen: a 56px figure with what it counts
 * set small beside its top, and an optional glyph at the far end.
 *
 * Not `analytics/KpiTile` or `StatTile`: those put a label above a 22–26px
 * figure with the icon in a chip on the left, and are sized for dashboards of
 * many tiles; this is the three-up hero row. The caller formats the figure
 * and its unit, so plurals and currency stay in the app.
 */
function MetricTile({ tone = "accent", value, unit, icon, className, ...props }: MetricTileProps) {
  return (
    <div
      data-slot="metric-tile"
      data-tone={tone}
      className={cn(metricTileVariants({ tone }), className)}
      {...props}
    >
      <p data-slot="metric-tile-figure" className="flex min-w-0 items-start gap-2.5">
        <span data-slot="metric-tile-value" className="text-display-56 whitespace-nowrap">
          {value}
        </span>
        {unit ? (
          <span data-slot="metric-tile-unit" className="min-w-0 truncate text-heading-16">
            {unit}
          </span>
        ) : null}
      </p>
      {icon ? (
        <span data-slot="metric-tile-icon" aria-hidden="true" className="shrink-0">
          {icon}
        </span>
      ) : null}
    </div>
  );
}

export { MetricTile };
