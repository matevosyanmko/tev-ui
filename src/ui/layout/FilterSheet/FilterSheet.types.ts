import type * as React from "react";

export interface FilterSheetProps {
  /** How many filters differ from their defaults; shown as a badge when > 0. */
  count?: number;
  /** Short text at the trigger's far end, e.g. the selected date range. */
  summary?: React.ReactNode;
  /** Dims the trigger and keeps the sheet from opening. */
  disabled?: boolean;
  /**
   * Shows a reset button in the sheet's header while `count` is above zero.
   * The app decides what "reset" means — which filters go back to what.
   */
  onReset?: () => void;
  /** Optional control; uncontrolled when omitted. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** English fallbacks; a caller passes already-translated text. */
  labels?: {
    /** The trigger's caption. */
    trigger?: string;
    /** The sheet's heading. */
    title?: string;
    reset?: string;
    /** The button that closes the sheet. Filters apply as they change. */
    done?: string;
  };
  /** Classes for the trigger. */
  className?: string;
  /** The filter controls — usually the same `<FilterGroup>`s as the desktop strip. */
  children: React.ReactNode;
}
