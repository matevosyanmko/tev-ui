import * as React from "react";
import { Gauge } from "lucide-react";

import { cn } from "../../../utils.js";
import { KPI_TILE_TONES, type KpiTileTone } from "./KpiTile.variants.js";

interface KpiTileProps extends React.ComponentProps<"div"> {
  /** Any icon component that takes a className (lucide, brand Icons). */
  icon?: React.ElementType;
  tone?: KpiTileTone;
  label?: React.ReactNode;
  value: React.ReactNode;
  /** Trailing unit in a lighter weight: "/ 100", "%". */
  unit?: React.ReactNode;
  /** A line under the figure saying what it is out of: "4.3% of 280 analysed". */
  meta?: React.ReactNode;
}

/**
 * Icon KPI tile. The tile is its own size container: too narrow for icon and
 * figure side by side (two-up on a phone), the icon moves above the figure
 * instead of the figure overflowing.
 */
function KpiTile({
  icon: Icon = Gauge,
  tone = "purple",
  label,
  value,
  unit,
  meta,
  className,
  ...props
}: KpiTileProps) {
  return (
    <div
      data-slot="kpi-tile"
      className={cn("@container rounded-2xl border border-gray-100 bg-white p-4", className)}
      {...props}
    >
      <div className="flex flex-col items-start gap-2.5 @[9rem]:flex-row @[9rem]:items-center @[9rem]:gap-3">
        <span
          data-slot="kpi-tile-icon"
          className={cn(
            "flex size-10 shrink-0 items-center justify-center rounded-xl",
            KPI_TILE_TONES[tone],
          )}
        >
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          {label ? (
            <p className="mb-1.5 text-[11px] leading-tight font-medium break-words text-gray-400">
              {label}
            </p>
          ) : null}
          <p className="text-[22px] leading-none font-bold whitespace-nowrap text-[#241d33]">
            {value}
            {unit ? (
              <span className="ml-1 text-[13px] font-semibold text-gray-400">{unit}</span>
            ) : null}
          </p>
          {meta ? (
            <p className="mt-1.5 text-[11px] leading-tight break-words text-gray-400">{meta}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export { KpiTile };
export type { KpiTileProps };
