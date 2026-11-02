import type * as React from "react";
import type { Select as SelectPrimitive } from "radix-ui";

export type SelectTriggerProps = React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  /** `lg` applies to the `pill` variant only: the 40px settings pill. */
  size?: "default" | "sm" | "lg";
  /**
   * `pill`: TevScribe's language pill — white, black stroke, a 16px media
   * circle, the value and an 8px chevron.
   */
  variant?: "default" | "pill";
  /**
   * Leading 16px circle on the `pill` trigger: the current language's flag,
   * as an <img> or any element. The package ships no flags.
   */
  media?: React.ReactNode;
};

export type SelectContentProps = React.ComponentProps<typeof SelectPrimitive.Content> & {
  /**
   * `panel`: a white panel with a black stroke whose options are outlined
   * pills, the chosen one filled ink.
   */
  variant?: "default" | "panel";
};
