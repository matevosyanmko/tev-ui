import * as React from "react";

import { cn } from "../../../utils.js";

/**
 * The default page heading. Pages needing something richer (an icon, a badge,
 * a two-line title) render their own <h1> instead of stretching this one.
 *
 * Below `lg` it has `<PageStructure>`'s header line to itself, so a title
 * longer than a phone is wide wraps onto balanced lines instead of running off
 * the card. From `lg` up it shares one row with the slots and does not shrink.
 */
function PageTitle({ className, ...props }: React.ComponentProps<"h1">) {
  return (
    <h1
      data-slot="page-title"
      className={cn("min-w-0 text-2xl font-bold text-balance text-black lg:shrink-0", className)}
      {...props}
    />
  );
}

export { PageTitle };
