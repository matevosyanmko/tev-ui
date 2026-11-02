import type * as React from "react";
import type { Switch as SwitchPrimitive } from "radix-ui";

export interface SwitchProps extends React.ComponentProps<typeof SwitchPrimitive.Root> {
  /** `sm` for a dense row, e.g. inside a table cell. */
  size?: "default" | "sm";
  /**
   * `accent`: TevScribe's settings switch (100:40567), a 56×32 track, brand
   * green when on and ink when off. Drawn at one size; `size` does not apply.
   */
  variant?: "default" | "accent";
}
