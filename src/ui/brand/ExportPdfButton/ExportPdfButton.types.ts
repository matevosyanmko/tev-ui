import type * as React from "react";

export interface ExportPdfButtonProps
  extends Omit<React.ComponentProps<"button">, "children"> {
  /** Button text. Supply the translated string; there is no default. */
  label: React.ReactNode;
}
