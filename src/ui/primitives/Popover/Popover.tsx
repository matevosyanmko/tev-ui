import * as React from "react";
import { Popover as PopoverPrimitive } from "radix-ui";

import { cn } from "../../../utils.js";
import type { PopoverContentProps } from "./Popover.types.js";
import { popoverContentVariants } from "./Popover.variants.js";

function Popover({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />;
}

function PopoverTrigger({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
}

function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  variant = "default",
  ...props
}: PopoverContentProps) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        data-variant={variant === "default" ? undefined : variant}
        align={align}
        sideOffset={sideOffset}
        className={cn(popoverContentVariants({ variant }), className)}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
}

/**
 * Closes the popover it sits in. Use it `asChild` around a panel's own close
 * glyph, so an uncontrolled popover needs no `open` state of its own.
 */
function PopoverClose({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Close>) {
  return <PopoverPrimitive.Close data-slot="popover-close" {...props} />;
}

function PopoverAnchor({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />;
}

function PopoverHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="popover-header"
      className={cn("flex flex-col gap-1 text-sm", className)}
      {...props}
    />
  );
}

function PopoverTitle({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="popover-title" className={cn("font-medium", className)} {...props} />;
}

function PopoverDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="popover-description"
      className={cn("text-muted-foreground", className)}
      {...props}
    />
  );
}

export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
  PopoverAnchor,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
};
