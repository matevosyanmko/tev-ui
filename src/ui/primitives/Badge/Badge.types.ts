import type * as React from "react";
import type { VariantProps } from "class-variance-authority";

import type { badgeVariants } from "./Badge.variants.js";

export interface BadgeProps
  extends React.ComponentProps<"span">,
    VariantProps<typeof badgeVariants> {
  /** Render the caller's child element instead of a <span>. */
  asChild?: boolean;
}
