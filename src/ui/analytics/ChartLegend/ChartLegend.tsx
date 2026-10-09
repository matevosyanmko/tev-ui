import * as React from "react";

import { cn } from "../../../utils.js";

interface ChartLegendItem {
  key: string;
  label: React.ReactNode;
  /** Any CSS background, so a swatch can also be a gradient. */
  swatch: string;
}

interface ChartLegendProps extends React.ComponentProps<"ul"> {
  items: ChartLegendItem[];
  /** Mirrors the mark: a square for bars and slices, a short stroke for lines. */
  shape?: "square" | "line";
}

/**
 * HTML legend for a chart. The label stays in ink and the swatch beside it
 * carries the colour, so a light series hue never has to be legible as text.
 */
function ChartLegend({ items, shape = "square", className, ...props }: ChartLegendProps) {
  return (
    <ul
      data-slot="chart-legend"
      className={cn("flex flex-wrap items-center gap-x-4 gap-y-1.5", className)}
      {...props}
    >
      {items.map((item) => (
        <li key={item.key} className="flex items-center gap-1.5 text-[11px] text-gray-500">
          <span
            aria-hidden="true"
            className={cn(
              "shrink-0",
              shape === "line" ? "h-[3px] w-3.5 rounded-full" : "size-2.5 rounded-[3px]",
            )}
            style={{ background: item.swatch }}
          />
          {item.label}
        </li>
      ))}
    </ul>
  );
}

export { ChartLegend };
export type { ChartLegendItem, ChartLegendProps };
