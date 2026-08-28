import type * as React from "react";

export interface SearchFieldProps extends React.ComponentProps<"input"> {
  /** Classes for the wrapper that positions the search icon. */
  className?: string;
  /** Classes for the <input> itself. */
  inputClassName?: string;
  containerProps?: React.ComponentProps<"div"> & Record<`data-${string}`, string>;
}
