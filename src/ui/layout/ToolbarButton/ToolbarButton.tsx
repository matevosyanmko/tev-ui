import * as React from "react";
import { Slot } from "radix-ui";

import { cn } from "../../../utils.js";
import type { ToolbarButtonProps } from "./ToolbarButton.types.js";
import { toolbarButtonVariants } from "./ToolbarButton.variants.js";

/**
 * A control for `AppLayout`'s mobile toolbar row, at the row's 48px and in the
 * shape of the `SidebarSheet` tile beside it: a page's own action ("New
 * meeting"), a way back, a refresh. Icon-only, it is a square tile — give it an
 * `aria-label`. Forwards its ref, so it also works as a Radix trigger.
 *
 * Put the label in a <span>: the button shrinks when the row runs out of
 * room, and a span label is what gets cut with an ellipsis.
 *
 *   <AppLayout toolbar={<><SidebarSheet …/><ToolbarButton variant="primary">New</ToolbarButton></>} />
 */
const ToolbarButton = React.forwardRef<HTMLButtonElement, ToolbarButtonProps>(
  function ToolbarButton(
    { className, variant = "default", asChild = false, type = "button", ...props },
    ref,
  ) {
    const Comp = asChild ? Slot.Root : "button";
    return (
      <Comp
        ref={ref}
        data-slot="toolbar-button"
        data-variant={variant}
        type={asChild ? undefined : type}
        className={cn(toolbarButtonVariants({ variant, className }))}
        {...props}
      />
    );
  },
);

export { ToolbarButton };
