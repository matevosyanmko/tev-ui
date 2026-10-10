import * as React from "react";

import { ChartEmpty } from "../ChartCard/ChartCard.js";
import { formatChartNumber, formatChartShare } from "../ChartCard/ChartCard.theme.js";
import type { ChartShareFormatter, ChartValueFormatter } from "../ChartCard/ChartCard.types.js";

interface BarListItem {
  key: string;
  label: string;
  value: number;
  /**
   * The item's share in percent, when its base is not the listed items' total
   * (a top-N list, or a share of something else). Defaults to value / total.
   */
  share?: number;
}

interface BarListProps {
  items: BarListItem[];
  formatValue?: ChartValueFormatter;
  /** Formats the bold share. Defaults to a whole percent. */
  formatShare?: ChartShareFormatter;
  emptyLabel?: React.ReactNode;
}

// Room kept at the end of the longest bar for its value label.
const VALUE_ROOM = "5.5rem";

/**
 * An axis-free ranked list: label, a thin bar, then share and count at its tip.
 * One series, so one colour and no legend. Items keep their given order, zeros
 * included, so an absent item reads as "none" rather than "not shown".
 */
function BarList({
  items,
  formatValue = formatChartNumber,
  formatShare = formatChartShare,
  emptyLabel,
}: BarListProps) {
  if (!items.length) return <ChartEmpty>{emptyLabel}</ChartEmpty>;
  const total = items.reduce((sum, item) => sum + item.value, 0);
  const max = Math.max(0, ...items.map((item) => item.value));

  return (
    <ul data-slot="bar-list" className="space-y-3 pt-1">
      {items.map((item) => (
        <li
          key={item.key}
          className="grid grid-cols-[minmax(0,8.5rem)_minmax(0,1fr)] items-center gap-3"
        >
          <span className="text-[12px] leading-tight text-gray-500">{item.label}</span>
          <span className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="h-2.5 shrink-0 rounded-r-[4px] bg-brand-purple"
              style={{ width: `calc((100% - ${VALUE_ROOM}) * ${max ? item.value / max : 0})` }}
            />
            <span className="text-[12px] whitespace-nowrap text-gray-400 tabular-nums">
              <span className="font-semibold text-[#241d33]">
                {formatShare(item.share ?? (total ? (item.value / total) * 100 : 0))}
              </span>{" "}
              · {formatValue(item.value)}
            </span>
          </span>
        </li>
      ))}
    </ul>
  );
}

export { BarList };
export type { BarListItem, BarListProps };
