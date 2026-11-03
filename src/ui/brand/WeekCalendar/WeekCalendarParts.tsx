import * as React from "react";

import { cn } from "../../../utils.js";
import { ENTER_CLASSES } from "./WeekCalendar.classes.js";
import type { WeekCalendarDayLabel } from "./WeekCalendar.types.js";
import { findBodyScroller } from "./WeekCalendar.utils.js";

/*
 * The pieces WeekCalendar hands FullCalendar's content hooks, and the two
 * overlays it draws over the grid itself. Internal: not re-exported.
 */

/** A day column's header: number over two-letter weekday. */
export function WeekCalendarDayHeader({ day, weekday }: WeekCalendarDayLabel) {
  return (
    <span
      data-slot="week-calendar-day"
      className={cn(
        "flex h-(--week-calendar-header) flex-col items-center pt-8.375 text-content-primary",
        ENTER_CLASSES,
      )}
    >
      <span data-slot="week-calendar-day-number" className="text-heading-28">
        {day}
      </span>
      <span data-slot="week-calendar-weekday" className="text-heading-12 leading-3.5 text-content-muted">
        {weekday}
      </span>
    </span>
  );
}

/**
 * An hour label, as wide as the hour column: FullCalendar sizes that column
 * from its labels' width (plus the cell's 1 px border), so this is what fixes it.
 * The label is the column's width less that border: the hairline comes off as
 * right padding (the text centres in what is left) and a matching negative
 * margin, so the cushion FullCalendar measures is a pixel narrower.
 */
export function WeekCalendarHourLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      data-slot="week-calendar-hour"
      className="-mr-px block w-(--week-calendar-axis) pr-px text-center text-heading-12 leading-normal text-content-primary"
    >
      {children}
    </span>
  );
}

/** The 9 px green dot on today's left line, centred on the now line. */
export function WeekCalendarNowDot() {
  return (
    <span
      data-slot="week-calendar-now-dot"
      className="absolute -top-1.25 -left-1.25 z-4 size-2.25 rounded-full border border-stroke-ink bg-surface-accent-green"
    />
  );
}

/** The grey pill above the hour column, bottom-aligned on the grid's top line. */
export function WeekCalendarTimeZone({ children }: { children: React.ReactNode }) {
  return (
    <div className="pointer-events-none absolute top-0 left-0 z-10 flex h-(--week-calendar-header) w-(--week-calendar-axis) items-end pb-px">
      <div
        data-slot="week-calendar-time-zone"
        className="flex h-9.75 w-full items-center justify-center rounded-full bg-surface-neutral-subtle text-heading-12 leading-normal text-content-primary"
      >
        {children}
      </div>
    </div>
  );
}

/**
 * The drawn scroll indicator on the right edge: a 4 px track with a fixed
 * thumb that travels with the scroll. Decorative; wheel, touch and keyboard
 * scrolling stay native. `measureKey` re-measures when the content height
 * changes without a scroll (zoom, view).
 */
export function WeekCalendarScrollbar({
  rootRef,
  measureKey,
}: {
  rootRef: React.RefObject<HTMLDivElement | null>;
  measureKey: unknown;
}) {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const thumbRef = React.useRef<HTMLDivElement>(null);

  const update = React.useCallback(() => {
    const track = trackRef.current;
    const thumb = thumbRef.current;
    const scroller = findBodyScroller(rootRef.current);
    if (!track || !thumb) return;
    const overflow = scroller ? scroller.scrollHeight - scroller.clientHeight : 0;
    track.hidden = !scroller || overflow < 1;
    if (!scroller || overflow < 1) return;
    const travel = track.clientHeight - thumb.offsetHeight;
    thumb.style.transform = `translateY(${(scroller.scrollTop / overflow) * travel}px)`;
  }, [rootRef]);

  React.useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    // `scroll` does not bubble, but it does reach a capturing listener, which
    // survives FullCalendar replacing its scroller on a view change.
    root.addEventListener("scroll", update, true);
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(update);
    observer?.observe(root);
    return () => {
      root.removeEventListener("scroll", update, true);
      observer?.disconnect();
    };
  }, [rootRef, update]);

  React.useLayoutEffect(update, [update, measureKey]);

  return (
    <div
      ref={trackRef}
      aria-hidden
      data-slot="week-calendar-scrollbar"
      // 13px under the header: an absolute box's top margin adds to its offset.
      className="pointer-events-none absolute top-(--week-calendar-header) right-0 bottom-3.5 z-10 mt-3.25 w-1 rounded-full bg-stroke-muted"
    >
      <div
        ref={thumbRef}
        data-slot="week-calendar-scrollbar-thumb"
        className="h-14.625 w-1 rounded-full bg-stroke-ink"
      />
    </div>
  );
}
