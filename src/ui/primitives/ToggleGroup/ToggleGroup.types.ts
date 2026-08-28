import type * as React from "react";
import type { ToggleGroup as ToggleGroupPrimitive } from "radix-ui";
import type { VariantProps } from "class-variance-authority";

import type { toggleVariants } from "../Toggle/Toggle.variants.js";

export type ToggleGroupProps = React.ComponentProps<
  typeof ToggleGroupPrimitive.Root
> &
  VariantProps<typeof toggleVariants> & {
    /** Gap between items, applied via the --gap custom property. */
    spacing?: string | number;
  };
