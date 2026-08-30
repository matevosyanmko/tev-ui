import type * as React from "react";

import { Slot } from "radix-ui";

import { cn } from "../../../utils.js";
import type { AppLogoProps } from "./AppLogo.types.js";

/**
 * Clickable brand mark. Navigation arrives as an element (`asChild`), the
 * same pattern as `<SidebarItem>` — the library carries no router dependency.
 *
 *   <AppLogo asChild>
 *     <Link to="/">
 *       <AppLogoMark src={logo} alt="" />
 *       <AppLogoWordmark src={wordmark} alt="Tevvoice" />
 *     </Link>
 *   </AppLogo>
 */
function AppLogo({ asChild = false, type = "button", className, ...props }: AppLogoProps) {
  const Comp = asChild ? Slot.Root : "button";
  return (
    <Comp
      data-slot="app-logo"
      type={asChild ? undefined : type}
      className={cn("flex shrink-0 items-center justify-center gap-5", className)}
      {...props}
    />
  );
}

/** The icon mark. Always visible, at whatever height the header gives it. */
function AppLogoMark({ alt = "", className, ...props }: React.ComponentProps<"img">) {
  return <img data-slot="app-logo-mark" alt={alt} className={cn("h-full", className)} {...props} />;
}

/**
 * The wordmark. Hidden below `sm` — the mark alone carries the brand at
 * narrow widths, matching the header's own responsive account cluster.
 */
function AppLogoWordmark({ className, ...props }: React.ComponentProps<"img">) {
  return (
    <img
      data-slot="app-logo-wordmark"
      className={cn("hidden h-8 w-auto sm:block", className)}
      {...props}
    />
  );
}

export { AppLogo, AppLogoMark, AppLogoWordmark };
