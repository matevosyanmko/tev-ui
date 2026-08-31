import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

// This config exists for Storybook, which is the only thing in this repo Vite
// builds — the library itself is built by tsup.
//
// There is no `@tev-ui/ui/*` alias any more: stories live beside their components
// inside src/ and import relatively, and .storybook/preview.css reaches src/
// by relative path. An alias here would have masked a broken exports map,
// since it resolved to source rather than to the published artifact. The
// published artifact is verified separately by `npm run verify:package`.
export default defineConfig({
  plugins: [tailwindcss()],
});
