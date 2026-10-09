import type { Meta, StoryObj } from "@storybook/react-vite";

import { ANALYTICS_WIDGET_SAMPLES } from "../AnalyticsWidget/AnalyticsWidget.samples.js";
import { LineChart } from "./LineChart";

const meta = {
  title: "Analytics/LineChart",
  component: LineChart,
  args: ANALYTICS_WIDGET_SAMPLES.line_multi,
  decorators: [
    (Story) => (
      <div className="w-[560px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LineChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MultiLine: Story = {};
export const ScoreWithReference: Story = {
  args: {
    ...ANALYTICS_WIDGET_SAMPLES.line_score_reference,
    yDomain: [0, 100],
    yTicks: [0, 25, 50, 75, 100],
    referenceLine: { y: 50, label: "Neutral" },
  },
};
