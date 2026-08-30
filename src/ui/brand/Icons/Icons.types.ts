import type * as React from "react";

/**
 * Drop-in for a lucide icon: same call signature, same props, so a brand glyph
 * can replace a lucide one at a call site with no other change.
 */
export interface BrandIconProps
  extends Omit<React.SVGProps<SVGSVGElement>, "width" | "height"> {
  size?: number;
  /** lucide-only prop, accepted and ignored — the artwork carries its own widths. */
  strokeWidth?: number;
}

export type BrandIcon = React.ComponentType<BrandIconProps>;
