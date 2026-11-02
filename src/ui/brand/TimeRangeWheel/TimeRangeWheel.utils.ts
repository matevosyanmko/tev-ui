/*
 * Pure "HH:mm" helpers for TimeRangeWheel. Their own module because they are
 * not components, so TimeRangeWheel.tsx stays a Fast Refresh boundary.
 */
import type { TimeRange } from "./TimeRangeWheel.types.js";

const DAY = 24 * 60;

export function toMinutes(time: string): number {
  const [h = "0", m = "0"] = time.split(":");
  const minutes = Number(h) * 60 + Number(m);
  return Number.isFinite(minutes) ? Math.min(Math.max(minutes, 0), DAY - 1) : 0;
}

export function fromMinutes(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

/** Every option of the day, `step` minutes apart from 00:00. */
export function timeOptions(step: number): string[] {
  const size = Math.max(1, Math.floor(step));
  const options: string[] = [];
  for (let t = 0; t < DAY; t += size) options.push(fromMinutes(t));
  return options;
}

/** The option at or just before `time`. */
export function optionIndex(options: string[], time: string, step: number): number {
  const size = Math.max(1, Math.floor(step));
  return Math.min(Math.floor(toMinutes(time) / size), options.length - 1);
}

export function sameTimeRange(a: TimeRange, b: TimeRange, step: number): boolean {
  const snap = (t: string) => Math.floor(toMinutes(t) / Math.max(1, Math.floor(step)));
  return snap(a.from) === snap(b.from) && snap(a.to) === snap(b.to);
}
