import type * as React from "react";

export interface TruncatedTextProps extends React.ComponentProps<"span"> {
  /** Which side of the text the full-value tooltip opens on. Defaults to `top`. */
  side?: "top" | "right" | "bottom" | "left";
}
