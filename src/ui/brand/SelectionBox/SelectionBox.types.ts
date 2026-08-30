import type * as React from "react";

export interface SelectionBoxProps
  extends Omit<React.ComponentProps<"input">, "type" | "onChange" | "checked"> {
  checked: boolean;
  /** Called with the next checked state. */
  onCheckedChange?: (checked: boolean) => void;
  /** Accessible name for the checkbox; rendered as aria-label. */
  label: string;
  /** Classes for the square, not the hidden <input>. */
  className?: string;
}
