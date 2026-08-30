import type { Meta, StoryObj } from "@storybook/react-vite";

import { PageTitle } from "./PageTitle";

const meta = {
  title: "Layout/PageTitle",
  component: PageTitle,
  args: { children: "Team quality" },
} satisfies Meta<typeof PageTitle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Sitting where it actually sits: above a filter row, sharing the row's baseline. */
export const InPageHeader: Story = {
  render: () => (
    <div className="flex items-center justify-between gap-4 border-b pb-4">
      <PageTitle>Interaction search</PageTitle>
      <span className="text-[11px] text-muted-foreground">1,284 results</span>
    </div>
  ),
};

export const LongTitle: Story = {
  args: {
    children: "Quality assurance across every channel and agent",
    className: "max-w-md",
  },
};
