"use client";

import * as React from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import type { DatesSetArg, EventClickArg, EventInput } from "@fullcalendar/core";

import { cn } from "../../../utils.js";
import { EVENT_CLASSES, ROOT_CLASSES } from "./WeekCalendar.classes.js";
import type { WeekCalendarHandle, WeekCalendarProps } from "./WeekCalendar.types.js";
import {
  EVENT_MIN_HEIGHT,
  clampZoom,
  defaultTimeZoneLabel,
  findBodyScroller,
  hourHeightForZoom,
} from "./WeekCalendar.utils.js";
import { WeekCalendarScrollbar, WeekCalendarTimeZone } from "./WeekCalendarParts.js";
import { useAnimatedHourHeight } from "./useAnimatedHourHeight.js";
import { sourceOf, useWeekCalendarHooks } from "./useWeekCalendarHooks.js";

const PLUGINS = [timeGridPlugin];
const VIEW_TYPE = { week: "timeGridWeek", day: "timeGridDay" } as const;

/**
 * The TevScribe week grid: FullCalendar v6's time grid, restyled to the
 * Figma screen (node 100:40076) and driven entirely by props.
 *
 * The app owns everything around it: the toolbar (today, prev/next, the view
 * switch) moves `date` and `view`; the cards come from `renderEvent`; the
 * zoom pill is a `WeekCalendarZoom` passed as `children`. The calendar lays
 * out the days, the hours and the cards' slots, keeps overlapping meetings
 * side by side, and animates paging and zoom with the motion tokens.
 */
