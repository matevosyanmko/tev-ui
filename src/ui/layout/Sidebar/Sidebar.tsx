import type * as React from "react";

import { cn } from "../../../utils.js";

/** The nav-rail shell. Hidden below `md` — narrow viewports get no sidebar. */
function Sidebar({ className, ...props }: React.ComponentProps<"aside">) {
  return (
    <aside
      data-slot="sidebar"
      className={cn("hidden w-42 shrink-0 flex-col md:flex", className)}
      {...props}
    />
  );
}

/**
 * The scrollable nav list. `min-h-0` lets it scroll on short viewports; the
 * scrollbar is hidden so the treatment matches large displays.
 */
function SidebarNav({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      data-slot="sidebar-nav"
      className={cn(
        "flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        className,
      )}
      {...props}
    />
  );
}

/** One rounded card of joined `<SidebarItem>`s. `shrink-0` so groups never squash. */
function SidebarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group"
      className={cn("flex shrink-0 flex-col gap-1 rounded-[18px] bg-brand-surface-1 p-2", className)}
      {...props}
    />
  );
}

/** The cluster below the nav — a language switcher, logout, settings, etc. */
function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-footer"
      className={cn("mt-3 flex shrink-0 flex-col items-start gap-3 px-1", className)}
      {...props}
    />
  );
}

export { Sidebar, SidebarNav, SidebarGroup, SidebarFooter };
