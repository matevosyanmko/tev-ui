import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, waitFor } from "storybook/test";

import { cn } from "../../../utils";
import { Button } from "../../primitives/Button/Button";
import { ArrowLeftIcon, ArrowRightIcon } from "../ScribeIcons/ScribeIcons";
import { WeekCalendar } from "./WeekCalendar";
import { WeekCalendarZoom } from "./WeekCalendarZoom";
import type { WeekCalendarEvent, WeekCalendarProps } from "./WeekCalendar.types";

/* ---------------------------------------------------------------------------
 * Fixtures. The real micro card lives in the app; this stand-in is built from
 * tokens only, close enough to Figma's MeetMicro_* (nodes 100:43960 / 43975 /
 * 43987) to judge the slot it sits in.
 * ------------------------------------------------------------------------ */

type Status = "ongoing" | "upcoming" | "completed" | "failed";

interface Meeting {
  title: string;
  participants: string;
  status?: Status;
  statusLabel?: string;
}

const STATUS_TEXT: Record<Status, string> = {
  ongoing: "Ongoing",
  upcoming: "Upcoming",
  completed: "Completed",
  failed: "Failed",
};

const CHIP: Record<Status, string> = {
  ongoing: "bg-status-live text-status-live-foreground",
  upcoming: "bg-status-neutral text-status-neutral-foreground",
  completed: "bg-status-success text-status-success-foreground",
  failed: "bg-status-danger text-status-danger-foreground",
};

function statusOf(event: WeekCalendarEvent<Meeting>): Status {
  if (event.data?.status) return event.data.status;
  const now = Date.now();
  if (new Date(event.end).getTime() <= now) return "completed";
  if (new Date(event.start).getTime() > now) return "upcoming";
  return "ongoing";
}

function MicroCard({ event }: { event: WeekCalendarEvent<Meeting> }) {
  const meeting = event.data;
  const status = statusOf(event);
  const label = meeting?.statusLabel ?? STATUS_TEXT[status];
  return (
    <button
      type="button"
      data-status={status}
      aria-label={`${meeting?.title}, ${label}`}
      className={cn(
        "relative flex size-full flex-col justify-between overflow-hidden rounded-8 border border-stroke-muted p-2 text-left",
        "outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
        status === "completed" || status === "failed" ? "bg-surface-neutral-subtle" : "bg-surface-primary",
      )}
    >
      {status === "ongoing" ? <span aria-hidden className="absolute inset-x-0 top-0 h-[33px] bg-surface-inverse" /> : null}
      <span className="relative flex h-4 shrink-0 items-center">
        <span className="flex h-4 w-5 items-center justify-center rounded-10 bg-status-success text-micro-8 font-bold text-status-success-foreground">
          G
        </span>
        {/* Not cn(): tailwind-merge takes text-micro-6 for a colour and drops it. */}
        <span className={`flex h-4 items-center rounded-10 px-1.5 text-micro-6 font-semibold ${CHIP[status]}`}>{label}</span>
      </span>
      <span className="relative flex flex-col gap-1 text-content-primary">
        <span className="text-heading-12">{meeting?.title}</span>
        <span className="text-micro-6 underline">{meeting?.participants}</span>
      </span>
    </button>
  );
}

const renderMicroCard = (event: WeekCalendarEvent<Meeting>) => <MicroCard event={event} />;

const NOW = new Date();

function mondayOf(date: Date) {
  const day = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  day.setDate(day.getDate() - ((day.getDay() + 6) % 7));
  return day;
}

const WEEK = mondayOf(NOW);

function at(dayOffset: number, hour: number, minute = 0) {
  const d = new Date(WEEK);
  d.setDate(d.getDate() + dayOffset);
  d.setHours(hour, minute, 0, 0);
  return d;
}

const minutesFromNow = (minutes: number) => new Date(NOW.getTime() + minutes * 60_000);

const meeting = (title: string, people: number, extra?: Partial<Meeting>): Meeting => ({
  title,
  participants: `${people} Participants`,
  ...extra,
});

