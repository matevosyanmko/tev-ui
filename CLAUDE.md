# @tev/ui

Shared UI library: shadcn primitives plus brand components, themeable via CSS
variables. Published as a package, consumed by subpath import. There is no root
export.

```bash
npm run storybook       # browse every component, themed
npm run build           # tsup (ESM) + tsc (declarations) -> dist/
npm run typecheck
npm run verify:package  # THE release gate — see below
```

---

## 1. Read this first: five ways to break the package with a green build

Every failure mode below produces a **passing `npm run build`** and a broken
published artifact. `npm run build` succeeding proves almost nothing. Only
`npm run verify:package` does.

**1. tsup infers `dist/`'s base from the common ancestor of matched entries.**
`tsup.config.ts` lists `src/utils.ts` explicitly. That single flat entry is what
pins `dist/` to mirror `src/`. Remove it and the common ancestor becomes
`src/ui/primitives`, so that prefix is stripped and the components land at
`dist/<Name>/index.js` — which `"./primitives/*"` (`./dist/ui/primitives/*/index.js`)
no longer matches, so every subpath 404s. `dist/utils.js` is not emitted at all.
tsup exits 0 and prints "Build success". Do not "tidy up" that entry.

**2. An unmatched entry emits nothing, exits 0, and gets inlined instead.**
If a component's `index.tsx` is not matched by the entry glob, tsup does not
warn. It emits no entry point for that component and instead inlines its source
into whatever entry imports it. The component then has no importable subpath at
all. `verify:package` asserts the entry-point count for this reason.

**3. Node's `exports` wildcards do no directory-index resolution and do not
fall back.** `"./*"` is pure string substitution. `@tev/ui/primitives/Alert`
only resolves because `"./primitives/*"` maps explicitly to
`.../*/index.js`. Once that pattern exists, `@tev/ui/primitives/Alert/index`
**fails** — Node commits to the most specific pattern and never retries a
broader one. Exactly one spelling works per component, and README examples must
match it character for character. Pattern precedence is by literal-prefix
length, not JSON key order.

There is deliberately **no `"./*"` catch-all**: it silently provided a second
working spelling (`@tev/ui/ui/primitives/Alert/index`) and turned every typo
into a confusing `ERR_MODULE_NOT_FOUND` against a `dist/` path instead of a
clear `ERR_PACKAGE_PATH_NOT_EXPORTED`. `./utils` is listed explicitly instead.

**4. Stories live inside `src/`, and `tsconfig.build.json`'s `exclude` is the only
thing keeping them out of the package.** Drop it and `tsc` emits
`dist/**/*.stories.d.ts` — including a declaration file that imports
`@storybook/react-vite`, a devDependency absent from the tarball. `exclude` here
**replaces** the inherited array (`extends` does not merge arrays), so
`node_modules`/`dist`/`storybook-static` are re-listed.

The `!src/**/*.stories.*` negation in `tsup.config.ts` is currently **inert** —
no story file can match `src/ui/**/index.tsx`. Keep it anyway: it is the thing
that saves you if the entry glob is ever widened past `index.tsx`, which is
exactly when stories would otherwise become published entry points.

**5. Relative specifiers in `src/` must carry a `.js` extension.**
`tsc` emits declaration files with the specifier text *verbatim*, so an
extensionless `export * from "./Card"` ships as-is. A consumer on
`moduleResolution: "node16"`/`"nodenext"` then resolves it to nothing and gets
**no types for that component at all** — silently, if they have `skipLibCheck`
on. Write `export * from "./Card.js"`; TypeScript maps `.js` back to `.tsx`
under `bundler` resolution, and esbuild and Vite both follow it, so nothing else
changes. `verify:package` typechecks a consumer under both `bundler` and
`nodenext` to keep this fixed.

Two more mechanical constraints:

- **Build order is `tsup && tsc`.** tsup has `clean: true`; reversing the order
  makes it delete every declaration file.
- **`rootDir: "src"` in `tsconfig.build.json` is load-bearing.** TypeScript 7
  hard-errors `TS5011` without it and emits to `dist/src/…`.

---

## 2. Structure

```
src/
  utils.ts, theme.css, tokens.css     # flat: published subpaths, not components
  ui/
    primitives/<Name>/                # shadcn primitives
      index.tsx                       # the published entry point (barrel)
      <Name>.tsx                      # implementation
      <Name>.types.ts                 # optional — only when non-empty
      <Name>.variants.ts              # optional — the cva() call
      <Name>.stories.tsx              # co-located, relative import
    brand/<Name>/                     # brand components built on primitives
      (same shape; see src/ui/brand/README.md)
    layout/<Name>/                    # app-shell chrome built on primitives + brand
      (same shape; see src/ui/layout/README.md)
```

