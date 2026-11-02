import type * as React from "react";
import type { Dialog as DialogPrimitive } from "radix-ui";

export type DialogContentProps = React.ComponentProps<typeof DialogPrimitive.Content> & {
  /** Hide the built-in corner close button (for dialogs with their own). */
  showCloseButton?: boolean;
  /**
   * `panel`: TevScribe's modal card — radius 40, a blurred and darkened page
   * behind it, the 32px close glyph above the content, and its header, title
   * and description restyled to match.
   */
  variant?: "default" | "panel";
  /** `panel` only: canvas grey (`subtle`, New meeting) or white (`primary`, Welcome). */
  surface?: "subtle" | "primary";
  /** Accessible name of the corner close button. */
  closeLabel?: string;
};

/** Note: a distinct prop of the same name as DialogContent's. */
export type DialogFooterProps = React.ComponentProps<"div"> & {
  showCloseButton?: boolean;
};
