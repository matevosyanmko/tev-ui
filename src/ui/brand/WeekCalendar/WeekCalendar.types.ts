import type * as React from "react";

/**
 * One meeting on the grid. `data` rides along untouched and comes back in
 * `renderEvent` and `onEventClick`, so the app keeps its own domain type.
 */
export interface WeekCalendarEvent<TData = unknown> {
  id: string;
  start: Date | string;
  end: Date | string;
  data?: TData;
}

/** The visible range. `end` is exclusive: midnight after the last day. */
export interface WeekCalendarRange {
  start: Date;
  end: Date;
}

/** The two lines of a day column's header: "21" over "MO". */
export interface WeekCalendarDayLabel {
  day: string;
  weekday: string;
}

/** What a `ref` on `WeekCalendar` gets. */
export interface WeekCalendarHandle {
  /** Scrolls the grid so `time` ("HH:mm") sits at its top edge, e.g. a "now" button. */
  scrollToTime: (time: string) => void;
}

export interface WeekCalendarProps<TData = unknown> {
  /** Any day inside the range to show. Controlled: change it to page. */
  date: Date;
  /** `week` shows seven days, `day` one; the app switches to `day` below `lg`. */
  view?: "week" | "day";
  events: WeekCalendarEvent<TData>[];
  /**
   * The card inside an event's slot. The calendar only sizes and positions the
   * slot; the card fills it. Memoize it: a new function re-renders every card.
   */
  renderEvent: (event: WeekCalendarEvent<TData>) => React.ReactNode;
  /** Fires for a click (or Enter / Space) anywhere inside a card. */
  onEventClick?: (event: WeekCalendarEvent<TData>, nativeEvent: MouseEvent) => void;
  /** Fires on mount and whenever the visible range changes. */
  onRangeChange?: (range: WeekCalendarRange) => void;
  /**
   * Row density, 0–100: 0 is the compact grid, 100 the one Figma draws.
   * Changes animate. Defaults to 100.
   */
  zoom?: number;
  /** Fires for pinch / Ctrl + wheel over the grid. Pair with `WeekCalendarZoom`. */
  onZoomChange?: (zoom: number) => void;
  /** The outlined column. Defaults to today. */
  selectedDate?: Date;
  /** 0 = Sunday, 1 = Monday (the default, as drawn). Pass the locale's. */
  firstDay?: number;
  /**
   * The pill above the hour column, e.g. "GMT+4". Defaults to the browser's
   * own offset in `locale`; an empty string hides the pill.
   */
  timeZoneLabel?: string;
  /** BCP-47 tag for the default day and hour labels. Defaults to "en-US". */
  locale?: string;
  /** Overrides the day header text. Default: `21` / `MO` from `locale`. */
  formatDayHeader?: (date: Date) => WeekCalendarDayLabel;
  /** Overrides the hour column text. Default: `1AM`, or `01:00` in 24-hour locales. */
  formatHour?: (date: Date) => string;
  /** The green dot and line at the current time, in today's column. Default on. */
  nowIndicator?: boolean;
  /**
   * "HH:mm" to scroll to on mount and whenever it changes, e.g. an hour
   * before now. Paging keeps the scroll position.
   */
  scrollToTime?: string;
  className?: string;
  /** Floating controls, placed where Figma draws the zoom pill. */
  children?: React.ReactNode;
}

export interface WeekCalendarZoomProps {
  /** 0–100, the same number `WeekCalendar` takes as `zoom`. */
  value: number;
  onValueChange: (value: number) => void;
  step?: number;
  /** End captions and the slider's accessible name. */
  labels?: { min?: string; max?: string; slider?: string };
  className?: string;
}
