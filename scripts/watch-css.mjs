// tsup's watcher only tracks files in esbuild's module graph, so it never
// rebuilds on a theme.css/tokens.css-only edit — `onSuccess`'s `cp` then never
// re-runs either. This watches the two CSS files directly and re-copies them,
// independently of tsup's own watch/rebuild cycle.
import { copyFileSync, cpSync, mkdirSync, watch } from "node:fs";

const files = ["theme.css", "tokens.css"];

mkdirSync("dist", { recursive: true });
for (const name of files) copyFileSync(`src/${name}`, `dist/${name}`);
// tokens.css's @font-face resolves relative to itself, so the fonts have to be
// beside it in dist/ even in dev. Copied once, not watched: a binary typeface
// does not change while the watcher runs.
cpSync("src/fonts", "dist/fonts", { recursive: true });

watch("src", (_event, filename) => {
  if (filename && files.includes(filename)) {
    copyFileSync(`src/${filename}`, `dist/${filename}`);
  }
});
