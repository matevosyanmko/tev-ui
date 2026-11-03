import { cva } from "class-variance-authority";

// Kept out of MetricTile.tsx so that file only exports components — a
// prerequisite for React Fast Refresh to hot-swap the tile.
//
// The usage screen's three tiles (100:40457), on the page ink. The two
// stroked tiles are drawn 2px taller than the green one (the stroke is part
// of their size), which a real border reproduces.
export const metricTileVariants = cva(
  "flex min-w-0 items-center justify-between gap-4 overflow-clip rounded-20 p-7",
  {
    variants: {
      tone: {
        /** Brand green, ink figure: hours recorded. */
        accent: "bg-surface-accent-green text-content-primary",
        /** Ink with a white stroke, white figure: meetings. */
        inverse: "border border-stroke-white bg-surface-inverse text-content-inverse",
        /** White with an ink stroke: the amount. */
        plain: "border border-stroke-ink bg-surface-primary text-content-primary",
      },
    },
    defaultVariants: { tone: "accent" },
  },
);
