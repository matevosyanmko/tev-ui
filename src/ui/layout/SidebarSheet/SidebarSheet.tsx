"use client";

import type * as React from "react";
import { MenuIcon, XIcon } from "lucide-react";

import { cn } from "../../../utils.js";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "../../primitives/Sheet/Sheet.js";
import type { SidebarSheetProps } from "./SidebarSheet.types.js";

const TILE =
  "flex size-12 shrink-0 items-center justify-center rounded-[16px] bg-brand-surface-1 text-white outline-none transition-[filter] hover:brightness-125 focus-visible:ring-2 focus-visible:ring-brand-purple";

/**
 * The mobile way into the nav: a menu tile that opens the app's `<Sidebar>`
 * from the left edge, over the page. It belongs in `AppLayout`'s `toolbar`,
 * which is the only place it shows — below `lg`, where `AppLayout` does not
 * show its sidebar slot. Hand it the same `<Sidebar>` as that slot:
 *
 *   <AppLayout
 *     sidebar={nav}
 *     toolbar={<SidebarSheet open={open} onOpenChange={setOpen}>{nav}</SidebarSheet>}
 *   />
 *
 * Inside the panel the sidebar is the full rail, labels and all. A close tile
 * sits where the menu tile was, and following any link in the panel closes
 * it — a plain left click only, so a link opened in a new tab (modifier key or
 * `target="_blank"`) leaves the menu where it was. Controlled, so the app also
 * decides when it should close for reasons of its own (crossing to the
 * desktop layout, say).
 */
function SidebarSheet({ open, onOpenChange, labels, className, children }: SidebarSheetProps) {
  // Not gated on `defaultPrevented`: a client-side router's link prevents the
  // browser's navigation to do its own, and that is exactly the click to close on.
  function closeOnNavigate(event: React.MouseEvent<HTMLDivElement>) {
    if (event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = (event.target as Element).closest("a[href]");
    if (link && link.getAttribute("target") !== "_blank") onOpenChange(false);
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger
        data-slot="sidebar-sheet-trigger"
        aria-label={labels?.open ?? "Open menu"}
        className={cn(TILE, className)}
      >
        <MenuIcon aria-hidden="true" className="size-6" strokeWidth={1.5} />
      </SheetTrigger>

      <SheetContent
        side="left"
        showCloseButton={false}
        data-brand="sidebar-sheet"
        aria-describedby={undefined}
        onClick={closeOnNavigate}
        className="w-auto gap-3 border-0 bg-black p-3 pb-[max(--spacing(3),env(safe-area-inset-bottom))] sm:max-w-none [&>[data-slot=sidebar]]:min-h-0 [&>[data-slot=sidebar]]:flex-1"
      >
        <SheetTitle className="sr-only">{labels?.title ?? "Navigation"}</SheetTitle>
        <SheetClose aria-label={labels?.close ?? "Close menu"} className={TILE}>
          <XIcon aria-hidden="true" className="size-6" strokeWidth={1.5} />
        </SheetClose>
        {children}
      </SheetContent>
    </Sheet>
  );
}

export { SidebarSheet };
