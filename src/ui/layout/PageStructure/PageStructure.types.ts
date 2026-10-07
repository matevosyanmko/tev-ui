import type * as React from "react";

export interface PageStructureProps extends Omit<React.ComponentProps<"div">, "title"> {
  /**
   * Optional filter bar, e.g. an app-composed `<AppFilterRow>`. Left `undefined`
   * entirely on pages with no filters — this component has no opinion on when
   * one should appear.
   */
  filterRow?: React.ReactNode;
  /** The page heading. Typed as a node, not a string — this shadows the
   * native `title` (tooltip) attribute of the outer `<div>` deliberately. */
  title?: React.ReactNode;
  leftSlot?: React.ReactNode;
  centerSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
  children: React.ReactNode;
  /**
   * Below `lg`, lay the children out as a flex column exactly as tall as the
   * card's remaining space instead of scrolling them inside it — for a page
   * whose content scrolls itself, like a table that has to scroll sideways
   * under a pinned header (a page-wide scroller would drag everything else
   * sideways with it). A child takes the height with `min-h-0` and does its
   * own scrolling. From `lg` up nothing changes.
   */
  fill?: boolean;
  /** Classes for the content card (the filter row and header row sit outside it). */
  contentClassName?: string;
  /** Extra props spread onto the content card, e.g. a `data-tour` hook. */
  contentProps?: React.ComponentProps<"div">;
}
