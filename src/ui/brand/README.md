# Brand components

Tevvoice-branded components composed from the primitives in `../primitives`.
Published as `@tev-ui/ui/brand/<Name>`; story titles go under `Brand/*`.

Same folder shape as a primitive: `index.tsx` is the published entry point,
`<Name>.tsx` holds the implementation, and non-component siblings
(`.types.ts`, `.variants.ts`, `.utils.ts`, `.constants.ts`, …) exist only when
they hold something. See the root `CLAUDE.md` for the rules those files exist
to satisfy.

## What is here

| Component | What it is |
| --- | --- |
| `DataTable` | The generic table shell: status-driven body, sticky header/footer, client- or server-driven paging. |
| `DateRangePicker` | The global date filter — year, month and custom modes behind one trigger. |
| `DropZone` | Click-or-drag file picker with an inline list of what was chosen. |
| `ErrorBoundary` | Crash barrier with a recovery panel, or your own via `fallback`. |
| `ExportPdfButton` | The green "export" pill. |
| `EyeToggle` | Password reveal toggle, with the three-glyph Figma flow. |
| `FilterDropdown` | The green pill that opens a single-select filter menu. |
| `FilterGroup` | One labelled icon + control cluster in a filter strip. |
| `GradientButton` | The brand gradient CTA. |
| `Icons` | Figma-exported brand glyphs, drop-in for lucide icons. |
| `LangPicker` | The green language pill that drops upwards. |
| `NotificationBell` | The header bell and its notification panel. |
| `OnboardingChecklist` | The "let's get started" progress panel. |
| `ProductTour` | Scrim, spotlight ring and step card for a guided walkthrough. |
| `SectionBanner` | The lavender section divider used across dashboards. |
| `SelectionBox` | The square row-selection checkbox. |
| `WelcomeDialog` | The full-screen onboarding welcome card. |

## Two rules these components exist under

**No app dependencies.** Nothing here imports a router, a query client, an
i18n context or an app domain type — that is what makes them storyboardable and
reusable across projects. Concretely:

- **Strings arrive as props**, through a `labels` object with English
  fallbacks (`labels?.retry ?? "Retry"`). A caller passes already-translated
  text; the package carries no translator and no dictionary. Anything with
  locale or plural rules in it is a *function* prop instead — see
  `NotificationBell`'s `formatTime`.
- **Navigation arrives as an element**, through `asChild` — see `../layout`'s
  `SidebarItem` and `AppLogo`. The caller hands in its own `<Link>`.
- **Domain vocabulary is translated at the boundary.** `NotificationBell` takes
  a `tone` of `default | success | warning | danger`, not the app's
  `type`/`severity` pair; `FilterDropdown` takes `tone: "danger"` on an option
  rather than recognising a value spelled `"disabled"`. The app owns the
  mapping.

**Never re-slot a primitive.** Every primitive spreads `{...props}` last, so a
`data-slot` passed to `<PopoverContent>` *replaces* the one the primitive set —
and takes its descendant selectors down with it (`Calendar` goes transparent
inside a popover through `[[data-slot=popover-content]_&]:bg-transparent`).
Use `data-brand="<kebab-name>"` for a brand component's own hook on a primitive
part; keep `data-slot` for the elements it renders itself.

**No hardcoded colours.** Everything resolves through the tokens declared in
`../../theme.css`. The brand set these components lean on is
`--brand-purple{,-foreground,-soft,-hover}`, `--brand-green{,-foreground}`,
`--brand-lavender{,-soft}`, `--brand-coral`, `--brand-amber`, `--black`,
`--brand-surface-1`, `--brand-surface-2`, and the two `--brand-gradient*`
values. Replace `tokens.css` and every component here re-themes.
