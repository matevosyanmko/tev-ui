import type * as React from "react";

export interface SegmentPillProps extends React.ComponentProps<"span"> {
  /**
   * What the segment says, not which colour: `live` for something happening
   * now, `success` for done, `danger` for failed, `neutral` for anything else.
   * The app maps its own statuses onto these.
   */
  tone?: "live" | "neutral" | "success" | "danger";
  /** `row` for list rows (200px, chip at the end), `card` hugs, `micro` for micro cards. */
  size?: "row" | "card" | "micro";
  /** Sits flush before the segment: a `<PlatformBadge>`, usually. */
  leading?: React.ReactNode;
  /** Sits at the segment's end: a `<Chip>` with the time or duration. */
  trailing?: React.ReactNode;
}
