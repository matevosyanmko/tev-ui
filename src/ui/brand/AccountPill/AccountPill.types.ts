import type * as React from "react";

export interface AccountPillProps extends React.ComponentProps<"button"> {
  /**
   * The top line, and what the initials are derived from.
   *
   * `fullName` rather than `name` because `name` on the underlying element is
   * the form-control name — taking it would shadow a real attribute, and the
   * two would be indistinguishable at the call site.
   */
  fullName?: string;
  /**
   * The second line: job title, permission level, team — whatever the product
   * shows under a name. Omitted, the top line centres itself on the avatar.
   *
   * `position` rather than `role` because `role` is the ARIA attribute, which
   * a caller still needs to be able to set — especially under `asChild`.
   */
  position?: string;
  /** Overrides the initials derived from `fullName`. */
  initials?: string;
  /**
   * Render the caller's own element instead of a <button>. This is how a
   * router link gets in — the library stays free of any routing dependency.
   */
  asChild?: boolean;
  labels?: {
    /** Shown in place of a name when there is none. Defaults to "User". */
    unknownUser?: string;
  };
}
