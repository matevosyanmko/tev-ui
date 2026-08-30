import type { Meta, StoryObj } from "@storybook/react-vite";

import { GradientButton } from "./GradientButton";

const meta = {
  title: "Brand/GradientButton",
  component: GradientButton,
  argTypes: {
    size: { control: "inline-radio", options: ["lg", "md", "sm"] },
    disabled: { control: "boolean" },
  },
  args: { children: "Start free trial", size: "lg", disabled: false },
} satisfies Meta<typeof GradientButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** The full-scale CTA, one step down, and the inline size — all three at once. */
export const Sizes: Story = {
  render: () => (
    <div className="flex w-[520px] flex-col gap-4">
      <GradientButton size="lg">Get started</GradientButton>
      <GradientButton size="md">Get started</GradientButton>
      <GradientButton size="sm">Get started</GradientButton>
    </div>
  ),
};

export const Disabled: Story = {
  args: { size: "md", disabled: true, children: "Uploading…" },
};

/**
 * The label never wraps — it is `whitespace-nowrap` by design, so a long one
 * overflows the pill rather than growing it to two lines.
 */
export const LongLabel: Story = {
  args: { size: "sm", children: "Export the full interaction history as PDF" },
};
