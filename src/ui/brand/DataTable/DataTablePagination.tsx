import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "../../../utils.js";
import type { DataTablePaginationProps } from "./DataTable.types.js";

const BUTTON_CLASS = cn(
  "inline-flex h-8 items-center gap-1 rounded-full border border-brand-lavender",
  "bg-card px-3 text-[12px] font-semibold text-black transition-colors",
  "hover:bg-brand-purple-soft disabled:cursor-not-allowed disabled:opacity-40",
);

/**
 * Footer pager. `page` is 1-based.
 *
 * DataTable computes `totalPages` itself and only mounts this when there is
 * more than one page, so there is no "nothing to page through" bailout here.
 * The two captions go through `labels` rather than a translate function so the
 * package carries no i18n dependency: the caller formats them with its own
 * plural rules and just hands back strings.
 */
function DataTablePagination({
  page,
  pageSize,
  total,
  onPageChange,
  disabled = false,
  labels,
}: DataTablePaginationProps) {
  const size = Math.max(1, Number(pageSize) || 1);
  const count = Math.max(0, Number(total) || 0);
  const totalPages = Math.max(1, Math.ceil(count / size));
  const current = Math.min(Math.max(1, page || 1), totalPages);
  const from = count === 0 ? 0 : (current - 1) * size + 1;
  const to = Math.min(current * size, count);

  return (
    <div
      data-slot="data-table-pagination"
      className="flex flex-wrap items-center justify-between gap-3 px-1 py-1.5"
    >
      <span className="text-[12px] text-muted-foreground">
        {labels?.range?.(from, to, count) ?? `${from}–${to} / ${count}`}
      </span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          className={BUTTON_CLASS}
          disabled={disabled || current <= 1}
          onClick={() => onPageChange(current - 1)}
        >
          <ChevronLeft size={14} aria-hidden="true" /> {labels?.prev ?? "Prev"}
        </button>
        <span className="text-[12px] text-muted-foreground">
          {labels?.page?.(current, totalPages) ?? `Page ${current} / ${totalPages}`}
        </span>
        <button
          type="button"
          className={BUTTON_CLASS}
          disabled={disabled || current >= totalPages}
          onClick={() => onPageChange(current + 1)}
        >
          {labels?.next ?? "Next"} <ChevronRight size={14} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

export { DataTablePagination };
