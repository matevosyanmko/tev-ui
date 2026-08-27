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
for required in theme.css tokens.css button.js button.d.ts utils.js calendar.js form.js; do
  grep -qx "dist/$required" "$WORK/shipped.txt" || { echo "FAIL: dist/$required missing from tarball"; exit 1; }
done
echo "    $(wc -l <"$WORK/shipped.txt" | tr -d ' ') files, all required entries present"

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
import { Button } from "@tev/ui/button";
import { Badge } from "@tev/ui/badge";
import { Table, TableBody, TableCell, TableRow } from "@tev/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@tev/ui/tooltip";
import { Calendar } from "@tev/ui/calendar";
import { cn } from "@tev/ui/utils";
import "./main.css";

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
  "$TARBALL" react@^18 react-dom@^18 react-day-picker@^9 react-hook-form@^7 \
  vite@^5 @vitejs/plugin-react@^4 tailwindcss@^4 @tailwindcss/vite@^4 \
  typescript@^5 @types/react@^18 @types/react-dom@^18 >/dev/null)

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
for cls in 'bg-foreground' 'fill-foreground' 'bg-muted-foreground' \
           'text-destructive-foreground' 'focus:border-input' 'border-border'; do
  if grep -qF -- "$cls" "$UNESCAPED"; then
    echo "    ok   $cls"
  else
    echo "    FAIL $cls not generated"
    FAIL=1
  fi
done

echo "==> asserting the theme contract resolved"
for tok in '--brand-purple' '--destructive-foreground' '--black'; do
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
