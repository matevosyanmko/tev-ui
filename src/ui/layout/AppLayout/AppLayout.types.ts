import type * as React from "react";

export interface AppLayoutProps extends React.ComponentProps<"div"> {
  /** The top chrome — typically an `<AppHeader>`. */
  header?: React.ReactNode;
  /**
   * The nav rail — typically a `<Sidebar>`. Omit for a header-only shell.
   * Shown from `lg` up only; below it, reach the nav through a
   * `<SidebarSheet>` in `toolbar`.
   */
  sidebar?: React.ReactNode;
  /**
   * A mobile-only row (below `lg`) between the header and the page: usually a
   * `<SidebarSheet>` followed by the page's own compact controls, such as a
   * `<FilterSheet>`. Not rendered from `lg` up.
   */
  toolbar?: React.ReactNode;
}
