"use client";

import { SlidersHorizontalIcon } from "lucide-react";

import { cn } from "../../../utils.js";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../primitives/Sheet/Sheet.js";
import type { FilterSheetProps } from "./FilterSheet.types.js";

/**
 * The mobile form of `AppFilterRow`: one trigger, sized to sit in
 * `AppLayout`'s toolbar next to the menu tile, that opens the filters as a
 * sheet from the bottom of the screen. The app owns which filters exist, the
 * same as with the strip — it hands in the same `<FilterGroup>`s, which the
 * sheet stacks one per row with each group's control pushed to the row's end.
 *
 * Filters still apply the moment they change; "Done" only closes the sheet.
 * The trigger carries a badge with how many filters are set (`count`) and an
 * optional `summary` — the date range, say — so the state reads without
 * opening it.
 */
function FilterSheet({
  count = 0,
  summary,
  disabled = false,
  onReset,
  open,
  onOpenChange,
  labels,
  className,
  children,
}: FilterSheetProps) {
  const title = labels?.title ?? "Filters";

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger
        data-slot="filter-sheet-trigger"
        disabled={disabled}
        className={cn(
          "flex h-12 min-w-0 flex-1 items-center gap-2 rounded-[16px] bg-brand-surface-1 px-4 text-left text-white",
          "transition-[filter,opacity] outline-none hover:brightness-125 focus-visible:ring-2 focus-visible:ring-brand-purple disabled:pointer-events-none disabled:opacity-50",
          className,
        )}
      >
        <SlidersHorizontalIcon aria-hidden="true" className="size-5 shrink-0" strokeWidth={1.5} />
        <span className="shrink-0 text-[13px] font-semibold">{labels?.trigger ?? "Filters"}</span>
        {count > 0 ? (
          <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-brand-green px-1.5 text-[11px] font-bold text-brand-green-foreground">
            {count}
          </span>
        ) : null}
        {summary ? (
          <span className="ml-auto min-w-0 truncate text-[11px] text-white/70">{summary}</span>
        ) : null}
      </SheetTrigger>

      <SheetContent
        side="bottom"
        showCloseButton={false}
        data-brand="filter-sheet"
        aria-describedby={undefined}
        className="max-h-[85dvh] gap-0 rounded-t-[24px] border-0 bg-brand-surface-1 text-white sm:mx-auto sm:max-w-lg"
      >
        <SheetHeader className="flex-row items-center justify-between p-4 pb-3">
          <SheetTitle className="text-base text-white">{title}</SheetTitle>
          {onReset && count > 0 ? (
            <button
              type="button"
              onClick={onReset}
              className="rounded-full px-3 py-1 text-[13px] font-semibold text-brand-green outline-none hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-brand-purple"
            >
              {labels?.reset ?? "Reset"}
            </button>
          ) : null}
        </SheetHeader>

        <div
          data-slot="filter-sheet-body"
          className="flex min-h-0 flex-col gap-2 overflow-y-auto px-4 [&>[data-slot=filter-group]]:w-full [&>[data-slot=filter-group]>:last-child]:ml-auto"
        >
          {children}
        </div>

        <SheetFooter className="p-4 pb-[max(--spacing(4),env(safe-area-inset-bottom))]">
          <SheetClose className="h-12 rounded-[16px] bg-brand-green text-[15px] font-semibold text-brand-green-foreground outline-none hover:brightness-95 focus-visible:ring-2 focus-visible:ring-brand-purple">
            {labels?.done ?? "Done"}
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export { FilterSheet };
