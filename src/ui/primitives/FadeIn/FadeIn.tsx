import * as React from "react";
import { Slot } from "radix-ui";
import { cn } from "../../../utils.js";

import type { FadeInProps } from "./FadeIn.types.js";
import { fadeInVariants } from "./FadeIn.variants.js";

/**
 * Fades its content in when it mounts, optionally sliding, scaling or
 * sharpening into place. It plays once per mount: give it a `key` that
 * changes (a tab id, a step) to play it again for new content. Pure CSS, so
 * it costs nothing after the first frames, and it is skipped for anyone who
 * prefers reduced motion.
 */
const FadeIn = React.forwardRef<HTMLDivElement, FadeInProps>(function FadeIn(
  {
    className,
    style,
    from = "none",
    distance,
    duration,
    delay,
    easing,
    scale,
    blur,
    asChild = false,
    ...props
  },
  ref,
) {
  const Comp = asChild ? Slot.Root : "div";

  // Only what was asked for goes inline, so classes (duration-500, ease-in,
  // [--fade-in-distance:2rem]) still work for whatever is left unset.
  const vars: Record<string, string> = {};
  if (distance !== undefined)
    vars["--fade-in-distance"] = typeof distance === "number" ? `${distance}px` : distance;
  if (duration !== undefined) vars["--tw-animation-duration"] = `${duration}ms`;
  if (delay !== undefined) vars["--tw-animation-delay"] = `${delay}ms`;
  if (easing !== undefined) vars["--tw-ease"] = easing;
  if (scale !== undefined) vars["--tw-enter-scale"] = String(scale);
  if (blur !== undefined) vars["--tw-enter-blur"] = `${blur}px`;

  return (
    <Comp
      ref={ref}
      data-slot="fade-in"
      data-from={from}
      className={cn(fadeInVariants({ from }), className)}
      style={{ ...vars, ...style } as React.CSSProperties}
      {...props}
    />
  );
});

export { FadeIn };
