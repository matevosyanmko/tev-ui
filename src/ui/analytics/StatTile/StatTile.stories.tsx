import type { Meta, StoryObj } from "@storybook/react-vite";

import { StatTile } from "./StatTile";

const meta = {
  title: "Analytics/StatTile",
  component: StatTile,
  args: { label: "Total interactions", value: "1,284", accent: "#5F02F4" },
  decorators: [
    (Story) => (
      <div className="w-[240px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof StatTile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithMeta: Story = { args: { meta: "of 2,347 analysed" } };
