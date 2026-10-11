import * as React from "react";

export type ScrollOrientation = "horizontal" | "vertical";

/** Whether there is content beyond each end of a scroller's axis. */
export interface ScrollEdges {
  /** Scrolled away from the start: content is hidden before the visible part. */
  canScrollStart: boolean;
  /** Not at the end yet: content is hidden after the visible part. */
  canScrollEnd: boolean;
}

const NO_OVERFLOW: ScrollEdges = { canScrollStart: false, canScrollEnd: false };

// Measured before paint, so a list that overflows on load fades in its first
// frame; a plain effect on the server.
const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? React.useEffect : React.useLayoutEffect;

/**
 * Tracks a scroller's edges along one axis: on scroll, when it or a child
 * resizes, and when children are added or removed. Right-to-left scrolling
 * (a negative scrollLeft) counts from the start edge too.
 *
 * `threshold` (px) absorbs the fractional offsets of zoomed or high-density
 * screens, where the end can sit a fraction short of the maximum.
 */
export function useScrollEdges(
  element: HTMLElement | null,
  orientation: ScrollOrientation = "vertical",
  threshold = 1,
): ScrollEdges {
  const [edges, setEdges] = React.useState<ScrollEdges>(NO_OVERFLOW);

  useIsomorphicLayoutEffect(() => {
    if (!element) return;
    const horizontal = orientation === "horizontal";

    const measure = () => {
      const position = Math.abs(horizontal ? element.scrollLeft : element.scrollTop);
      const max = horizontal
        ? element.scrollWidth - element.clientWidth
        : element.scrollHeight - element.clientHeight;
      const canScrollStart = position > threshold;
      const canScrollEnd = max - position > threshold;
      setEdges((previous) =>
        previous.canScrollStart === canScrollStart && previous.canScrollEnd === canScrollEnd
          ? previous
          : { canScrollStart, canScrollEnd },
      );
    };

    measure();
    element.addEventListener("scroll", measure, { passive: true });

    // The scroller's own size and its children's: content growing inside a
    // fixed box changes the overflow without resizing the box.
    const resize = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(measure);
    const observeChildren = () => {
      if (!resize) return;
      resize.disconnect();
      resize.observe(element);
      for (const child of Array.from(element.children)) resize.observe(child);
    };
    observeChildren();
    const mutations =
      typeof MutationObserver === "undefined"
        ? null
        : new MutationObserver(() => {
            observeChildren();
            measure();
          });
    mutations?.observe(element, { childList: true });

    return () => {
      element.removeEventListener("scroll", measure);
      resize?.disconnect();
      mutations?.disconnect();
    };
  }, [element, orientation, threshold]);

  return edges;
}
