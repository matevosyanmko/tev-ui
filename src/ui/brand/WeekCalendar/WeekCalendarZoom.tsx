"use client";

import { Slider as SliderPrimitive } from "radix-ui";

import { cn } from "../../../utils.js";
import type { WeekCalendarZoomProps } from "./WeekCalendar.types.js";

/**
 * The "0% ●—— 100%" pill Figma floats in the grid's bottom-right corner
 * (node 100:40267). Pass it to `WeekCalendar` as `children` and wire both to
 * the same number:
 *
 *   <WeekCalendar zoom={zoom} onZoomChange={setZoom} …>
 *     <WeekCalendarZoom value={zoom} onValueChange={setZoom} />
 *   </WeekCalendar>
 *
 * A Radix slider underneath, so arrow keys, Home / End and Page keys work.
 */
function WeekCalendarZoom({ value, onValueChange, step = 1, labels, className }: WeekCalendarZoomProps) {
  return (
    <div
      data-slot="week-calendar-zoom"
      className={cn(
        "inline-flex h-8 items-center gap-2.5 rounded-full border-1.7 border-stroke-ink bg-surface-subtle px-5",
        "text-content-primary",
        className,
      )}
    >
      {/* Type on the captions, not the root: cn's tailwind-merge reads
          `text-heading-12` as a colour and would drop it next to one. */}
      <span aria-hidden data-slot="week-calendar-zoom-min" className="text-heading-12 leading-normal">
        {labels?.min ?? "0%"}
      </span>
      <SliderPrimitive.Root
        data-slot="week-calendar-zoom-slider"
        min={0}
        max={100}
        step={step}
        value={[value]}
        onValueChange={([next]) => {
          if (next !== undefined) onValueChange(next);
        }}
        className="relative flex h-3.5 w-11.25 touch-none items-center select-none"
      >
        <SliderPrimitive.Track
          data-slot="week-calendar-zoom-track"
          className="relative h-0.5 grow rounded-full bg-stroke-ink"
        />
        <SliderPrimitive.Thumb
          data-slot="week-calendar-zoom-thumb"
          aria-label={labels?.slider ?? "Zoom"}
          className={cn(
            "block size-3.5 rounded-full border-2 border-stroke-ink bg-surface-primary outline-none",
            "transition-shadow duration-(--duration-fast) ease-standard motion-reduce:transition-none",
            "focus-visible:ring-3 focus-visible:ring-ring/50",
          )}
        />
      </SliderPrimitive.Root>
      <span aria-hidden data-slot="week-calendar-zoom-max" className="text-heading-12 leading-normal">
        {labels?.max ?? "100%"}
      </span>
    </div>
  );
}

export { WeekCalendarZoom };
