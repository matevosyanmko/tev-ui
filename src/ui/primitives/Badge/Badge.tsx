"use client";

import * as React from "react";
import { Slot } from "radix-ui";

import { cn } from "../../../utils.js";
import type { BadgeProps } from "./Badge.types.js";
import { badgeVariants } from "./Badge.variants.js";
import { useHugText } from "./useHugText.js";

function BadgeLabel({ children }: { children: string }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  useHugText(ref, children);
  return (
    <span ref={ref} data-slot="badge-label" className="min-w-0 wrap-break-word">
      {children}
    </span>
  );
}

// Each run of text becomes one label the badge can hug; elements beside it (a
// status dot, an icon) stay flex items of their own.
function labelTextRuns(children: React.ReactNode): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  let run = "";
  const flush = () => {
    if (run) out.push(<BadgeLabel key={`label-${out.length}`}>{run}</BadgeLabel>);
    run = "";
  };
  for (const child of React.Children.toArray(children)) {
    if (typeof child === "string" || typeof child === "number") {
      run += child;
    } else {
      flush();
      out.push(child);
    }
  }
  flush();
  return out;
}

function Badge({
  className,
  variant = "default",
  asChild = false,
  wrap = false,
  children,
  ...props
}: BadgeProps) {
  const Comp = asChild ? Slot.Root : "span";
  const wraps = wrap && !asChild;

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(
        badgeVariants({ variant }),
        wraps && "max-w-full text-center whitespace-normal",
        className,
      )}
      {...props}
    >
      {wraps ? labelTextRuns(children) : children}
    </Comp>
  );
}

export { Badge };
