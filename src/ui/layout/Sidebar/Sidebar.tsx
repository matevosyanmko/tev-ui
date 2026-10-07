import type * as React from "react";

import { cn } from "../../../utils.js";
import type { SidebarProps } from "./Sidebar.types.js";

/**
 * The nav-rail shell. Below `lg` it is always the icon-only rail; from `lg` up
 * it is the full rail with labels, or with `collapsed` the icon rail again,
 * opening over the page while a pointer is over it or keyboard focus is in it.
 *
 * Which state shows is pure CSS — the `sidebar-collapsed:` variant from
 * theme.css — so the component owns no state, and an app styles its own
 * footer controls with the same variant.
 *
 * A collapsed desktop rail keeps the <aside> at the icon width in the layout
 * and opens the panel inside it absolutely, so opening it never reflows the
 * page beside it. That needs a parent that gives the <aside> its height, as
 * `AppLayout`'s row does.
 */
function Sidebar({ collapsed = false, className, children, ...props }: SidebarProps) {
  return (
    <aside
      data-slot="sidebar"
      data-collapsed={collapsed || undefined}
      className={cn(
        "group/sidebar flex w-20 shrink-0 flex-col lg:w-42 lg:data-collapsed:relative lg:data-collapsed:w-20",
        className,
      )}
      {...props}
    >
      <div
        data-slot="sidebar-panel"
        className={cn(
          "flex min-h-0 w-full flex-1 flex-col",
          "transition-[width] duration-200 ease-out motion-reduce:transition-none",
          // Collapsed on desktop: lift the panel out of the flow, over the
          // page, painted in the page ink so what it covers stays hidden. The
          // solid shadow is the open rail's gutter: it repeats the layout's
          // 1rem gap past the panel's edge, and sits over that same gap (so
          // shows nothing) while the rail is closed.
          "lg:group-data-collapsed/sidebar:absolute lg:group-data-collapsed/sidebar:inset-y-0 lg:group-data-collapsed/sidebar:left-0 lg:group-data-collapsed/sidebar:z-30 lg:group-data-collapsed/sidebar:bg-black lg:group-data-collapsed/sidebar:shadow-[1rem_0_0_var(--black)]",
          // …and open it to the full rail width. Same two conditions as the
          // `sidebar-collapsed` variant, so labels appear as the panel opens.
          "lg:group-data-collapsed/sidebar:group-hover/sidebar:w-42 lg:group-data-collapsed/sidebar:group-has-focus-visible/sidebar:w-42",
        )}
      >
        {children}
      </div>
    </aside>
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
        "flex min-h-0 flex-1 [scrollbar-width:none] flex-col gap-3 overflow-y-auto [&::-webkit-scrollbar]:hidden",
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
      className={cn(
        "flex shrink-0 flex-col gap-1 rounded-[18px] bg-brand-surface-1 p-2",
        className,
      )}
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
