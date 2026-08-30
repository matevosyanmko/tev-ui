import type { Preview } from "@storybook/react-vite";

import "./preview.css";

const preview: Preview = {
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
  initialGlobals: { backgrounds: { value: "surface" } },
  tags: ["autodocs"],
};

export default preview;
