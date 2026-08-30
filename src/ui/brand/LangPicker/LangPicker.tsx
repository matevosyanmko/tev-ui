"use client";

import { ChevronUp } from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "../../primitives/Popover/Popover.js";
import { cn } from "../../../utils.js";
import type { LangPickerProps } from "./LangPicker.types.js";

/**
 * The green language pill that sits at the foot of the sidebar and drops
 * *upwards*.
 *
 * Built on the Popover primitive rather than a hand-rolled portal: the
 * original measured the trigger on every open, positioned a fixed div by hand
 * and closed itself from a document mousedown listener — which meant no
 * keyboard support, no focus return, and no flip when the pill sat near the
 * viewport edge. Radix supplies all of that, and `--radix-popover-trigger-width`
 * keeps the panel exactly as wide as the pill, which is what the hand-rolled
 * version was measuring for.
 *
 * Only the languages the user is *not* currently in are listed; the trigger
 * itself shows the current one.
 */
function LangPicker({
  value,
  options,
  onChange,
  label = "Language",
  className,
  contentClassName,
}: LangPickerProps) {
  const current = options.find((option) => option.value === value);
  const others = options.filter((option) => option.value !== value);

  return (
    <Popover>
      <PopoverTrigger
        data-brand="lang-picker-trigger"
        aria-label={label}
        className={cn(
          "group flex w-18 items-center justify-center gap-1 rounded-[16px] py-2",
          "bg-brand-green text-[13px] font-bold text-brand-green-foreground",
          "transition-colors outline-none hover:bg-brand-purple-hover",
          className,
        )}
      >
        {current?.label ?? options[0]?.label}
        <ChevronUp
          size={11}
          aria-hidden="true"
          className="transition-transform group-data-[state=open]:rotate-180"
        />
      </PopoverTrigger>

      <PopoverContent
        side="top"
        align="start"
        sideOffset={6}
        data-brand="lang-picker-content"
        className={cn(
          "flex w-(--radix-popover-trigger-width) flex-col gap-1",
          "rounded-[12px] border-none bg-brand-green p-1.5 shadow-xl",
          contentClassName,
        )}
      >
        {others.map((option) => (
          <button
            key={option.value}
            type="button"
            data-brand="lang-picker-item"
            onClick={() => onChange(option.value)}
            className={cn(
              "w-full rounded-[8px] bg-white py-[7px] text-center text-[11px] font-bold",
              "text-brand-green-foreground transition-colors hover:bg-brand-purple-hover",
            )}
          >
            {option.label}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  );
}

export { LangPicker };
