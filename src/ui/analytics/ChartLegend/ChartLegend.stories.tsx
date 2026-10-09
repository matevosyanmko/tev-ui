import type { Meta, StoryObj } from "@storybook/react-vite";

import { ChartLegend } from "./ChartLegend";

const meta = {
  title: "Analytics/ChartLegend",
  component: ChartLegend,
  args: {
    items: [
      { key: "positive", label: "Positive", swatch: "#5F02F4" },
      { key: "neutral", label: "Neutral", swatch: "#8AFF87" },
      { key: "negative", label: "Negative", swatch: "#C9B6F6" },
    ],
  },
} satisfies Meta<typeof ChartLegend>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Squares: Story = {};
export const Lines: Story = { args: { shape: "line" } };
