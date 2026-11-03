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

/** TevScribe's soft green note under a meeting title (100:40786). */
export const ScribeSuccessSoft: Story = {
  globals: { theme: "scribe" },
  args: {
    variant: "success-soft",
    children: "the recording transcript ended at 10:25, when you left the meeting",
  },
};

/** Armenian copy, and a long note that wraps inside a narrow column. */
export const ScribeSuccessSoftEdgeCases: Story = {
  globals: { theme: "scribe" },
  render: () => (
    <div className="flex w-80 flex-col gap-3">
      <SectionBanner variant="success-soft">
        ձայնագրության սղագրությունն ավարտվեց 10:25-ին, երբ դուք լքեցիք հանդիպումը
      </SectionBanner>
      <SectionBanner variant="success-soft">
        the recording transcript ended at 10:25, when you left the meeting, and the summary will
        follow in a few minutes
      </SectionBanner>
    </div>
  ),
};
