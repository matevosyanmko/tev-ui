import type * as React from "react";

export interface AppLogoProps extends React.ComponentProps<"button"> {
  /**
   * Render the caller's own element instead of a <button>. This is how a
   * router link gets in — the library stays free of any routing dependency.
   */
  asChild?: boolean;
}
