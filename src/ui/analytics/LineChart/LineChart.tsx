import * as React from "react";
import {
  CartesianGrid,
  Line,
  LineChart as RechartsLineChart,
  ReferenceLine,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { ChartFrame } from "../ChartCard/ChartCard.js";
import {
  CHART_AXIS_TICK,
  CHART_GRID,
  CHART_INK,
  CHART_TOOLTIP_STYLE,
  formatChartNumber,
} from "../ChartCard/ChartCard.theme.js";
import type { ChartRow, ChartSeries, ChartValueFormatter } from "../ChartCard/ChartCard.types.js";
import { ChartLegend } from "../ChartLegend/ChartLegend.js";

interface LineChartProps {
  /** One row per time bucket; `name` is the x label. */
  data: ChartRow[];
  series: ChartSeries[];
  /** Fixed value-axis range, e.g. [0, 100] for a score. */
  yDomain?: [number, number];
  yTicks?: number[];
  /** A dashed horizontal guide, e.g. "Neutral" at 50 on a 0–100 score. */
  referenceLine?: { y: number; label?: string };
  /** Value-axis unit appended to ticks, e.g. "%". */
  unit?: string;
  strokeWidth?: number;
  height?: number;
  formatValue?: ChartValueFormatter;
  /** Defaults to on for two or more series. */
  showLegend?: boolean;
  emptyLabel?: React.ReactNode;
}

/**
 * A few series over time. A null value leaves a gap rather than drawing a line
 * through a bucket that had no data.
 */
function LineChart({
  data,
  series,
  yDomain,
  yTicks,
  referenceLine,
  unit,
  strokeWidth = 2,
  height = 260,
  formatValue = formatChartNumber,
  showLegend = series.length > 1,
  emptyLabel,
}: LineChartProps) {
  const format = (value: number) => `${formatValue(value)}${unit ?? ""}`;

  return (
    <div data-slot="line-chart">
      {showLegend ? (
        <ChartLegend
          className="mb-3"
          shape="line"
          items={series.map((s) => ({ key: s.key, label: s.label, swatch: s.color }))}
        />
      ) : null}
      <ChartFrame height={height} hasData={data.length > 0} emptyLabel={emptyLabel}>
        <RechartsLineChart data={data} margin={{ top: 4, right: 8 }}>
          <CartesianGrid strokeDasharray="4 4" vertical={false} stroke={CHART_GRID} />
          <XAxis
            dataKey="name"
            tick={CHART_AXIS_TICK}
            tickLine={false}
            axisLine={false}
            interval="preserveStartEnd"
            minTickGap={16}
          />
          <YAxis
            tick={CHART_AXIS_TICK}
            tickLine={false}
            axisLine={false}
            width={36}
            tickFormatter={format}
            {...(yDomain ? { domain: yDomain } : {})}
            {...(yTicks ? { ticks: yTicks } : {})}
          />
          {referenceLine ? (
            <ReferenceLine
              y={referenceLine.y}
              stroke="rgba(36,29,51,0.25)"
              strokeDasharray="4 4"
              label={
                referenceLine.label
                  ? {
                      value: referenceLine.label,
                      position: "insideTopRight",
                      fontSize: 10,
                      fill: CHART_INK,
                    }
                  : undefined
              }
            />
          ) : null}
          <Tooltip
            contentStyle={CHART_TOOLTIP_STYLE}
            itemStyle={{ color: CHART_INK }}
            labelStyle={{ fontWeight: 600 }}
            formatter={(value) => format(Number(value))}
          />
          {series.map((s) => (
            <Line
              key={s.key}
              type="monotone"
              dataKey={s.key}
              name={s.label}
              stroke={s.color}
              strokeWidth={strokeWidth}
              connectNulls={false}
              dot={{ r: 3, fill: s.color, stroke: "#fff", strokeWidth: 1.5 }}
              activeDot={{ r: 5 }}
            />
          ))}
        </RechartsLineChart>
      </ChartFrame>
    </div>
  );
}

export { LineChart };
export type { LineChartProps };
