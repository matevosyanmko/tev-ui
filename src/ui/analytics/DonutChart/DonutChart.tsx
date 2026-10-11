import * as React from "react";
import { Cell, Pie, PieChart, Tooltip } from "recharts";

import { ChartEmpty, ChartFrame } from "../ChartCard/ChartCard.js";
import {
  CHART_CATEGORICAL,
  CHART_INK,
  CHART_TOOLTIP_STYLE,
  formatChartNumber,
  formatChartShare,
} from "../ChartCard/ChartCard.theme.js";
import type { ChartShareFormatter, ChartValueFormatter } from "../ChartCard/ChartCard.types.js";
import { ChartLegend } from "../ChartLegend/ChartLegend.js";
import { ChartTooltip } from "../ChartTooltip/ChartTooltip.js";

interface DonutSlice {
  name: string;
  value: number;
  /** Defaults to the categorical palette, in slice order. */
  color?: string;
}

interface DonutChartProps {
  data: DonutSlice[];
  /**
   * `legend`: a responsive donut with the legend under it.
   * `total`: a fixed donut with the total in its hole and a share list beside it.
   */
  variant?: "legend" | "total";
  /** Caption over the total in the `total` variant. */
  totalLabel?: React.ReactNode;
  formatValue?: ChartValueFormatter;
  /** Formats the shares in the tooltip and the share list. Defaults to a whole percent. */
  formatShare?: ChartShareFormatter;
  emptyLabel?: React.ReactNode;
}

const TOTAL_SIZE = 176;

function withColors(data: DonutSlice[]) {
  return data.map((slice, index) => ({
    ...slice,
    color: slice.color ?? CHART_CATEGORICAL[index % CHART_CATEGORICAL.length],
  }));
}

/** Share of a whole across a few categories. */
function DonutChart({
  data,
  variant = "legend",
  totalLabel = "Total",
  formatValue = formatChartNumber,
  formatShare = formatChartShare,
  emptyLabel,
}: DonutChartProps) {
  const slices = withColors(data.filter((slice) => slice.value > 0));
  const total = slices.reduce((sum, slice) => sum + slice.value, 0);
  const share = (value: number) => formatShare(total ? (value / total) * 100 : 0);

  if (variant === "total") {
    if (!slices.length) {
      return <ChartEmpty height={TOTAL_SIZE}>{emptyLabel}</ChartEmpty>;
    }
    return (
      <div
        data-slot="donut-chart"
        className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 py-1"
      >
        <div className="relative shrink-0" style={{ width: TOTAL_SIZE, height: TOTAL_SIZE }}>
          <PieChart width={TOTAL_SIZE} height={TOTAL_SIZE}>
            <Pie
              data={slices}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={86}
              startAngle={90}
              endAngle={-270}
              // A 2px surface-coloured gap between slices, not an outline.
              stroke="#fff"
              strokeWidth={2}
            >
              {slices.map((slice) => (
                <Cell key={slice.name} fill={slice.color} />
              ))}
            </Pie>
            <Tooltip
              wrapperStyle={{ zIndex: 10 }}
              content={
                <ChartTooltip<(typeof slices)[number]>
                  rows={[
                    { label: "Value", value: (d) => formatValue(d.value) },
                    { label: "Share", value: (d) => share(d.value) },
                  ]}
                />
              }
            />
          </PieChart>
          {/* Kept inside the hole: a long caption wraps rather than spilling
              over the ring. */}
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="max-w-26 text-center text-[11px] leading-tight text-gray-400">
              {totalLabel}
            </span>
            <span className="text-[20px] leading-tight font-bold text-[#241d33]">
              {formatValue(total)}
            </span>
          </div>
        </div>
        <ul className="space-y-2.5">
          {slices.map((slice) => (
            <li key={slice.name} className="flex items-center gap-2 text-[12px] text-gray-500">
              <span
                aria-hidden="true"
                className="size-2.5 shrink-0 rounded-[3px]"
                style={{ background: slice.color }}
              />
              <span className="w-11 font-semibold text-[#241d33] tabular-nums">
                {share(slice.value)}
              </span>
              {slice.name}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div data-slot="donut-chart">
      <ChartFrame height={208} hasData={slices.length > 0} emptyLabel={emptyLabel}>
        <PieChart>
          <Pie
            data={slices}
            dataKey="value"
            nameKey="name"
            innerRadius={48}
            outerRadius={80}
            paddingAngle={2}
          >
            {slices.map((slice) => (
              <Cell key={slice.name} fill={slice.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={CHART_TOOLTIP_STYLE}
            itemStyle={{ color: CHART_INK }}
            formatter={(value) => formatValue(Number(value))}
          />
        </PieChart>
      </ChartFrame>
      {slices.length ? (
        <ChartLegend
          className="justify-center"
          items={slices.map((slice) => ({
            key: slice.name,
            label: slice.name,
            swatch: slice.color,
          }))}
        />
      ) : null}
    </div>
  );
}

export { DonutChart };
export type { DonutChartProps, DonutSlice };
