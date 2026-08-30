#!/usr/bin/env bash
# Proves the PUBLISHED artifact works, not just the workspace source.
#
# A workspace link resolves @tev/ui straight to packages/ui, bypassing the
# exports map, the tsup output and the `files` allowlist entirely. This builds a
# throwaway consumer OUTSIDE the workspace, installs the packed tarball into it,
# and asserts that Tailwind generated classes it could only have found by
# following the `@source` inside the package's own theme.css.
#
# Usage: scripts/verify-tarball.sh
set -euo pipefail

REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT

echo "==> packing @tev/ui"
# `npm pack` runs prepack, which builds dist/.
TARBALL="$(cd "$REPO" && npm pack --pack-destination "$WORK" --silent | tail -1)"
TARBALL="$WORK/$(basename "$TARBALL")"
test -f "$TARBALL" || { echo "FAIL: no tarball produced"; exit 1; }
echo "    $(basename "$TARBALL") ($(wc -c <"$TARBALL" | tr -d ' ') bytes)"

echo "==> what the tarball actually ships"
tar -tzf "$TARBALL" | sed 's|^package/||' | grep -E '\.(js|d\.ts|css)$' | sort > "$WORK/shipped.txt"
for required in \
  dist/theme.css dist/tokens.css \
  dist/utils.js dist/utils.d.ts \
  dist/ui/primitives/Button/index.js dist/ui/primitives/Button/index.d.ts \
  dist/ui/primitives/Calendar/index.js dist/ui/primitives/Form/index.js \
  dist/ui/brand/DataTable/index.js dist/ui/brand/DataTable/index.d.ts \
  dist/ui/brand/GradientButton/index.js; do
  grep -qx "$required" "$WORK/shipped.txt" || { echo "FAIL: $required missing from tarball"; exit 1; }
done

# Every component must have its OWN entry point. tsup emits nothing for an
# unmatched entry and still exits 0 — and worse, inlines the component into
# whatever entry does import it. A green build proves nothing here.
EXPECTED="$(find "$REPO/src/ui" -name 'index.tsx' | wc -l | tr -d ' ')"
ENTRIES="$(grep -c '^dist/ui/[^/]*/[^/]*/index\.js$' "$WORK/shipped.txt" || true)"
DTS="$(grep -c '^dist/ui/[^/]*/[^/]*/index\.d\.ts$' "$WORK/shipped.txt" || true)"
if [ "$ENTRIES" -ne "$EXPECTED" ]; then
  echo "FAIL: src has $EXPECTED component index.tsx files but the tarball ships $ENTRIES entry points"
  grep '^dist/ui/' "$WORK/shipped.txt" | sed 's|^|      |'
  exit 1
fi
# Declarations are emitted by a SEPARATE tool (tsc) from the JS (tsup), so the
# two can silently diverge. Consumers on node16/nodenext then get no types.
if [ "$DTS" -ne "$ENTRIES" ]; then
  echo "FAIL: $ENTRIES entry points but only $DTS declaration files"
  exit 1
fi
echo "    $ENTRIES entry points, $DTS declarations (matches $EXPECTED component folders in src)"
echo "    $(wc -l <"$WORK/shipped.txt" | tr -d ' ') files, all required entries present"

echo "==> asserting no story files ship"
if tar -tzf "$TARBALL" | grep -qiE 'stor(y|ies)'; then
  echo "FAIL: story files present in the tarball:"
  tar -tzf "$TARBALL" | grep -iE 'stor(y|ies)' | sed 's|^|      |'
  exit 1
fi
echo "    ok   no story files"

echo "==> building a throwaway consumer outside the workspace"
CONSUMER="$WORK/consumer"
mkdir -p "$CONSUMER/src"

cat > "$CONSUMER/package.json" <<'JSON'
{
  "name": "tarball-consumer",
  "private": true,
  "version": "0.0.0",
  "type": "module"
}
JSON

# Deliberately NO @source of our own: theme.css must supply it.
cat > "$CONSUMER/src/main.css" <<'CSS'
@import "tailwindcss";
@import "@tev/ui/theme.css";
@import "@tev/ui/tokens.css";
CSS

cat > "$CONSUMER/src/main.tsx" <<'TSX'
import { createRoot } from "react-dom/client";
import { Button } from "@tev/ui/primitives/Button";
import { Badge } from "@tev/ui/primitives/Badge";
import { Table, TableBody, TableCell, TableRow } from "@tev/ui/primitives/Table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@tev/ui/primitives/Tooltip";
import { Calendar } from "@tev/ui/primitives/Calendar";
import { cn } from "@tev/ui/utils";
// Every remaining component, so the bundler resolves ALL of them (see all.ts).
import { ALL } from "./all";
import "./main.css";
void ALL;

createRoot(document.getElementById("root")!).render(
  <TooltipProvider>
    <div className={cn("p-4")}>
      <Button variant="destructive">Delete</Button>
      <Badge variant="destructive">Bad</Badge>
      <Tooltip>
        <TooltipTrigger>hover</TooltipTrigger>
        <TooltipContent>tip</TooltipContent>
      </Tooltip>
      <Table><TableBody><TableRow><TableCell>cell</TableCell></TableRow></TableBody></Table>
      <Calendar mode="single" />
    </div>
  </TooltipProvider>,
);
TSX

