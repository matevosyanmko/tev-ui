import type { DataTableColumn } from "./DataTable.types.js";

export interface DataTableHeaderVariant {
  /** Classes for the header cell's inner button. */
  className: string;
}

/**
 * Header cell look is owned here, not by callers — a column only ever supplies
 * size (`width`/`minWidth`) and content (`title`/`header`). `headerVariant`
 * picks from a small fixed set of roles rather than letting pages hand in raw
 * colours.
 *
 * Kept out of DataTableHeader.tsx for the same React Fast Refresh reason as a
 * cva map — a component file that exports anything else remounts instead of
 * hot-swapping. Every class is written out in full: Tailwind scans source text,
 * so a variant assembled at runtime compiles to nothing.
 */
export const DATA_TABLE_HEADER_VARIANTS: Record<
  NonNullable<DataTableColumn["headerVariant"]>,
  DataTableHeaderVariant
> = {
  default: {
    className: "bg-brand-purple text-brand-purple-foreground",
  },
  plain: {
    className: "justify-center bg-brand-lavender px-0! text-muted-foreground",
  },
  action: {
    className: "justify-center bg-brand-lavender text-black",
  },
  // TevScribe's usage table (100:40457): ink cells with a 16px top radius,
  // the title in 14px bold white.
  inverse: {
    className: "rounded-t-16 bg-surface-inverse text-heading-14 font-bold text-content-inverse",
  },
};
