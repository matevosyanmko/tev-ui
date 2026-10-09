import type { Meta, StoryObj } from "@storybook/react-vite";

import { ANALYTICS_WIDGET_SAMPLES } from "../AnalyticsWidget/AnalyticsWidget.samples.js";
import { ScatterChart } from "./ScatterChart";

const meta = {
  title: "Analytics/ScatterChart",
  component: ScatterChart,
  args: ANALYTICS_WIDGET_SAMPLES.scatter_bubble,
  decorators: [
    (Story) => (
      <div className="w-[520px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ScatterChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Bubble: Story = {};
export const Points: Story = { args: ANALYTICS_WIDGET_SAMPLES.scatter };
