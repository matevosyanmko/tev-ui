import * as React from "react";
import { Slot } from "radix-ui";

import { cn } from "../../../utils.js";
import type { ButtonProps } from "./Button.types.js";
import { buttonVariants } from "./Button.variants.js";

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = "default", size = "default", asChild = false, ...props },
  ref,
) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      ref={ref}
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
});

export { Button };
