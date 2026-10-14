"use client";

import * as React from "react";

import { cn } from "../../../utils.js";
import { Tooltip, TooltipContent, TooltipTrigger } from "../Tooltip/Tooltip.js";
import type { TruncatedTextProps } from "./TruncatedText.types.js";

/**
 * One line of text that ends in an ellipsis when it doesn't fit, and shows the
 * whole value in a tooltip on hover — only when it was actually cut, so text
 * that fits gets no tooltip at all. A block, so it fills (and is cut at) its
 * parent's width: a table cell, or a flex item beside an icon.
 */
function TruncatedText({ className, side = "top", children, ...props }: TruncatedTextProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const [open, setOpen] = React.useState(false);

  // Measured when the tooltip is about to open rather than on every resize:
  // the hover is the only moment the answer matters.
  const handleOpenChange = (next: boolean) => {
    const el = ref.current;
    setOpen(next && el !== null && el.scrollWidth > el.clientWidth);
  };

  return (
    <Tooltip open={open} onOpenChange={handleOpenChange}>
      <TooltipTrigger asChild>
        <span
          ref={ref}
          data-slot="truncated-text"
          className={cn("block min-w-0 truncate", className)}
          {...props}
        >
          {children}
        </span>
      </TooltipTrigger>
      {/* Ids, paths and emails have no spaces to wrap at. */}
      <TooltipContent side={side} className="wrap-anywhere">
        {children}
      </TooltipContent>
    </Tooltip>
  );
}

export { TruncatedText };
