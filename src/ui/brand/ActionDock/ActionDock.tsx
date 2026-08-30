"use client";

import * as React from "react";

import { cn } from "../../../utils.js";
import { ACTION_DOCK_HEIGHT, ACTION_DOCK_MIN_WIDTH } from "./buildDockPath.js";
import { useContentWidth } from "./useContentWidth.js";
import { DockShape } from "./DockShape.js";
import type { ActionDockProps } from "./ActionDock.types.js";

// Horizontal insets between the measured content and the shape drawn behind
// it. The left value is negative because the content overhangs the flat notch
// slightly. The matching vertical insets are the `pt-[9px] pr-5` on the content
// row below — only these two feed the width formula.
const PADDING_RIGHT = 20;
const PADDING_LEFT = -4;
const CONTENT_HEIGHT = 44;

/**
 * The action dock: a black SVG flag that notches into a content card's
 * top-right corner and carries that card's actions.
 *
 * The background shape is generated from the *measured* width of `children`,
 * so any number of buttons fits without a pre-rendered image per size — which
 * is what the hand-drawn `button_bg_*.svg` assets used to require.
 *
 * It stays `visibility: hidden` until the first measurement lands, so the
 * first paint is never a minimum-width shape snapping out to the real one.
 * The shape itself is `pointer-events: none`; only the content row takes
 * clicks, so the notch does not swallow presses meant for the card beneath.
 */
function ActionDock({ children, className, style, ...props }: ActionDockProps) {
  const contentRef = React.useRef<HTMLDivElement>(null);
  const contentWidth = useContentWidth(contentRef);

  if (!children) return null;

  const dockWidth = Math.max(contentWidth + PADDING_LEFT + PADDING_RIGHT, ACTION_DOCK_MIN_WIDTH);

  return (
    <div
      data-slot="action-dock"
      className={cn("pointer-events-none absolute top-[85.7px] -right-[5.5px]", className)}
      style={{
        width: dockWidth,
        height: ACTION_DOCK_HEIGHT,
        visibility: contentWidth ? "visible" : "hidden",
        ...style,
      }}
      {...props}
    >
      <DockShape width={dockWidth} className="absolute inset-0" />
      <div
        ref={contentRef}
        data-slot="action-dock-content"
        className="pointer-events-auto absolute -top-1 right-0 flex items-center gap-2 pt-[9px] pr-5"
        style={{ height: CONTENT_HEIGHT }}
      >
        {children}
      </div>
    </div>
  );
}

export { ActionDock };
