import type * as React from "react";

export interface SidebarProps extends React.ComponentProps<"aside"> {
  /**
   * Show the icon-only rail on desktop too, opening over the page (labels and
   * all) while a pointer is over it or keyboard focus is in it. Below `lg` the
   * rail is icon-only whatever this says.
   */
  collapsed?: boolean;
}
