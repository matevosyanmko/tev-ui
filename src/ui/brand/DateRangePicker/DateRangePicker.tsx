"use client";

import * as React from "react";
import dayjs from "dayjs";
import { ChevronDown } from "lucide-react";

import { Button } from "../../primitives/Button/Button.js";
import { Popover, PopoverContent, PopoverTrigger } from "../../primitives/Popover/Popover.js";
import { cn } from "../../../utils.js";
import { CustomRangePanel } from "./CustomRangePanel.js";
import { MonthGrid } from "./MonthGrid.js";
import { YearGrid } from "./YearGrid.js";
import { DEFAULT_MONTHS, MODES } from "./DateRangePicker.constants.js";
import type { DateMode, DateRangePickerProps } from "./DateRangePicker.types.js";

const MODE_FALLBACK: Record<DateMode, string> = {
  year: "Year",
  month: "Month",
  custom: "Custom",
};

/**
 * The global date filter: one trigger, three ways to choose a range.
 *
 * `mode` is the caller's state, not the picker's — a dashboard persists it
 * alongside the range so a reload comes back in the same mode, and the trigger
 * label depends on it ("Year: 2025" reads very differently from a raw range).
 *
 * Each mode's panel is only mounted while its mode is active, so switching
 * modes reseeds the panel's own draft state. That is deliberate: the custom
 * panel edits a *draft* range so Discard can mean something, and a draft left
 * over from a previous visit would silently overwrite the committed range.
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

  const now = dayjs();
  const months = labels?.months ?? DEFAULT_MONTHS;
  const selectedYear = String(value?.[0]?.year?.() ?? now.year());
  const selectedMonth = String(value?.[0]?.month?.() ?? now.month());
  const years = Array.from({ length: yearSpan + 1 }, (_, index) =>
    String(now.year() - yearSpan + index),
  ).reverse();

  const label = (() => {
    if (!value?.[0] || !value?.[1]) return labels?.selectRange ?? "Select a range";
    if (mode === "year") return value[0].format("YYYY");
    if (mode === "month") {
      return `${months[value[0].month()]} ${value[0].format("YYYY")}`;
    }
    return `${value[0].format("YYYY-MM-DD")} – ${value[1].format("YYYY-MM-DD")}`;
  })();

  const modeLabel = (target: DateMode) => labels?.[target] ?? MODE_FALLBACK[target];

  function handleYearSelect(nextYear: string) {
    const year = Number(nextYear);
    if (!Number.isFinite(year)) return;

    if (mode === "year") {
      const start = dayjs().year(year).startOf("year");
      onChange([start, start.endOf("year")]);
      setOpen(false);
      return;
    }
    // In month mode the year picker only moves the year; the month grid below
    // it stays open so the user can then pick the month.
    const month = value?.[0]?.month?.() ?? dayjs().month();
    const start = dayjs().year(year).month(month).startOf("month");
    onChange([start, start.endOf("month")]);
  }

  function handleMonthSelect(nextMonth: string) {
    const month = Number(nextMonth);
    if (!Number.isFinite(month)) return;
    const year = value?.[0]?.year?.() ?? dayjs().year();
    const start = dayjs().year(year).month(month).startOf("month");
    onChange([start, start.endOf("month")]);
  }

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
          "space-y-3 rounded-2xl border border-black/5 bg-popover p-4",
          mode === "custom" ? "w-fit max-w-[92vw]" : "w-90",
          contentClassName,
        )}
      >
        {/* A tint of the surface's own ink rather than `bg-muted`: this is an
            inset track on the popover, and it has to stay a shade of whatever
            the popover is — a palette where `--muted` is dark would otherwise
            invert it. */}
        <div className="grid grid-cols-3 gap-1 rounded-xl bg-black/5 p-1">
          {MODES.map((candidate) => (
            <button
              key={candidate}
              type="button"
              onClick={() => onModeChange?.(candidate)}
              data-active={mode === candidate || undefined}
              className={cn(
                "h-8 rounded-lg text-xs font-semibold transition-colors",
                mode === candidate
                  ? "bg-brand-purple text-brand-purple-foreground"
                  : "bg-transparent text-muted-foreground hover:text-popover-foreground",
              )}
            >
              {modeLabel(candidate)}
            </button>
          ))}
        </div>

        {mode === "year" ? (
          <YearGrid years={years} selected={selectedYear} onSelect={handleYearSelect} />
        ) : null}

        {mode === "month" ? (
          <MonthGrid
            years={years}
            selectedYear={selectedYear}
            selectedMonth={selectedMonth}
            months={months}
            yearLabel={labels?.year ?? MODE_FALLBACK.year}
            onYearSelect={handleYearSelect}
            onMonthSelect={handleMonthSelect}
          />
        ) : null}

        {mode === "custom" ? (
          <CustomRangePanel
            value={value}
            onChange={onChange}
            onClose={() => setOpen(false)}
            labels={labels}
          />
        ) : null}
      </PopoverContent>
    </Popover>
  );
}

export { DateRangePicker };
