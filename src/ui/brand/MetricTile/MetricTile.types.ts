import type * as React from "react";
import type { VariantProps } from "class-variance-authority";

import type { metricTileVariants } from "./MetricTile.variants.js";

export interface MetricTileProps
  extends React.ComponentProps<"div">, VariantProps<typeof metricTileVariants> {
  /** The figure, already formatted by the caller: "38", "117.84$". */
  value: React.ReactNode;
  /** What it counts, set small at the figure's top right: "hours", "Meetings". */
  unit?: React.ReactNode;
  /** A glyph at the far end, e.g. ScribeIcons `ClockIcon` / `ScribbleIcon` (54px). */
  icon?: React.ReactNode;
}
