import type * as React from "react";
import type { VariantProps } from "class-variance-authority";
import type { Dialog as SheetPrimitive } from "radix-ui";

import type { sheetVariants } from "./Sheet.variants.js";

export type SheetContentProps = React.ComponentProps<typeof SheetPrimitive.Content> &
  VariantProps<typeof sheetVariants> & {
    /** Hide the built-in corner close button (for sheets with their own). */
    showCloseButton?: boolean;
    /** Accessible name of the corner close button. English fallback. */
    closeLabel?: string;
  };
