import type * as React from "react";

export interface ActionDockProps extends React.ComponentProps<"div"> {
  children: React.ReactNode;
}

export interface DockShapeProps extends Omit<
  React.ComponentProps<"svg">,
  "width" | "height" | "viewBox"
> {
  width: number;
  height?: number;
}
