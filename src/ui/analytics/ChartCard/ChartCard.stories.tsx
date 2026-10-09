import type { Meta, StoryObj } from "@storybook/react-vite";

import { BarList } from "../BarList/BarList";
import { ANALYTICS_WIDGET_SAMPLES } from "../AnalyticsWidget/AnalyticsWidget.samples.js";
import { ChartCard, ChartEmpty } from "./ChartCard";

const meta = {
  title: "Analytics/ChartCard",
  component: ChartCard,
  args: {
    title: "Feedback topics",
    subtitle: "Share of analysed feedback, one topic each",
    children: <BarList {...ANALYTICS_WIDGET_SAMPLES.bar_list} />,
  },
  decorators: [
    (Story) => (
      <div className="w-[480px] bg-[#f5f7fb] p-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ChartCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Empty: Story = { args: { children: <ChartEmpty /> } };
