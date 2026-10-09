import type { Meta, StoryObj } from "@storybook/react-vite";

import { ChartTooltip } from "./ChartTooltip";

const meta = {
  title: "Analytics/ChartTooltip",
  component: ChartTooltip,
  args: {
    active: true,
    payload: [{ payload: { name: "Billing", minutes: 6.2, resolution: 77 } }],
    rows: [
      { label: "Avg handling", value: (d) => `${d.minutes} min` },
      { label: "Resolution", value: (d) => `${d.resolution}%` },
    ],
  },
} satisfies Meta<typeof ChartTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

/** What Recharts shows on hover when given `content={<ChartTooltip rows={…} />}`. */
export const Default: Story = {};
