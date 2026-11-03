import type * as React from "react";
import type { VariantProps } from "class-variance-authority";

import type { chipVariants } from "./Chip.variants.js";

export interface ChipProps
  extends React.ComponentProps<"button">, Omit<VariantProps<typeof chipVariants>, "interactive"> {
  /**
   * Makes the chip a toggle: a <button> with `aria-pressed`, drawn filled ink
   * while `true`. Leave it out for a static label.
   */
  selected?: boolean;
  /** Render the caller's child element instead of the chip's own. */
  asChild?: boolean;
}
