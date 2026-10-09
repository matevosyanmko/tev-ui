# @tev-ui/ui

[![npm version](https://img.shields.io/npm/v/@tev-ui/ui.svg)](https://www.npmjs.com/package/@tev-ui/ui)
[![license](https://img.shields.io/npm/l/@tev-ui/ui.svg)](LICENSE)

A React component library for building dashboard-style products: shadcn/Radix
primitives, higher-level product components (data tables, date pickers,
notifications, onboarding flows), app-shell layout pieces (header,
sidebar, filter row) and analytics widgets (KPI tiles, charts, heatmaps) — all themed entirely through CSS custom properties, so
one variable swap re-skins every component at once.

## What's included

67 components across four groups, each importable by its own subpath so you
only bundle what you use.

| Group | Subpath | What it is | Examples |
| --- | --- | --- | --- |
| Primitives | `@tev-ui/ui/primitives/<Name>` | shadcn/Radix building blocks | `Button`, `Dialog`, `Sheet`, `Select`, `Table`, `Calendar`, `Form`, `Tooltip` (22 total) |
| Brand | `@tev-ui/ui/brand/<Name>` | Product components built on the primitives | `DataTable`, `DateRangePicker`, `NotificationBell`, `ProductTour`, `OnboardingChecklist`, `FilterDropdown` (18 total) |
| Layout | `@tev-ui/ui/layout/<Name>` | App-shell chrome | `AppLayout`, `AppHeader`, `Sidebar`, `SidebarSheet`, `AppFilterRow`, `FilterSheet`, `PageStructure` (11 total) |
| Analytics | `@tev-ui/ui/analytics/<Name>` | Dashboard widgets, the `componentKey` catalog and the renderer that draws a stored widget | `AnalyticsWidget`, `AnalyticsCatalog`, `KpiTile`, `DonutChart`, `BarChart`, `Heatmap` (16 total) |

Browse every component, themed, with `npm run storybook`.

## Install

```bash
npm install @tev-ui/ui
```

`prepack` builds `dist/` before npm packs the directory, so what you get from
the registry is always compiled output, never raw source. If you need an
unreleased change, you can still consume it from a checkout beside your
project:

```bash
npm install file:../tev-ui
```

That gets real compiled output too, since `file:` installs also trigger
`prepack` — but it only resolves on machines with both repos checked out side
by side, so it will not work inside a Docker build or a single-repo CI
checkout.

### Peer dependencies

`react` and `react-dom` (18 or 19) are required. Four more are **optional** —
install them only if you import the component that needs them:

| Component | Needs |
| --- | --- |
| `@tev-ui/ui/primitives/Calendar` | `react-day-picker` |
| `@tev-ui/ui/primitives/Form` | `react-hook-form` |
| `@tev-ui/ui/brand/DateRangePicker` | `dayjs`, `react-day-picker` |
| `@tev-ui/ui/analytics/*` charts (`DonutChart`, `BarChart`, `LineChart`, `ScatterChart`, `ChartCard`, `AnalyticsWidget`) | `recharts` (2.12+) |

`@tev-ui/ui/analytics/AnalyticsCatalog` is plain data and needs none of them:
import it to validate or list `componentKey`s without bundling a chart.

Tailwind CSS v4 is required. This package cannot be used with Tailwind v3 or
with no Tailwind at all — the components are utility-class based.

## Setup

Two imports from this package, after Tailwind:

```css
@import "tailwindcss";
@import "@tev-ui/ui/theme.css";   /* required — the contract */
@import "@tev-ui/ui/tokens.css";  /* optional — a default set of token values */
```

You do **not** need to configure `@source`. `theme.css` declares its own, so
Tailwind finds the package's class strings by itself. If some package-manager
layout defeats that resolution the symptom is unstyled components, and the
fallback is to add the path yourself:

```css
@source "../node_modules/@tev-ui/ui/dist";
```

## Importing components

There is no root export. Import by subpath, so you never pay for a component
you don't use:

```tsx
import { Button } from "@tev-ui/ui/primitives/Button";
import { Card, CardHeader, CardTitle } from "@tev-ui/ui/primitives/Card";
import { DataTable } from "@tev-ui/ui/brand/DataTable";
import { AppLayout } from "@tev-ui/ui/layout/AppLayout";
import { cn } from "@tev-ui/ui/utils";
```

Every component is `@tev-ui/ui/<group>/<Name>`, PascalCase, where `<group>` is
`primitives`, `brand`, `layout` or `analytics` (see [What's included](#whats-included)).
The specifier must be exactly that — Node's `exports` patterns are string
substitution with no directory-index lookup, so
`@tev-ui/ui/primitives/Button/index` does **not** resolve.

## Theming

`theme.css` declares which variables the components read and wires them to
Tailwind utilities. `tokens.css` supplies one set of values. To rebrand, either
override individual variables after the import:

```css
@import "@tev-ui/ui/theme.css";
@import "@tev-ui/ui/tokens.css";

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
| Shape / type | `--radius` `--font-display-family` |

Dark mode is opt-in via a `dark` class on an ancestor (`@custom-variant dark
(&:is(.dark *))`). Nothing in the package toggles it for you.

`--font-display-family` names Delight, and `tokens.css` ships the typeface
too — one variable-weight `.woff2` inside the package, declared by an
`@font-face` there. Nothing to serve and no path to configure: the `url()` is
relative to `tokens.css`, and Tailwind rewrites it when it inlines the import.

**It applies document-wide with no work on your part**, and no component in
this package carries a font class — `theme.css` sets Tailwind's
`--default-font-family`, which is what Preflight's `html` rule reads, so the
face is simply inherited. Importing the two stylesheets is the whole setup.

`font-sans` is untouched and still means Tailwind's own system stack, so it is
the escape hatch on any subtree:

```jsx
<article className="font-sans">Not branded.</article>
```

There is a `font-display` utility too, for re-applying the brand face inside
such a subtree. Two ways out of the default: redefine
`--font-display-family` (in `:root`, in `.dark`, or on any element) to brand
with a different face, or set `--default-font-family: var(--font-sans)` to keep
the document on the system stack and opt in per element with `font-display`.
Skipping `tokens.css` leaves the shipped face unused and everything on the
system stack.

> One caveat: this rides on Tailwind's Preflight. If you import only
> `tailwindcss/utilities`, there is no `html` rule to carry the default — apply
> `font-display` to `<body>` yourself.

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
files ship, that all 47 subpaths name-import cleanly and typecheck under both
`bundler` and `nodenext` module resolution, that the bundled typeface resolves
to a real built asset, and that a consumer token override re-themes the
output. Storybook builds from `src/`, so it proves the
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

Releasing is **one manual trigger**: **Actions -> Release -> Run workflow**,
picking the ref to release. Nothing publishes on a push or a tag.

The workflow (`.github/workflows/release.yml`) does the rest itself — it asks
npm whether this ref's `package.json` version is already published, then runs
`typecheck`, `build` and `verify:package`, and publishes only if the version is
new. So bump the version first:

```bash
npm version patch   # bumps package.json, commits, tags v<version>
git push --follow-tags
```

The tag is for humans and for `git`; the workflow ignores it and reads
`package.json`. Running it on a ref whose version is already on npm is a safe
no-op: the checks still run, the publish step is skipped, and the run summary
says so. That makes it usable as a plain "is this ref releasable?" check.

`prepack` builds `dist/` automatically as part of that pipeline. The package
is `0.x`: the API will move.
