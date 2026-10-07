import type * as React from "react";

import { cn } from "../../../utils.js";

/**
 * The top chrome row. A plain styled flex container — the app fills it with
 * its own `<AppLogo>` and account/notifications cluster; `justify-between`
 * pushes the first and last child apart the way a two-group header expects.
 *
 * 48px tall below `lg`, 80px from `lg` up. `<AppLogoMark>` takes the row's
 * height, so the brand tile follows it; size the app's own header tiles the
 * same way (`size-12 lg:size-20`).
 */
function AppHeader({ className, ...props }: React.ComponentProps<"header">) {
  return (
    <header
      data-slot="app-header"
      className={cn("flex h-12 shrink-0 items-center justify-between gap-3 lg:h-20", className)}
      {...props}
    />
  );
}

export { AppHeader };
