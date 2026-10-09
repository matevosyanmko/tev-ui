import * as React from "react";

import { CHART_TOOLTIP_STYLE } from "../ChartCard/ChartCard.theme.js";

type ChartDatum = Record<string, unknown>;

interface ChartTooltipRow<T extends ChartDatum = ChartDatum> {
  label: React.ReactNode;
  value: (datum: T) => React.ReactNode;
}

interface ChartTooltipProps<T extends ChartDatum = ChartDatum> {
  /** Supplied by Recharts when the pointer is over a mark. */
  active?: boolean;
  /** Supplied by Recharts: the hovered mark's datum is `payload[0].payload`. */
  payload?: { payload?: T }[];
  /** Datum field shown as the heading. */
  titleKey?: keyof T & string;
  rows: ChartTooltipRow<T>[];
}

/**
 * A labelled tooltip for `<Tooltip content={…} />`: one heading, then one
 * "Label: value" line per row. Recharts' default would show raw dataKeys, or
 * mislabel a bubble's size as another metric.
 */
function ChartTooltip<T extends ChartDatum = ChartDatum>({
  active,
  payload,
  titleKey = "name",
  rows,
}: ChartTooltipProps<T>) {
  if (!active || !payload?.length) return null;
  const datum = (payload[0]?.payload ?? {}) as T;
  return (
    <div
      data-slot="chart-tooltip"
      style={{ ...CHART_TOOLTIP_STYLE, padding: "8px 10px", lineHeight: 1.5 }}
    >
      <p style={{ margin: 0, fontWeight: 600 }}>{String(datum[titleKey] ?? "")}</p>
      {rows.map((row, index) => (
        <p key={index} style={{ margin: 0 }}>
          <span style={{ opacity: 0.65 }}>{row.label}: </span>
          {row.value(datum)}
        </p>
      ))}
    </div>
  );
}

export { ChartTooltip };
export type { ChartDatum, ChartTooltipProps, ChartTooltipRow };
