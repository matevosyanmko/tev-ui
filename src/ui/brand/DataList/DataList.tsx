import type * as React from "react";
import { CircleAlert, RotateCw } from "lucide-react";

import { Button } from "../../primitives/Button/Button.js";
import { Item, ItemContent, ItemMedia } from "../../primitives/Item/Item.js";
import { Skeleton } from "../../primitives/Skeleton/Skeleton.js";
import { cn } from "../../../utils.js";
import { errorMessage as toErrorText } from "../DataTable/DataTable.utils.js";
import type { DataListProps } from "./DataList.types.js";

// Rows rendered straight into a group lose their own frame and become one
// card's hairline-divided lines. Written against the slot so a bare `<Item>`
// needs no extra classes; the selector outranks Item's own `border` classes.
const ROWS =
  "[&>[data-slot=item]]:rounded-none [&>[data-slot=item]]:border-x-0 [&>[data-slot=item]]:border-t-0 [&>[data-slot=item]]:border-b-border [&>[data-slot=item]:last-child]:border-b-transparent [&>[data-slot=item]:focus-visible]:ring-inset";

/**
 * The phone-sized counterpart of `DataTable`: the same rows as a list of
 * `Item`s on one card, with the same four states — skeleton rows while
 * pending, a message and Retry on error, the real rows dimmed while
 * refreshing. Below `lg` a table wide enough to be useful only scrolls
 * sideways; a list says the same things in the width there is.
 *
 *   <DataList status={status} error={error} onRetry={refetch}>
 *     <DataListGroup>
 *       <DataListHeading>Today</DataListHeading>
 *       {rows.map((row) => <Item key={row.id} asChild>…</Item>)}
 *     </DataListGroup>
 *   </DataList>
 *
 * Rows are the caller's, so a list is free to show what a phone needs rather
 * than a column per field. With nothing to list, render `<DataListEmpty>`.
 *
 * The card clips rather than hides its overflow, so a `DataListHeading`
 * still sticks to whichever ancestor scrolls the page.
 */
function DataList({
  status = "ready",
  error,
  onRetry,
  errorMessage,
  skeletonItems = 6,
  labels,
  className,
  children,
  ...props
}: DataListProps) {
  let body: React.ReactNode;
  if (status === "pending") {
    body = (
      <DataListGroup aria-hidden="true">
        {Array.from({ length: skeletonItems }, (_, index) => (
          <Item key={index} className="gap-3">
            <ItemMedia>
              <Skeleton className="size-9 rounded-lg" />
            </ItemMedia>
            <ItemContent className="gap-2">
              <Skeleton className="h-3.5 w-3/5" />
              <Skeleton className="h-3 w-2/5" />
            </ItemContent>
          </Item>
        ))}
      </DataListGroup>
    );
  } else if (status === "error") {
    body = (
      <div
        role="alert"
        data-slot="data-list-error"
        className="flex flex-col items-center gap-2 px-4 py-10 text-center text-sm text-destructive"
      >
        <CircleAlert size={20} aria-hidden="true" />
        <span>
          {errorMessage ?? toErrorText(error) ?? labels?.loadError ?? "Failed to load data"}
        </span>
        {onRetry ? (
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="mt-1"
            onClick={() => onRetry()}
          >
            <RotateCw size={14} aria-hidden="true" />
            {labels?.retry ?? "Retry"}
          </Button>
        ) : null}
      </div>
    );
  } else {
    body = children;
  }

  const refreshing = status === "refreshing";

  return (
    <div
      data-slot="data-list"
      data-status={status}
      aria-busy={status === "pending" || refreshing || undefined}
      className={cn(
        "overflow-clip rounded-[16px] border bg-card text-card-foreground transition-opacity duration-150",
        refreshing && "pointer-events-none opacity-60",
        className,
      )}
      {...props}
    >
      {body}
    </div>
  );
}

/** A run of rows, under an optional `DataListHeading`. */
function DataListGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      role="group"
      data-slot="data-list-group"
      className={cn("flex flex-col", ROWS, className)}
      {...props}
    />
  );
}

/**
 * A group's label — a day, a status — sticking to the top of the scroller
 * while its rows pass under it.
 */
function DataListHeading({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="data-list-heading"
      className={cn(
        "sticky top-0 z-10 border-b border-brand-lavender bg-brand-lavender-soft px-4 py-2 text-sm font-semibold text-foreground",
        className,
      )}
      {...props}
    />
  );
}

/** What the card says with no rows: a line of text, or an empty state of the app's own. */
function DataListEmpty({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="data-list-empty"
      className={cn("px-4 py-10 text-center text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

export { DataList, DataListEmpty, DataListGroup, DataListHeading };
