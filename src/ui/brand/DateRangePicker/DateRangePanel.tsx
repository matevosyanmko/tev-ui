"use client";

import dayjs from "dayjs";

import { cn } from "../../../utils.js";
import { CustomRangePanel } from "./CustomRangePanel.js";
import { MonthGrid } from "./MonthGrid.js";
import { YearGrid } from "./YearGrid.js";
import { DEFAULT_MONTHS, MODES, MODE_FALLBACK } from "./DateRangePicker.constants.js";
import type { DateRangePanelProps } from "./DateRangePicker.types.js";

/**
 * What `DateRangePicker` shows in its popover — the Year / Month / Custom
 * switch and the active mode's panel — as a component of its own, for a
 * surface where a popover is the wrong shape: a mobile bottom sheet, say,
 * where it would open squeezed above its trigger and scroll under the sheet's
 * scroll lock. Render it in-flow and treat `onClose` as "collapse".
 *
 * Each mode's panel is only mounted while its mode is active, so switching
 * modes reseeds the panel's own draft state. That is deliberate: the custom
 * panel edits a *draft* range so Discard can mean something, and a draft left
 * over from a previous visit would silently overwrite the committed range.
 */
function DateRangePanel({
  value,
  onChange,
  mode = "custom",
  onModeChange,
  yearSpan = 10,
  labels,
  onClose,
}: DateRangePanelProps) {
  const now = dayjs();
  const months = labels?.months ?? DEFAULT_MONTHS;
  const selectedYear = String(value?.[0]?.year?.() ?? now.year());
  const selectedMonth = String(value?.[0]?.month?.() ?? now.month());
  const years = Array.from({ length: yearSpan + 1 }, (_, index) =>
    String(now.year() - yearSpan + index),
  ).reverse();

  function handleYearSelect(nextYear: string) {
    const year = Number(nextYear);
    if (!Number.isFinite(year)) return;

    if (mode === "year") {
      const start = dayjs().year(year).startOf("year");
      onChange([start, start.endOf("year")]);
      onClose();
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
    <div data-slot="date-range-panel" className="space-y-3">
      {/* A tint of the surface's own ink rather than `bg-muted`: this is an
          inset track on the panel, and it has to stay a shade of whatever
          surface it sits on — a palette where `--muted` is dark would
          otherwise invert it. */}
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
            {labels?.[candidate] ?? MODE_FALLBACK[candidate]}
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
        <CustomRangePanel value={value} onChange={onChange} onClose={onClose} labels={labels} />
      ) : null}
    </div>
  );
}

export { DateRangePanel };
