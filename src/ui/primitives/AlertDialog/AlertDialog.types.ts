import type * as React from "react";
import type { AlertDialog as AlertDialogPrimitive } from "radix-ui";

import type { ButtonProps } from "../Button/Button.types.js";

export interface AlertDialogContentProps extends React.ComponentProps<
  typeof AlertDialogPrimitive.Content
> {
  /** `sm` is a compact card whose two buttons share one row. */
  size?: "default" | "sm";
}

/** Action and Cancel render as a `Button`, so they take its look. */
export type AlertDialogActionProps<T extends React.ElementType> = React.ComponentProps<T> &
  Pick<ButtonProps, "variant" | "size">;