function WeekCalendarInner<TData>(
  {
    date,
    view = "week",
    events,
    renderEvent,
    onEventClick,
    onRangeChange,
    zoom = 100,
    onZoomChange,
    selectedDate,
    firstDay = 1,
    timeZoneLabel,
    locale = "en-US",
    formatDayHeader,
    formatHour,
    nowIndicator = true,
    scrollToTime,
    className,
    children,
  }: WeekCalendarProps<TData>,
  ref: React.ForwardedRef<WeekCalendarHandle>,
) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const calendarRef = React.useRef<FullCalendar>(null);
  const api = () => calendarRef.current?.getApi();

  const targetHeight = hourHeightForZoom(zoom);
  const { probeRef, height: hourHeight } = useAnimatedHourHeight(targetHeight);

  const latest = React.useRef({ onEventClick, onRangeChange, onZoomChange, zoom });
  React.useLayoutEffect(() => {
    latest.current = { onEventClick, onRangeChange, onZoomChange, zoom };
  });

  React.useImperativeHandle(ref, () => ({ scrollToTime: (time) => api()?.scrollToTime(time) }), []);

  // Controlled date and view. The direction goes on the root before the new
  // cells mount, so they slide in from the side the range moved to.
  const dateMs = date.getTime();
  React.useLayoutEffect(() => {
    const calendar = api();
    const root = rootRef.current;
    if (!calendar || !root) return;
    const { currentStart, currentEnd } = calendar.view;
    const target = new Date(dateMs);
    const direction = target < currentStart ? "backward" : target >= currentEnd ? "forward" : undefined;
    if (direction) root.dataset.direction = direction;
    else delete root.dataset.direction;
    if (calendar.view.type !== VIEW_TYPE[view]) calendar.changeView(VIEW_TYPE[view], target);
    else if (direction) calendar.gotoDate(target);
  }, [dateMs, view]);

  // A frame late on purpose: FullCalendar applies `scrollTime` while mounting,
  // before React has rendered the header into it, so the body is still full
  // height and a late hour gets clamped short. By the next frame it is not.
  React.useEffect(() => {
    if (!scrollToTime) return;
    const frame = requestAnimationFrame(() => api()?.scrollToTime(scrollToTime));
    return () => cancelAnimationFrame(frame);
  }, [scrollToTime]);

  // Zooming keeps the time at the middle of the viewport where it was.
  const previousHeight = React.useRef(hourHeight);
  React.useLayoutEffect(() => {
    const previous = previousHeight.current;
    previousHeight.current = hourHeight;
    const scroller = findBodyScroller(rootRef.current);
    if (!scroller || previous === hourHeight) return;
    const middle = scroller.clientHeight / 2;
    scroller.scrollTop = ((scroller.scrollTop + middle) * hourHeight) / previous - middle;
  }, [hourHeight]);

  // FullCalendar only watches the window; follow our own box too (a sidebar
  // collapsing), and turn pinch / Ctrl + wheel into zoom.
  React.useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(() => api()?.updateSize());
    observer?.observe(root);
    const onWheel = (event: WheelEvent) => {
      const { onZoomChange: onZoom, zoom: current } = latest.current;
      if (!event.ctrlKey || !onZoom) return;
      event.preventDefault();
      onZoom(Math.round(clampZoom(current - event.deltaY / 2)));
    };
    root.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      observer?.disconnect();
      root.removeEventListener("wheel", onWheel);
    };
  }, []);

  const fcEvents = React.useMemo<EventInput[]>(
    () => events.map((event) => ({ id: event.id, start: event.start, end: event.end, extendedProps: { source: event } })),
    [events],
  );

  const hooks = useWeekCalendarHooks<TData>({ renderEvent, selectedDate, formatDayHeader, formatHour, locale, hourHeight });
  const eventClick = React.useCallback(
    (arg: EventClickArg) => latest.current.onEventClick?.(sourceOf<TData>(arg), arg.jsEvent),
    [],
  );
  const datesSet = React.useCallback(
    (arg: DatesSetArg) => latest.current.onRangeChange?.({ start: arg.start, end: arg.end }),
    [],
  );

  const zoneLabel = React.useMemo(() => timeZoneLabel ?? defaultTimeZoneLabel(locale), [timeZoneLabel, locale]);

  return (
    <div
      ref={rootRef}
      data-slot="week-calendar"
      data-view={view}
      className={cn(ROOT_CLASSES, className)}
      style={
        {
          "--week-calendar-hour-height": `${hourHeight}px`,
          "--week-calendar-hour-target": `${targetHeight}px`,
        } as React.CSSProperties
      }
    >
      <FullCalendar
        ref={calendarRef}
        plugins={PLUGINS}
        initialView={VIEW_TYPE[view]}
        initialDate={date}
        headerToolbar={false}
        height="100%"
        allDaySlot={false}
        slotDuration="01:00:00"
        slotEventOverlap={false}
        eventMinHeight={EVENT_MIN_HEIGHT}
        // The app's card is the focusable control; FullCalendar's wrapper
        // must not become a second tab stop around it.
        eventInteractive={false}
        firstDay={firstDay}
        locale={locale}
        nowIndicator={nowIndicator}
        {...(scrollToTime ? { scrollTime: scrollToTime } : {})}
        scrollTimeReset={false}
        events={fcEvents}
        eventClassNames={EVENT_CLASSES}
        eventClick={eventClick}
        datesSet={datesSet}
        {...hooks}
      />
      {zoneLabel ? <WeekCalendarTimeZone>{zoneLabel}</WeekCalendarTimeZone> : null}
      <WeekCalendarScrollbar rootRef={rootRef} measureKey={`${hourHeight}:${view}`} />
      {children ? (
        <div data-slot="week-calendar-controls" className="absolute right-3.5 bottom-3.25 z-20">
          {children}
        </div>
      ) : null}
      <div
        ref={probeRef}
        aria-hidden
        className="pointer-events-none invisible absolute top-0 left-0 h-(--week-calendar-hour-target) w-0 transition-[height] duration-(--duration-base) ease-standard motion-reduce:transition-none"
      />
    </div>
  );
}

/** Generic over the events' `data`, which `forwardRef` alone would erase. */
const WeekCalendar = React.forwardRef(WeekCalendarInner) as (<TData = unknown>(
  props: WeekCalendarProps<TData> & React.RefAttributes<WeekCalendarHandle>,
) => React.ReactElement | null) & { displayName?: string };
WeekCalendar.displayName = "WeekCalendar";

export { WeekCalendar };
