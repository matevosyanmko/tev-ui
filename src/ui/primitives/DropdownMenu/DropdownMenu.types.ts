import type * as React from "react";
import type { DropdownMenu as DropdownMenuPrimitive } from "radix-ui";

export type DropdownMenuItemProps = React.ComponentProps<
  typeof DropdownMenuPrimitive.Item
> & {
  /** Indent to align with items that have a leading icon. */
  inset?: boolean;
  variant?: "default" | "destructive";
};

export type DropdownMenuLabelProps = React.ComponentProps<
  typeof DropdownMenuPrimitive.Label
> & {
  inset?: boolean;
};

export type DropdownMenuSubTriggerProps = React.ComponentProps<
  typeof DropdownMenuPrimitive.SubTrigger
> & {
  inset?: boolean;
};
