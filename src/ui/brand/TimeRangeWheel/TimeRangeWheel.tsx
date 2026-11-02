"use client";

import * as React from "react";

import { cn } from "../../../utils.js";
import { Chip } from "../../primitives/Chip/Chip.js";
import { PanelFooter } from "../Panel/Panel.js";
import type { TimeRange, TimeRangeWheelProps } from "./TimeRangeWheel.types.js";
import { optionIndex, sameTimeRange, timeOptions } from "./TimeRangeWheel.utils.js";
import { TimeWheelColumn } from "./TimeWheelColumn.js";

/**
 * The time range picker that opens from the filter panel's time pill
 * (100:43801): a canvas box with two snapping wheels, from and to, three
 * rows each with the middle one at full ink and the others at 10%, the dash
 * between them; preset chips; discard / Save.
 *
 * Each wheel is a spinbutton: arrows step, PageUp / PageDown move an hour,
 * Home / End go to the ends of the day; scrolling, dragging or clicking a
 * row works too. It edits a draft until Save. Put it in
 * `<PopoverContent variant="picker">`; it mounts fresh on every open.
 */
function TimeRangeWheel({
  value,
  onSave,
  onDiscard,
  step = 1,
  presets,
  labels,
  className,
  ...props
}: TimeRangeWheelProps) {
  const options = React.useMemo(() => timeOptions(step), [step]);
  const allDay: TimeRange = { from: options[0], to: options[options.length - 1] };
  const [draft, setDraft] = React.useState<TimeRange>(() => {
    const start = value ?? allDay;
    return {
      from: options[optionIndex(options, start.from, step)],
      to: options[optionIndex(options, start.to, step)],
    };
  });
  const pageStep = Math.max(1, Math.round(60 / Math.max(1, step)));

  const set = (end: keyof TimeRange) => (index: number) =>
    setDraft((current) => ({ ...current, [end]: options[index] }));

  return (
    <div
      data-slot="time-range-wheel"
      className={cn("flex w-50.5 flex-col gap-4", className)}
      {...props}
    >
      <div
        data-slot="time-range-wheel-box"
        className="flex items-center justify-center gap-1 rounded-8 bg-surface-subtle p-2.5"
      >
        <TimeWheelColumn
          options={options}
          index={optionIndex(options, draft.from, step)}
          onIndexChange={set("from")}
          label={labels?.from ?? "From"}
          pageStep={pageStep}
        />
        <div aria-hidden="true" className="flex flex-col text-label-12 text-content-primary">
          <span className="flex h-4.5 items-center opacity-10">-</span>
          <span className="flex h-4.5 items-center">-</span>
          <span className="flex h-4.5 items-center opacity-10">-</span>
        </div>
        <TimeWheelColumn
          options={options}
          index={optionIndex(options, draft.to, step)}
          onIndexChange={set("to")}
          label={labels?.to ?? "To"}
          pageStep={pageStep}
        />
      </div>

      {presets?.length ? (
        <div
          role="group"
          aria-label={labels?.presets ?? "Presets"}
          data-slot="time-range-wheel-presets"
          className="flex flex-wrap gap-1"
        >
          {presets.map((preset) => (
            <Chip
              key={preset.label}
              size="xs"
              selected={sameTimeRange(draft, preset.value, step)}
              onClick={() =>
                setDraft({
                  from: options[optionIndex(options, preset.value.from, step)],
                  to: options[optionIndex(options, preset.value.to, step)],
                })
              }
            >
              {preset.label}
            </Chip>
          ))}
        </div>
      ) : null}

      <PanelFooter labels={labels} onDiscard={onDiscard} onSave={() => onSave(draft)} />
    </div>
  );
}

export { TimeRangeWheel };
