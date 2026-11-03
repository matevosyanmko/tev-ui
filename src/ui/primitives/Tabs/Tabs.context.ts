import * as React from "react";
import type { VariantProps } from "class-variance-authority";

import type { tabsListVariants } from "./Tabs.variants.js";

/*
 * The variant a <TabsList> was given, for the <TabsTrigger>s inside it. Its
 * own module because it exports a context, not a component, so Tabs.tsx stays
 * a Fast Refresh boundary. Triggers only read it to add the `inverse` look;
 * under every other variant they render exactly as before.
 */
export const TabsListVariantContext =
  React.createContext<VariantProps<typeof tabsListVariants>["variant"]>("default");
