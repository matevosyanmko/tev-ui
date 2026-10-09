import type { Meta, StoryObj } from "@storybook/react-vite";
import { Ban, Clock3, MessageSquareText, ShieldAlert, Smile } from "lucide-react";

import { KpiTile } from "./KpiTile";

const meta = {
  title: "Analytics/KpiTile",
  component: KpiTile,
  args: {
    label: "Avg sentiment",
    value: 72,
    unit: "/ 100",
    meta: "0 negative · 50 neutral · 100 positive",
  },
  decorators: [
    (Story) => (
      <div className="w-[280px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof KpiTile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** The four tones, as the Operators tab uses them. */
export const Tones: Story = {
  decorators: [],
  render: () => (
    <div className="grid w-[640px] grid-cols-3 gap-3">
      <KpiTile icon={MessageSquareText} label="Total feedback" value="2,800" meta="Providers: 3" />
      <KpiTile
        icon={Smile}
        tone="green"
        label="Positive sentiment"
        value="50.3%"
        meta="18.9% negative"
      />
      <KpiTile
        icon={ShieldAlert}
        tone="coral"
        label="Safety incidents"
        value={47}
        meta="in 2,347 analysed"
      />
      <KpiTile
        icon={Ban}
        tone="dark"
        label="Cancellations"
        value={190}
        meta="8.1% of 2,347 analysed"
      />
      <KpiTile
        icon={Clock3}
        tone="dark"
        label="Long waits"
        value={244}
        meta="10.4% of 2,347 analysed"
      />
    </div>
  ),
};
