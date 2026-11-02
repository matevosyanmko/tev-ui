"use client";

import * as React from "react";
import { Switch as SwitchPrimitive } from "radix-ui";

import { cn } from "../../../utils.js";
import type { SwitchProps } from "./Switch.types.js";

/**
 * An on/off toggle for a setting that applies the moment it changes.
 *
 * The visible track is small, so the press target is not: an invisible
 * pseudo-element stretches it to 44px tall (and a little wider) around the
 * track, which is what a thumb on a phone needs. Give the row it sits in some
 * vertical room, or two switches stacked tight will share the overlap.
 */
function Switch({ className, size = "default", variant = "default", ...props }: SwitchProps) {
  const accent = variant === "accent";
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      data-variant={accent ? "accent" : undefined}
      className={cn(
        "peer group/switch relative inline-flex shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none",
        "after:absolute after:-inset-x-1.5 after:top-1/2 after:h-11 after:-translate-y-1/2 after:content-['']",
        "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50",
        "data-[size=default]:h-[1.15rem] data-[size=default]:w-8 data-[size=sm]:h-3.5 data-[size=sm]:w-6",
        "data-[state=checked]:bg-primary data-[state=unchecked]:bg-input dark:data-[state=unchecked]:bg-input/80",
        // 56×32 with the 20px thumb 5px in. The sizes are re-stated under the
        // size selectors so they replace the default track's rather than
        // losing to them on specificity.
        accent &&
          "border-0 px-1.25 shadow-none transition-[background-color,box-shadow] duration-(--duration-fast) ease-standard motion-reduce:transition-none data-[size=default]:h-8 data-[size=default]:w-14 data-[size=sm]:h-8 data-[size=sm]:w-14 data-[state=checked]:bg-surface-accent-green data-[state=unchecked]:bg-surface-inverse dark:data-[state=unchecked]:bg-surface-inverse",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block rounded-full bg-background ring-0 transition-transform group-data-[size=default]/switch:size-4 group-data-[size=sm]/switch:size-3 data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0 dark:data-[state=checked]:bg-primary-foreground dark:data-[state=unchecked]:bg-foreground",
          accent &&
            "bg-surface-primary duration-(--duration-base) ease-emphasized group-data-[size=default]/switch:size-5 group-data-[size=sm]/switch:size-5 data-[state=checked]:translate-x-6.5 motion-reduce:transition-none dark:data-[state=checked]:bg-surface-primary dark:data-[state=unchecked]:bg-surface-primary",
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
