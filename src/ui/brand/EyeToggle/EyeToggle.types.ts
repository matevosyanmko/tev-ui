import type * as React from "react";

export interface EyeToggleProps
  extends Omit<React.ComponentProps<"button">, "children" | "type"> {
  /** Whether the password is currently readable. */
  visible: boolean;
  onToggle: () => void;
  /** Accessible names for the two states. */
  labels?: {
    show?: string;
    hide?: string;
  };
}
