import type * as React from "react";

export interface SidebarItemProps extends React.ComponentProps<"a"> {
  /** Current route matches this item. */
  active?: boolean;
  /**
   * Render the caller's own element instead of an <a>. This is how a router
   * link gets in — the library stays free of any routing dependency.
   */
  asChild?: boolean;
}

export interface SidebarItemIconProps {
  /**
   * Typed as a component so the item owns the glyph size. Sidebar icons are
   * 32px everywhere; letting callers pass a pre-sized element is how a nav
   * ends up with three different icon weights.
   */
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  className?: string;
}
