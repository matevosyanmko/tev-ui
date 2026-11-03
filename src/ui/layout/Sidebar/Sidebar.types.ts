import type * as React from "react";

export interface SidebarProps extends React.ComponentProps<"aside"> {
  /**
   * Show the icon-only rail on desktop, opening over the page (labels and
   * all) while a pointer is over it or keyboard focus is in it. No effect
   * below `lg`, where the sidebar opens in a `<SidebarSheet>` at full width.
   */
  collapsed?: boolean;
  /**
   * `boxed`: TevScribe's rail (100:41115) — 160px wide, each group an
   * outlined box, items a 40px icon over a 10px label, the current one a
   * white tile.
   */
  variant?: "default" | "boxed";
}
