import type * as React from "react";

export type TableProps = React.ComponentProps<"table"> & {
  /** Classes for the scroll wrapper around the table. */
  containerClassName?: string;
};
