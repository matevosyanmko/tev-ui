import type * as React from "react";
import type { VariantProps } from "class-variance-authority";

import type { badgeVariants } from "./Badge.variants.js";

export interface BadgeProps
  extends React.ComponentProps<"span">, VariantProps<typeof badgeVariants> {
  /** Render the caller's child element instead of a <span>. */
  asChild?: boolean;
  /**
   * Let a label that doesn't fit wrap onto more lines instead of being cut
   * off. The lines are centred and the badge stays as narrow as its longest
   * line, rather than stretching to the width of the cell it wrapped in.
   * Lines break between words, never inside one. Not applied with `asChild`.
   */
  wrap?: boolean;
}
