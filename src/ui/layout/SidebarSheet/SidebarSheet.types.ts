import type * as React from "react";

export interface SidebarSheetProps {
  /** Controlled: the app owns whether the panel is open. */
  open: boolean;
  /**
   * Called with `false` on Escape, on a press outside, on the close tile, and
   * when a link inside the panel is followed.
   */
  onOpenChange: (open: boolean) => void;
  /** Accessible names. English fallbacks; a caller passes translated text. */
  labels?: {
    /** The menu tile that opens the panel. */
    open?: string;
    /** The close tile inside the panel. */
    close?: string;
    /** The panel's dialog title, read by screen readers only. */
    title?: string;
  };
  /** Classes for the menu tile. */
  className?: string;
  /** The app's `<Sidebar>` — the same one it hands to `AppLayout`. */
  children: React.ReactNode;
}
