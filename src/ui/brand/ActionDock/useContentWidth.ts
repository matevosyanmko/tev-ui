import * as React from "react";

/**
 * Rendered width of the element `ref` points at, kept current as it resizes
 * (the number or the label of the buttons inside changes).
 *
 * `useLayoutEffect` rather than `useEffect`: the dock's background path is
 * generated from this number, so measuring after paint would flash a
 * wrong-width shape for one frame.
 */
export function useContentWidth(ref: React.RefObject<HTMLElement | null>): number {
  const [width, setWidth] = React.useState(0);

  React.useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    const measure = () => setWidth(element.getBoundingClientRect().width);
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref]);

  return width;
}
