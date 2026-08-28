import * as React from "react"
import { Slot } from "radix-ui"

import { cn } from "../../../utils.js"
import type { BadgeProps } from "./Badge.types.js";
import { badgeVariants } from "./Badge.variants.js"

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
