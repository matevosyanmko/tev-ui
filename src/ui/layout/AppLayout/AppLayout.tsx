import { cn } from "../../../utils.js";
import type { AppLayoutProps } from "./AppLayout.types.js";

/**
 * The authenticated-app shell: a header row, then a sidebar + main-content
 * row that fills the rest of the viewport. Slots only — routing, auth and
 * data all stay with the app; this component owns just the frame.
 *
 *   <AppLayout header={<AppHeader>…</AppHeader>} sidebar={<Sidebar>…</Sidebar>}>
 *     <Outlet />
 *   </AppLayout>
 */
function AppLayout({ header, sidebar, className, children, ...props }: AppLayoutProps) {
  return (
    <div
      data-slot="app-layout"
      className={cn("mx-auto flex h-dvh max-w-360 flex-col overflow-hidden p-5", className)}
      {...props}
    >
      {header}
      <div data-slot="app-layout-body" className="mt-5 flex min-h-0 flex-1 gap-4">
        {sidebar}
        <main data-slot="app-layout-main" className="min-w-0 flex-1 overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}

export { AppLayout };
