import { CircleAlert, RotateCw } from "lucide-react";

import { Button } from "../../primitives/Button/Button.js";
import { TableCell, TableRow } from "../../primitives/Table/Table.js";
import { ROW_STATIC_CLASS } from "./DataTable.utils.js";
import type { DataTableErrorProps } from "./DataTable.types.js";

/**
 * The failure row.
 *
 * `onRetry` is optional, and without it no button is shown: a table fed from
 * already-loaded rows has nothing to re-run. That is more honest than the
 * `window.location.reload()` this used to offer, which threw away the user's
 * filters, page and selection to recover from one failed request.
 */
function DataTableError({ colSpan, message, onRetry, retryLabel }: DataTableErrorProps) {
  return (
    <TableRow data-brand="data-table-error-row" className={ROW_STATIC_CLASS}>
      <TableCell colSpan={Math.max(colSpan, 1)} className="py-10 text-center">
        {/* role="alert" so the failure is announced; it previously reached
            screen readers as an unlabeled icon and a bare string. */}
        <div
          role="alert"
          className="flex flex-col items-center gap-2 text-sm text-destructive"
        >
          <CircleAlert size={20} aria-hidden="true" />
          <span>{message}</span>
          {onRetry ? (
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="mt-1"
              onClick={() => onRetry()}
            >
              <RotateCw size={14} aria-hidden="true" />
              {retryLabel ?? "Retry"}
            </Button>
          ) : null}
        </div>
      </TableCell>
    </TableRow>
  );
}

export { DataTableError };
