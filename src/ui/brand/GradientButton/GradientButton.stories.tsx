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
 * A label longer than the pill wraps onto balanced lines and grows the pill,
 * rather than overflowing it — the heights are minimums. Worth checking at
 * `lg`, where the type is 48px and even a short translated phrase runs past
 * the width a dialog can give it.
 */
export const LongLabel: Story = {
  args: { size: "sm", children: "Export the full interaction history as PDF" },
};

/** The real thing: the app's onboarding CTA in each of its three languages. */
export const Translated: Story = {
  render: () => (
    <div className="flex w-[568px] flex-col gap-4">
      <GradientButton>Start guided tour</GradientButton>
      <GradientButton>Начать обучающий тур</GradientButton>
      <GradientButton>Սկսել ուղեկցվող շրջայց</GradientButton>
    </div>
  ),
};
