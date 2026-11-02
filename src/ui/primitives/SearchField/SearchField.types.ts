import type * as React from "react";

export interface SearchFieldProps extends React.ComponentProps<"input"> {
  /** Classes for the wrapper that positions the search icon. */
  className?: string;
  /** Classes for the <input> itself. */
  inputClassName?: string;
  containerProps?: React.ComponentProps<"div"> & Record<`data-${string}`, string>;
  /** `pill`: TevScribe's toolbar search, a white pill with a black stroke. */
  variant?: "default" | "pill";
}
