import * as React from "react";

/*
 * The look a <Sidebar> was given, for the groups, items and footer inside it,
 * so `<Sidebar variant="boxed">` restyles the whole rail without each part
 * taking a prop. Its own module because it exports a context, not a
 * component (Fast Refresh). Under `default` every part renders exactly as it
 * did before the variant existed.
 *
 * One instance per page, not per bundle: `layout/Sidebar` and
 * `layout/SidebarItem` are separate entry points and tsup (splitting off)
 * inlines this module into both, so a plain `createContext` gave each its own
 * context and SidebarItem never saw the provider. Storybook resolves source,
 * where the module is shared, so it can't show the bug; a packed build can.
 * The registry key makes every copy hand out the same context object.
 */
type SidebarVariant = "default" | "boxed";

const KEY = Symbol.for("@tev-ui/ui/SidebarVariantContext");
const registry = globalThis as typeof globalThis & {
  [KEY]?: React.Context<SidebarVariant>;
};

export const SidebarVariantContext: React.Context<SidebarVariant> =
  registry[KEY] ?? (registry[KEY] = React.createContext<SidebarVariant>("default"));