cat > "$CONSUMER/index.html" <<'HTML'
<!doctype html><html><body><div id="root"></div>
<script type="module" src="/src/main.tsx"></script></body></html>
HTML

cat > "$CONSUMER/vite.config.ts" <<'TS'
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({ plugins: [tailwindcss(), react()], logLevel: "warn" });
TS

(cd "$CONSUMER" && npm install --silent --no-audit --no-fund \
  "$TARBALL" react@^18 react-dom@^18 react-day-picker@^9 react-hook-form@^7 dayjs@^1 \
  vite@^5 @vitejs/plugin-react@^4 tailwindcss@^4 @tailwindcss/vite@^4 \
  typescript@^5 @types/react@^18 @types/react-dom@^18 >/dev/null)

# Generate a module that named-imports EVERY shipped component. The primary
# export is the folder name by convention, so a missing or renamed barrel
# re-export is a compile error rather than a silent 24%-coverage pass.
NAMES="$(grep -oE '^dist/ui/primitives/[^/]+' "$WORK/shipped.txt" | sed 's|.*/||' | sort -u)"
BRAND_NAMES="$(grep -oE '^dist/ui/brand/[^/]+' "$WORK/shipped.txt" | sed 's|.*/||' | sort -u)"
{
  for n in $NAMES; do echo "import { $n } from \"@tev/ui/primitives/$n\";"; done
  for n in $BRAND_NAMES; do echo "import { $n } from \"@tev/ui/brand/$n\";"; done
  # Symbols the folder-per-component layout puts at risk: they are reachable
  # ONLY through a barrel re-export, so nothing else would catch their loss.
  echo 'import { alertVariants } from "@tev/ui/primitives/Alert";'
  echo 'import { buttonVariants } from "@tev/ui/primitives/Button";'
  echo 'import { badgeVariants } from "@tev/ui/primitives/Badge";'
  echo 'import { toggleVariants } from "@tev/ui/primitives/Toggle";'
  echo 'import { FormFieldContext, FormItemContext, useFormField } from "@tev/ui/primitives/Form";'
  echo 'import { CalendarDayButton } from "@tev/ui/primitives/Calendar";'
  echo 'import { ScrollBar } from "@tev/ui/primitives/ScrollArea";'
  echo 'import { gradientButtonVariants } from "@tev/ui/brand/GradientButton";'
  echo 'import { DockShape, buildActionDockPath, ACTION_DOCK_HEIGHT } from "@tev/ui/brand/ActionDock";'
  echo 'import { DataTableEmptyRow, DataTablePagination, DATA_TABLE_HEADER_VARIANTS, ROW_CLASS, useDataTablePagination, useTableScrollReset } from "@tev/ui/brand/DataTable";'
  echo 'import { CustomRangePanel, DateCell, presetRange, DEFAULT_MONTHS } from "@tev/ui/brand/DateRangePicker";'
  echo 'import { SidebarItemIcon, SidebarItemLabel } from "@tev/ui/brand/SidebarItem";'
  echo 'import { NotificationHeader, NotificationItem, NotificationList, relativeTime } from "@tev/ui/brand/NotificationBell";'
  echo 'import { TourScrim, TourSpotlight, TourStepCard, TourStepDots, TourStepNav, placeStepCard } from "@tev/ui/brand/ProductTour";'
  echo 'import { HomeIcon, NotificationBellIcon } from "@tev/ui/brand/Icons";'
  echo 'import type { ButtonProps } from "@tev/ui/primitives/Button";'
  echo 'import type { BadgeProps } from "@tev/ui/primitives/Badge";'
  echo 'import type { SearchFieldProps } from "@tev/ui/primitives/SearchField";'
  echo 'import type { CalendarProps } from "@tev/ui/primitives/Calendar";'
  echo 'import type { TableProps } from "@tev/ui/primitives/Table";'
  echo 'import type { DataTableProps, DataTableColumn } from "@tev/ui/brand/DataTable";'
  echo 'import type { DateRangePickerProps } from "@tev/ui/brand/DateRangePicker";'
  echo 'import type { NotificationItemData } from "@tev/ui/brand/NotificationBell";'
  echo 'import type { GradientButtonProps } from "@tev/ui/brand/GradientButton";'
  echo 'import type { ProductTourProps } from "@tev/ui/brand/ProductTour";'
  echo 'export const ALL = ['
  for n in $NAMES; do echo "  $n,"; done
  for n in $BRAND_NAMES; do echo "  $n,"; done
  echo '  alertVariants, buttonVariants, badgeVariants, toggleVariants,'
  echo '  FormFieldContext, FormItemContext, useFormField, CalendarDayButton, ScrollBar,'
  echo '  gradientButtonVariants, DockShape, buildActionDockPath, ACTION_DOCK_HEIGHT,'
  echo '  DataTableEmptyRow, DataTablePagination, DATA_TABLE_HEADER_VARIANTS, ROW_CLASS,'
  echo '  useDataTablePagination, useTableScrollReset,'
  echo '  CustomRangePanel, DateCell, presetRange, DEFAULT_MONTHS,'
  echo '  SidebarItemIcon, SidebarItemLabel,'
  echo '  NotificationHeader, NotificationItem, NotificationList, relativeTime,'
  echo '  TourScrim, TourSpotlight, TourStepCard, TourStepDots, TourStepNav, placeStepCard,'
  echo '  HomeIcon, NotificationBellIcon,'
  echo '];'
  echo 'export type Probe = ['
  echo '  ButtonProps, BadgeProps, SearchFieldProps, CalendarProps, TableProps,'
  echo '  DataTableProps, DataTableColumn, DateRangePickerProps, NotificationItemData,'
  echo '  GradientButtonProps, ProductTourProps,'
  echo '];'
} > "$CONSUMER/src/all.ts"
echo "    generated all.ts covering $(echo "$NAMES" | wc -w | tr -d ' ') primitives + $(echo "$BRAND_NAMES" | wc -w | tr -d ' ') brand components + 34 at-risk symbols + 11 prop types"

