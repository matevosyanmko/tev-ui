import type * as React from "react";
import type { Switch as SwitchPrimitive } from "radix-ui";

export interface SwitchProps extends React.ComponentProps<typeof SwitchPrimitive.Root> {
  /** `sm` for a dense row, e.g. inside a table cell. */
  size?: "default" | "sm";
}
