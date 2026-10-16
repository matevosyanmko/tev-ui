import type * as React from "react";
import type { VariantProps } from "class-variance-authority";

import type { googleSignInButtonVariants } from "./GoogleSignInButton.variants.js";

export interface GoogleSignInButtonProps
  extends React.ComponentProps<"button">, VariantProps<typeof googleSignInButtonVariants> {
  /**
   * Render the caller's own element instead of a <button> — an <a> to the
   * backend route that starts the OAuth flow, usually. The Google mark is
   * placed in front of that element's own text.
   */
  asChild?: boolean;
}
