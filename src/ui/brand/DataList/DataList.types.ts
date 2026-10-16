import type * as React from "react";

import type { DataTableStatus } from "../DataTable/DataTable.types.js";

/** The same four states as `DataTable`, so one query maps onto either. */
export type DataListStatus = DataTableStatus;

export interface DataListProps extends React.ComponentProps<"div"> {
  status?: DataListStatus;
  /** Thrown value behind `status: "error"`. Only read in that state. */
  error?: unknown;
  /** Re-run the failed request. Without it the error state shows no button. */
  onRetry?: () => void;
  /** Wins over the thrown error's own message and `labels.loadError`. */
  errorMessage?: React.ReactNode;
  /** Placeholder rows while `status` is "pending". */
  skeletonItems?: number;
  labels?: {
    /** Shown on `status: "error"` when the thrown value carries no message. */
    loadError?: React.ReactNode;
    retry?: string;
  };
}
