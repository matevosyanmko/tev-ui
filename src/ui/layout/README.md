# Layout components

App-shell scaffolding: the chrome every authenticated page sits inside —
header, sidebar, filter bar, and the page-content frame. Composed from
primitives and brand components in `../primitives` and `../brand`.
Published as `@tev-ui/ui/layout/<Name>`; story titles go under `Layout/*`.

Same folder shape as brand: `index.tsx` is the published entry point,
`<Name>.tsx` holds the implementation, and non-component siblings
(`.types.ts`, …) exist only when they hold something. See the root
`CLAUDE.md` for the rules those files exist to satisfy.

## What is here

| Component | What it is |
| --- | --- |
| `AppLayout` | The page shell: a header row, then a sidebar + main-content row filling the rest of the viewport. Below `lg` the sidebar slot is not shown and an optional `toolbar` row (menu, page controls) sits under the header instead. Slots only — no routing, auth or data. |
| `AppLogo` | Clickable brand mark, plus its `Mark` and `Wordmark` image parts. |
| `AppHeader` | The top chrome row — a styled flex container the app fills with its own logo and account cluster. 48px below `lg`, 80px from `lg` up. |
| `AppFilterRow` | The dark horizontally-scrolling filter-strip shell: a sticky caption plus whatever filter controls the app drops in. |
| `FilterSheet` | The mobile form of `AppFilterRow`: a toolbar-sized trigger (count badge, optional summary) that opens the same filter controls as a sheet from the bottom. |
| `ActionDock` | SVG flag that notches into the bottom-right corner of `AppFilterRow` (or any relatively-positioned box) and carries its actions. The path is generated from the measured content width. |
| `Sidebar` | The nav-rail shell — `SidebarNav`, `SidebarGroup` and `SidebarFooter` parts around the app's own `SidebarItem`s. `collapsed` makes it an icon rail on desktop, opening over the page on hover or keyboard focus; style your own footer controls for the icon rail with the `sidebar-collapsed:` variant from `theme.css`. Below `lg` it opens in a `SidebarSheet` instead. |
| `SidebarSheet` | The mobile way into the nav: a menu tile for `AppLayout`'s `toolbar` that opens the app's `<Sidebar>` from the left, over the page, and closes when a link in it is followed. Controlled. |
| `SidebarItem` | One nav pill, plus its icon and label parts. |
| `PageTitle` | The default page heading — drops into `PageStructure`'s `title` slot. |
| `PageStructure` | The per-page frame: an optional filter-row slot, a title/leftSlot/centerSlot/rightSlot header row, then a scrollable content card. Below `lg` the header row stacks one slot per line, the right slot scrolling sideways. |

## The rules these components exist under

Same as brand (see `../brand/README.md`):

- **No app dependencies.** Nothing here imports a router, a query client, an
  i18n context, or an app domain type. `AppLayout` and `PageStructure` in
  particular own no state and no data — the app assembles its header, sidebar
  and filter row itself (wiring routing, i18n and its own domain filters) and
  hands the results in as slots.
- **Strings arrive as props**, with inline English fallbacks
  (`label = "Filter by"`).
- **Navigation arrives as an element**, through `asChild` (`AppLogo`,
  `SidebarItem`) — the caller hands in its own router `<Link>`.
- **No hardcoded colours.** Everything resolves through the tokens in
  `../../theme.css` — mainly `--brand-surface-1`, `--brand-surface-2` and
  `--brand-purple*`.
