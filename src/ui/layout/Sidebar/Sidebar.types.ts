import type * as React from "react";

export interface SidebarProps extends React.ComponentProps<"aside"> {
  /**
   * Show the icon-only rail on desktop, opening over the page (labels and
   * all) while a pointer is over it or keyboard focus is in it. No effect
   * below `lg`, where the sidebar opens in a `<SidebarSheet>` at full width.
   */
  collapsed?: boolean;
}
