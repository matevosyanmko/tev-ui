import type * as React from "react";
import type { VariantProps } from "class-variance-authority";

import type { platformBadgeVariants } from "./PlatformBadge.variants.js";

export interface PlatformBadgeProps
  extends React.ComponentProps<"span">, VariantProps<typeof platformBadgeVariants> {
  /**
   * Which meeting platform. `meet` and `zoom` have their glyph; anything else
   * shows the first letter of `label` (or of the value itself).
   */
  platform: "meet" | "zoom" | (string & {});
  /** Accessible name. Defaults to "Google Meet" / "Zoom" / the platform value. */
  label?: string;
}
