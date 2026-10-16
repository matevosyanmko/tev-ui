import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChevronLeft, Plus, RefreshCw } from "lucide-react";
import { ToolbarButton } from "./ToolbarButton";

const meta = {
  title: "Layout/ToolbarButton",
  component: ToolbarButton,
  argTypes: {
    variant: { control: "inline-radio", options: ["default", "primary"] },
    disabled: { control: "boolean" },
  },
  args: { variant: "default" },
  decorators: [
    (Story) => (
      <div className="flex h-16 w-[360px] items-center gap-2 bg-black p-2">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ToolbarButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <ToolbarButton {...args}>
      <RefreshCw aria-hidden="true" />
      Refresh
    </ToolbarButton>
  ),
};

/** The row's one call to action. */
export const Primary: Story = {
  args: { variant: "primary" },
  render: (args) => (
    <ToolbarButton {...args}>
      <Plus aria-hidden="true" />
      New meeting
    </ToolbarButton>
  ),
};

/** A way back, as a link. */
export const BackLink: Story = {
  render: (args) => (
    <ToolbarButton {...args} asChild className="pl-3">
      <a href="#meetings">
        <ChevronLeft aria-hidden="true" />
        Meetings
      </a>
    </ToolbarButton>
  ),
};

/** Icon only: a square tile, named by its aria-label. */
export const IconOnly: Story = {
  render: (args) => (
    <ToolbarButton {...args} aria-label="Refresh" className="px-0">
      <RefreshCw aria-hidden="true" />
    </ToolbarButton>
  ),
};
