import type * as React from "react";

export type CssSize = number | string;

/**
 * A column definition. Rows are generic because the same table shell renders
 * interactions, agents, alerts and audit entries.
 *
 * A column supplies its content one of two ways: `render` for anything
 * non-trivial, or `dataIndex` to pull a (possibly nested) field off the row.
 * Everything else about a cell's appearance is owned by the table.
 */
export interface DataTableColumn<Row = unknown> {
  key?: string;
  /** Field path on the row; an array walks nested objects. */
  dataIndex?: string | string[];
  title?: React.ReactNode;
  /** Full control of the header cell, when `title` is not enough. */
  header?: React.ReactNode;
  /**
   * Cell content. Called as `render(value, row)`, where `value` is whatever
   * `dataIndex` pulled off the row (`undefined` without one).
   */
  render?: (value: unknown, row: Row) => React.ReactNode;
  width?: CssSize;
  minWidth?: CssSize;
  /** Picks from the table's fixed set of header roles. */
  headerVariant?: "default" | "plain" | "action";
  headerClassName?: string;
  cellClassName?: string;
  sortable?: boolean;
  /** `title` attribute on the sort button. */
  sortTitle?: string;
}

/** Which column the table is sorted by, and in which direction. */
export interface SortState {
  key: string | null;
  dir: "asc" | "desc";
}

/**
 * What the table should be rendering right now.
 *
 * One discriminated value rather than a `loading` + `error` pair: that pair
 * could express a state that does not exist (loading *and* errored, which the
 * table had to untangle with a "loading wins" tie-break) and could not express
 * the one that matters most — real rows on screen that are one page behind
 * while the next page loads, which is `refreshing`.
 */
export type DataTableStatus = "pending" | "refreshing" | "error" | "ready";

export interface PaginationConfig {
  /** 1-based. Supply it together with `total` and `onPageChange` for server-driven paging. */
  page?: number;
  pageSize?: number;
  total?: number;
  onPageChange?: (page: number) => void;
  /** Force the pager inert; by default it locks whenever `status` is not "ready". */
  disabled?: boolean;
}

export interface DataTableLabels {
  /** Shown when there are no rows. */
  empty?: React.ReactNode;
  /** Shown on `status: "error"` when the thrown value carries no message. */
  loadError?: React.ReactNode;
  retry?: string;
  prev?: string;
  next?: string;
  /** Renders the "Page 2 / 7" caption. */
  page?: (page: number, totalPages: number) => string;
  /** Renders the "1–20 / 137" range caption. */
  range?: (from: number, to: number, total: number) => string;
}

export type RowKey<Row> = string | ((row: Row) => React.Key);

export interface DataTableProps<Row = unknown> extends Omit<
  React.ComponentProps<"div">,
  "children"
> {
  columns?: DataTableColumn<Row>[];
  /** Rows to render. Omit and pass `children` to render your own row elements. */
  dataSource?: Row[];
  rowKey?: RowKey<Row>;
  pagination?: PaginationConfig;
  status?: DataTableStatus;
  /** Thrown value behind `status: "error"`. Only read in that state. */
  error?: unknown;
  /** Re-run the failed request. Without it the error row shows no retry button. */
  onRetry?: () => void;
  /**
   * Bring the table's top back into view when the rows become a different
   * result set — a page change, or a filter change. Opt-in: a small table
   * sitting below other content should not scroll that content out of view.
   */
  scrollToTopOnChange?: boolean;
  skeletonRows?: number;
  /**
   * Your own <TableRow>/<TableCell> elements, for pages that need custom row
   * shapes (grouping, a selection column). `columns` still drives the header
   * and — with `fixedLayout` — the widths, so header and body stay in sync.
   */
  children?: React.ReactNode;
  fixedLayout?: boolean;
  equalWidthColumns?: boolean;
  minColumnWidth?: CssSize;
  stickyHeader?: boolean;
  stickyFooter?: boolean;
  clip?: boolean;
  /** Per-instance override of `labels.empty`. */
  emptyMessage?: React.ReactNode;
  /** Per-instance override; wins over the thrown error's own message. */
  errorMessage?: React.ReactNode;
  labels?: DataTableLabels;
  /** Classes for the <table>. */
  className?: string;
  /** Classes for the bordered box around it. */
  containerClassName?: string;
  headerRowClassName?: string;
  sort?: SortState;
  onSort?: (key: string) => void;
  headerRadius?: number;
}

export interface DataTableHeaderProps<Row = unknown> {
  columns: DataTableColumn<Row>[];
  stickyHeader?: boolean;
  headerRowClassName?: string;
  sort?: SortState;
  onSort?: (key: string) => void;
  headerRadius?: number;
  disabled?: boolean;
}

export interface DataTableColGroupProps<Row = unknown> {
  columns: DataTableColumn<Row>[];
  minColumnWidth?: CssSize;
}

export interface DataTableBodyProps<Row = unknown> {
  rows: Row[];
  columns: DataTableColumn<Row>[];
  rowKey?: RowKey<Row>;
  emptyMessage?: React.ReactNode;
}

export interface DataTableEmptyRowProps {
  colSpan: number;
  message?: React.ReactNode;
}

export interface DataTableSkeletonProps<Row = unknown> {
  columns: DataTableColumn<Row>[];
  /** Number of placeholder rows to draw. */
  rows?: number;
}

export interface DataTableErrorProps {
  colSpan: number;
  message?: React.ReactNode;
  onRetry?: () => void;
  retryLabel?: string;
}

export interface DataTablePaginationProps {
  /** 1-based. */
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
  labels?: Pick<DataTableLabels, "prev" | "next" | "page" | "range">;
}
