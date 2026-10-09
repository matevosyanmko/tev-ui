import type { Meta, StoryObj } from "@storybook/react-vite";

import { ANALYTICS_WIDGET_SAMPLES } from "../AnalyticsWidget/AnalyticsWidget.samples.js";
import { BarChart } from "./BarChart";

const meta = {
  title: "Analytics/BarChart",
  component: BarChart,
  args: ANALYTICS_WIDGET_SAMPLES.bar_vertical,
  decorators: [
    (Story) => (
      <div className="w-[520px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof BarChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Columns: Story = {};
export const Rows: Story = {
  args: { ...ANALYTICS_WIDGET_SAMPLES.bar_horizontal, orientation: "horizontal" },
};
export const Funnel: Story = {
  args: {
    ...ANALYTICS_WIDGET_SAMPLES.bar_funnel,
    orientation: "horizontal",
    colorByCategory: true,
  },
};
export const Stacked: Story = {
  args: {
    ...ANALYTICS_WIDGET_SAMPLES.bar_stacked_horizontal,
    orientation: "horizontal",
    stacked: true,
  },
};
export const Stacked100: Story = {
  args: { ...ANALYTICS_WIDGET_SAMPLES.bar_stacked_100_vertical, stacked: true, percent: true },
};
export const Grouped: Story = { args: ANALYTICS_WIDGET_SAMPLES.bar_grouped_vertical };
export const GroupedRows: Story = {
  args: { ...ANALYTICS_WIDGET_SAMPLES.bar_grouped_horizontal, orientation: "horizontal" },
};
