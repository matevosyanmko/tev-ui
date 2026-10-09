import type { Meta, StoryObj } from "@storybook/react-vite";

import { ANALYTICS_WIDGET_SAMPLES } from "../AnalyticsWidget/AnalyticsWidget.samples.js";
import { Heatmap } from "./Heatmap";

const meta = {
  title: "Analytics/Heatmap",
  component: Heatmap,
  args: ANALYTICS_WIDGET_SAMPLES.heatmap_matrix,
  decorators: [
    (Story) => (
      <div className="w-[640px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Heatmap>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Cells: Story = {};
export const Dense: Story = {
  args: { ...ANALYTICS_WIDGET_SAMPLES.heatmap_week_hour, variant: "dense" },
};
