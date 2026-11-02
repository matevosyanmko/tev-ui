"use client";

import * as React from "react";

import { cn } from "../../../utils.js";
import { Chip } from "../../primitives/Chip/Chip.js";
import { PanelFooter } from "../Panel/Panel.js";
import type { ChoiceListPanelProps } from "./ChoiceListPanel.types.js";

/**
 * The multi-select picker that opens from the filter panel's language pill
 * (100:43832): a stack of outline pills with a media circle (the caller's
 * flags), an "all" toggle chip, and discard / Save. A chosen pill is filled
 * ink, the selection look every TevScribe toggle shares (Figma draws none).
 *
 * It edits a draft until Save. Put it in `<PopoverContent variant="picker">`;
 * it is as wide as its widest option, never narrower than the drawn 134px
 * (which the Figma footer sets), and mounts fresh on every open.
 */
function ChoiceListPanel({
  options,
  value,
  onSave,
  onDiscard,
  labels,
  className,
  ...props
}: ChoiceListPanelProps) {
  const [draft, setDraft] = React.useState<string[]>(() => value ?? []);
  const enabled = options.filter((option) => !option.disabled).map((option) => option.value);
  const all = enabled.length > 0 && enabled.every((v) => draft.includes(v));

  const toggle = (v: string) =>
    setDraft((current) => (current.includes(v) ? current.filter((x) => x !== v) : [...current, v]));

  return (
    <div
      data-slot="choice-list-panel"
      className={cn("flex min-w-33.5 flex-col gap-2.5", className)}
      {...props}
    >
      {options.length ? (
        <div
          role="group"
          aria-label={labels?.list}
          data-slot="choice-list-options"
          className="flex flex-col gap-1"
        >
          {options.map((option) => (
            <Chip
              key={option.value}
              selected={draft.includes(option.value)}
              disabled={option.disabled}
              onClick={() => toggle(option.value)}
              className="w-full justify-start gap-2"
            >
              {option.media ? (
                <span
                  aria-hidden="true"
                  data-slot="choice-list-media"
                  className="flex size-4 shrink-0 items-center justify-center overflow-hidden rounded-full *:size-4 *:rounded-full *:object-cover"
                >
                  {option.media}
                </span>
              ) : null}
              <span className="min-w-0 truncate">{option.label}</span>
            </Chip>
          ))}
        </div>
      ) : (
        <p data-slot="choice-list-empty" className="text-caption-10 text-content-secondary">
          {labels?.empty ?? "Nothing to choose from"}
        </p>
      )}

      {enabled.length > 1 ? (
        <Chip
          size="xs"
          selected={all}
          onClick={() => setDraft(all ? [] : enabled)}
          className="self-start"
        >
          {labels?.all ?? "All"}
        </Chip>
      ) : null}

      <PanelFooter
        labels={labels}
        onDiscard={onDiscard}
        // Option order, whatever order they were picked in.
        onSave={() => onSave(options.map((o) => o.value).filter((v) => draft.includes(v)))}
      />
    </div>
  );
}

export { ChoiceListPanel };
