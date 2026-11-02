import * as React from "react";

/**
 * The hour row height, animated towards `target`.
 *
 * FullCalendar positions events from slot heights it measures in the DOM, so a
 * plain CSS transition on the rows would leave the cards behind. Instead an
 * invisible probe element transitions its own height with the motion tokens
 * (`duration-(--duration-base) ease-standard`, `motion-reduce:` jumps), and a
 * ResizeObserver reads it back every frame; the caller re-renders the grid at
 * each value. Without ResizeObserver the height jumps straight to `target`.
 *
 * Render the probe with `probeRef` and `height: var(--target)` plus a height
 * transition.
 */
export function useAnimatedHourHeight(target: number) {
  const probeRef = React.useRef<HTMLDivElement>(null);
  const [height, setHeight] = React.useState(target);
  const supported = typeof ResizeObserver !== "undefined";
  const targetRef = React.useRef(target);
  targetRef.current = target;

  React.useEffect(() => {
    const probe = probeRef.current;
    if (!probe || !supported) return;
    const observer = new ResizeObserver(([entry]) => {
      const size = entry?.borderBoxSize?.[0]?.blockSize ?? entry?.contentRect.height;
      if (!size) return;
      // Layout rounds to 1/64 px, so the settled probe reads 106.72 for a
      // 106.73 target: snap the last step onto the exact value.
      setHeight(Math.abs(size - targetRef.current) < 0.05 ? targetRef.current : Math.round(size * 100) / 100);
    });
    observer.observe(probe);
    return () => observer.disconnect();
  }, [supported]);

  return { probeRef, height: supported ? height : target };
}
