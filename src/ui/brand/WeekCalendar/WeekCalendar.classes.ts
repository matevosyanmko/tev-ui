/*
 * The Tailwind classes WeekCalendar puts on FullCalendar v6's own markup,
 * through its classNames hooks and, where it has none, descendant selectors
 * scoped under our `data-slot="week-calendar"` root. Kept apart from the
 * component because a module exporting non-components breaks Fast Refresh.
 *
 * FullCalendar injects its stylesheet at runtime and unlayered, and an
 * unlayered rule beats every layered Tailwind utility whatever the
 * specificity. So a class that competes with one of its declarations carries
 * `!`. Its `--fc-*` custom properties need none: ours are set on our root and
 * inherited, which outranks its `:root` defaults.
 *
 * Geometry is Figma's (TevScribe-Product, node 100:40076, the 1440 frame):
 * 106 px hour column, 108 px header (day number 33.5 px from the top), hairline
 * grid with 5 px ticks where the lines meet the header and the hour column.
 */

/** The root: FullCalendar's variables answered with tokens, plus the overrides. */
export const ROOT_CLASSES = [
  "group/week-calendar relative isolate h-full min-h-0 bg-surface-primary text-content-primary",
  // Figma's grid is a 0.7 px stroke of stroke-muted: drawn as 1 px at 70 %,
  // the same ink at 1x and 2x.
  "[--fc-border-color:color-mix(in_srgb,var(--stroke-muted)_70%,transparent)]",
  "[--fc-page-bg-color:var(--surface-primary)]",
  "[--fc-today-bg-color:transparent] [--fc-now-indicator-color:var(--stroke-ink)]",
  "[--fc-event-bg-color:transparent] [--fc-event-border-color:transparent]",
  "[--fc-event-text-color:inherit] [--fc-small-font-size:1em]",
  // The hour column's width up to the first line, and the header's height
  // down to the grid's top line, on the spacing scale (64 / 106 px, 108 px).
  "[--week-calendar-axis:--spacing(16)] [--week-calendar-header:--spacing(27)] lg:[--week-calendar-axis:--spacing(26.5)]",
  // Lines run between cells only: no outer frame, no section borders.
  "[&_.fc-scrollgrid]:border-0! [&_.fc-scrollgrid-section>*]:border-0!",
  // Header: no vertical lines; its bottom edge is the grid's top line, which
  // stops at the hour column, where a tick pokes 5 px into it.
  "[&_.fc-col-header_th]:border-x-transparent! [&_.fc-col-header_.fc-timegrid-axis]:border-b-transparent!",
  "[&_.fc-col-header_.fc-timegrid-axis]:relative [&_.fc-col-header_.fc-timegrid-axis]:after:absolute",
  "[&_.fc-col-header_.fc-timegrid-axis]:after:-bottom-px [&_.fc-col-header_.fc-timegrid-axis]:after:right-0",
  "[&_.fc-col-header_.fc-timegrid-axis]:after:h-px [&_.fc-col-header_.fc-timegrid-axis]:after:w-1.25",
  "[&_.fc-col-header_.fc-timegrid-axis]:after:bg-(--fc-border-color)",
  "[&_.fc-col-header-cell-cushion]:block! [&_.fc-col-header-cell-cushion]:p-0!",
  // Hour column: labels, no lines. Rows take the (animated) zoom height.
  "[&_.fc-timegrid-slot-label]:border-transparent! [&_.fc-timegrid-slot-label-cushion]:p-0!",
  "[&_.fc-timegrid-slot]:h-(--week-calendar-hour-height)!",
  // Cards span their column edge to edge; the now dot overhangs its column.
  "[&_.fc-timegrid-col-events]:m-0! [&_.fc-timegrid-now-indicator-container]:overflow-visible!",
  // The native scrollbar gives way to the drawn indicator.
  "[&_.fc-scroller]:[scrollbar-width:none] [&_.fc-scroller::-webkit-scrollbar]:hidden",
].join(" ");

/**
 * Content that arrives with a new range: fades in, sliding the way the range
 * moved (`data-direction` on the root). The grid lines stay put.
 */
export const ENTER_CLASSES = [
  "animate-in fade-in-0 duration-(--duration-base) ease-standard motion-reduce:animate-none",
  "group-data-[direction=forward]/week-calendar:slide-in-from-right-3",
  "group-data-[direction=backward]/week-calendar:slide-in-from-left-3",
].join(" ");

/** Every day header cell: the 5 px tick where its left line meets the grid. */
export const DAY_HEADER_CLASSES = [
  "relative p-0! align-top",
  "after:pointer-events-none after:absolute after:bottom-0 after:-left-px after:h-1.25 after:w-px",
  "after:bg-(--fc-border-color)",
].join(" ");

/** The selected day's header: the outline's rounded top, over the canvas fill. */
export const DAY_HEADER_SELECTED_CLASSES = [
  "before:pointer-events-none before:absolute before:-inset-x-px before:top-0 before:-bottom-px before:-z-10",
  "before:rounded-t-20 before:border-2 before:border-b-0 before:border-stroke-ink before:bg-surface-subtle",
  "before:animate-in before:fade-in-0 before:duration-(--duration-base) before:ease-standard",
  "motion-reduce:before:animate-none",
].join(" ");

/**
 * The selected day's column: canvas fill, then the outline's sides, both under
 * the grid lines as Figma stacks them (negative z inside the time grid body's
 * stacking context paints before the cells' borders).
 */
export const DAY_COLUMN_SELECTED_CLASSES = [
  "relative before:pointer-events-none before:absolute before:inset-0 before:-z-20 before:bg-surface-subtle",
  "after:pointer-events-none after:absolute after:-inset-x-px after:inset-y-0 after:-z-10",
  "after:border-x-2 after:border-stroke-ink",
  "after:animate-in after:fade-in-0 after:duration-(--duration-base) after:ease-standard",
  "motion-reduce:after:animate-none",
].join(" ");

/** Every hour label cell: the 5 px tick where its top line meets the hour column. */
export const SLOT_LABEL_CLASSES = [
  "relative",
  "after:pointer-events-none after:absolute after:-top-px after:right-0 after:h-px after:w-1.25",
  "after:bg-(--fc-border-color)",
].join(" ");

/** FullCalendar's event box, emptied so the app's card is all that shows. */
export const EVENT_CLASSES = [
  "bg-transparent! border-0! rounded-none! shadow-none! mb-0! [&_.fc-event-main]:p-0!",
  ENTER_CLASSES,
].join(" ");

/**
 * The now line: under the cards (Figma hides it behind the ongoing one), while
 * the dot inside it sits over them.
 */
export const NOW_LINE_CLASSES = "z-auto!";
