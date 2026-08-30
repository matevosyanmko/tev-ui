import { cn } from "../../../utils.js";
import { ACTION_DOCK_HEIGHT, buildActionDockPath } from "./buildDockPath.js";
import type { DockShapeProps } from "./ActionDock.types.js";

/**
 * The dock silhouette on its own — the rounded flag that notches into a
 * content card's top-right corner, with no buttons over it.
 *
 * Exported separately from <ActionDock> because it is genuinely usable alone:
 * to preview the shape, or to recolour it by wrapping it in a text colour
 * (the path fills with `currentColor`).
 */
function DockShape({ width, height = ACTION_DOCK_HEIGHT, className, ...props }: DockShapeProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      aria-hidden="true"
      data-slot="dock-shape"
      className={cn("text-black", className)}
      {...props}
    >
      <path d={buildActionDockPath(width)} fill="currentColor" />
    </svg>
  );
}

export { DockShape };
