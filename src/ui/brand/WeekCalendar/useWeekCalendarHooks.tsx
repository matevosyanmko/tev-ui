import * as React from "react";
import type {
  DayCellContentArg,
  DayHeaderContentArg,
  EventContentArg,
  NowIndicatorContentArg,
  SlotLabelContentArg,
} from "@fullcalendar/core";

import {
  DAY_COLUMN_SELECTED_CLASSES,
  DAY_HEADER_CLASSES,
  DAY_HEADER_SELECTED_CLASSES,
  NOW_LINE_CLASSES,
  SLOT_LABEL_CLASSES,
} from "./WeekCalendar.classes.js";
import type { WeekCalendarEvent, WeekCalendarProps } from "./WeekCalendar.types.js";
import { dayKey, defaultFormatDayHeader, defaultFormatHour } from "./WeekCalendar.utils.js";
import { WeekCalendarDayHeader, WeekCalendarHourLabel, WeekCalendarNowDot } from "./WeekCalendarParts.js";

/** The app's event, carried through FullCalendar in `extendedProps`. */
export const sourceOf = <TData,>(arg: { event: { extendedProps: Record<string, unknown> } }) =>
  arg.event.extendedProps.source as WeekCalendarEvent<TData>;

const nowIndicatorClassNames = (arg: NowIndicatorContentArg) => (arg.isAxis ? "hidden" : NOW_LINE_CLASSES);
const nowIndicatorContent = (arg: NowIndicatorContentArg) => (arg.isAxis ? null : <WeekCalendarNowDot />);

type HookInputs<TData> = Pick<
  WeekCalendarProps<TData>,
  "renderEvent" | "selectedDate" | "formatDayHeader" | "formatHour"
> & { locale: string; hourHeight: number };

/**
 * FullCalendar's content and classNames hooks, memoized: FullCalendar treats
 * a new function as a changed option and re-renders the whole grid for it.
 */
export function useWeekCalendarHooks<TData>({
  renderEvent,
  selectedDate,
  formatDayHeader,
  formatHour,
  locale,
  hourHeight,
}: HookInputs<TData>) {
  const selectedKey = selectedDate ? dayKey(selectedDate) : undefined;
  const isSelected = React.useCallback(
    (arg: { date: Date; isToday: boolean }) =>
      selectedKey === undefined ? arg.isToday : dayKey(arg.date) === selectedKey,
    [selectedKey],
  );

  const dayHeaderClassNames = React.useCallback(
    (arg: DayHeaderContentArg) =>
      isSelected(arg) ? `${DAY_HEADER_CLASSES} ${DAY_HEADER_SELECTED_CLASSES}` : DAY_HEADER_CLASSES,
    [isSelected],
  );
  const dayCellClassNames = React.useCallback(
    (arg: DayCellContentArg) => (isSelected(arg) ? DAY_COLUMN_SELECTED_CLASSES : ""),
    [isSelected],
  );
  // FullCalendar v6 re-measures its slot heights only when an option changes,
  // so this one takes a new identity with every animated height: that is what
  // carries the cards along while the rows grow or shrink.
  const slotLabelClassNames = React.useMemo(() => {
    void hourHeight;
    return () => SLOT_LABEL_CLASSES;
  }, [hourHeight]);

  const dayHeaderContent = React.useCallback(
    (arg: DayHeaderContentArg) => (
      <WeekCalendarDayHeader {...(formatDayHeader?.(arg.date) ?? defaultFormatDayHeader(arg.date, locale))} />
    ),
    [formatDayHeader, locale],
  );
  const slotLabelContent = React.useCallback(
    (arg: SlotLabelContentArg) => (
      <WeekCalendarHourLabel>{formatHour?.(arg.date) ?? defaultFormatHour(arg.date, locale)}</WeekCalendarHourLabel>
    ),
    [formatHour, locale],
  );
  const eventContent = React.useCallback(
    (arg: EventContentArg) => (
      <div data-slot="week-calendar-event" className="size-full">
        {renderEvent(sourceOf<TData>(arg))}
      </div>
    ),
    [renderEvent],
  );

  return {
    dayHeaderClassNames,
    dayHeaderContent,
    dayCellClassNames,
    slotLabelClassNames,
    slotLabelContent,
    eventContent,
    nowIndicatorClassNames,
    nowIndicatorContent,
  };
}
