import type * as React from "react";

/** Where the content comes in from, sliding into place as it fades in. */
export type FadeInFrom = "none" | "top" | "bottom" | "left" | "right";

export interface FadeInProps extends React.ComponentProps<"div"> {
  /** Slide in from this side as well as fading. Defaults to `none` (a plain fade). */
  from?: FadeInFrom;
  /** How far it slides (with `from`): a CSS length or pixels. Defaults to 0.5rem. */
  distance?: number | string;
  /** In milliseconds. Defaults to 200. */
  duration?: number;
  /** Wait before starting, in milliseconds; the content stays hidden meanwhile. */
  delay?: number;
  /** A CSS timing function. Defaults to ease-out. */
  easing?: string;
  /** Start at this scale and grow to full size (e.g. 0.98). */
  scale?: number;
  /** Start blurred by this many pixels and sharpen. */
  blur?: number;
  /**
   * Animate the caller's child element itself instead of a wrapping <div>.
   * Props, ref and classes merge onto it.
   */
  asChild?: boolean;
}
