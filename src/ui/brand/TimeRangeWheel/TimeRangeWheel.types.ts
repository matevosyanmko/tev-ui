import type * as React from "react";

/** A time-of-day range, 24-hour "HH:mm" both ends. */
export interface TimeRange {
  from: string;
  to: string;
}

export interface TimeRangePreset {
  /** The chip text: "All day", "Last 12 hours". */
  label: string;
  value: TimeRange;
}

export interface TimeRangeWheelProps extends Omit<React.ComponentProps<"div">, "children"> {
  /**
   * The committed range the wheel opens on; editing happens on a draft until
   * Save. A time off the `step` grid lands on the option before it. Defaults
   * to the whole day.
   */
  value?: TimeRange;
  /** Save: the draft, as option times. */
  onSave: (value: TimeRange) => void;
  /** discard: the draft is dropped; close the popover here. */
  onDiscard?: () => void;
  /** Minutes between options. Defaults to 1, as drawn (18:29, 18:30, 18:31). */
  step?: number;
  /** Preset chips under the wheel; the one matching the draft shows selected. */
  presets?: TimeRangePreset[];
  labels?: {
    /** Accessible names of the two columns. */
    from?: string;
    to?: string;
    discard?: string;
    save?: string;
    /** Accessible name of the preset chip group. */
    presets?: string;
  };
}
