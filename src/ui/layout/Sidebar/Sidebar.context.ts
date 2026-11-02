import * as React from "react";

/*
 * The look a <Sidebar> was given, for the groups, items and footer inside it,
 * so `<Sidebar variant="boxed">` restyles the whole rail without each part
 * taking a prop. Its own module because it exports a context, not a
 * component (Fast Refresh). Under `default` every part renders exactly as it
 * did before the variant existed.
 */
export const SidebarVariantContext = React.createContext<"default" | "boxed">("default");
