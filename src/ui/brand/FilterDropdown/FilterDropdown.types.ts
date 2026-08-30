import type * as React from "react";

export interface FilterOption {
  value: string;
  label: string;
  /**
   * Trigger treatment while this option is the active one. `danger` paints the
   * pill coral — used for values that mean "something is switched off".
   *
   * A tone on the option rather than a value the component recognises: the
   * library has no business knowing that a filter value spelled "disabled"
   * is the bad one.
   */
  tone?: "default" | "danger";
}

export interface FilterDropdownProps {
  value: string;
  options: FilterOption[];
  onChange: (value: string) => void;
  /**
   * Label for the synthetic "all" entry; omit to drop that entry. Selecting it
   * reports `""`, not `"all"`, so a caller's "no filter" state stays falsy.
   */
  allLabel?: string;
  /** Classes for the trigger pill. */
  className?: string;
  /** Classes for the dropdown panel. */
  contentClassName?: string;
  minWidth?: number | string;
  maxWidth?: number | string;
}

export type FilterDropdownRef = React.ComponentRef<"button">;
