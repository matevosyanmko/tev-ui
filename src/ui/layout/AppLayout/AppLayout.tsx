import { cn } from "../../../utils.js";
import type { AppLayoutProps } from "./AppLayout.types.js";

/**
 * The authenticated-app shell: a header row, then a sidebar + main-content
 * row that fills the rest of the viewport. Slots only — routing, auth and
 * data all stay with the app; this component owns just the frame.
 *
 *   <AppLayout
 *     header={<AppHeader>…</AppHeader>}
 *     sidebar={<Sidebar>…</Sidebar>}
 *     toolbar={<SidebarSheet …><Sidebar>…</Sidebar></SidebarSheet>}
 *   >
 *     <Outlet />
 *   </AppLayout>
 *
 * Below `lg` the sidebar slot is not shown and the page gets the full width;
 * the `toolbar` row takes its place between the header and the page, and is
 * where a `<SidebarSheet>` opens the nav from. From `lg` up the toolbar is not
 * shown and the layout is the sidebar + page row.
 */
function AppLayout({ header, sidebar, toolbar, className, children, ...props }: AppLayoutProps) {
  return (
    <div
      data-slot="app-layout"
      className={cn("mx-auto flex h-dvh max-w-360 flex-col overflow-hidden p-3 lg:p-5", className)}
      {...props}
    >
      {header}
      {toolbar ? (
        <div
          data-slot="app-layout-toolbar"
          className="mt-3 flex h-12 shrink-0 items-center gap-2 lg:hidden"
        >
          {toolbar}
        </div>
      ) : null}
      <div data-slot="app-layout-body" className="mt-3 flex min-h-0 flex-1 gap-4 lg:mt-5">
        {/* `contents` from `lg` up, so the <aside> stays a direct flex item of
            the row exactly as it was before this wrapper existed. */}
        {sidebar ? (
          <div data-slot="app-layout-sidebar" className="contents max-lg:hidden">
            {sidebar}
          </div>
        ) : null}
        <main data-slot="app-layout-main" className="min-w-0 flex-1 overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}

export { AppLayout };
