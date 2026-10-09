import * as React from "react";

import { cn } from "../../../utils.js";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../primitives/Tooltip/Tooltip.js";
import { CHART_TOOLTIP_STYLE, formatChartNumber } from "../ChartCard/ChartCard.theme.js";
import { ChartLegend } from "../ChartLegend/ChartLegend.js";

interface BreakdownSegment {
  key: string;
  label: string;
  color: string;
  /** Ink for the in-bar percentage, picked against `color`. */
  ink?: string;
}

interface BreakdownRow {
  key: string;
  label: string;
  /** Counts per segment key. */
  values: Record<string, number>;
  /** A dot before the label, e.g. the entity's own colour. */
  color?: string;
  /** Bold label, for a totals row. */
  emphasis?: boolean;
}

interface BreakdownBarsProps {
  segments: BreakdownSegment[];
  rows: BreakdownRow[];
  /** Width of the label column; long names need more. */
  labelWidth?: string;
  /** Shown on a row with nothing to split, instead of an empty bar. */
  emptyLabel?: React.ReactNode;
}

const percent = (value: number, total: number) => (total ? (value / total) * 100 : 0);

/**
 * One 100% bar per row, split by share. Plain HTML rather than Recharts: each
 * segment is its own size container, so its percentage is drawn only when the
 * segment can hold it — never clipped — and the tooltip carries it otherwise.
 */
function BreakdownBars({
  segments,
  rows,
  labelWidth = "5.5rem",
  emptyLabel = "No data yet",
}: BreakdownBarsProps) {
  return (
    <div data-slot="breakdown-bars">
      <ChartLegend items={segments.map((s) => ({ key: s.key, label: s.label, swatch: s.color }))} />
      <div className="mt-4 space-y-3.5">
        {rows.map((row) => {
          const total = segments.reduce((sum, s) => sum + (row.values[s.key] ?? 0), 0);
          const present = segments.filter((s) => (row.values[s.key] ?? 0) > 0);
          return (
            <div
              key={row.key}
              className="grid items-center gap-3"
              style={{ gridTemplateColumns: `${labelWidth} minmax(0, 1fr)` }}
            >
              <span
                className={cn(
                  "flex min-w-0 items-center gap-1.5 text-[12px] leading-tight break-words",
                  row.emphasis ? "font-semibold text-[#241d33]" : "text-gray-500",
                )}
              >
                {row.color ? (
                  <span
                    aria-hidden="true"
                    className="size-2 shrink-0 rounded-full"
                    style={{ background: row.color }}
                  />
                ) : null}
                {row.label}
              </span>
              {present.length ? (
                <div
                  role="img"
                  aria-label={`${row.label}: ${present
                    .map((s) => `${s.label} ${Math.round(percent(row.values[s.key], total))}%`)
                    .join(", ")}`}
                  className="flex h-7 gap-0.5"
                >
                  {present.map((s) => {
                    const count = row.values[s.key];
                    const share = percent(count, total);
                    return (
                      <Tooltip key={s.key}>
                        <TooltipTrigger asChild>
                          <div
                            className="@container flex min-w-0 items-center justify-center first:rounded-l-[4px] last:rounded-r-[4px]"
                            style={{ flexGrow: count, flexBasis: 0, background: s.color }}
                          >
                            <span
                              className="hidden text-[11px] font-semibold tabular-nums @min-[2.75rem]:inline"
                              style={{ color: s.ink ?? "#fff" }}
                            >
                              {Math.round(share)}%
                            </span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent style={CHART_TOOLTIP_STYLE}>
                          <span className="font-semibold">{share.toFixed(1)}%</span> {s.label} ·{" "}
                          {row.label} ({formatChartNumber(count)} of {formatChartNumber(total)})
                        </TooltipContent>
                      </Tooltip>
                    );
                  })}
                </div>
              ) : (
                <div className="flex h-7 items-center rounded-[4px] bg-brand-purple-soft px-3 text-[11px] text-gray-400">
                  {emptyLabel}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { BreakdownBars };
export type { BreakdownBarsProps, BreakdownRow, BreakdownSegment };
