import type * as React from "react";
import type { VariantProps } from "class-variance-authority";

import type { buttonVariants } from "./Button.variants.js";

export interface ButtonProps
  extends React.ComponentProps<"button">, VariantProps<typeof buttonVariants> {
  /** Render the caller's child element instead of a <button>. */
  asChild?: boolean;
}
