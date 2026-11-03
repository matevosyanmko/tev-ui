"use client";

import * as React from "react";
import { Collapsible as CollapsiblePrimitive } from "radix-ui";

import { cn } from "../../../utils.js";

/**
 * A section that shows and hides its content from one trigger (shadcn's
 * `collapsible`). The trigger is the caller's, through `asChild`; Radix wires
 * `aria-expanded` and `aria-controls` between the two.
 */
function Collapsible(props: React.ComponentProps<typeof CollapsiblePrimitive.Root>) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />;
}

function CollapsibleTrigger(props: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>) {
  return <CollapsiblePrimitive.CollapsibleTrigger data-slot="collapsible-trigger" {...props} />;
}

/**
 * Unlike upstream, the content opens and closes by its height, on the motion
 * tokens (Radix measures it into `--radix-collapsible-content-height`;
 * tw-animate-css's keyframes read it), and stays put under reduced motion.
 * It clips while it moves, so a child's outer focus ring wants room inside it.
 */
function CollapsibleContent({
  className,
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>) {
  return (
    <CollapsiblePrimitive.CollapsibleContent
      data-slot="collapsible-content"
      className={cn(
        "overflow-hidden duration-(--duration-base) ease-standard data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down motion-reduce:animate-none",
        className,
      )}
      {...props}
    />
  );
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
