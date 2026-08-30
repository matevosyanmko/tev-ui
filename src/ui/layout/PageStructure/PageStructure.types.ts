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
  /** Classes for the content card (the filter row and header row sit outside it). */
  contentClassName?: string;
  /** Extra props spread onto the content card, e.g. a `data-tour` hook. */
  contentProps?: React.ComponentProps<"div">;
}
