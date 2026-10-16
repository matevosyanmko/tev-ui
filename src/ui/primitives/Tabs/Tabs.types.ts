import type * as React from "react";
import type { VariantProps } from "class-variance-authority";
import type { Tabs as TabsPrimitive } from "radix-ui";

import type { tabsListVariants } from "./Tabs.variants.js";

export interface TabsListProps
  extends React.ComponentProps<typeof TabsPrimitive.List>, VariantProps<typeof tabsListVariants> {}
