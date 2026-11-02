import type * as React from "react";

export interface PanelHeaderProps extends React.ComponentProps<"div"> {
  /** Renders the 21px close glyph at the end of the header and calls this. */
  onClose?: () => void;
  /** Accessible name of the close glyph. */
  closeLabel?: string;
}

export interface PanelCloseProps extends React.ComponentProps<"button"> {
  /** Accessible name; the glyph itself is decorative. */
  label?: string;
}

export interface PanelSectionProps extends React.ComponentProps<"div"> {
  /** The 10px section label above the rows ("Download", "Share"). */
  label?: React.ReactNode;
}

export interface PanelRowProps extends React.ComponentProps<"div"> {
  /**
   * A short label on the left, inset 12px like an unfilled pill (the filter
   * rows: "Date", "Time"). Names the row for assistive tech.
   */
  label?: React.ReactNode;
  /**
   * Running text on the left that takes the free width and wraps (the export
   * rows: "The summary ready to share").
   */
  description?: React.ReactNode;
  /** The control on the right: a Chip, a pill Select trigger, a Button. */
  children?: React.ReactNode;
}

export interface PanelFooterProps extends React.ComponentProps<"div"> {
  onDiscard?: () => void;
  onSave?: () => void;
  saveDisabled?: boolean;
  labels?: { discard?: string; save?: string };
}
