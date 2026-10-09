import type { Meta, StoryObj } from "@storybook/react-vite";

import { AnalyticsNote } from "./AnalyticsNote";

const meta = {
  title: "Analytics/AnalyticsNote",
  component: AnalyticsNote,
  args: { children: "Every figure counts customer feedback, not trips." },
  decorators: [
    (Story) => (
      <div className="w-[640px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AnalyticsNote>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {};
export const Warning: Story = {
  args: {
    tone: "warning",
    title: "Churn risk is a derived heuristic",
    children: "No native churn data is collected yet.",
  },
};
