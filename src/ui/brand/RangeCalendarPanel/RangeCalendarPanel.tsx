"use client";

import * as React from "react";
import { labelDayButton, useDayPicker, type DateRange } from "react-day-picker";

import { cn } from "../../../utils.js";
import { Calendar } from "../../primitives/Calendar/Calendar.js";
import type { CalendarProps } from "../../primitives/Calendar/Calendar.types.js";
import { Chip } from "../../primitives/Chip/Chip.js";
import { PanelFooter } from "../Panel/Panel.js";
import { ArrowLeftIcon, ArrowRightIcon } from "../ScribeIcons/ScribeIcons.js";
import { RangeCalendarDay } from "./RangeCalendarDay.js";
import type { RangeCalendarPanelProps } from "./RangeCalendarPanel.types.js";
import { completeRange, monthInRange, nextRange, sameRange } from "./RangeCalendarPanel.utils.js";

// The 202px grid of 100:43738 on Calendar's DayPicker. Every key Calendar
// styles is replaced, so nothing of the Tevvoice calendar shows through. The
// Figma calendar is an Inter kit scaled by 0.886; it is set here in Delight
// on the type ramp (12px month, 10px weekdays and days) and the 4px grid.
const NAV_BUTTON =
  "relative inline-flex size-4.5 cursor-pointer items-center justify-center rounded-full text-icon-ink outline-none transition-[background-color,opacity] duration-(--duration-fast) ease-standard after:absolute after:-inset-1.5 hover:bg-surface-subtle focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-30 aria-disabled:opacity-30 motion-reduce:transition-none";

const CLASS_NAMES: CalendarProps["classNames"] = {
  root: "w-full",
  months: "relative flex flex-col",
  month: "flex w-full flex-col gap-2.5",
  nav: "absolute inset-x-0 top-0 z-10 flex items-center justify-between",
  button_previous: NAV_BUTTON,
  button_next: NAV_BUTTON,
  month_caption: "flex h-4.5 items-center justify-center",
  caption_label: "text-label-12 text-content-primary select-none",
  month_grid: "flex w-full flex-col gap-1",
  weekdays: "flex w-full",
  weekday:
    "flex h-7.25 flex-1 items-center justify-center text-caption-10 font-normal text-content-primary select-none data-[weekend=true]:text-content-accent-coral",
  weeks: "flex w-full flex-col gap-1",
  week: "flex w-full",
  day: "relative flex-1 p-0 text-center select-none",
  day_button: "",
  selected: "",
  range_start: "",
  range_middle: "",
  range_end: "",
  today: "",
  outside: "",
  disabled: "",
  focused: "",
  hidden: "invisible",
};

const WEEKEND = [0, 6];

/** The weekday header, with Saturday and Sunday coral wherever the week starts. */
function Weekdays({ children, ...props }: React.HTMLAttributes<HTMLTableRowElement>) {
  const { dayPickerProps } = useDayPicker();
  const first = dayPickerProps.ISOWeek ? 1 : (dayPickerProps.weekStartsOn ?? 0);
  // Same markup as react-day-picker's own Weekdays: an aria-hidden head row
  // (each day button carries the full date in its accessible name). The
  // children start with a `false` where the week-number header would be, so
  // the column is counted over elements only.
  let column = 0;
  return (
    <thead aria-hidden="true">
      <tr {...props}>
        {React.Children.map(children, (child) => {
          if (!React.isValidElement<Record<string, unknown>>(child)) return child;
          const weekday = (first + column++) % 7;
          return React.cloneElement(child, {
            "data-weekend": WEEKEND.includes(weekday) ? "true" : undefined,
          });
        })}
      </tr>
    </thead>
  );
}

function Chevron({ orientation }: { orientation?: "up" | "down" | "left" | "right" }) {
  return orientation === "left" ? <ArrowLeftIcon /> : <ArrowRightIcon />;
}

/**
 * The date range picker that opens from the filter panel's date pill
 * (100:43738): month header with the two arrows, Sun–Sat with the weekend in
 * coral, a canvas band between ink ends, today bold, a green dot on days in
 * `markedDates`, preset chips, and discard / Save. Every other day is the
 * frame's muted grey; with `dimPastDays` only the days before `today` are,
 * and the days after it read ink.
 *
 * It edits a draft: nothing reaches the caller until Save. Put it in
 * `<PopoverContent variant="picker">`; it mounts fresh on every open.
 */
function RangeCalendarPanel({
  value,
  onSave,
  onDiscard,
  presets,
  markedDates,
  weekStartsOn = 0,
  locale,
  today,
  dimPastDays = false,
  labels,
  className,
  ...props
}: RangeCalendarPanelProps) {
  const [draft, setDraft] = React.useState<DateRange | undefined>(value);
  const [month, setMonth] = React.useState<Date>(
    () => value?.to ?? value?.from ?? today ?? new Date(),
  );

  const choosePreset = (range: DateRange | undefined) => {
    setDraft(range);
    if (range?.from && !monthInRange(month, range)) setMonth(range.to ?? range.from);
  };

  return (
    <div
      data-slot="range-calendar-panel"
      className={cn("flex w-50.5 flex-col gap-4", className)}
      {...props}
    >
      <Calendar
        mode="range"
        selected={draft}
        onSelect={(_, day) => setDraft((current) => nextRange(current, day))}
        month={month}
        onMonthChange={setMonth}
        weekStartsOn={weekStartsOn}
        locale={locale}
        today={today}
        showOutsideDays={false}
        modifiers={{
          weekend: { dayOfWeek: WEEKEND },
          marked: markedDates ?? [],
          // Past and future told apart: only the days after today read ink.
          ...(dimPastDays ? { future: { after: today ?? new Date() } } : {}),
        }}
        className="w-full bg-transparent p-0"
        classNames={CLASS_NAMES}
        components={{ DayButton: RangeCalendarDay, Weekdays, Chevron }}
        formatters={{
          formatWeekdayName: (weekday, options, dateLib) =>
            dateLib ? dateLib.format(weekday, "ccc") : weekday.toDateString().slice(0, 3),
        }}
        labels={{
          labelPrevious: () => labels?.previousMonth ?? "Previous month",
          labelNext: () => labels?.nextMonth ?? "Next month",
          labelDayButton: (date, modifiers, options, dateLib) => {
            const name = labelDayButton(date, modifiers, options, dateLib);
            return modifiers.marked && labels?.marked ? `${name}, ${labels.marked}` : name;
          },
        }}
      />

      {presets?.length ? (
        <div
          role="group"
          aria-label={labels?.presets ?? "Presets"}
          data-slot="range-calendar-presets"
          className="flex flex-wrap gap-1"
        >
          {presets.map((preset) => (
            <Chip
              key={preset.label}
              size="xs"
              selected={sameRange(draft, preset.range)}
              onClick={() => choosePreset(preset.range)}
            >
              {preset.label}
            </Chip>
          ))}
        </div>
      ) : null}

      <PanelFooter
        labels={labels}
        onDiscard={() => {
          setDraft(value);
          onDiscard?.();
        }}
        onSave={() => onSave(completeRange(draft))}
      />
    </div>
  );
}

export { RangeCalendarPanel };