/** A realistic week around today: overlaps, a 15-minute call, one live now. */
const THIS_WEEK: WeekCalendarEvent<Meeting>[] = [
  { id: "standup", start: at(0, 9), end: at(0, 10), data: meeting("Standup sync", 6) },
  { id: "design", start: at(0, 9, 30), end: at(0, 10, 30), data: meeting("Design review", 4) },
  { id: "vendor", start: at(0, 13), end: at(0, 14), data: meeting("Vendor onboarding", 3, { status: "failed" }) },
  { id: "product", start: at(1, 11), end: at(1, 12, 30), data: meeting("Product discussion", 10) },
  { id: "check-in", start: at(2, 10), end: at(2, 10, 15), data: meeting("Quick check-in", 2) },
  { id: "hiring", start: at(2, 10), end: at(2, 11), data: meeting("Hiring loop", 3) },
  { id: "planning", start: at(3, 14), end: at(3, 15, 30), data: meeting("Quarterly planning", 12) },
  { id: "customer", start: at(4, 16), end: at(4, 17), data: meeting("Customer call", 5) },
  { id: "live", start: minutesFromNow(-25), end: minutesFromNow(35), data: meeting("Weekly sync", 8) },
  { id: "later", start: minutesFromNow(120), end: minutesFromNow(180), data: meeting("Roadmap review", 7) },
];

const pad = (n: number) => String(n).padStart(2, "0");
const AN_HOUR_BEFORE_NOW = `${pad(Math.max(0, NOW.getHours() - 1))}:00`;

/*
 * The four cards Figma draws, in the same slots. Figma labels the week
 * "21 MO … 27 SU" under a 22.04.2026 toolbar, but 21 April 2026 is a Tuesday;
 * 21–27 September 2026 is the real week with those numbers on those days.
 */
const day = (date: number, hour: number, minute = 0) => new Date(2026, 8, date, hour, minute);
const AS_DRAWN: WeekCalendarEvent<Meeting>[] = [
  { id: "a", start: day(21, 1), end: day(21, 2), data: meeting("Product discussion", 10, { status: "completed" }) },
  { id: "b", start: day(22, 3), end: day(22, 4), data: meeting("Product discussion", 10, { status: "ongoing" }) },
  { id: "c", start: day(21, 4, 15), end: day(21, 5, 42), data: meeting("Product discussion", 10, { status: "failed" }) },
  { id: "d", start: day(24, 4), end: day(24, 5), data: meeting("Product discussion", 10, { status: "upcoming" }) },
];

/* ---------------------------------------------------------------------------
 * Harness: the app's side, reduced to state. The toolbar is story-only chrome.
 * ------------------------------------------------------------------------ */

type HarnessProps = WeekCalendarProps<Meeting> & {
  frameClassName?: string;
  toolbar?: boolean;
  zoomPill?: boolean;
};

function Harness({ frameClassName, toolbar, zoomPill = true, ...props }: HarnessProps) {
  const [date, setDate] = React.useState(props.date);
  const [zoom, setZoom] = React.useState(props.zoom ?? 100);
  const step = props.view === "day" ? 1 : 7;
  const page = (days: number) =>
    setDate((d) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + days));
  const changeZoom = (next: number) => {
    setZoom(next);
    props.onZoomChange?.(next);
  };

  return (
    <div className="flex flex-col gap-4">
      {toolbar ? (
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setDate(new Date())}>
            Today
          </Button>
          <Button variant="outline" size="icon-sm" aria-label="Previous" onClick={() => page(-step)}>
            <ArrowLeftIcon />
          </Button>
          <Button variant="outline" size="icon-sm" aria-label="Next" onClick={() => page(step)}>
            <ArrowRightIcon />
          </Button>
        </div>
      ) : null}
      <div className={cn("h-[800px] w-full", frameClassName)}>
        <WeekCalendar<Meeting> {...props} date={date} zoom={zoom} onZoomChange={changeZoom}>
          {zoomPill ? <WeekCalendarZoom value={zoom} onValueChange={changeZoom} /> : null}
        </WeekCalendar>
      </div>
    </div>
  );
}

