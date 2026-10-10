import type { Meta, StoryObj } from "@storybook/react-vite";

import { ANALYTICS_WIDGET_SAMPLES } from "../AnalyticsWidget/AnalyticsWidget.samples.js";
import { BarList } from "./BarList";

const meta = {
  title: "Analytics/BarList",
  component: BarList,
  args: ANALYTICS_WIDGET_SAMPLES.bar_list,
  decorators: [
    (Story) => (
      <div className="w-[420px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof BarList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

const ONE_DECIMAL = new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 });

/** Shares to one decimal, each of a base wider than the list (a top 3 of 48). */
export const GivenShares: Story = {
  args: {
    items: [
      { key: "safety", label: "Safety", value: 13, share: (13 / 48) * 100 },
      { key: "fare", label: "Fare transparency", value: 5, share: (5 / 48) * 100 },
      { key: "wait", label: "Waiting time", value: 2, share: (2 / 48) * 100 },
    ],
    formatShare: (percent) => `${ONE_DECIMAL.format(percent)}%`,
  },
};
