import * as React from "react";

/*
 * Which look a <DialogContent> was given, for the header, title and
 * description inside it. Its own module because it exports a context, not a
 * component, so Dialog.tsx stays a Fast Refresh boundary. The default keeps
 * every part exactly as it was; only a `panel` content restyles them.
 */
export const DialogContentVariantContext = React.createContext<"default" | "panel">("default");
