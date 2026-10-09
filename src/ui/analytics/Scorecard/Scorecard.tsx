import * as React from "react";

import { cn } from "../../../utils.js";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../primitives/Table/Table.js";
import { ChartEmpty } from "../ChartCard/ChartCard.js";
import { formatChartNumber } from "../ChartCard/ChartCard.theme.js";

type ScorecardFormat = "number" | "percent" | "text";
type ScorecardRow = Record<string, string | number | null | undefined>;

interface ScorecardColumn {
  key: string;
  label: React.ReactNode;
  /** How to print the cell; a null value prints "—". Defaults to "text". */
  format?: ScorecardFormat;
  /** A second field printed muted after the value, e.g. a share. */
  mutedKey?: string;
  mutedFormat?: ScorecardFormat;
  /** Field holding a CSS colour, drawn as a dot before the value. */
  colorKey?: string;
  /** Full control over the cell; overrides the declarative options above. */
  render?: (row: ScorecardRow) => React.ReactNode;
}

interface ScorecardProps {
  columns: ScorecardColumn[];
  rows: ScorecardRow[];
  /** Field that identifies a row. */
  rowKey?: string;
  emptyLabel?: React.ReactNode;
}

function print(value: ScorecardRow[string], format: ScorecardFormat = "text") {
  if (value === null || value === undefined || value === "") return "—";
  if (format === "number") return formatChartNumber(Number(value));
  if (format === "percent") return `${formatChartNumber(Number(value))}%`;
  return String(value);
}

/**
 * One row per entity with its counts and rates. Columns are declarative so a
 * scorecard can be described in JSON; `render` is there for anything else.
 */
function Scorecard({ columns, rows, rowKey = "name", emptyLabel }: ScorecardProps) {
  if (!rows.length) return <ChartEmpty>{emptyLabel}</ChartEmpty>;
  return (
    <Table>
      <TableHeader>
        <TableRow className="border-gray-100 hover:bg-transparent">
          {columns.map((column) => (
            <TableHead
              key={column.key}
              className="px-4 py-2.5 text-[11px] whitespace-nowrap text-gray-400"
            >
              {column.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row, index) => (
          <TableRow key={String(row[rowKey] ?? index)} className="border-gray-100 last:border-b-0">
            {columns.map((column) => (
              <TableCell
                key={column.key}
                // Rows are separated, columns are not: drop the primitive's cell sides.
                className="border-x-0 px-4 py-3 text-[13px] whitespace-nowrap text-gray-700 tabular-nums"
              >
                {column.render ? (
                  column.render(row)
                ) : (
                  <span className="inline-flex items-center gap-1.5">
                    {column.colorKey && row[column.colorKey] ? (
                      <span
                        aria-hidden="true"
                        className="size-2 shrink-0 rounded-full"
                        style={{ background: String(row[column.colorKey]) }}
                      />
                    ) : null}
                    {print(row[column.key], column.format)}
                    {column.mutedKey ? (
                      <span className={cn("ml-1 text-[11px] text-gray-400")}>
                        {print(row[column.mutedKey], column.mutedFormat)}
                      </span>
                    ) : null}
                  </span>
                )}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export { Scorecard };
export type { ScorecardColumn, ScorecardFormat, ScorecardProps, ScorecardRow };
