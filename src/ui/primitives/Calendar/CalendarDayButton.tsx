import * as React from "react";
import { getDefaultClassNames, type DayButtonProps } from "react-day-picker";

import { cn } from "../../../utils.js";
import { Button } from "../Button/Button.js";
// Brand day states (see Figma "Date Picker"): selected — including a range's
// start and end — is solid brand purple; hover and the in-range middle use the
// soft purple tint.
//
// Hover states are paired with a literal `dark:` twin. The app always carries
// `dark` on <html> (src/main.jsx), so the ghost Button's `dark:hover:bg-accent/50`
// and `dark:hover:text-accent-foreground` outrank a bare `hover:` rule. Matching
// the variant lets tailwind-merge drop those defaults, and keeps the state-specific
// hovers a notch above the plain one. Every class must be written out in full —
// Tailwind scans source text, so a `dark:` prefix built at runtime compiles to
// nothing.
const BRAND_DAY_STATES = [
  // Hover on an otherwise plain day.
  "hover:bg-brand-purple-soft dark:hover:bg-brand-purple-soft",
  "hover:text-brand-purple dark:hover:text-brand-purple",
  // Selected single day, and the two ends of a range.
  "data-[selected-single=true]:bg-brand-purple data-[selected-single=true]:text-brand-purple-foreground data-[selected-single=true]:font-semibold",
  "data-[range-start=true]:bg-brand-purple data-[range-start=true]:text-brand-purple-foreground data-[range-start=true]:font-semibold",
  "data-[range-end=true]:bg-brand-purple data-[range-end=true]:text-brand-purple-foreground data-[range-end=true]:font-semibold",
  // Those keep their fill while hovered.
  "data-[selected-single=true]:hover:bg-brand-purple dark:data-[selected-single=true]:hover:bg-brand-purple",
  "data-[selected-single=true]:hover:text-brand-purple-foreground dark:data-[selected-single=true]:hover:text-brand-purple-foreground",
  "data-[range-start=true]:hover:bg-brand-purple dark:data-[range-start=true]:hover:bg-brand-purple",
  "data-[range-start=true]:hover:text-brand-purple-foreground dark:data-[range-start=true]:hover:text-brand-purple-foreground",
  "data-[range-end=true]:hover:bg-brand-purple dark:data-[range-end=true]:hover:bg-brand-purple",
  "data-[range-end=true]:hover:text-brand-purple-foreground dark:data-[range-end=true]:hover:text-brand-purple-foreground",
  // Days between the two ends.
  "data-[range-middle=true]:bg-brand-purple-soft data-[range-middle=true]:text-brand-purple",
  "data-[range-middle=true]:hover:bg-brand-purple-soft dark:data-[range-middle=true]:hover:bg-brand-purple-soft",
  "data-[range-middle=true]:hover:text-brand-purple dark:data-[range-middle=true]:hover:text-brand-purple",
].join(" ");

function CalendarDayButton({ className, day, modifiers, ...props }: DayButtonProps) {
  const defaultClassNames = getDefaultClassNames();

  const ref = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        "flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 rounded-lg leading-none font-normal group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-[3px] group-data-[focused=true]/day:ring-ring/50 data-[range-middle=true]:rounded-none [&>span]:text-xs [&>span]:opacity-70",
        // Range ends sit flush against the in-between band: rounded on the outer
        // edge, square on the inner one. A one-day range is both ends at once, so
        // it keeps its full radius.
        "data-[range-start=true]:rounded-l-lg data-[range-start=true]:rounded-r-none",
        "data-[range-end=true]:rounded-l-none data-[range-end=true]:rounded-r-lg",
        "data-[range-start=true]:data-[range-end=true]:rounded-lg",
        BRAND_DAY_STATES,
        defaultClassNames.day,
        className,
      )}
      {...props}
    />
  );
}

export { CalendarDayButton };
