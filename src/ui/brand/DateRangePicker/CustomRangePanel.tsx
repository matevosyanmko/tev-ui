"use client";

import * as React from "react";
import dayjs from "dayjs";

import { Calendar } from "../../primitives/Calendar/Calendar.js";
import { cn } from "../../../utils.js";
import { PRESETS, matchPreset, presetRange } from "./DateRangePicker.constants.js";
import type { CustomRangePanelProps, DatePreset } from "./DateRangePicker.types.js";

const PRESET_LABEL_KEY = {
  "7d": "last7Days",
  "30d": "last30Days",
  "90d": "last90Days",
  month: "thisMonth",
} as const;

const PRESET_FALLBACK = {
  "7d": "Last 7 days",
  "30d": "Last 30 days",
  "90d": "Last 90 days",
  month: "This month",
} as const;

/**
 * Custom mode: quick presets, two date fields, and a calendar.
 *
 * The draft range is local state, committed to `onChange` only by Save or by a
 * completed two-click selection. That is what lets Discard mean something —
 * a controlled-per-click version would have already overwritten the caller's
 * range by the time the user changed their mind.
 *
 * The draft is seeded on mount rather than from an effect watching `value`:
 * the parent remounts this panel whenever it becomes visible (popover opening,
 * or a mode switch into custom), which is exactly when the seed should happen.
 */
function CustomRangePanel({ value, onChange, onClose, labels }: CustomRangePanelProps) {
  const seedFrom = value?.[0]?.format?.("YYYY-MM-DD") ?? "";
  const seedTo = value?.[1]?.format?.("YYYY-MM-DD") ?? "";

  const [draft, setDraft] = React.useState({ from: seedFrom, to: seedTo });
  const [activeField, setActiveField] = React.useState<"from" | "to">(
    seedFrom && !seedTo ? "to" : "from",
  );
  const [calendarMonth, setCalendarMonth] = React.useState(
    (seedFrom ? dayjs(seedFrom) : dayjs()).startOf("month").toDate(),
  );
  const [compact, setCompact] = React.useState(false);

  // One month instead of two below the tablet breakpoint: two side-by-side
  // months overflow the popover there.
  React.useEffect(() => {
    const media = window.matchMedia("(max-width: 1024px)");
    const sync = () => setCompact(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  const activePreset = matchPreset(value);

  function applyPreset(preset: DatePreset) {
    onChange(presetRange(preset));
    onClose();
  }

  function handleDayClick(date: Date | undefined) {
    if (!date) return;
    const selected = dayjs(date).format("YYYY-MM-DD");

    if (activeField === "from") {
      setDraft((previous) => ({
        from: selected,
        // A new start after the existing end would make the range inverted,
        // so the end is dropped and the user picks it again.
        to: previous.to && dayjs(previous.to).isBefore(dayjs(selected), "day") ? "" : previous.to,
      }));
      setActiveField("to");
      setCalendarMonth(dayjs(selected).startOf("month").toDate());
      return;
    }

    const from = draft.from ? dayjs(draft.from) : null;
    const to = dayjs(selected);
    if (!from || to.isBefore(from, "day")) {
      setDraft({ from: selected, to: "" });
      setActiveField("from");
      setCalendarMonth(to.startOf("month").toDate());
      return;
    }

    setDraft({ from: draft.from, to: selected });
    onChange([from.startOf("day"), to.endOf("day")]);
    onClose();
  }

  function focusField(field: "from" | "to") {
    setActiveField(field);
    const anchor = draft[field] || draft[field === "from" ? "to" : "from"];
    setCalendarMonth(
      dayjs(anchor || undefined)
        .startOf("month")
        .toDate(),
    );
  }

  function save() {
    if (draft.from && draft.to) {
      onChange([dayjs(draft.from).startOf("day"), dayjs(draft.to).endOf("day")]);
    }
    onClose();
  }

  const placeholder = labels?.selectRange ?? "Select a range";

  return (
    <div data-slot="custom-range-panel" className="space-y-3">
      <div className="flex flex-wrap gap-1.5">
        {PRESETS.map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => applyPreset(preset)}
            data-selected={activePreset === preset || undefined}
            className={cn(
              "h-7 rounded-full border px-3 text-[11px] font-semibold transition-colors",
              activePreset === preset
                ? "border-transparent bg-brand-purple text-brand-purple-foreground"
                : "border-black/15 text-popover-foreground hover:border-transparent hover:bg-brand-purple hover:text-brand-purple-foreground",
            )}
          >
            {labels?.[PRESET_LABEL_KEY[preset]] ?? PRESET_FALLBACK[preset]}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2">
        {(["from", "to"] as const).map((field) => (
          <button
            key={field}
            type="button"
            onClick={() => focusField(field)}
            data-active={activeField === field || undefined}
            className={cn(
              "rounded-xl border p-3 text-left transition-colors",
              activeField === field
                ? "border-brand-purple bg-brand-purple/[0.06]"
                : "border-black/10",
            )}
          >
            <p className="mb-0.5 text-[10px] text-muted-foreground">
              {labels?.[field] ?? (field === "from" ? "From" : "To")}
            </p>
            <p className="text-sm font-semibold text-popover-foreground">
              {draft[field] || placeholder}
            </p>
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-black/10 p-2">
        <Calendar
          // Range mode so both ends of the draft stay marked as selected;
          // single mode can only ever highlight one day. The click flow is
          // still ours — react-day-picker's own computed range is ignored in
          // favour of the clicked date and the active from/to field.
          mode="range"
          month={calendarMonth}
          onMonthChange={setCalendarMonth}
          selected={
            draft.from
              ? {
                  from: dayjs(draft.from).toDate(),
                  to: draft.to ? dayjs(draft.to).toDate() : undefined,
                }
              : undefined
          }
          onSelect={(_range, clickedDate) => handleDayClick(clickedDate)}
          disabled={
            activeField === "to" && draft.from ? { before: dayjs(draft.from).toDate() } : undefined
          }
          numberOfMonths={compact ? 1 : 2}
        />
      </div>

      <div className="flex items-center justify-end gap-4 pt-1">
        <button
          type="button"
          onClick={onClose}
          className="text-[12px] text-muted-foreground transition-colors hover:text-popover-foreground"
        >
          {labels?.discard ?? "Discard"}
        </button>
        <button
          type="button"
          onClick={save}
          className="h-8 rounded-full bg-brand-purple px-5 text-[12px] font-bold text-brand-purple-foreground transition-opacity hover:opacity-90"
        >
          {labels?.save ?? "Save"}
        </button>
      </div>
    </div>
  );
}

export { CustomRangePanel };
