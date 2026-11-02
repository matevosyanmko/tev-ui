/*
 * Pure range helpers for RangeCalendarPanel. Their own module because they
 * are not components, so RangeCalendarPanel.tsx stays a Fast Refresh
 * boundary. Days compare by calendar date in local time; the time of day is
 * ignored throughout.
 */
import type { DateRange } from "react-day-picker";

export function sameDay(a: Date | undefined, b: Date | undefined): boolean {
  if (!a || !b) return a === b;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/** Two ranges select the same days; `undefined` (no limit) only equals itself. */
export function sameRange(a: DateRange | undefined, b: DateRange | undefined): boolean {
  if (!a || !b) return a === b;
  return sameDay(a.from, b.from) && sameDay(a.to ?? a.from, b.to ?? b.from);
}

/**
 * The draft after a click on `day`: a first click starts a range, a second
 * one closes it (in either order), and a click on a finished range starts
 * over from that day.
 */
export function nextRange(current: DateRange | undefined, day: Date): DateRange {
  if (!current?.from || current.to) return { from: day, to: undefined };
  return day < current.from ? { from: day, to: current.from } : { from: current.from, to: day };
}

/** A range with only a start is that one day. */
export function completeRange(range: DateRange | undefined): DateRange | undefined {
  if (!range?.from) return undefined;
  return { from: range.from, to: range.to ?? range.from };
}

/** Whether `month` (any day in it) falls inside `range`, by month. */
export function monthInRange(month: Date, range: DateRange): boolean {
  if (!range.from) return false;
  const key = (d: Date) => d.getFullYear() * 12 + d.getMonth();
  const m = key(month);
  return m >= key(range.from) && m <= key(range.to ?? range.from);
}