echo "==> typechecking the consumer against the shipped declarations"
# vite build does NOT typecheck, so without this the `types` half of the exports
# map is never exercised and 20 of 21 components could ship with no .d.ts.
for RESOLUTION in bundler nodenext; do
  cat > "$CONSUMER/tsconfig.json" <<JSON
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM"],
    "module": "$([ "$RESOLUTION" = "nodenext" ] && echo nodenext || echo ESNext)",
    "moduleResolution": "$RESOLUTION",
    "jsx": "react-jsx",
    "strict": true,
    "noEmit": true,
    "skipLibCheck": false
  },
  "include": ["src/all.ts"]
}
JSON
  if (cd "$CONSUMER" && npx tsc --noEmit -p tsconfig.json 2>&1 | head -20 | sed 's|^|      |'; exit "${PIPESTATUS[0]}"); then
    echo "    ok   types resolve under moduleResolution=$RESOLUTION"
  else
    echo "    FAIL types do NOT resolve under moduleResolution=$RESOLUTION"
    FAIL_TYPES=1
  fi
done
if [ "${FAIL_TYPES:-0}" -ne 0 ]; then
  echo "TARBALL VERIFICATION FAILED (declaration resolution)"
  exit 1
fi

(cd "$CONSUMER" && npx vite build >/dev/null)

CSS_OUT="$(ls "$CONSUMER"/dist/assets/*.css)"
echo "    consumer CSS: $(wc -c <"$CSS_OUT" | tr -d ' ') bytes"

echo "==> asserting Tailwind followed the package's own @source"
# Each of these classes appears ONLY inside the package's compiled components.
# If @source resolution failed, the CSS builds fine but comes out unstyled —
# which is exactly the silent failure this check exists to catch.
#
# Compare against a backslash-stripped copy: Tailwind escapes special
# characters in selectors, so `focus:border-input` is emitted as
# `.focus\:border-input:focus` and a literal grep would miss it.
UNESCAPED="$WORK/unescaped.css"
tr -d '\\' < "$CSS_OUT" > "$UNESCAPED"
FAIL=0
# The last three appear ONLY inside dist/ui/brand, so they also prove the brand
# group is reached — dist/ui/primitives alone would satisfy every other class.
for cls in 'bg-foreground' 'fill-foreground' 'bg-muted-foreground' \
           'text-destructive-foreground' 'focus:border-input' 'border-border' \
           'bg-brand-green' 'bg-brand-lavender' 'bg-brand-surface-2'; do
  if grep -qF -- "$cls" "$UNESCAPED"; then
    echo "    ok   $cls"
  else
    echo "    FAIL $cls not generated"
    FAIL=1
  fi
done

echo "==> asserting the theme contract resolved"
for tok in '--brand-purple' '--destructive-foreground' '--black' \
           '--brand-green' '--brand-gradient'; do
  if grep -qF -- "$tok" "$CSS_OUT"; then
    echo "    ok   $tok"
  else
    echo "    FAIL $tok missing"
    FAIL=1
  fi
done

echo "==> asserting a theme override actually re-themes"
# Redefine one token and confirm the built CSS picks up the new value: this is
# the "just pass a theme" claim, mechanically checked. The sentinel is a
# six-digit hex with no repeating pairs, so Tailwind's minifier cannot shorten
# it (#00ff00 would come out as #0f0 and a naive grep would report a failure).
printf '\n:root { --destructive: #123456; }\n' >> "$CONSUMER/src/main.css"
(cd "$CONSUMER" && npx vite build >/dev/null)
CSS_OUT="$(ls "$CONSUMER"/dist/assets/*.css)"
if grep -qF -- '#123456' "$CSS_OUT"; then
  echo "    ok   consumer override reached the output"
else
  echo "    FAIL consumer override did not reach the output"
  FAIL=1
fi

if [ "$FAIL" -ne 0 ]; then
  echo "TARBALL VERIFICATION FAILED"
  exit 1
fi
echo "TARBALL VERIFICATION PASSED"
