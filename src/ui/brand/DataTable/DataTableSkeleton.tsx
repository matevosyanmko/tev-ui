import { TableCell, TableRow } from "../../primitives/Table/Table.js";
import { ROW_STATIC_CLASS, columnStyle, getColumnKey } from "./DataTable.utils.js";
import type { DataTableColumn, DataTableSkeletonProps } from "./DataTable.types.js";
import { cn } from "../../../utils.js";

/**
 * A cell per column rather than one bar spanning them all.
 *
 * The single-colSpan version never exercised the real column grid, so the
 * browser recomputed every width the instant real rows landed — a visible jolt
 * at exactly the moment this table is trying to eliminate flicker. Matching the
 * real cell structure, and its width and padding, makes the swap size-stable.
 */
function DataTableSkeleton<Row>({ columns, rows = 5 }: DataTableSkeletonProps<Row>) {
  const cells: DataTableColumn<Row>[] = columns.length > 0 ? columns : [{}];

  return Array.from({ length: rows }).map((_, rowIndex) => (
    <TableRow
      key={`skeleton-${rowIndex}`}
      data-brand="data-table-skeleton-row"
      className={ROW_STATIC_CLASS}
      aria-hidden="true"
    >
      {cells.map((column, columnIndex) => (
        <TableCell
          key={getColumnKey(column, columnIndex)}
          className={cn(column.cellClassName, "min-h-[44.5px]")}
          style={columnStyle(column)}
        >
          <div className="w-full opacity-0" children="loading" />
        </TableCell>
      ))}
    </TableRow>
  ));
}

export { DataTableSkeleton };
