import * as React from "react";

/*
 * Which look a <SelectContent> was given, for the <SelectItem>s inside it.
 * Its own module because it exports a context, not a component, so
 * Select.tsx stays a Fast Refresh boundary. The default keeps every item
 * exactly as it was; only a `panel` content restyles its items.
 */
export const SelectContentVariantContext = React.createContext<"default" | "panel">("default");
