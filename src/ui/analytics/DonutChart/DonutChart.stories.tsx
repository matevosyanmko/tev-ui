import type { Meta, StoryObj } from "@storybook/react-vite";

import { ANALYTICS_WIDGET_SAMPLES } from "../AnalyticsWidget/AnalyticsWidget.samples.js";
import { DonutChart } from "./DonutChart";

const meta = {
  title: "Analytics/DonutChart",
  component: DonutChart,
  args: ANALYTICS_WIDGET_SAMPLES.donut,
  decorators: [
    (Story) => (
      <div className="w-[420px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DonutChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Legend: Story = {};
export const Total: Story = {
  args: { ...ANALYTICS_WIDGET_SAMPLES.donut_center_total, variant: "total" },
};
export const Empty: Story = { args: { data: [] } };
