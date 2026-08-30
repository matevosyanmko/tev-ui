import type * as React from "react";

export interface DropZoneLabels {
  /** Headline inside the drop box. */
  title?: React.ReactNode;
  /** Sub-line under the headline. */
  hint?: React.ReactNode;
  /** Accessible name and tooltip for a file's remove button. */
  remove?: string;
}

export interface DropZoneProps extends Omit<React.ComponentProps<"div">, "onChange" | "children"> {
  /** Same syntax as the <input accept> attribute, e.g. "audio/*". */
  accept?: string;
  multiple?: boolean;
  /** Controlled: the caller owns the file list. */
  files?: File[];
  onChange: (files: File[]) => void;
  disabled?: boolean;
  labels?: DropZoneLabels;
  /** Classes for the dashed box, not the outer wrapper. */
  boxClassName?: string;
}
