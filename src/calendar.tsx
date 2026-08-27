"use client"

import * as React from "react"
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react"
import {
  DayPicker,
  getDefaultClassNames,
  type DayButtonProps,
} from "react-day-picker";

import { cn } from "./utils"
import { Button } from "./button"
import { buttonVariants } from "./button-variants"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  /** Button variant used for the month navigation arrows. */
  buttonVariant?: React.ComponentProps<typeof Button>["variant"];
}) {
  const defaultClassNames = getDefaultClassNames()

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "bg-background group/calendar p-3 [--cell-size:--spacing(8)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString("default", { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root: cn("w-fit", defaultClassNames.root),
        months: cn("flex gap-4 flex-col md:flex-row relative", defaultClassNames.months),
        month: cn("flex flex-col w-full gap-4", defaultClassNames.month),
        nav: cn(
          "flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between",
          defaultClassNames.nav
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
          defaultClassNames.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
          defaultClassNames.button_next
        ),
        month_caption: cn(
          "flex items-center justify-center h-(--cell-size) w-full px-(--cell-size)",
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          "w-full flex items-center text-sm font-medium justify-center h-(--cell-size) gap-1.5",
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          "relative has-focus:border-ring border border-input has-focus:ring-ring/50 has-focus:ring-[3px] rounded-md",
          defaultClassNames.dropdown_root
        ),
        dropdown: cn("absolute bg-popover inset-0 opacity-0", defaultClassNames.dropdown),
        caption_label: cn("select-none font-medium", captionLayout === "label"
          ? "text-sm"
          : "rounded-md pl-2 pr-1 flex items-center gap-1 text-sm h-8 [&>svg]:text-muted-foreground [&>svg]:size-3.5", defaultClassNames.caption_label),
        table: "w-full border-collapse",
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn(
          "text-muted-foreground rounded-md flex-1 font-normal text-[0.8rem] select-none",
          defaultClassNames.weekday
        ),
        week: cn("flex w-full mt-2", defaultClassNames.week),
        week_number_header: cn("select-none w-(--cell-size)", defaultClassNames.week_number_header),
        week_number: cn(
          "text-[0.8rem] select-none text-muted-foreground",
          defaultClassNames.week_number
        ),
        day: cn(
          "relative w-full h-full p-0 text-center [&:last-child[data-selected=true]_button]:rounded-r-lg group/day aspect-square select-none",
          props.showWeekNumber
            ? "[&:nth-child(2)[data-selected=true]_button]:rounded-l-lg"
            : "[&:first-child[data-selected=true]_button]:rounded-l-lg",
          defaultClassNames.day
        ),
        range_start: cn("rounded-l-lg bg-brand-purple-soft", defaultClassNames.range_start),
        range_middle: cn("rounded-none bg-brand-purple-soft", defaultClassNames.range_middle),
        range_end: cn("rounded-r-lg bg-brand-purple-soft", defaultClassNames.range_end),
        today: cn(
          "text-brand-purple rounded-lg font-semibold data-[selected=true]:rounded-none data-[selected=true]:font-normal",
          defaultClassNames.today
        ),
        outside: cn(
          "text-muted-foreground aria-selected:text-muted-foreground",
          defaultClassNames.outside
        ),
        disabled: cn("text-muted-foreground opacity-50", defaultClassNames.disabled),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return (<div data-slot="calendar" ref={rootRef} className={cn(className)} {...props} />);
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") {
            return (<ChevronLeftIcon className={cn("size-4", className)} {...props} />);
          }

          if (orientation === "right") {
            return (<ChevronRightIcon className={cn("size-4", className)} {...props} />);
          }

          return (<ChevronDownIcon className={cn("size-4", className)} {...props} />);
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div
                className="flex size-(--cell-size) items-center justify-center text-center">
                {children}
              </div>
            </td>
          );
        },
        ...components,
      }}
      {...props} />
  );
}

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
].join(" ")

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: DayButtonProps) {
  const defaultClassNames = getDefaultClassNames()

  const ref = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

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
        "group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 leading-none font-normal group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] rounded-lg data-[range-middle=true]:rounded-none [&>span]:text-xs [&>span]:opacity-70",
        // Range ends sit flush against the in-between band: rounded on the outer
        // edge, square on the inner one. A one-day range is both ends at once, so
        // it keeps its full radius.
        "data-[range-start=true]:rounded-l-lg data-[range-start=true]:rounded-r-none",
        "data-[range-end=true]:rounded-r-lg data-[range-end=true]:rounded-l-none",
        "data-[range-start=true]:data-[range-end=true]:rounded-lg",
        BRAND_DAY_STATES,
        defaultClassNames.day,
        className
      )}
      {...props} />
  );
}

export { Calendar, CalendarDayButton }
