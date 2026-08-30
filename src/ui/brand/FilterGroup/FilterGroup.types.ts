import type * as React from "react";

export interface FilterGroupProps extends React.ComponentProps<"div"> {
  /**
   * Leading glyph. Typed as a component rather than an element so the group
   * owns the icon's size — every filter strip icon is 24px, and letting
   * callers pass `<Icon size={18} />` is how strips drift apart.
   */
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  label: React.ReactNode;
}
