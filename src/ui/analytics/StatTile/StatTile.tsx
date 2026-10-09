import * as React from "react";

import { cn } from "../../../utils.js";

interface StatTileProps extends React.ComponentProps<"div"> {
  label?: React.ReactNode;
  value: React.ReactNode;
  /** Colour of the figure; ink when omitted. */
  accent?: string;
  /** Muted line under the figure. */
  meta?: React.ReactNode;
}

/** One headline number: a muted label over a big coloured figure. No icon. */
function StatTile({ label, value, accent, meta, className, ...props }: StatTileProps) {
  return (
    <div
      data-slot="stat-tile"
      className={cn("rounded-2xl border border-gray-100 bg-white p-4", className)}
      {...props}
    >
      {label ? <p className="mb-2 text-[11px] font-medium text-gray-400">{label}</p> : null}
      <p className="text-[26px] leading-none font-bold" style={{ color: accent || "#241d33" }}>
        {value}
      </p>
      {meta ? <p className="mt-2 text-[11px] text-gray-400">{meta}</p> : null}
    </div>
  );
}

export { StatTile };
export type { StatTileProps };
