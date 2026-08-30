import * as React from "react";

import { cn } from "../../../utils.js";
import { gradientButtonFrameVariants, gradientButtonVariants } from "./GradientButton.variants.js";
import type { GradientButtonProps } from "./GradientButton.types.js";

/**
 * The brand gradient call-to-action (Figma node 635:23544).
 *
 * Two elements, not one: the black frame is part of the design — the pill is
 * always inset in it — so `className` styles the pill (the thing a caller
 * reaches for) and `frameClassName` is the escape hatch for the frame. The ref
 * targets the <button>, which is the element worth focusing or measuring.
 */
const GradientButton = React.forwardRef<HTMLButtonElement, GradientButtonProps>(
  function GradientButton(
    { children, size = "lg", className, frameClassName, type = "button", ...props },
    ref,
  ) {
    return (
      <span
        data-slot="gradient-button-frame"
        className={cn(gradientButtonFrameVariants({ size, className: frameClassName }))}
      >
        <button
          ref={ref}
          type={type}
          data-slot="gradient-button"
          data-size={size}
          className={cn(gradientButtonVariants({ size, className }))}
          {...props}
        >
          {children}
        </button>
      </span>
    );
  },
);

export { GradientButton };
