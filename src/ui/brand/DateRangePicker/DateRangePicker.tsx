"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

import { Button } from "../../primitives/Button/Button.js";
import { Popover, PopoverContent, PopoverTrigger } from "../../primitives/Popover/Popover.js";
import { cn } from "../../../utils.js";
import { DateRangePanel } from "./DateRangePanel.js";
import { DEFAULT_MONTHS, MODE_FALLBACK } from "./DateRangePicker.constants.js";
import type { DateMode, DateRangePickerProps } from "./DateRangePicker.types.js";

/**
 * The global date filter: one trigger, three ways to choose a range.
 *
 * `mode` is the caller's state, not the picker's — a dashboard persists it
 * alongside the range so a reload comes back in the same mode, and the trigger
 * label depends on it ("Year: 2025" reads very differently from a raw range).
 *
 * The popover's body is `DateRangePanel`, also exported on its own for a
 * surface where a popover doesn't fit.
 */
function DateRangePicker({
  value,
  onChange,
  mode = "custom",
  onModeChange,
  yearSpan = 10,
  labels,
  className,
  contentClassName,
}: DateRangePickerProps) {
  const [open, setOpen] = React.useState(false);

  const months = labels?.months ?? DEFAULT_MONTHS;

  const label = (() => {
    if (!value?.[0] || !value?.[1]) return labels?.selectRange ?? "Select a range";
    if (mode === "year") return value[0].format("YYYY");
    if (mode === "month") {
      return `${months[value[0].month()]} ${value[0].format("YYYY")}`;
    }
    return `${value[0].format("YYYY-MM-DD")} – ${value[1].format("YYYY-MM-DD")}`;
  })();

  const modeLabel = (target: DateMode) => labels?.[target] ?? MODE_FALLBACK[target];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-brand="date-range-picker-trigger"
          data-mode={mode}
          className={cn(
            "group h-full w-80 justify-start rounded-xl border-border/70",
            "bg-background/80 text-left font-normal transition-colors hover:bg-background",
            className,
          )}
        >
          <span className="flex-1 truncate">
            {mode === "custom" ? label : `${modeLabel(mode)}: ${label}`}
          </span>
          <ChevronDown
            size={11}
            aria-hidden="true"
            className="size-2.75 shrink-0 transition-transform group-data-[state=open]:rotate-180"
          />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        data-brand="date-range-picker-content"
        className={cn(
          "rounded-2xl border border-black/5 bg-popover p-4",
          mode === "custom" ? "w-fit max-w-[92vw]" : "w-90",
          // On a phone the custom panel can be taller than the room on either
          // side of its trigger (in a bottom sheet, say): scroll, not clip.
          "max-lg:max-h-(--radix-popover-content-available-height) max-lg:overflow-y-auto",
          contentClassName,
        )}
      >
        <DateRangePanel
          value={value}
          onChange={onChange}
          mode={mode}
          onModeChange={onModeChange}
          yearSpan={yearSpan}
          labels={labels}
          onClose={() => setOpen(false)}
        />
      </PopoverContent>
    </Popover>
  );
}

export { DateRangePicker };
