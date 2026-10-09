import * as React from "react";

import { ChartEmpty } from "../ChartCard/ChartCard.js";
import { CHART_TOOLTIP_STYLE, chartRamp, formatChartNumber } from "../ChartCard/ChartCard.theme.js";
import type { ChartValueFormatter } from "../ChartCard/ChartCard.types.js";

interface HeatmapProps {
  rows: string[];
  columns: string[];
  /** `values[row][column]`, aligned with `rows` and `columns`. */
  values: number[][];
  /**
   * `cells`: few columns, each cell shows its count, column labels on top.
   * `dense`: many columns (e.g. 24 hours), plain cells, labels underneath and
   * a colour scale.
   */
  variant?: "cells" | "dense";
  /** Label for a column tick; return "" to skip it (dense hours every 4h). */
  columnLabel?: (column: string, index: number) => React.ReactNode;
  /** Caption before the colour scale (dense only). */
  scaleLabel?: React.ReactNode;
  /** Hover text for one cell. */
  cellLabel?: (row: string, column: string, value: number) => React.ReactNode;
  formatValue?: ChartValueFormatter;
  emptyLabel?: React.ReactNode;
}

interface Hover {
  row: string;
  column: string;
  value: number;
  left: number;
  top: number;
}

/** Two categorical axes; the darker the cell, the more it holds. */
function Heatmap({
  rows,
  columns,
  values,
  variant = "cells",
  columnLabel = (column) => column,
  scaleLabel,
  cellLabel = (row, column, value) => `${row} · ${column}: ${formatChartNumber(value)}`,
  formatValue = formatChartNumber,
  emptyLabel,
}: HeatmapProps) {
  const [hover, setHover] = React.useState<Hover | null>(null);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const max = Math.max(0, ...values.flat());

  if (!rows.length || !columns.length) return <ChartEmpty>{emptyLabel}</ChartEmpty>;

  const dense = variant === "dense";

  function show(event: React.MouseEvent<HTMLElement>, row: string, column: string, value: number) {
    const root = rootRef.current;
    if (!root) return;
    const cell = event.currentTarget.getBoundingClientRect();
    const box = root.getBoundingClientRect();
    setHover({
      row,
      column,
      value,
      left: Math.min(Math.max(cell.left - box.left + cell.width / 2, 60), box.width - 60),
      top: cell.top - box.top,
    });
  }

  const labels = columns.map((column, index) => (
    <span
      key={column}
      className={
        dense
          ? "pt-1 text-[10px] whitespace-nowrap text-gray-400"
          : "pb-1 text-center text-[9px] leading-tight text-gray-400"
      }
    >
      {columnLabel(column, index)}
    </span>
  ));

  return (
    <div data-slot="heatmap" data-variant={variant} ref={rootRef} className="relative">
      <div className="overflow-x-auto pb-1">
        <div
          className={dense ? "grid min-w-[26rem] gap-0.5" : "grid min-w-[360px] gap-1"}
          style={{
            gridTemplateColumns: dense
              ? `2.25rem repeat(${columns.length}, minmax(0, 1fr))`
              : `120px repeat(${columns.length}, minmax(40px, 1fr))`,
          }}
          onMouseLeave={() => setHover(null)}
        >
          {dense ? null : (
            <>
              <span />
              {labels}
            </>
          )}
          {rows.map((row, r) => (
            <React.Fragment key={row}>
              <span
                className={
                  dense
                    ? "flex items-center text-[10px] text-gray-400"
                    : "flex items-center truncate pr-2 text-[11px] text-gray-500"
                }
              >
                {row}
              </span>
              {columns.map((column, c) => {
                const value = values[r]?.[c] ?? 0;
                const ratio = max ? value / max : 0;
                return (
                  <span
                    key={column}
                    className={
                      dense
                        ? "aspect-[4/3] min-h-[18px] w-full rounded-[3px] transition-[filter] hover:brightness-90"
                        : "flex min-h-[30px] items-center justify-center rounded-[4px] font-mono text-[11px]"
                    }
                    style={{
                      background: value ? chartRamp(ratio) : "#f5f3fb",
                      color: ratio > 0.5 ? "#fff" : "#475569",
                    }}
                    onMouseEnter={(event) => show(event, row, column, value)}
                  >
                    {dense ? null : value ? formatValue(value) : ""}
                  </span>
                );
              })}
            </React.Fragment>
          ))}
          {dense ? (
            <>
              <span />
              {labels}
            </>
          ) : null}
        </div>
      </div>

      {dense ? (
        <div className="mt-3 flex flex-wrap items-center gap-2 text-[10px] text-gray-400">
          {scaleLabel}
          <span className="tabular-nums">0</span>
          <span
            aria-hidden="true"
            className="h-2 w-24 rounded-full"
            style={{ background: `linear-gradient(90deg, ${chartRamp(0)}, ${chartRamp(1)})` }}
          />
          <span className="tabular-nums">{formatValue(max)}</span>
        </div>
      ) : null}

      {hover ? (
        <div
          className="pointer-events-none absolute z-10 whitespace-nowrap"
          style={{
            ...CHART_TOOLTIP_STYLE,
            padding: "6px 10px",
            left: hover.left,
            top: hover.top - 6,
            transform: "translate(-50%, -100%)",
          }}
        >
          {cellLabel(hover.row, hover.column, hover.value)}
        </div>
      ) : null}
    </div>
  );
}

export { Heatmap };
export type { HeatmapProps };
