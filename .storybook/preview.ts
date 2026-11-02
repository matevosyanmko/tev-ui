import type { Decorator, Preview } from "@storybook/react-vite";

import "./preview.css";

// The brand theme lives on <html>, exactly where an app puts it, so portalled
// overlays (Dialog, Popover) pick it up too.
const withTheme: Decorator = (Story, context) => {
  const theme = context.globals.theme as string | undefined;
  if (theme && theme !== "voice") document.documentElement.dataset.theme = theme;
  else delete document.documentElement.dataset.theme;
  return Story();
};

const preview: Preview = {
  decorators: [withTheme],
  globalTypes: {
    theme: {
      description: "Brand theme",
      toolbar: {
        title: "Theme",
        icon: "paintbrush",
        items: [
          { value: "voice", title: "Tevvoice (tokens.css)" },
          { value: "scribe", title: "TevScribe (themes/scribe.css)" },
        ],
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    options: { storySort: { order: ["Layout", "Brand", "Primitives"] } },
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    a11y: { test: "todo" },
    backgrounds: {
      options: {
        surface: { name: "Surface", value: "var(--background)" },
        card: { name: "Card", value: "var(--card)" },
      },
    },
  },
  initialGlobals: { backgrounds: { value: "surface" }, theme: "voice" },
  tags: ["autodocs"],
};

export default preview;
