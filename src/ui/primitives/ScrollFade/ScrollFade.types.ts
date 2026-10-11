import type * as React from "react";

import type { ScrollEdges, ScrollOrientation } from "./useScrollEdges.js";

/** Which edges may fade when there is content beyond them. */
export type ScrollFadeEdges = "both" | "start" | "end" | "none";

export interface ScrollFadeProps extends React.ComponentProps<"div"> {
  /** The axis that scrolls. Defaults to `vertical`. */
  orientation?: ScrollOrientation;
  /** Hide the scrollbar; the content still scrolls (wheel, touch, keys, trackpad). */
  hideScrollbar?: boolean;
  /** Which edges fade. Defaults to `both`. */
  fade?: ScrollFadeEdges;
  /**
   * Length of each fade: a CSS length (`"3rem"`, `"12%"`) or pixels. Defaults
   * to 2rem; also settable as `--scroll-fade-size` from CSS.
   */
  fadeSize?: number | string;
  /** Called when content starts or stops extending past an edge. */
  onScrollEdgesChange?: (edges: ScrollEdges) => void;
  /**
   * Make the caller's child element the scroller instead of a wrapping
   * <div>: a tab list, a <ul>, a table body. Props, ref and classes merge
   * onto it.
   */
  asChild?: boolean;
}
