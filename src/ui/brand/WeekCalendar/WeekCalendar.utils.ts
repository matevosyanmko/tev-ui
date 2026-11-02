/*
 * WeekCalendar's pure helpers: the zoom-to-row-height map, the default
 * (Intl-based) labels, and a DOM lookup. They live outside the component
 * files because a module that exports anything but components is not a Fast
 * Refresh boundary.
 */
import type { WeekCalendarDayLabel } from "./WeekCalendar.types.js";

/**
 * Hour row heights in px. `drawn` is Figma's, measured on node 100:40076 (the
 * hour rows step 106.73 px: 1AM's line at y 156.82, 2AM's at 263.55, …);
 * `compact`, the zoom-0 density, is the common 48 px an hour.
 */
export const HOUR_HEIGHT = { compact: 48, drawn: 106.73 } as const;

/**
 * The smallest a card's slot gets, in px: the micro card's 8 px padding
 * around its 16 px chip row, plus its 1 px border. A 15-minute meeting still
 * shows its status chips at every zoom.
 */
export const EVENT_MIN_HEIGHT = 34;

export function clampZoom(zoom: number): number {
  if (!Number.isFinite(zoom)) return 100;
  return Math.min(100, Math.max(0, zoom));
}

/** Linear between the two densities, to 0.01 px. */
export function hourHeightForZoom(zoom: number): number {
  const { compact, drawn } = HOUR_HEIGHT;
  return Math.round((compact + ((drawn - compact) * clampZoom(zoom)) / 100) * 100) / 100;
}

const formatters = new Map<string, Intl.DateTimeFormat>();

function formatter(locale: string, options: Intl.DateTimeFormatOptions): Intl.DateTimeFormat {
  const key = `${locale}|${JSON.stringify(options)}`;
  let cached = formatters.get(key);
  if (!cached) {
    cached = new Intl.DateTimeFormat(locale, options);
    formatters.set(key, cached);
  }
  return cached;
}

/** "21" over "MO": the day of the month, and the short weekday cut to two letters. */
export function defaultFormatDayHeader(date: Date, locale: string): WeekCalendarDayLabel {
  const weekday = formatter(locale, { weekday: "short" }).format(date);
  return {
    day: formatter(locale, { day: "numeric" }).format(date),
    weekday: Array.from(weekday).slice(0, 2).join("").toLocaleUpperCase(locale),
  };
}

/** "1AM" where the locale uses a 12-hour clock, "01:00" where it uses 24. */
export function defaultFormatHour(date: Date, locale: string): string {
  const cycle = formatter(locale, { hour: "numeric" }).resolvedOptions().hourCycle;
  if (cycle === "h23" || cycle === "h24") {
    return formatter(locale, { hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(date);
  }
  return formatter(locale, { hour: "numeric" })
    .formatToParts(date)
    .filter((part) => !(part.type === "literal" && /^\s+$/.test(part.value)))
    .map((part) => part.value)
    .join("");
}

/** The browser's own offset, e.g. "GMT+4"; empty where Intl cannot say. */
export function defaultTimeZoneLabel(locale: string): string {
  try {
    return (
      formatter(locale, { timeZoneName: "shortOffset" })
        .formatToParts(new Date())
        .find((part) => part.type === "timeZoneName")?.value ?? ""
    );
  } catch {
    return "";
  }
}

/** A local calendar day as a comparable key. */
export function dayKey(date: Date): number {
  return date.getFullYear() * 10000 + date.getMonth() * 100 + date.getDate();
}

/** FullCalendar's scrolling body: the one liquid section of the time grid. */
export function findBodyScroller(root: HTMLElement | null): HTMLElement | null {
  return root?.querySelector<HTMLElement>(".fc-scrollgrid-section-liquid .fc-scroller") ?? null;
}
