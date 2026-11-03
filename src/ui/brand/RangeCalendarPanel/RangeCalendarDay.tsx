import * as React from "react";
import type { DayButtonProps } from "react-day-picker";

import { cn } from "../../../utils.js";

/*
 * Day states as drawn in 100:43738. Its own file because it owns this styling
 * contract, the way CalendarDayButton owns the Tevvoice one.
 *
 * Exactly one tone applies, chosen in JS rather than by stacking data-*
 * variants, so a weekend day inside a range is ink (as drawn) without
 * depending on which variant Tailwind happens to emit last:
 *   endpoint  the range's ends (and a lone start): ink fill, white numeral;
 *   middle    the days between: the canvas band, square, ink numeral;
 *   today     bold ink;
 *   weekend   coral;
 *   future    ink: a day after today, when the panel tells past from
 *             future (`dimPastDays`);
 *   plain     the frame's muted grey, ink on hover.
 */
const TONE = {
  endpoint: "bg-surface-inverse text-content-inverse hover:bg-surface-inverse/85",
  middle: "rounded-none bg-surface-subtle text-content-primary hover:bg-surface-neutral-subtle",
  today: "text-content-primary hover:bg-surface-subtle",
  weekend: "text-content-accent-coral hover:bg-surface-subtle",
  future: "text-content-primary hover:bg-surface-subtle",
  plain: "text-content-muted hover:bg-surface-subtle hover:text-content-primary",
} as const;

function RangeCalendarDay({ className, day, modifiers, children, ...props }: DayButtonProps) {
  const ref = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  const start = Boolean(modifiers.range_start);
  const end = Boolean(modifiers.range_end);
  const middle = Boolean(modifiers.range_middle);
  const endpoint = start || end || (Boolean(modifiers.selected) && !middle);
  const tone = endpoint
    ? "endpoint"
    : middle
      ? "middle"
      : modifiers.today
        ? "today"
        : modifiers.weekend
          ? "weekend"
          : modifiers.future
            ? "future"
            : "plain";

  return (
    <button
      ref={ref}
      data-slot="range-calendar-day"
      data-day={day.isoDate}
      data-tone={tone}
      data-range-start={start || undefined}
      data-range-end={end || undefined}
      data-today={modifiers.today || undefined}
      className={cn(
        "relative flex h-7 w-full cursor-pointer items-center justify-center rounded-8 text-caption-10 outline-none",
        "transition-[color,background-color] duration-(--duration-fast) ease-standard motion-reduce:transition-none",
        "focus-visible:z-10 focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-40",
        TONE[tone],
        // A range's ends sit flush against the band: rounded outside only.
        start && !end && "rounded-r-none",
        end && !start && "rounded-l-none",
        modifiers.today && "font-semibold",
        className,
      )}
      {...props}
    >
      {children}
      {modifiers.marked ? (
        <span
          aria-hidden="true"
          data-slot="range-calendar-mark"
          className={cn(
            "absolute top-0.75 right-0.75 size-1 rounded-full bg-surface-accent-green",
            // On an ink end the dot keeps its white rim, as drawn.
            endpoint && "ring-1 ring-stroke-white",
          )}
        />
      ) : null}
    </button>
  );
}

export { RangeCalendarDay };
