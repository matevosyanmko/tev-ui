import type * as React from "react";
import type { DateRange } from "react-day-picker";

import type { CalendarProps } from "../../primitives/Calendar/Calendar.types.js";

export type { DateRange };

export interface RangeCalendarPreset {
  /** The chip text: "All Time", "In 2026", "This month". */
  label: string;
  /** The range the chip selects; `undefined` is no limit (All Time). */
  range: DateRange | undefined;
}

export interface RangeCalendarPanelProps extends Omit<React.ComponentProps<"div">, "children"> {
  /** The committed range the panel opens on. Editing happens on a draft until Save. */
  value?: DateRange;
  /** Save: the draft, with a lone start day completed to a one-day range. */
  onSave: (range: DateRange | undefined) => void;
  /** discard: the draft is dropped; close the popover here. */
  onDiscard?: () => void;
  /** Preset chips under the calendar; the one matching the draft shows selected. */
  presets?: RangeCalendarPreset[];
  /** Days that get the green dot (days with meetings). */
  markedDates?: Date[];
  /**
   * First column of the week. Defaults to Sunday (0), as this picker is drawn
   * (100:43738) — unlike the week calendar, which starts on Monday.
   */
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /** A react-day-picker / date-fns locale: month and weekday names. */
  locale?: CalendarProps["locale"];
  /** Which day counts as today (bold). Defaults to now. */
  today?: Date;
  /**
   * Tell past from future relative to `today`: the days before it stay the
   * muted grey, the days after it are ink (today stays bold ink). The range,
   * the band and the coral weekends keep precedence over both. Off by
   * default, where every plain day is the muted grey.
   */
  dimPastDays?: boolean;
  labels?: {
    discard?: string;
    save?: string;
    previousMonth?: string;
    nextMonth?: string;
    /** Appended to a marked day's accessible name: "has meetings". */
    marked?: string;
    /** Accessible name of the preset chip group. */
    presets?: string;
  };
}
