import * as React from "react";
import { Toggle as TogglePrimitive } from "radix-ui";

import { cn } from "../../../utils.js";
import { type VariantProps } from "class-variance-authority";
import { toggleVariants } from "./Toggle.variants.js";

/*
 * forwardRef so a Toggle can be a Radix trigger (`<PopoverTrigger asChild>`
 * measures and focuses its child through the ref): on React 18 a plain
 * function component drops `ref`.
 */
const Toggle = React.forwardRef<
  React.ComponentRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>
>(function Toggle({ className, variant, size, ...props }, ref) {
  return (
    <TogglePrimitive.Root
      ref={ref}
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  );
});

export { Toggle };
