import dayjs from "dayjs";
import type { Dayjs } from "dayjs";

import type { DateMode, DatePreset } from "./DateRangePicker.types.js";

/**
 * Non-component module for the picker's fixed data and its one pure
 * computation, so every component file in the folder exports only components
 * (the React Fast Refresh rule that puts cva maps in a `.variants.ts`).
 */

export const MODES: DateMode[] = ["year", "month", "custom"];

export const PRESETS: DatePreset[] = ["7d", "30d", "90d", "month"];

/** Fallback month names. Supply `labels.months` for anything but English. */
export const DEFAULT_MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/** Inclusive `[start, end]` for a quick-pick, anchored to today. */
export function presetRange(preset: DatePreset): [Dayjs, Dayjs] {
  const end = dayjs().endOf("day");
  switch (preset) {
    case "7d":
      return [dayjs().subtract(6, "day").startOf("day"), end];
    case "30d":
      return [dayjs().subtract(29, "day").startOf("day"), end];
    case "90d":
      return [dayjs().subtract(89, "day").startOf("day"), end];
    case "month":
      return [dayjs().startOf("month"), dayjs().endOf("month")];
  }
}

/** Which preset, if any, the committed range currently matches. */
export function matchPreset(value: Dayjs[] | undefined): DatePreset | undefined {
  if (!value?.[0] || !value?.[1]) return undefined;
  return PRESETS.find((preset) => {
    const [start, end] = presetRange(preset);
    return (
      dayjs(value[0]).isSame(start, "day") && dayjs(value[1]).isSame(end, "day")
    );
  });
}
