import * as React from "react";
import {
  CartesianGrid,
  Scatter,
  ScatterChart as RechartsScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";

import { ChartFrame } from "../ChartCard/ChartCard.js";
import {
  CHART_AXIS_TICK,
  CHART_GRID,
  CHART_PURPLE,
  formatChartNumber,
} from "../ChartCard/ChartCard.theme.js";
import type { ChartRow, ChartValueFormatter } from "../ChartCard/ChartCard.types.js";
import { ChartTooltip } from "../ChartTooltip/ChartTooltip.js";

interface ScatterAxis {
  /** Datum field this axis reads. */
  key: string;
  label: string;
  /** Appended to ticks and tooltip values, e.g. "%" or " min". */
  unit?: string;
  domain?: [number, number];
}

interface ScatterChartProps {
  /** One point per row; `name` heads its tooltip. */
  data: ChartRow[];
  x: ScatterAxis;
  y: ScatterAxis;
  /** Bubble size: a third measure, usually volume. Omit for equal points. */
  size?: { key: string; label: string; range?: [number, number] };
  color?: string;
  height?: number;
  formatValue?: ChartValueFormatter;
  emptyLabel?: React.ReactNode;
}

/** Two measures on x and y, optionally a third as bubble size. */
function ScatterChart({
  data,
  x,
  y,
  size,
  color = CHART_PURPLE,
  height = 280,
  formatValue = formatChartNumber,
  emptyLabel,
}: ScatterChartProps) {
  const read = (datum: ChartRow, axis: { key: string; unit?: string }) =>
    `${formatValue(Number(datum[axis.key] ?? 0))}${axis.unit ?? ""}`;

  return (
    <ChartFrame height={height} hasData={data.length > 0} emptyLabel={emptyLabel}>
      <RechartsScatterChart margin={{ top: 8, right: 16, bottom: 16 }}>
        <CartesianGrid strokeDasharray="4 4" stroke={CHART_GRID} />
        <XAxis
          type="number"
          dataKey={x.key}
          name={x.label}
          unit={x.unit}
          tick={CHART_AXIS_TICK}
          tickLine={false}
          axisLine={false}
          {...(x.domain ? { domain: x.domain } : {})}
          label={{
            value: x.label,
            position: "insideBottom",
            offset: -8,
            fontSize: 10,
            fill: CHART_AXIS_TICK.fill,
          }}
        />
        <YAxis
          type="number"
          dataKey={y.key}
          name={y.label}
          unit={y.unit}
          width={44}
          tick={CHART_AXIS_TICK}
          tickLine={false}
          axisLine={false}
          {...(y.domain ? { domain: y.domain } : {})}
        />
        {size ? (
          <ZAxis
            type="number"
            dataKey={size.key}
            name={size.label}
            range={size.range ?? [60, 360]}
          />
        ) : null}
        <Tooltip
          cursor={{ strokeDasharray: "4 4" }}
          content={
            <ChartTooltip<ChartRow>
              rows={[
                { label: x.label, value: (d) => read(d, x) },
                { label: y.label, value: (d) => read(d, y) },
                ...(size ? [{ label: size.label, value: (d: ChartRow) => read(d, size) }] : []),
              ]}
            />
          }
        />
        <Scatter data={data} fill={color} fillOpacity={0.7} />
      </RechartsScatterChart>
    </ChartFrame>
  );
}

export { ScatterChart };
export type { ScatterAxis, ScatterChartProps };
