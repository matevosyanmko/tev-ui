import * as React from "react";

import { cn } from "../../../utils.js";
import { toMinutes } from "./TimeRangeWheel.utils.js";

/*
 * One wheel of TimeRangeWheel. Its own file because it owns the scroll and
 * keyboard contract: a scroll-snap column three 18px rows tall whose middle
 * row is the value, exposed as an ARIA spinbutton.
 *
 * Scrolling highlights the row under the middle as it passes and commits it
 * once the scroll settles (`scrollend`, or 120ms without a scroll event where
 * that is missing). A value set from outside (keys, a preset) scrolls to its
 * row with the CSS smooth behaviour, which `motion-reduce:scroll-auto` makes
 * instant; the first placement is always instant.
 */
interface TimeWheelColumnProps {
  options: string[];
  index: number;
  onIndexChange: (index: number) => void;
  label: string;
  /** Options per PageUp / PageDown: an hour. */
  pageStep: number;
}

function TimeWheelColumn({ options, index, onIndexChange, label, pageStep }: TimeWheelColumnProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const placed = React.useRef(false);
  const settle = React.useRef<number | undefined>(undefined);
  const [live, setLive] = React.useState(index);
  const last = options.length - 1;
  const clamp = (i: number) => Math.min(Math.max(i, 0), last);

  const rowHeight = () =>
    (ref.current?.firstElementChild as HTMLElement | null)?.offsetHeight || 18;

  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    setLive(index);
    const top = index * rowHeight();
    if (Math.abs(el.scrollTop - top) >= 1) {
      el.scrollTo({ top, behavior: placed.current ? "auto" : "instant" });
    }
    placed.current = true;
  }, [index]);

  // Read at settle time, which can come from a native listener.
  const latest = React.useRef({ index, onIndexChange, last });
  latest.current = { index, onIndexChange, last };

  const commit = React.useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const { index: current, onIndexChange: change, last: end } = latest.current;
    const i = Math.min(Math.max(Math.round(el.scrollTop / rowHeight()), 0), end);
    if (i !== current) change(i);
  }, []);

  // React 18 has no onScrollEnd; where the browser fires `scrollend`, commit
  // on it rather than on the timeout.
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onEnd = () => {
      window.clearTimeout(settle.current);
      commit();
    };
    el.addEventListener("scrollend", onEnd);
    return () => {
      el.removeEventListener("scrollend", onEnd);
      window.clearTimeout(settle.current);
    };
  }, [commit]);

  const onScroll = () => {
    const el = ref.current;
    if (!el) return;
    setLive(clamp(Math.round(el.scrollTop / rowHeight())));
    window.clearTimeout(settle.current);
    settle.current = window.setTimeout(commit, 120);
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    const moves: Record<string, number> = {
      ArrowUp: index - 1,
      ArrowDown: index + 1,
      PageUp: index - pageStep,
      PageDown: index + pageStep,
      Home: 0,
      End: last,
    };
    if (!(event.key in moves)) return;
    event.preventDefault();
    const next = clamp(moves[event.key]);
    if (next !== index) onIndexChange(next);
  };

  return (
    <div
      ref={ref}
      role="spinbutton"
      tabIndex={0}
      aria-label={label}
      aria-valuemin={toMinutes(options[0])}
      aria-valuemax={toMinutes(options[last])}
      aria-valuenow={toMinutes(options[index])}
      aria-valuetext={options[index]}
      data-slot="time-wheel-column"
      onScroll={onScroll}
      onKeyDown={onKeyDown}
      className={cn(
        "relative h-13.5 w-20 snap-y snap-mandatory overflow-y-auto overscroll-contain scroll-smooth rounded-8 py-4.5 outline-none motion-reduce:scroll-auto",
        "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        "focus-visible:ring-3 focus-visible:ring-ring/50",
      )}
    >
      {options.map((option, i) => (
        <div
          key={option}
          aria-hidden="true"
          data-selected={i === live || undefined}
          onClick={() => onIndexChange(i)}
          className="flex h-4.5 cursor-pointer snap-center items-center justify-center text-label-12 text-content-primary opacity-10 transition-opacity duration-(--duration-fast) ease-standard select-none data-selected:opacity-100 motion-reduce:transition-none"
        >
          {option}
        </div>
      ))}
    </div>
  );
}

export { TimeWheelColumn };
