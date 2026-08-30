"use client";

import * as React from "react";

import { Table, TableBody } from "../../primitives/Table/Table.js";
import { cn } from "../../../utils.js";
import { DataTableBody } from "./DataTableBody.js";
import { DataTableColGroup, DataTableHeader } from "./DataTableHeader.js";
import { DataTableError } from "./DataTableError.js";
import { DataTablePagination } from "./DataTablePagination.js";
import { DataTableSkeleton } from "./DataTableSkeleton.js";
import { errorMessage as toErrorText } from "./DataTable.utils.js";
import { useDataTablePagination } from "./useDataTablePagination.js";
import { useTableScrollReset } from "./useTableScrollReset.js";
import type { DataTableProps } from "./DataTable.types.js";

/**
 * The generic table shell, built on this package's Table primitives.
 *
 * Two ways to feed it rows:
 *
 * - `dataSource` + `columns[].render` — the table renders the rows for you.
 * - `children` — your own <TableRow>/<TableCell> elements, for pages that need
 *   custom row shapes (grouping, a selection column). `columns` still drives
 *   the header and, under `fixedLayout`, the widths, so the two stay in sync.
 *
 * It has no scroll box of its own: `stickyHeader`/`stickyFooter` stick relative
 * to whichever ancestor actually scrolls, so render it inside a scrollable
 * container to get sticky behaviour.
 *
 * Every string it can draw comes from `labels`, defaulting to English. The
 * package deliberately carries no i18n dependency — a caller hands over already
 * translated text.
 */
function DataTable<Row = unknown>({
  columns = [],
  dataSource,
  rowKey,
  pagination,
  status = "ready",
  error,
  onRetry,
  scrollToTopOnChange = false,
  skeletonRows = 20,
  children,
  fixedLayout = false,
  equalWidthColumns = false,
  minColumnWidth,
  stickyHeader = false,
  stickyFooter = false,
  clip = true,
  emptyMessage,
  errorMessage,
  labels,
  className,
  containerClassName,
  headerRowClassName,
  sort,
  onSort,
  headerRadius,
  ...containerProps
}: DataTableProps<Row>) {
  const pager = useDataTablePagination(dataSource, pagination, status);

  // `refreshing` keeps the real rows mounted — that is the whole point of it —
  // so only the two states with nothing real underneath neutralize the header.
  const isRefreshing = status === "refreshing";
  const inertHeader = status === "pending" || status === "error";

  // Neutralize the Table primitive's own overflow-x-auto wrapper when a sticky
  // prop is on: otherwise that wrapper becomes its own scroll container and
  // traps the sticky header/footer instead of letting them stick to the real
  // scrolling ancestor.
  const sticky = stickyHeader || stickyFooter;
  // Equal-width columns only make sense under a fixed table layout — the
  // browser needs `table-layout: fixed` for unwidthed columns to share the
  // remaining space evenly instead of sizing to their content.
  const useFixedLayout = fixedLayout || equalWidthColumns;

  const tableBoxRef = React.useRef<HTMLDivElement>(null);
  useTableScrollReset(tableBoxRef, {
    enabled: scrollToTopOnChange,
    page: pager.page,
    // `pending` and `refreshing` both mean a new query key; a background poll
    // is neither, which is what keeps live boards from jumping.
    loadingNewData: status === "pending" || status === "refreshing",
  });

  let body: React.ReactNode;
  if (status === "pending") {
    body = <DataTableSkeleton columns={columns} rows={skeletonRows} />;
  } else if (status === "error") {
    body = (
      <DataTableError
        colSpan={columns.length}
        message={
          errorMessage ?? toErrorText(error) ?? labels?.loadError ?? "Failed to load data"
        }
        onRetry={onRetry}
        retryLabel={labels?.retry}
      />
    );
  } else {
    // `refreshing` falls through to the real rows deliberately: keeping the
    // current page on screen while the next one loads is what it exists for.
    body = children ?? (
      <DataTableBody
        rows={pager.rows ?? []}
        columns={columns}
        rowKey={rowKey}
        emptyMessage={emptyMessage ?? labels?.empty ?? "No data"}
      />
    );
  }

  const tableBox = (
    <div
      ref={tableBoxRef}
      data-slot="data-table"
      data-status={status}
      className={cn(
        // Fully rounded by default so the box always closes itself off — no
        // per-page prop needed. When a footer strip is going to sit right
        // underneath, its bottom edge is squared off instead so the two join
        // into one shape, with the footer's own rounding doing the close-off.
        "min-w-0 rounded-[16px] border",
        clip && !sticky && "overflow-hidden",
        containerClassName,
        // Re-asserted after containerClassName so a caller-supplied rounding
        // can't reopen the bottom edge, and a caller-supplied overflow-x-auto
        // can't re-trap the sticky header/footer.
        pager.visible && "rounded-b-none",
        sticky && "overflow-x-visible",
      )}
      {...containerProps}
    >
      <Table
        className={cn(useFixedLayout && "table-fixed", className)}
        containerClassName={sticky ? "overflow-x-visible" : undefined}
      >
        {useFixedLayout ? (
          <DataTableColGroup columns={columns} minColumnWidth={minColumnWidth} />
        ) : null}
        <DataTableHeader
          columns={columns}
          stickyHeader={stickyHeader}
          headerRowClassName={headerRowClassName}
          sort={inertHeader ? undefined : sort}
          onSort={inertHeader ? undefined : onSort}
          headerRadius={headerRadius}
          disabled={inertHeader}
        />
        {/* Dimming <tbody> rather than the whole table keeps the header crisp,
            and matters with stickyHeader: <thead> is a sibling, so the stacking
            context that opacity creates here cannot trap it. Opacity and
            pointer-events don't affect layout, so there is no shift. */}
        <TableBody
          aria-busy={isRefreshing || undefined}
          className={cn(
            "transition-opacity duration-150",
            isRefreshing && "pointer-events-none opacity-60",
          )}
        >
          {body}
        </TableBody>
      </Table>
    </div>
  );

  if (!pager.visible) return <div className="mb-4 min-w-0">{tableBox}</div>;

  return (
    <div className="min-w-0 rounded-b-3xl">
      {tableBox}
      <div className={cn(stickyFooter && "sticky bottom-0", "bg-brand-purple-soft")}>
        <div className="min-h-11 rounded-b-2xl bg-card px-2">
          <DataTablePagination
            page={pager.page}
            pageSize={pager.pageSize}
            total={pager.total}
            onPageChange={pager.onPageChange}
            disabled={pager.disabled}
            labels={labels}
          />
        </div>
      </div>
    </div>
  );
}

export { DataTable };