- `index.tsx` at every component root; it re-exports the public surface and is
  what tsup treats as the entry point.
- Published as `@tev/ui/primitives/<Name>`, `@tev/ui/brand/<Name>` and
  `@tev/ui/layout/<Name>`. `cn` stays at `@tev/ui/utils`.
- **Never create empty `.types.ts` / `.variants.ts` files** to satisfy the
  pattern. They exist only when they hold something.
- `.types.ts` and `.variants.ts` are the two common non-component siblings, but
  they are not a closed set — the rule is the *reason*, not the suffix: a module
  that exports anything other than components is not a Fast Refresh boundary, so
  it has to live outside `<Name>.tsx`. Where a component needs something else,
  it gets a `<Name>.<kind>.ts` of its own, and the file says why at the top.
  Currently: `DataTable.utils.ts` (pure helpers plus the shared row classes),
  `DataTable.variants.ts` (a plain header-role map, not a cva call),
  `DateRangePicker.constants.ts` (month names, presets, `presetRange`),
  `ProductTour.geometry.ts` (`placeStepCard` and the spotlight padding the
  scrim and the ring must agree on), `Icons.registry.ts` (the by-name record),
  and the standalone hooks `useTableScrollReset` / `useDataTablePagination` /
  `useContentWidth`.
- A sub-export gets its own **file** when it owns its own styling or state
  contract, or has a body well over ~40 lines. Only `CalendarDayButton`
  qualifies (it owns the `BRAND_DAY_STATES` block). Everything else — the 14
  `DropdownMenu*` parts, 9 `Dialog*`, 9 `Select*`, 7 `Table*`, 6 `Card*` — is a
  short class-name wrapper and stays a function in its parent file.
  Having its own props type is **not** a reason to split: those go in the
  shared `<Name>.types.ts` (see `Dialog.types.ts`, which holds both
  `DialogContentProps` and `DialogFooterProps`).
- Inside `src/`, imports are **always relative**. There is deliberately no
  `@tev/ui/*` path mapping or Vite alias: an alias resolves to source and would
  mask a broken exports map. `@/*` exists only so `npx shadcn add` can resolve
  its own generated imports.

## 3. Component conventions

