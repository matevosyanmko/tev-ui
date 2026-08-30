import * as React from "react";

import { cn } from "../../../utils.js";

/**
 * The default page heading. Pages needing something richer (an icon, a badge,
 * a two-line title) render their own <h1> instead of stretching this one.
 */
function PageTitle({ className, ...props }: React.ComponentProps<"h1">) {
  return (
    <h1
      data-slot="page-title"
      className={cn("shrink-0 text-2xl font-bold text-black", className)}
      {...props}
    />
  );
}

export { PageTitle };
