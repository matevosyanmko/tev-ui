import type * as React from "react";

export interface AppLayoutProps extends React.ComponentProps<"div"> {
  /** The top chrome — typically an `<AppHeader>`. */
  header?: React.ReactNode;
  /** The nav rail — typically a `<Sidebar>`. Omit for a header-only shell. */
  sidebar?: React.ReactNode;
}
