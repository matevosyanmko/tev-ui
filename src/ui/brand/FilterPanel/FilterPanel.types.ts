import type * as React from "react";

export interface FilterPanelRow {
  /** Stable key for the row. */
  id: string;
  /** The row's name on the left: "Date", "Time", "Status", "Language". */
  label: React.ReactNode;
  /**
   * The control on the right, supplied whole by the app: a Chip that opens a
   * picker popover, a pair of toggle Chips, a pill trigger.
   */
  control: React.ReactNode;
}

export interface FilterPanelProps extends Omit<React.ComponentProps<"div">, "children"> {
  rows: FilterPanelRow[];
  /** Renders the coral Reset pill and calls this. */
  onReset?: () => void;
  /** Renders the close square and calls this. */
  onClose?: () => void;
  labels?: {
    /** Accessible name of the panel. */
    title?: string;
    reset?: string;
    close?: string;
  };
}
