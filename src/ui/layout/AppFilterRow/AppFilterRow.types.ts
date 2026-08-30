import type * as React from "react";

export interface AppFilterRowProps extends React.ComponentProps<"div"> {
  /** Leading caption. English fallback — a caller passes already-translated text. */
  label?: React.ReactNode;
  /** Dims the strip and blocks pointer events on every filter inside it. */
  disabled?: boolean;
}
