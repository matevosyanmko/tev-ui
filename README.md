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
| `@tev/ui/calendar` | `react-day-picker` |
| `@tev/ui/form` | `react-hook-form` |

Tailwind CSS v4 is required. This package cannot be used with Tailwind v3 or
with no Tailwind at all — the components are utility-class based.

## Setup

Two lines in your stylesheet:

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
import { Button } from "@tev/ui/button";
import { Card, CardHeader, CardTitle } from "@tev/ui/card";
import { cn } from "@tev/ui/utils";
```

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

`npm run verify:package` is the check that matters before releasing. Storybook
resolves `@tev/ui/*` to `src/` through a Vite alias, so it proves the
components work but not that the *published* artifact does — the exports map,
the `files` allowlist, the tsup output and the `@source` inside theme.css are
only exercised by that script.

### Adding a shadcn component

`npx shadcn add <name>` works from this directory. It writes imports in the
`@/…` form; convert them to relative (`./button`, `./utils`) before
committing. tsup gives every file its own entry point, and an aliased import
would be inlined into each importer instead of staying a shared module.

## Publishing

```bash
npm version patch
npm publish
```

Resolve the registry question above first.

`prepack` builds `dist/` automatically. The package is `0.x`: the API will move.
