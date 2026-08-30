import type * as React from "react";

import type { CssSize, DataTableColumn, RowKey } from "./DataTable.types.js";

/** Reads a field off a row; an array `dataIndex` walks nested objects. */
export function getNestedValue(
  row: unknown,
  dataIndex: string | string[] | null | undefined,
): unknown {
  if (dataIndex == null) return undefined;
  if (Array.isArray(dataIndex)) {
    return dataIndex.reduce<unknown>(
      (acc, key) => (acc as Record<string, unknown> | undefined)?.[key],
      row,
    );
  }
  return (row as Record<string, unknown>)[dataIndex];
}

export function getRowKey<Row>(
  row: Row,
  rowKey: RowKey<Row> | undefined,
  fallbackKey: React.Key,
): React.Key {
  if (!rowKey) return fallbackKey;
  return typeof rowKey === "function"
    ? rowKey(row)
    : ((row as Record<string, unknown>)[rowKey] as React.Key);
}

export function getColumnKey(
  column: DataTableColumn<never>,
  fallbackKey: React.Key,
): React.Key {
  const key = column.key ?? column.dataIndex ?? fallbackKey;
  return Array.isArray(key) ? key.join(".") : key;
}

export function toCssSize(value: CssSize | undefined): string | undefined {
  return typeof value === "number" ? `${value}px` : value;
}

/**
 * Locks a column to a fixed width (under `fixedLayout`) so it cannot shrink or
 * grow once real data replaces the loading or empty state.
 */
export function columnStyle(
  column: DataTableColumn<never>,
): React.CSSProperties | undefined {
  if (column.width == null) return undefined;
  return {
    width: toCssSize(column.width),
    minWidth: toCssSize(column.minWidth ?? column.width),
  };
}

/**
 * Message from a thrown value. `catch` bindings are `unknown` under strict
 * mode, and a table can be handed either a real Error or a plain `{ message }`
 * from a rejected library promise — both are handled here.
 */
export function errorMessage(error: unknown): string | undefined {
  if (error instanceof Error) return error.message || undefined;
  if (typeof error === "object" && error !== null && "message" in error) {
    return String((error as { message?: unknown }).message ?? "") || undefined;
  }
  return undefined;
}

// Shared row look, so every row a DataTable can draw — real, empty, skeleton,
// error — matches the same white-row / lavender-divider convention rather than
// shadcn's default.
export const ROW_CLASS = "border-b border-brand-lavender bg-card";
export const ROW_HOVER_CLASS = "transition-colors hover:bg-brand-purple-soft";

// Non-interactive row variant (empty / error / skeleton placeholders). The base
// TableRow always ships its own `hover:bg-muted/50`, so a row with nothing to
// click has to cancel it explicitly — otherwise it still lights up on hover.
export const ROW_STATIC_CLASS = `${ROW_CLASS} hover:bg-card`;
