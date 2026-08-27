import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dirname = fileURLToPath(new URL(".", import.meta.url));

// This config exists for Storybook, which is the only thing in this repo Vite
// builds — the library itself is built by tsup. The alias lets the stories
// import components by their published specifier (`@tev/ui/button`) rather
// than reaching into `../src`, so a story can be pasted into a consuming app
// unchanged. It points at source, not dist, so HMR works while you edit a
// component; the published artifact is verified separately by
// `npm run verify:package`.
export default defineConfig({
  plugins: [tailwindcss()],
  resolve: {
    alias: [
      { find: /^@tev\/ui\/(.*)$/, replacement: path.resolve(dirname, "src/$1") },
    ],
  },
});
