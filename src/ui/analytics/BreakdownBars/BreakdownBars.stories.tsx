import type { Meta, StoryObj } from "@storybook/react-vite";

import { ANALYTICS_WIDGET_SAMPLES } from "../AnalyticsWidget/AnalyticsWidget.samples.js";
import { BreakdownBars } from "./BreakdownBars";

const meta = {
  title: "Analytics/BreakdownBars",
  component: BreakdownBars,
  args: ANALYTICS_WIDGET_SAMPLES.breakdown_100_rows,
  decorators: [
    (Story) => (
      <div className="w-[480px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof BreakdownBars>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const EmptyRow: Story = {
  args: {
    rows: [
      ...ANALYTICS_WIDGET_SAMPLES.breakdown_100_rows.rows,
      { key: "new", label: "New provider", values: {} },
    ],
  },
};
