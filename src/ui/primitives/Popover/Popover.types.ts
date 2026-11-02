import type * as React from "react";
import type { Popover as PopoverPrimitive } from "radix-ui";

export type PopoverContentProps = React.ComponentProps<typeof PopoverPrimitive.Content> & {
  /**
   * `panel`: TevScribe's 250px floating panel (filters, export menu) — ink
   * border, radius 12, the popover shadow. `picker`: the date, time and
   * language pickers — radius 16, 16px in, no shadow, content-wide.
   */
  variant?: "default" | "panel" | "picker";
};
