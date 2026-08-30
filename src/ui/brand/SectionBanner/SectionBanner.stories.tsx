import type { Meta, StoryObj } from "@storybook/react-vite";

import { SectionBanner } from "./SectionBanner";

const meta = {
  title: "Brand/SectionBanner",
  component: SectionBanner,
  args: { children: "Sentiment overview" },
} satisfies Meta<typeof SectionBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/**
 * The point of the component: consecutive sections are separated identically,
 * and the first one loses its top margin so it sits flush under the page title.
 */
export const Stacked: Story = {
  render: () => (
    <div className="w-[640px]">
      <SectionBanner>Volume</SectionBanner>
      <p className="text-sm text-muted-foreground">
        4,182 interactions across voice, webchat and email.
      </p>
      <SectionBanner>Sentiment overview</SectionBanner>
      <p className="text-sm text-muted-foreground">61% positive, 24% neutral, 15% negative.</p>
      <SectionBanner>Agent performance</SectionBanner>
      <p className="text-sm text-muted-foreground">Top 10 agents by resolution rate.</p>
    </div>
  ),
};
