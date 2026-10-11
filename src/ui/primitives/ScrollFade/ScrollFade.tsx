import * as React from "react";
import { Slot } from "radix-ui";
import { cn } from "../../../utils.js";

import type { ScrollFadeProps } from "./ScrollFade.types.js";
import { scrollFadeVariants } from "./ScrollFade.variants.js";
import { useScrollEdges } from "./useScrollEdges.js";

/**
 * A scroll container whose edges fade out while there is more content beyond
 * them: no fade at the start until it is scrolled away from it, none at the
 * end once it reaches it. The fade is a mask, so it works on any background.
 *
 * `data-can-scroll-start` / `data-can-scroll-end` say where content is hidden
 * (for arrows or hints of the caller's own); `data-fade-start` /
 * `data-fade-end` say which fades are showing.
 */
const ScrollFade = React.forwardRef<HTMLDivElement, ScrollFadeProps>(function ScrollFade(
  {
    className,
    style,
    orientation = "vertical",
    hideScrollbar = false,
    fade = "both",
    fadeSize,
    onScrollEdgesChange,
    asChild = false,
    ...props
  },
  ref,
) {
  const [element, setElement] = React.useState<HTMLDivElement | null>(null);
  const edges = useScrollEdges(element, orientation);

  const setRefs = React.useCallback(
    (node: HTMLDivElement | null) => {
      setElement(node);
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    },
    [ref],
  );

  // Latest callback without re-running on every render's new function.
  const onEdgesChange = React.useRef(onScrollEdgesChange);
  onEdgesChange.current = onScrollEdgesChange;
  React.useEffect(() => {
    onEdgesChange.current?.(edges);
  }, [edges]);

  const fadeStart = edges.canScrollStart && (fade === "both" || fade === "start");
  const fadeEnd = edges.canScrollEnd && (fade === "both" || fade === "end");
  const Comp = asChild ? Slot.Root : "div";

  return (
    <Comp
      ref={setRefs}
      data-slot="scroll-fade"
      data-orientation={orientation}
      data-can-scroll-start={edges.canScrollStart || undefined}
      data-can-scroll-end={edges.canScrollEnd || undefined}
      data-fade-start={fadeStart || undefined}
      data-fade-end={fadeEnd || undefined}
      className={cn(scrollFadeVariants({ orientation, hideScrollbar }), className)}
      style={
        fadeSize === undefined
          ? style
          : ({
              "--scroll-fade-size": typeof fadeSize === "number" ? `${fadeSize}px` : fadeSize,
              ...style,
            } as React.CSSProperties)
      }
      {...props}
    />
  );
});

export { ScrollFade };
