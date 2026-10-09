import * as React from "react";
import { ResponsiveContainer } from "recharts";

import { cn } from "../../../utils.js";

interface ChartCardProps extends Omit<React.ComponentProps<"div">, "title"> {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
}

/**
 * The white card every analytics chart sits in: title, an optional muted
 * subtitle, then the chart. KPI tiles and notes are their own cards and do not
 * use it.
 */
function ChartCard({ title, subtitle, className, children, ...props }: ChartCardProps) {
  return (
    <div
      data-slot="chart-card"
      className={cn("rounded-2xl border border-gray-100 bg-white p-5", className)}
      {...props}
    >
      {title ? (
        <p data-slot="chart-card-title" className="text-[14px] font-semibold text-[#241d33]">
          {title}
        </p>
      ) : null}
      {subtitle ? (
        <p data-slot="chart-card-subtitle" className="mt-0.5 text-[11px] text-gray-400">
          {subtitle}
        </p>
      ) : null}
      <div data-slot="chart-card-body" className={cn(title || subtitle ? "mt-3" : null)}>
        {children}
      </div>
    </div>
  );
}

interface ChartEmptyProps extends React.ComponentProps<"div"> {
  height?: number;
}

/** The "nothing to draw" state, sized like the chart it replaces. */
function ChartEmpty({ height = 200, className, children = "No data", ...props }: ChartEmptyProps) {
  return (
    <div
      data-slot="chart-empty"
      className={cn("flex items-center justify-center text-[12px] text-gray-300", className)}
      style={{ height }}
      {...props}
    >
      {children}
    </div>
  );
}

interface ChartFrameProps {
  height?: number;
  /** False shows the empty state instead of the chart. */
  hasData?: boolean;
  emptyLabel?: React.ReactNode;
  /** A single Recharts chart element: ResponsiveContainer accepts exactly one. */
  children: React.ReactElement;
}

/** Fixed-height, full-width box a Recharts chart fills. */
function ChartFrame({ height = 260, hasData = true, emptyLabel, children }: ChartFrameProps) {
  if (!hasData) return <ChartEmpty height={height}>{emptyLabel}</ChartEmpty>;
  return (
    <div data-slot="chart-frame" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        {children}
      </ResponsiveContainer>
    </div>
  );
}

export { ChartCard, ChartEmpty, ChartFrame };
export type { ChartCardProps, ChartEmptyProps, ChartFrameProps };
