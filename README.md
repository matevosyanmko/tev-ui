# @tev/ui

Shared UI primitives — Radix behaviour, Tailwind v4 styling, themed entirely
through CSS custom properties.

## Install

Not published yet. The scope is `@tev`, which does not match any GitHub
organisation, so GitHub Packages will reject it as-is — publishing needs
either a `tev` org, a rename to the `tevvoice` scope, or a different registry.

Until then, consume it from a checkout beside your project:

```bash
npm install file:../tev-ui
```

`prepack` builds `dist/` when npm packs the directory, so a `file:` install
gets real compiled output rather than raw source. Note that a `file:`
dependency only resolves on machines with both repos checked out side by side
— it will not work inside a Docker build or a single-repo CI checkout.

### Peer dependencies

`react` and `react-dom` (18 or 19) are required. Two more are **optional** —
install them only if you import the component that needs them:

| Component | Needs |
| --- | --- |
| `@tev/ui/primitives/Calendar` | `react-day-picker` |
| `@tev/ui/primitives/Form` | `react-hook-form` |

Tailwind CSS v4 is required. This package cannot be used with Tailwind v3 or
with no Tailwind at all — the components are utility-class based.

## Setup

Two imports from this package, after Tailwind:

```css
@import "tailwindcss";
@import "@tev/ui/theme.css";   /* required — the contract */
@import "@tev/ui/tokens.css";  /* optional — the Tevvoice brand */
```

You do **not** need to configure `@source`. `theme.css` declares its own, so
Tailwind finds the package's class strings by itself. If some package-manager
layout defeats that resolution the symptom is unstyled components, and the
fallback is to add the path yourself:

```css
@source "../node_modules/@tev/ui/dist";
```

## Importing components

There is no root export. Import by subpath, so you never pay for a component
you don't use:

```tsx
import { Button } from "@tev/ui/primitives/Button";
import { Card, CardHeader, CardTitle } from "@tev/ui/primitives/Card";
import { cn } from "@tev/ui/utils";
```

Primitives are `@tev/ui/primitives/<Name>`, brand components are
`@tev/ui/brand/<Name>`, both PascalCase. (`brand/` is an empty scaffold today —
the subpath pattern is wired up, but no brand component ships yet.) The specifier must be exactly that —
Node's `exports` patterns are string substitution with no directory-index
lookup, so `@tev/ui/primitives/Button/index` does **not** resolve.

## Theming

`theme.css` declares which variables the components read and wires them to
Tailwind utilities. `tokens.css` supplies one set of values. To rebrand, either
override individual variables after the import:

```css
@import "@tev/ui/theme.css";
@import "@tev/ui/tokens.css";

:root {
  --brand-purple: #0066ff;
  --radius: 0.25rem;
}
```

…or skip `tokens.css` entirely and define every variable yourself.

### The contract

Values are plain CSS, so any colour syntax works. Every one of these must be
defined, in `:root` and (if you support dark mode) in `.dark`:

| Group | Variables |
| --- | --- |
| Surfaces | `--background` `--foreground` `--card` `--card-foreground` `--popover` `--popover-foreground` |
| Actions | `--primary` `--primary-foreground` `--secondary` `--secondary-foreground` `--accent` `--accent-foreground` |
| Muted / state | `--muted` `--muted-foreground` `--destructive` `--destructive-foreground` |
| Lines | `--border` `--input` `--ring` |
| Brand | `--brand-purple` `--brand-purple-foreground` `--brand-purple-soft` `--black` |
| Charts | `--chart-1` … `--chart-5` |
| Sidebar | `--sidebar` `--sidebar-foreground` `--sidebar-primary` `--sidebar-primary-foreground` `--sidebar-accent` `--sidebar-accent-foreground` `--sidebar-border` `--sidebar-ring` |
| Shape / type | `--radius` `--font-sans-family` |

Dark mode is opt-in via a `dark` class on an ancestor (`@custom-variant dark
(&:is(.dark *))`). Nothing in the package toggles it for you.

`--font-sans-family` names Delight, which this package does **not** ship. Serve
the font yourself with an `@font-face`, or override the variable.

## Local development

```bash
npm install
npm run storybook       # browse every component, themed
npm run build           # tsup (ESM) + tsc (declarations) -> dist/
npm run typecheck
npm run verify:package  # pack, install the tarball into a throwaway consumer, assert it works
```

`npm run verify:package` is the check that matters before releasing. It packs
the tarball, installs it into a throwaway consumer outside the workspace, and
asserts one entry point and one declaration file per component, that no story
files ship, that all 21 subpaths name-import cleanly and typecheck under both
`bundler` and `nodenext` module resolution, and that a consumer token override
re-themes the output. Storybook builds from `src/`, so it proves the
components work but not that the *published* artifact does — the exports map,
the `files` allowlist, the tsup output and the `@source` inside theme.css are
only exercised by that script.

See [CLAUDE.md](CLAUDE.md) for the repository conventions, and for the four ways
to break the published package while `npm run build` still succeeds.

### Adding a shadcn component

`npx shadcn add <name>` works from this directory, but writes a single flat
file at `src/` using `@/…` imports. Afterwards, by hand:

1. Move it to `src/ui/primitives/<Name>/<Name>.tsx` (PascalCase folder).
2. Convert the `@/…` imports to relative (`../../../utils`, `../Button`).
3. Extract any `cva()` call into `<Name>.variants.ts` — component files must
   export only components, or React Fast Refresh remounts the tree.
4. Add `index.tsx` re-exporting the public surface; that file is the entry point.
5. Add `<Name>.stories.tsx` with an explicit `Primitives/<Name>` title.
6. Run `npm run verify:package`.

## Publishing

```bash
npm version patch
npm publish
```

Resolve the registry question above first.

`prepack` builds `dist/` automatically. The package is `0.x`: the API will move.
