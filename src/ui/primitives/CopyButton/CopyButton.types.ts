import type * as React from "react";

export interface CopyButtonProps extends Omit<
  React.ComponentProps<"button">,
  "value" | "children"
> {
  /** The text put on the clipboard. */
  value: string;
  /** Tooltip and accessible name, before and after the copy. */
  labels?: {
    /** Defaults to "Copy". */
    copy?: string;
    /** Defaults to "Copied". */
    copied?: string;
  };
}
