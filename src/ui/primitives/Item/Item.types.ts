import type * as React from "react";
import type { VariantProps } from "class-variance-authority";

import type { itemMediaVariants, itemVariants } from "./Item.variants.js";

export interface ItemProps extends React.ComponentProps<"div">, VariantProps<typeof itemVariants> {
  /**
   * Render the caller's child element instead of a <div> — a router link,
   * typically, so the whole row is one press target with one destination.
   */
  asChild?: boolean;
}

export interface ItemMediaProps
  extends React.ComponentProps<"div">, VariantProps<typeof itemMediaVariants> {}