- **`data-slot` attributes** on every element a consumer or the theming layer
  needs to target — sibling selectors key off them (e.g.
  `*:data-[slot=alert-description]:…`). Purely structural wrappers may omit it
  (`SearchField`'s positioning `<div>` does).
- **Never re-slot a primitive you are only composing.** `data-slot` belongs to
  whoever renders the element, and every primitive spreads `{...props}` last —
  so passing your own `data-slot` to `<PopoverContent>` *replaces* the
  primitive's. That silently breaks the primitive's own descendant selectors:
  `Calendar` goes transparent inside a popover via
  `[[data-slot=popover-content]_&]:bg-transparent`, and a `DateRangePicker`
  that renamed its `PopoverContent` slot rendered a dark calendar on a white
  panel. When a brand component wants its own hook on a primitive part, use
  **`data-brand="<kebab-name>"`** alongside; `data-slot` stays for the elements
  it renders itself.
- **CVA variants go in `<Name>.variants.ts`, never inline in the component
  file.** This is not cosmetic: React Fast Refresh only hot-swaps a component
  when its module exports nothing but components. Same reason `Form.context.ts`
  is separate. Do not inline either back.
  **Exemption: `index.tsx` barrels.** Five of them re-export non-components
  (`alertVariants`, `buttonVariants`, `badgeVariants`, `toggleVariants`, the
  `Form` contexts). A re-export-only module is never a Fast Refresh boundary
  anyway, so this costs nothing — but for that same reason, source files import
  a sibling's **module**, not its barrel (`../Button/Button`, not `../Button`),
  or an edit to `Button.variants.ts` escalates past Fast Refresh into every
  importer.
- Two variants files are **shared across components** and cannot be made
  private: `Toggle.variants.ts` is used by `Toggle` and `ToggleGroup`;
  `Button.variants.ts` by `Button` and `Calendar`. Import across the sibling
  folder (`../Toggle/Toggle.variants`) rather than duplicating.
- **Semantic tokens, never hardcoded values.** `theme.css` declares the
  variable *contract* and wires it to Tailwind utilities; `tokens.css` supplies
  one set of *values* and a consumer may replace it wholesale. A hardcoded
  colour breaks light, dark and every future brand theme at once.
- Every class must be written out in full. Tailwind scans source text, so a
  `dark:` prefix assembled at runtime compiles to nothing.
- Keep component APIs small. No props for hypothetical use cases.

### Brand and layout components additionally

Everything above applies; these three exist because a brand or layout
component is extracted from a real app and would otherwise drag the app in
behind it. `layout/` components additionally own no state and no data —
`AppLayout` and `PageStructure` are pure slots; the app assembles its header,
sidebar and filter row itself and hands the results in as props.

- **No app dependencies.** Nothing under `brand/` or `layout/` may import a
  router, a query client, an i18n context, or an app domain type. That is what
  makes these storyboardable and reusable across projects, and it is the
  single easiest rule to break while "just moving a component over".
- **Strings arrive as props**, through a `labels` object (or a plain string
  prop like `AppFilterRow`'s `label`) with inline English fallbacks
  (`labels?.retry ?? "Retry"`) — never a `DEFAULT_LABELS` const, which would be
  one more non-component export to relocate. Anything carrying locale or
  plural rules is a *function* prop instead (`NotificationBell`'s
  `formatTime`, `DataTable`'s `labels.page(page, total)`): the caller formats,
  the package renders.
- **Navigation arrives as an element**, through `asChild` + `Slot.Root`
  (`SidebarItem`, `AppLogo`), and **domain vocabulary is translated at the
  boundary** — `NotificationBell` takes `tone: default | success | warning |
  danger`, not the app's `type`/`severity` pair, and `FilterDropdown` takes
  `tone: "danger"` on an option rather than recognising a value spelled
  `"disabled"`.

## 4. Stories

- Co-located as `<Name>.stories.tsx`, importing the component **relatively**
  (`./Alert`, `../Button`).
- **Always set an explicit `title:`** — `Primitives/<Name>`, `Brand/<Name>` or
  `Layout/<Name>`. Auto-titles are path-derived and ugly (`ui/primitives/Badge`),
  and explicit titles are what keep story ids stable.
- Prefer realistic content over `<div>foo</div>` showcases. Cover the primary
  usage, the variants, the states that matter, and the edge cases (long text,
  missing data).
- A class used **only** inside a story is scanned for Storybook but is *not* in
  the consumer's CSS, because stories are excluded from `dist`. Style with
  classes the component itself carries.

## 5. Size guide

Aim for ≤200 lines per component file. Split only along a real seam — a
sub-export with its own state or styling contract, like `CalendarDayButton`
(which owns the `BRAND_DAY_STATES` block).

**Recorded exception: `DropdownMenu.tsx` (226 lines).** It is 15 flat
class-name wrappers, largest 25 lines, and near-verbatim shadcn output. Splitting
it trades one file for four plus a barrel, buys only a line count, and makes
every future `npx shadcn add dropdown-menu` a manual re-shred. Leave it whole.

**Recorded exception: `CustomRangePanel.tsx` (214 lines).** One draft-state
machine — presets, the two date fields, the calendar and the footer all read and
write the same `{ from, to }` draft plus `activeField`. The seams look real
(four visual blocks) but every one of them would have to be handed the draft and
a setter, so splitting turns local state into prop-drilling for 14 lines.

## 6. Adding a shadcn primitive

`npx shadcn add <name>` works from this directory, but writes **one flat file at
`src/`** using `@/…` imports — `components.json`'s aliases deliberately still
point at `src/` root rather than `src/ui/primitives`, so the generated file
lands somewhere obvious and unmissable instead of half-correct. By hand
afterwards:

1. Move it to `src/ui/primitives/<Name>/<Name>.tsx` (PascalCase folder).
2. Convert `@/…` imports to relative (`../../../utils`, `../Button`).
3. Extract any `cva()` call to `<Name>.variants.ts`.
4. Add `index.tsx` re-exporting the public surface.
5. Add `<Name>.stories.tsx` with an explicit `Primitives/<Name>` title.
6. Run `npm run verify:package`.

Still near-verbatim upstream, so a re-add is a realistic path — keep divergence
deliberate: `DropdownMenu`, `Card`, `Skeleton`, `Label`, `Separator`,
`Textarea`, `Alert`. Already substantially rewritten, re-add is not realistic:
`Button`, `Badge`, `Input`, `ToggleGroup`, `Calendar`. Diverged but still
structurally recognisable, so a re-add produces a conflicting flat file:
`Select`, `Dialog`, `Table`, `Popover`, `ScrollArea`, `Tooltip`, `Form`,
`Toggle`. Not shadcn at all: `SearchField`. `utils.ts` is shadcn's canonical
`cn` helper, hand-annotated.

## 7. Adding a brand component

Brand components are usually *extracted* from an app rather than written fresh,
so most of the work is severing what the app supplied:

1. `src/ui/brand/<Name>/<Name>.tsx` (PascalCase folder), plus `index.tsx`
   re-exporting the public surface.
2. Convert `@/…` imports to relative. A primitive is reached as
   `../../primitives/<Name>/<Name>` — the sibling **module**, not its barrel.
3. Replace every hardcoded colour with a token (§3). If the design needs a
   value the contract doesn't have, add it to `theme.css` *and* `tokens.css`
   rather than inlining the hex.
4. Sever the app: `useI18n()` → a `labels` prop, a router `<Link>` → `asChild`,
   an app domain type → a structural type in `<Name>.types.ts`, a react-query
   hook → props for the data and callbacks for the actions.
5. Extract anything that isn't a component into a `<Name>.<kind>.ts` sibling
   (§2), and any new non-bundled dependency into `tsup.config.ts`'s `external`
   plus `peerDependencies` (`peerDependenciesMeta.optional` when not every
   consumer needs it — `dayjs`, for `DateRangePicker`, is optional).
6. `<Name>.stories.tsx` with an explicit `Brand/<Name>` title.
7. Run `npm run verify:package`.

## 8. Adding a layout component

Same process as §7, with two differences: layout components compose brand
components too (not just primitives), and they own no state — decompose the
extracted component into a dumb shell plus whatever the app must keep for
itself.

1. `src/ui/layout/<Name>/<Name>.tsx` (PascalCase folder), plus `index.tsx`
   re-exporting the public surface.
2. Convert `@/…` imports to relative. A primitive is
   `../../primitives/<Name>/<Name>`, a brand component is
   `../../brand/<Name>/<Name>` — the sibling **module**, not its barrel.
3. Replace every hardcoded colour with a token (§3), same as brand.
4. Sever the app, same as brand (§7 step 4) — **plus** anything the component
   currently *does* (fetches data, reads global filter state, decides which
   filters are visible) becomes a prop or a slot instead. If the extracted
   component mixes generic chrome with app-specific content — `PageStructure`
   mixing the scrollable card frame with the app's own filter bar — split it:
   the chrome moves here, the content stays behind in the app's own
   composition, which renders this component and passes the content in as a
   slot (`filterRow`, `header`, `sidebar`, …). The app keeps a thin wrapper at
   its old import path so existing call sites don't change.
5. Extract anything that isn't a component into a `<Name>.<kind>.ts` sibling
   (§2), and any new non-bundled dependency into `tsup.config.ts`'s `external`
   plus `peerDependencies`.
6. `<Name>.stories.tsx` with an explicit `Layout/<Name>` title.
7. Run `npm run verify:package`.

## 9. Known pre-existing issues — do not "fix" as part of unrelated work

- `docs: { autodocs: "tag" }` in `.storybook/main.ts` is not a valid Storybook
  10.5 option and is already inert. `tags: ["autodocs"]` in `preview.ts` is what
  actually drives docs.
- `.storybook` has never been typechecked: a bare directory entry in `include`
  does not match dot-prefixed directories. Use `".storybook/*.ts"` to change
  that — and then a `declare module "*.css"` is also needed.
- addon-mcp reports "No component definition found" for 7 of 21 components (a
  react-docgen failure resolving `class-variance-authority`'s exports field).
- `moduleResolution: "nodenext"` requires explicit file extensions on relative
  imports; switching to it produces ~126 errors (mostly TS2835/TS2307) and the
  module graph collapses, so nothing type-checks meaningfully. Stay on
  `"bundler"`.
- `declarationMap` sources dangle in the tarball, since `files: ["dist"]` never
  ships `src/`.
- With `splitting: false`, a component imported by another is duplicated into
  both bundles (`Button` appears inside `Dialog`'s and `Calendar`'s output).
  That is inherent to one-entry-per-component, not a defect — what matters is
  that each component also has its *own* entry point.

## 10. Before you claim done

```bash
npm run typecheck && npm run build && npm run verify:package
```

`verify:package` packs the tarball, installs it into a throwaway consumer
outside the workspace, and asserts: one entry point *and* one declaration file
per component folder in `src/` (47 today — 21 primitives, 17 brand, 9 layout);
no story files ship; every component in **all three** groups, plus a set of
at-risk barrel-only symbols and prop types, name-imports cleanly; declarations
resolve under both `bundler` and `nodenext`; Tailwind followed the package's
own `@source`; and a consumer token override re-themes the output.

The class assertions deliberately include three (`bg-brand-green`,
`bg-brand-lavender`, `bg-brand-surface-2`) that appear **only** inside
`dist/ui/brand` — every other class in that list would still pass if the brand
group were never scanned at all.
It is the only check that exercises the published artifact.
