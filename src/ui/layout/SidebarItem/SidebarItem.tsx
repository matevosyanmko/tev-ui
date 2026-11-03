import * as React from "react";

import { Slot } from "radix-ui";

import { cn } from "../../../utils.js";
import { SidebarVariantContext } from "../Sidebar/Sidebar.context.js";
import type { SidebarItemIconProps, SidebarItemProps } from "./SidebarItem.types.js";

/**
 * One flat pill in the sidebar nav.
 *
 * The group card around it supplies the dark surface and padding, so the item
 * stays transparent until it is active — then it becomes a purple pill inset
 * in the card.
 *
 * In an icon-only sidebar the item is a square tile: its padding centres the
 * 32px icon in the 64px card width, and the label fades out but stays in the
 * accessibility tree, so the link keeps its name. `overflow-hidden` keeps the
 * hidden label from spilling out while the rail opens.
 *
 * Composed rather than configured: the caller supplies the link element
 * (`asChild`) and drops <SidebarItemIcon> / <SidebarItemLabel> inside it. That
 * keeps the icon size and the two-line label clamp in the library while
 * leaving the navigation mechanism entirely to the app.
 *
 *   <SidebarItem asChild active={isActive}>
 *     <Link to={to}>
 *       <SidebarItemIcon icon={HomeIcon} />
 *       <SidebarItemLabel>Analytics</SidebarItemLabel>
 *     </Link>
 *   </SidebarItem>
 */
function SidebarItem({ active = false, asChild = false, className, ...props }: SidebarItemProps) {
  const Comp = asChild ? Slot.Root : "a";
  const boxed = React.useContext(SidebarVariantContext) === "boxed";

  if (boxed) {
    // A 64px row in the outlined group: 12px in, a 40px icon, 8px, the
    // label. The current item is a white tile with a 3px ink stroke inside
    // it (100:41115 Home, 100:40457 Usage, 100:40567 Settings): a border
    // with the padding cut by 3px so nothing moves, and the white clipped to
    // inside it so no white fringe shows around the rounded corners. Hover
    // tints the row; as in the default look, only hovering animates.
    return (
      <Comp
        data-slot="sidebar-item"
        data-active={active || undefined}
        aria-current={active ? "page" : undefined}
        className={cn(
          "flex h-16 w-full shrink-0 items-center gap-2 overflow-hidden rounded-16 p-3 leading-normal outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
          active
            ? "border-3 border-stroke-ink bg-surface-primary bg-clip-padding p-2.25 text-content-primary"
            : "text-content-inverse hover:bg-surface-primary/10 hover:transition-colors hover:duration-(--duration-fast) hover:ease-standard motion-reduce:hover:transition-none",
          className,
        )}
        {...props}
      />
    );
  }

  return (
    <Comp
      data-slot="sidebar-item"
      data-active={active || undefined}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex h-16 w-full items-center gap-4 overflow-hidden rounded-3xl px-4 leading-tight",
        // The colour fade belongs to hovering only. Animating the active change
        // too had the old item fade out while the new one faded in, so on every
        // navigation both read as active for a moment.
        active
          ? "bg-brand-purple text-brand-purple-foreground"
          : "text-white/70 hover:bg-white/5 hover:text-white hover:transition-colors",
        className,
      )}
      {...props}
    />
  );
}

function SidebarItemIcon({ icon: Icon, className }: SidebarItemIconProps) {
  // The boxed rail's glyphs are 40px tiles with their own padding (the
  // ScribeIcons Nav* set); the default rail's are 32px.
  const boxed = React.useContext(SidebarVariantContext) === "boxed";
  return <Icon size={boxed ? 40 : 32} strokeWidth={1.5} className={cn("shrink-0", className)} />;
}

/**
 * The label clamps to two lines rather than truncating: the longest Armenian
 * nav label ("վերլուծություն") does not fit on one, and an ellipsis there
 * would hide which section the item is.
 *
 * In an icon-only sidebar it is transparent rather than removed, so screen
 * readers still read it. It fades in after a short delay as the rail opens,
 * once the item is wide enough not to show the text reflowing, and vanishes at
 * once as the rail closes.
 */
function SidebarItemLabel({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="sidebar-item-label"
      className={cn(
        "line-clamp-2 min-w-0 text-[10px] wrap-break-word",
        "transition-opacity delay-100 duration-150 motion-reduce:transition-none sidebar-collapsed:opacity-0 sidebar-collapsed:delay-0",
        className,
      )}
      {...props}
    />
  );
}

export { SidebarItem, SidebarItemIcon, SidebarItemLabel };
