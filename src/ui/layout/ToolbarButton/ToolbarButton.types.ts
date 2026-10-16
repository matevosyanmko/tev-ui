import type * as React from "react";
import type { VariantProps } from "class-variance-authority";

import type { toolbarButtonVariants } from "./ToolbarButton.variants.js";

export interface ToolbarButtonProps
  extends React.ComponentProps<"button">, VariantProps<typeof toolbarButtonVariants> {
  /** Render the caller's own element — a router link, say — instead of a <button>. */
  asChild?: boolean;
}
