import { defineConfig } from "tsup";

export default defineConfig({
  // One entry per component, so a consumer importing
  // `@tev/ui/primitives/Button` never pulls in `Calendar`'s react-day-picker
  // or `Form`'s react-hook-form — both of which are optional peers.
  // `src/utils.ts` MUST stay in this list. tsup derives dist/'s base directory
  // from the COMMON ANCESTOR of every matched entry — with entries only under
  // src/ui, the `ui/primitives/<Name>` prefix is stripped and output collapses
  // to dist/index.js. This one flat entry is what pins dist/ to mirror src/.
  //
  // Only `index.tsx` files are entries: a wider glob would publish every
  // sibling (39-byte `*.types.js` stubs, `*.variants.js`) as an importable
  // subpath, and would turn co-located stories into published entry points.
  entry: ["src/utils.ts", "src/ui/**/index.tsx", "!src/**/*.stories.*"],
  outDir: "dist",
  format: ["esm"],
  // Declarations come from `tsc`, not tsup: tsup bundles rollup-plugin-dts
  // against typescript 5.7, which crashes on this repo's TypeScript 7
  // ("Cannot read properties of undefined (reading 'useCaseSensitiveFileNames')").
  // See the `build` script — tsc --emitDeclarationOnly runs straight after.
  dts: false,
  clean: true,
  sourcemap: true,
  // Tailwind scans this output for class strings (see the `@source` in
  // theme.css), so it must stay readable text rather than minified soup.
  minify: false,
  splitting: false,
  treeshake: false,
  // Everything not bundled: peers plus our own runtime deps, which consumers
  // resolve from their own node_modules.
  external: [
    "react",
    "react-dom",
    "react/jsx-runtime",
    "radix-ui",
    "lucide-react",
    "class-variance-authority",
    "clsx",
    "tailwind-merge",
    "react-day-picker",
    "react-hook-form",
    "dayjs",
  ],
  // The theme contract and default tokens ship verbatim; Tailwind compiles
  // them at the consumer's end, and `@source "./"` in theme.css resolves
  // against dist/, where the component output also lands.
  onSuccess: "cp src/theme.css src/tokens.css dist/",
});
