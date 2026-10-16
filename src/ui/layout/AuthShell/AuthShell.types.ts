import type * as React from "react";

export interface AuthShellArtProps extends React.ComponentProps<"div"> {
  /**
   * The brand artwork, cropped to fill the column (or the banner). Decorative.
   * Omitted, the art is the theme's `--brand-gradient`.
   */
  src?: string;
}

export interface AuthShellPanelProps extends React.ComponentProps<"main"> {
  /** Classes for the centred content column inside the panel. */
  contentClassName?: string;
}
