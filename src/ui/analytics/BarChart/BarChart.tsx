import * as React from "react";
import {
  Bar,
  type BarProps,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Cell,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { ChartFrame } from "../ChartCard/ChartCard.js";
import {
  CHART_AXIS_TICK,
  CHART_BAR_RADIUS_END,
  CHART_BAR_RADIUS_TOP,
  CHART_CATEGORICAL,
  CHART_CURSOR,
  CHART_GRID,
  CHART_INK,
  CHART_TOOLTIP_STYLE,
  formatChartNumber,
} from "../ChartCard/ChartCard.theme.js";
import type { ChartRow, ChartSeries, ChartValueFormatter } from "../ChartCard/ChartCard.types.js";
import { ChartLegend } from "../ChartLegend/ChartLegend.js";

type Orientation = "vertical" | "horizontal";

interface BarChartProps {
  data: ChartRow[];
  /** One entry per bar series. Several series sit side by side unless `stacked`. */
  series: ChartSeries[];
  /** `vertical`: columns over a category axis. `horizontal`: rows, for long names. */
  orientation?: Orientation;
  stacked?: boolean;
  /** Values are percentages: the value axis runs 0–100 and ticks read "%". */
  percent?: boolean;
  /** Single series only: each bar takes its row's `color`, else the palette. */
  colorByCategory?: boolean;
  maxBarSize?: number;
  /** Defaults to 240, or grows with the row count when horizontal. */
  height?: number;
  /** Category-axis width when horizontal, for the row labels. */
  categoryWidth?: number;
  /** Category tick interval when vertical; 1 shows every other label. */
  tickInterval?: number | "preserveStartEnd";
  /** Tilt crowded vertical category labels. */
  slantLabels?: boolean;
  formatValue?: ChartValueFormatter;
  /** Defaults to on for two or more series. */
  showLegend?: boolean;
  emptyLabel?: React.ReactNode;
}

const STACK_RADIUS = 8;

function endRoundedPath(
  x: number,
  y: number,
  width: number,
  height: number,
  orientation: Orientation,
) {
  if (orientation === "vertical") {
    const r = Math.min(STACK_RADIUS, width / 2, height);
    return `M${x},${y + height} L${x},${y + r} Q${x},${y} ${x + r},${y} L${x + width - r},${y} Q${x + width},${y} ${x + width},${y + r} L${x + width},${y + height} Z`;
  }
  const r = Math.min(STACK_RADIUS, height / 2, width);
  return `M${x},${y} L${x + width - r},${y} Q${x + width},${y} ${x + width},${y + r} L${x + width},${y + height - r} Q${x + width},${y + height} ${x + width - r},${y + height} L${x},${y + height} Z`;
}

/**
 * Rounds only the outermost segment of a stack that has a value. Recharts'
 * `radius` rounds a segment unconditionally, so a stack whose last series is 0
 * would otherwise end square.
 */
function stackEndShape(keys: string[], orientation: Orientation) {
  return function StackSegment(props: BarProps) {
    // Recharts hands the drawn segment's datum to `shape` as `payload`.
    const { fill, dataKey, payload } = props as BarProps & { payload?: Record<string, unknown> };
    const x = Number(props.x ?? 0);
    const y = Number(props.y ?? 0);
    const width = Number(props.width ?? 0);
    const height = Number(props.height ?? 0);
    if (!width || !height) return <g />;
    const endKey = [...keys].reverse().find((key) => Number(payload?.[key]) > 0);
    if (dataKey !== endKey) return <rect x={x} y={y} width={width} height={height} fill={fill} />;
    return <path d={endRoundedPath(x, y, width, height, orientation)} fill={fill} />;
  };
}

/** Columns or rows, single, grouped, stacked or 100%-stacked. */
function BarChart({
  data,
  series,
  orientation = "vertical",
  stacked = false,
  percent = false,
  colorByCategory = false,
  maxBarSize,
  height,
  categoryWidth = 120,
  tickInterval,
  slantLabels = false,
  formatValue = formatChartNumber,
  showLegend = series.length > 1,
  emptyLabel,
}: BarChartProps) {
  const vertical = orientation === "vertical";
  const format = (value: number) => (percent ? `${value}%` : formatValue(value));
  const frameHeight =
    height ?? (vertical ? 240 : Math.max(240, data.length * (series.length > 1 ? 34 : 30)));
  const barSize = maxBarSize ?? (vertical ? 34 : 18);
  const keys = series.map((s) => s.key);
  const shape = stacked ? stackEndShape(keys, orientation) : undefined;
  const radius = vertical ? CHART_BAR_RADIUS_TOP : CHART_BAR_RADIUS_END;

  const valueAxis = {
    type: "number" as const,
    tick: CHART_AXIS_TICK,
    tickLine: false,
    axisLine: false,
    tickFormatter: format,
    ...(percent ? { domain: [0, 100] } : {}),
  };

  return (
    <div data-slot="bar-chart">
      {showLegend ? (
        <ChartLegend
          className="mb-3"
          items={series.map((s) => ({ key: s.key, label: s.label, swatch: s.color }))}
        />
      ) : null}
      <ChartFrame height={frameHeight} hasData={data.length > 0} emptyLabel={emptyLabel}>
        <RechartsBarChart
          data={data}
          layout={vertical ? "horizontal" : "vertical"}
          barGap={2}
          margin={vertical ? { top: 4, right: 4 } : { left: 8, right: 16 }}
        >
          <CartesianGrid
            strokeDasharray="4 4"
            stroke={CHART_GRID}
            vertical={!vertical}
            horizontal={vertical}
          />
          {vertical ? (
            <>
              <XAxis
                dataKey="name"
                tick={CHART_AXIS_TICK}
                tickLine={false}
                axisLine={false}
                interval={slantLabels ? 0 : tickInterval}
                {...(slantLabels ? { angle: -15, textAnchor: "end", height: 50 } : {})}
              />
              <YAxis {...valueAxis} width={40} />
            </>
          ) : (
            <>
              <XAxis {...valueAxis} />
              <YAxis
                type="category"
                dataKey="name"
                width={categoryWidth}
                tick={CHART_AXIS_TICK}
                tickLine={false}
                axisLine={false}
              />
            </>
          )}
          <Tooltip
            contentStyle={CHART_TOOLTIP_STYLE}
            itemStyle={{ color: CHART_INK }}
            labelStyle={{ fontWeight: 600 }}
            cursor={CHART_CURSOR}
            formatter={(value) => format(Number(value))}
          />
          {series.map((s) => (
            <Bar
              key={s.key}
              dataKey={s.key}
              name={s.label}
              fill={s.color}
              maxBarSize={barSize}
              {...(stacked ? { stackId: "stack", shape } : { radius })}
            >
              {colorByCategory && series.length === 1
                ? data.map((row, index) => (
                    <Cell
                      key={row.name}
                      fill={
                        typeof row.color === "string"
                          ? row.color
                          : CHART_CATEGORICAL[index % CHART_CATEGORICAL.length]
                      }
                    />
                  ))
                : null}
            </Bar>
          ))}
        </RechartsBarChart>
      </ChartFrame>
    </div>
  );
}

export { BarChart };
export type { BarChartProps };