const meta = {
  title: "Brand/WeekCalendar",
  component: WeekCalendar,
  parameters: { layout: "padded" },
  args: {
    date: NOW,
    events: THIS_WEEK,
    renderEvent: renderMicroCard as WeekCalendarProps["renderEvent"],
    scrollToTime: AN_HOUR_BEFORE_NOW,
    onEventClick: fn(),
    onRangeChange: fn(),
    onZoomChange: fn(),
  },
  render: (args) => <Harness {...(args as HarnessProps)} toolbar />,
} satisfies Meta<typeof WeekCalendar>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * This week, opened an hour before now: overlapping meetings share their
 * slot, the 15-minute check-in keeps its chip row, and the live meeting
 * straddles the now dot. Paging slides the days and cards; the lines stay.
 */
export const Week: Story = {
  play: async ({ args, canvas }) => {
    await userEvent.click(await canvas.findByRole("button", { name: /Quarterly planning/ }));
    await expect(args.onEventClick).toHaveBeenCalledWith(
      expect.objectContaining({ id: "planning" }),
      expect.anything(),
    );
    const before = (args.onRangeChange as ReturnType<typeof fn>).mock.calls.length;
    await userEvent.click(canvas.getByRole("button", { name: "Next" }));
    await waitFor(() => expect(args.onRangeChange).toHaveBeenCalledTimes(before + 1));
  },
};

/**
 * Figma's grid (node 100:40076) at its own size, 829 × 800: the 21–27 week,
 * Tuesday outlined, scrolled to 1AM. The zoom pill shows 100, the density
 * drawn (Figma parks the knob at 0%).
 */
export const AsDrawn: Story = {
  args: {
    date: day(22, 0),
    selectedDate: day(22, 0),
    events: AS_DRAWN,
    scrollToTime: "01:00",
    timeZoneLabel: "GMT+4",
  },
  render: (args) => <Harness {...(args as HarnessProps)} frameClassName="w-[829px]" />,
};

/** One day, as phones get it below `lg`. */
export const DayView: Story = {
  args: { view: "day" },
  render: (args) => <Harness {...(args as HarnessProps)} toolbar frameClassName="h-[700px] max-w-[375px]" />,
};

/** Zoom 0: the compact density, 48 px an hour. */
export const ZoomCompact: Story = { args: { zoom: 0 } };

/** Zoom 50: halfway, 78 px an hour. */
export const ZoomHalf: Story = { args: { zoom: 50 } };

/** Zoom 100: Figma's density, 107 px an hour. Drag the pill to watch the rows and cards animate. */
export const ZoomDrawn: Story = {
  args: { zoom: 100 },
  play: async ({ args, canvas }) => {
    const slider = await canvas.findByRole("slider", { name: "Zoom" });
    slider.focus();
    await userEvent.keyboard("{ArrowLeft}");
    await expect(args.onZoomChange).toHaveBeenCalledWith(99);
  },
};

/** A week with nothing booked: the grid, the outline and the now dot alone. */
export const EmptyWeek: Story = { args: { events: [] } };

const HY_WEEKDAYS = ["ԿԻՐ", "ԵՐԿ", "ԵՐՔ", "ՉՐՔ", "ՀՆԳ", "ՈՒՐ", "ՇԲԹ"];

/**
 * Armenian: the app passes `locale` plus its own label functions (the preview
 * browser ships no hy ICU data, so Intl alone would fall back to English).
 */
export const Armenian: Story = {
  args: {
    locale: "hy-AM",
    timeZoneLabel: "GMT+4",
    formatDayHeader: (date: Date) => ({ day: String(date.getDate()), weekday: HY_WEEKDAYS[date.getDay()] ?? "" }),
    formatHour: (date: Date) => `${pad(date.getHours())}:00`,
    events: THIS_WEEK.map((event) => ({
      ...event,
      data: {
        title: "Արտադրանքի քննարկում",
        participants: "10 մասնակից",
        statusLabel: { ongoing: "Ընթացիկ", upcoming: "Սպասվող", completed: "Ավարտված", failed: "Ձախողված" }[statusOf(event)],
        status: event.data?.status,
      },
    })),
  },
};
