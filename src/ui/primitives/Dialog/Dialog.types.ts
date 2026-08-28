import type * as React from "react";
import type { Dialog as DialogPrimitive } from "radix-ui";

export type DialogContentProps = React.ComponentProps<
  typeof DialogPrimitive.Content
> & {
  /** Hide the built-in corner close button (for dialogs with their own). */
  showCloseButton?: boolean;
};

/** Note: a distinct prop of the same name as DialogContent's. */
export type DialogFooterProps = React.ComponentProps<"div"> & {
  showCloseButton?: boolean;
};
