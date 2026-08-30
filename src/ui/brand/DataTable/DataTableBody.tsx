import type * as React from "react";

import { TableCell, TableRow } from "../../primitives/Table/Table.js";
import { cn } from "../../../utils.js";
import {
  ROW_CLASS,
  ROW_HOVER_CLASS,
  ROW_STATIC_CLASS,
  getColumnKey,
  getNestedValue,
  getRowKey,
} from "./DataTable.utils.js";
import type {
  DataTableBodyProps,
  DataTableColumn,
  DataTableEmptyRowProps,
} from "./DataTable.types.js";

/**
 * Exported so pages rendering their own rows via `children` (grouped tables,
 * selection tables) can show the exact same empty state instead of hand-rolling
 * one that drifts from it.
 */
function DataTableEmptyRow({ colSpan, message }: DataTableEmptyRowProps) {
  return (
    <TableRow data-brand="data-table-empty-row" className={ROW_STATIC_CLASS}>
      <TableCell colSpan={Math.max(colSpan, 1)} className="py-8 text-center text-muted-foreground">
        {message}
      </TableCell>
    </TableRow>
  );
}

function DataTableRow<Row>({ row, columns }: { row: Row; columns: DataTableColumn<Row>[] }) {
  return (
    <TableRow data-brand="data-table-row" className={cn(ROW_CLASS, ROW_HOVER_CLASS)}>
      {columns.map((column, columnIndex) => {
        const raw = getNestedValue(row, column.dataIndex);
        const cell = column.render ? column.render(raw, row) : (raw as React.ReactNode);
        return (
          <TableCell key={getColumnKey(column, columnIndex)} className={cn(column.cellClassName)}>
            {cell ?? "-"}
          </TableCell>
        );
      })}
    </TableRow>
  );
}

function DataTableBody<Row>({ rows, columns, rowKey, emptyMessage }: DataTableBodyProps<Row>) {
  if (rows.length === 0) {
    return <DataTableEmptyRow colSpan={columns.length} message={emptyMessage} />;
  }

  return rows.map((row, index) => (
    <DataTableRow key={getRowKey(row, rowKey, index)} row={row} columns={columns} />
  ));
}

export { DataTableBody, DataTableEmptyRow };
