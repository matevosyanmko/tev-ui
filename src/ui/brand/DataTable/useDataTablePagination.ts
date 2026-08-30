import * as React from "react";

import type { DataTableStatus, PaginationConfig } from "./DataTable.types.js";

export interface DataTablePaginationState<Row> {
  /** 1-based, already clamped to the available range. */
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  /** Rows for the current page — sliced only when this hook owns the paging. */
  rows: Row[] | undefined;
  /** More than one page to show, and the table is not erroring. */
  visible: boolean;
  /** The pager should refuse input right now. */
  disabled: boolean;
}

/**
 * Resolves the two paging arrangements a DataTable supports into one shape.
 *
 * - **Server-driven** — `{ page, pageSize, total, onPageChange }`. The caller
 *   already fetched exactly this page's rows, so `dataSource` is displayed
 *   as-is and page state stays with the caller.
 * - **Client-side** — `{ pageSize }` alone. `dataSource` is the whole dataset
 *   and this hook owns the page state, slicing it itself.
 *
 * Kept out of DataTable.tsx because it is the one genuinely stateful seam in
 * that file, and because getting the clamping right matters: a client-side
 * dataset can shrink underneath the user (a filter narrows it while they sit
 * on page 5). Clamping here, rather than correcting from an effect, means the
 * out-of-range page never reaches the slice — so the table cannot flash empty
 * for a frame before snapping back.
 */
export function useDataTablePagination<Row>(
  dataSource: Row[] | undefined,
  pagination: PaginationConfig | undefined,
  status: DataTableStatus,
): DataTablePaginationState<Row> {
  const [internalPage, setInternalPage] = React.useState(1);

  const hasDataSource = Array.isArray(dataSource);
  const isControlled =
    Boolean(pagination) &&
    pagination?.total != null &&
    typeof pagination.onPageChange === "function";

  const pageSize = pagination?.pageSize || 20;
  const total = isControlled
    ? Number(pagination?.total) || 0
    : hasDataSource
      ? dataSource.length
      : 0;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const clampedPage = hasDataSource
    ? Math.min(internalPage, totalPages)
    : internalPage;
  const page = isControlled ? (pagination?.page ?? 1) : clampedPage;

  const rows =
    hasDataSource && pagination && !isControlled
      ? dataSource.slice((clampedPage - 1) * pageSize, clampedPage * pageSize)
      : dataSource;

  return {
    page,
    pageSize,
    total,
    totalPages,
    onPageChange:
      isControlled && pagination?.onPageChange
        ? pagination.onPageChange
        : setInternalPage,
    rows,
    // Driven by the data rather than the fetch state, so a refetch that keeps
    // stale rows around keeps the footer and the current page visible instead
    // of hiding them. It stays hidden only before the very first successful
    // load, and once there is genuinely only one page.
    visible: status !== "error" && Boolean(pagination) && totalPages > 1,
    // Locked unless the table is settled: during `refreshing` the rows on
    // screen belong to the previous page, so letting the user queue another
    // jump would race two fetches against one another.
    disabled: pagination?.disabled ?? status !== "ready",
  };
}
