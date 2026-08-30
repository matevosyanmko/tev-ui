import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

import { TableHead, TableHeader } from "../../primitives/Table/Table.js";
import { cn } from "../../../utils.js";
import { DATA_TABLE_HEADER_VARIANTS } from "./DataTable.variants.js";
import { columnStyle, getColumnKey, toCssSize } from "./DataTable.utils.js";
import type {
  DataTableColGroupProps,
  DataTableColumn,
  DataTableHeaderProps,
  SortState,
} from "./DataTable.types.js";

/**
 * Columns that don't specify a `width` are left to the browser's native
 * `table-layout: fixed` rule: split whatever space the widthed columns don't
 * claim evenly across the rest — no per-column pixel bookkeeping, and no
 * post-mount measurement that could shift the layout. `minColumnWidth` only
 * floors that share so columns don't get squeezed unreadably thin on a narrow
 * viewport; past that floor the table scrolls instead.
 */
function DataTableColGroup<Row>({ columns, minColumnWidth }: DataTableColGroupProps<Row>) {
  if (columns.length === 0) return null;
  return (
    <colgroup>
      {columns.map((column, index) => (
        <col
          key={getColumnKey(column, index)}
          style={
            column.width != null
              ? columnStyle(column)
              : minColumnWidth != null
                ? { minWidth: toCssSize(minColumnWidth) }
                : undefined
          }
        />
      ))}
    </colgroup>
  );
}

interface HeaderCellContentProps<Row> {
  column: DataTableColumn<Row>;
  sort?: SortState;
  onSort?: (key: string) => void;
  disabled: boolean;
  className: string;
}

function HeaderCellContent<Row>({
  column,
  sort,
  onSort,
  disabled,
  className,
}: HeaderCellContentProps<Row>) {
  // `column.key != null` is load-bearing: a table rendered without a `sort`
  // prop whose columns omit `key` would otherwise compare `undefined ===
  // undefined`, report itself as the active sort column, and read `sort.dir`
  // off nothing.
  const active = column.key != null && sort?.key === column.key;
  const Icon = !active ? ArrowUpDown : sort?.dir === "asc" ? ArrowUp : ArrowDown;

  return (
    <button
      type="button"
      data-slot="data-table-header-cell"
      disabled={disabled}
      onClick={() => column.key && onSort?.(column.key)}
      title={column.sortTitle}
      className={cn(
        "flex h-16 w-full shrink-0 items-center gap-1 rounded-t-2xl px-4",
        "text-left text-[12px] font-semibold whitespace-nowrap disabled:cursor-not-allowed",
        className,
      )}
    >
      {column.header ?? column.title}
      {column.sortable ? (
        <Icon size={12} aria-hidden="true" className={active ? undefined : "opacity-40"} />
      ) : null}
    </button>
  );
}

function DataTableHeader<Row>({
  columns,
  stickyHeader,
  headerRowClassName,
  sort,
  onSort,
  headerRadius = 0,
  disabled = false,
}: DataTableHeaderProps<Row>) {
  const lastIndex = columns.length - 1;

  return (
    <TableHeader className={cn(stickyHeader && "sticky top-0 z-10")}>
      <tr
        className={cn(
          "border-b-0",
          disabled && "pointer-events-none opacity-80",
          headerRowClassName,
        )}
      >
        {columns.map((column, index) => {
          const variant =
            DATA_TABLE_HEADER_VARIANTS[column.headerVariant ?? "default"] ??
            DATA_TABLE_HEADER_VARIANTS.default;

          return (
            <TableHead
              key={getColumnKey(column, index)}
              className={cn("bg-card p-0", column.headerClassName)}
              style={{
                ...columnStyle(column),
                borderTopLeftRadius: index === 0 ? headerRadius : undefined,
                borderTopRightRadius: index === lastIndex ? headerRadius : undefined,
              }}
            >
              <HeaderCellContent
                column={column}
                sort={sort}
                onSort={onSort}
                disabled={disabled}
                className={(disabled ? variant.disabledClassName : undefined) ?? variant.className}
              />
            </TableHead>
          );
        })}
      </tr>
    </TableHeader>
  );
}

export { DataTableColGroup, DataTableHeader };
