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
```

- `index.tsx` at every component root; it re-exports the public surface and is
  what tsup treats as the entry point.
- Published as `@tev/ui/primitives/<Name>` and `@tev/ui/brand/<Name>`.
  `cn` stays at `@tev/ui/utils`.
- **Never create empty `.types.ts` / `.variants.ts` files** to satisfy the
  pattern. They exist only when they hold something.
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

## 4. Stories

- Co-located as `<Name>.stories.tsx`, importing the component **relatively**
  (`./Alert`, `../Button`).
- **Always set an explicit `title:`** — `Primitives/<Name>` or
  `Brand/<Name>`. Auto-titles are path-derived and ugly (`ui/primitives/Badge`),
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

## 6. Adding a shadcn component

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

## 7. Known pre-existing issues — do not "fix" as part of unrelated work

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

## 8. Before you claim done

```bash
npm run typecheck && npm run build && npm run verify:package
```

`verify:package` packs the tarball, installs it into a throwaway consumer
outside the workspace, and asserts: one entry point *and* one declaration file
per component folder in `src/`; no story files ship; every component plus the
nine at-risk barrel-only symbols and five prop types name-import cleanly;
declarations resolve under **both** `bundler` and `nodenext`; Tailwind followed
the package's own `@source`; and a consumer token override re-themes the output.
It is the only check that exercises the published artifact.
