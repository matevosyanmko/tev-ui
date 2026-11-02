import * as React from "react";
import { Slot } from "radix-ui";

import { cn } from "../../../utils.js";
import type { ChipProps } from "./Chip.types.js";
import { chipVariants } from "./Chip.variants.js";

/**
 * A small pill holding a short fact: a time range, a duration, a date, a
 * preset. Static by default — a <span>. With `selected` it is a toggle chip
 * (`aria-pressed`), and with `onClick` alone a plain button, which is also
 * what it becomes as a Radix trigger's `asChild` child, since the trigger
 * hands it an `onClick`.
 *
 *   <Chip size="sm">12:35m</Chip>
 *   <Chip selected={upcoming} onClick={() => setUpcoming(!upcoming)}>Upcoming</Chip>
 */
const Chip = React.forwardRef<HTMLButtonElement, ChipProps>(function Chip(
  {
    className,
    surface = "outline",
    size = "md",
    weight = "regular",
    selected,
    asChild = false,
    type,
    ...props
  },
  ref,
) {
  const interactive = selected !== undefined || props.onClick !== undefined;
  const Comp = asChild ? Slot.Root : interactive ? "button" : "span";

  return (
    <Comp
      ref={ref}
      data-slot="chip"
      data-surface={surface}
      data-size={size}
      aria-pressed={selected}
      type={interactive && !asChild ? (type ?? "button") : type}
      className={cn(chipVariants({ surface, size, weight, interactive }), className)}
      {...props}
    />
  );
});

export { Chip };
