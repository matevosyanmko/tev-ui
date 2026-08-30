import type * as React from "react";
import type { VariantProps } from "class-variance-authority";

import type { gradientButtonVariants } from "./GradientButton.variants.js";

export interface GradientButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof gradientButtonVariants> {
  /** Classes for the black frame the pill sits inside. */
  frameClassName?: string;
}
