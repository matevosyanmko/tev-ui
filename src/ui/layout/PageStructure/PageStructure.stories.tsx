import type { Meta, StoryObj } from "@storybook/react-vite";

import { PageStructure } from "./PageStructure";
import { AppFilterRow } from "../AppFilterRow/AppFilterRow";

const meta = {
  title: "Layout/PageStructure",
  component: PageStructure,
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <div className="h-dvh p-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PageStructure>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: <h1 className="text-2xl font-bold">Overview</h1>,
    children: <p>Page content scrolls inside the card.</p>,
  },
};

/** `filterRow` is opt-in — the app composes its own `<AppFilterRow>` and passes it in. */
export const WithFilterRow: Story = {
  args: {
    filterRow: <AppFilterRow>{null}</AppFilterRow>,
    title: <h1 className="text-2xl font-bold">Interactions</h1>,
    rightSlot: (
      <button className="ml-auto rounded-full bg-brand-purple px-4 py-2 text-sm text-white">
        Export
      </button>
    ),
    children: <p>Page content scrolls inside the card.</p>,
  },
};
