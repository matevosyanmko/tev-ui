import type * as React from "react";

/**
 * Same call shape as a lucide icon, so a glyph swaps in at a call site with no
 * other change. `size` is the longer side in px; omitted, the Figma size.
 */
export interface ScribeIconProps extends Omit<React.SVGProps<SVGSVGElement>, "width" | "height"> {
  size?: number;
  /** lucide-only prop, accepted and ignored: the artwork carries its own widths. */
  strokeWidth?: number;
}

export type ScribeIcon = React.ComponentType<ScribeIconProps>;
