import type * as React from "react";

export interface ChoiceListOption {
  value: string;
  label: React.ReactNode;
  /** The 16px circle before the label: a flag <img>, or any element. The package ships none. */
  media?: React.ReactNode;
  disabled?: boolean;
}

export interface ChoiceListPanelProps extends Omit<
  React.ComponentProps<"div">,
  "children" | "defaultValue"
> {
  options: ChoiceListOption[];
  /** The committed selection the panel opens on; editing happens on a draft until Save. */
  value?: string[];
  /** Save: the chosen values, in option order. */
  onSave: (value: string[]) => void;
  /** discard: the draft is dropped; close the popover here. */
  onDiscard?: () => void;
  labels?: {
    /** The toggle chip that picks every option, or clears them all: "All Languages". */
    all?: string;
    discard?: string;
    save?: string;
    /** Accessible name of the option group. */
    list?: string;
    /** Shown in place of the list when there are no options. */
    empty?: string;
  };
}
