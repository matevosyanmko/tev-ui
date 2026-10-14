import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./Badge";

const meta = {
  title: "Primitives/Badge",
  component: Badge,
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "destructive", "outline", "ghost", "link"],
    },
    asChild: { control: "boolean" },
    wrap: { control: "boolean" },
  },
  args: { children: "Badge", variant: "default", asChild: false, wrap: false },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/**
 * Labels wider than their column. Without `wrap` they are cut off; with it,
 * the lines are centred and each badge hugs its longest line instead of
 * stretching across the column. The last one has a status dot beside it.
 */
export const Wrap: Story = {
  args: { wrap: true },
  render: (args) => (
    <div className="flex gap-6">
      {[96, 140].map((width) => (
        <div key={width} className="flex flex-col items-start gap-2" style={{ width }}>
          <Badge {...args}>Needs follow-up call</Badge>
          <Badge {...args} variant="secondary">
            Չլուծված խնդիր
          </Badge>
          <Badge {...args} variant="outline">
            <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-brand-amber" />
            Analysis in progress
          </Badge>
        </div>
      ))}
    </div>
  ),
};
