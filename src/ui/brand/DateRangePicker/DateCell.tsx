import type * as React from "react";

import { cn } from "../../../utils.js";

/**
 * One year or month cell.
 *
 * Year- and month-mode cells share the Calendar's day states — brand purple
 * when selected, a soft purple tint on hover — so switching modes doesn't
 * change what "selected" looks like.
 */
function DateCell({
  selected,
  className,
  ...props
}: React.ComponentProps<"button"> & { selected: boolean }) {
  return (
    <button
      type="button"
      data-slot="date-cell"
      data-selected={selected || undefined}
      className={cn(
        "h-9 rounded-xl border font-medium transition-colors",
        selected
          ? "border-transparent bg-brand-purple font-semibold text-brand-purple-foreground"
          : "border-black/10 text-popover-foreground hover:border-transparent hover:bg-brand-purple-soft hover:text-brand-purple",
        className,
      )}
      {...props}
    />
  );
}

export { DateCell };
