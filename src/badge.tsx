import * as React from "react"
import { Slot } from "radix-ui"

import { cn } from "./utils"
import { badgeVariants } from "./badge-variants"

import { type VariantProps } from "class-variance-authority";

export interface BadgeProps
  extends React.ComponentProps<"span">,
    VariantProps<typeof badgeVariants> {
  /** Render the caller's child element instead of a <span>. */
  asChild?: boolean;
}

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: BadgeProps) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props} />
  );
}

export { Badge }
