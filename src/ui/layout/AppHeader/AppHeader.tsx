import type * as React from "react";

import { cn } from "../../../utils.js";

/**
 * The top chrome row. A plain styled flex container — the app fills it with
 * its own `<AppLogo>` and account/notifications cluster; `justify-between`
 * pushes the first and last child apart the way a two-group header expects.
 */
function AppHeader({ className, ...props }: React.ComponentProps<"header">) {
  return (
    <header
      data-slot="app-header"
      className={cn("flex h-20 shrink-0 items-center justify-between gap-3", className)}
      {...props}
    />
  );
}

export { AppHeader };
