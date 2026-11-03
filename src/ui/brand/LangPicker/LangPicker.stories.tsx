import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, screen, userEvent } from "storybook/test";

import { LangPicker } from "./LangPicker";

const LANGS = [
  { value: "en", label: "ENG" },
  { value: "am", label: "ARM" },
  { value: "ru", label: "RUS" },
];

const meta = {
  title: "Brand/LangPicker",
  component: LangPicker,
  args: { value: "en", options: LANGS, onChange: () => {} },
  decorators: [
    (Story) => (
      // Pinned to the foot of a tall dark panel: this drops upwards, and the
      // bottom edge is where that matters.
      <div className="flex h-[320px] w-[168px] items-end justify-center rounded-[24px] bg-brand-surface-1 p-3">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LangPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function DefaultStory(args) {
    const [value, setValue] = React.useState("en");
    return <LangPicker {...args} value={value} onChange={setValue} />;
  },
};

/** Only the languages you are not in are listed; the trigger is the current one. */
export const Armenian: Story = { args: { value: "am" } };

/** Two options means a single-entry menu — still correct, just short. */
export const TwoLanguages: Story = {
  args: { value: "en", options: LANGS.slice(0, 2) },
};

function ScribePicker() {
  const [value, setValue] = React.useState("en");
  return <LangPicker variant="accent-pill" value={value} options={LANGS} onChange={setValue} />;
}

/**
 * TevScribe's sidebar pill (100:41115): 72×32 brand green, the code in 10px
 * and the 16px chevron, which turns over while the list is open above it.
 */
export const ScribeAccentPill: Story = {
  globals: { theme: "scribe" },
  render: () => <ScribePicker />,
  play: async ({ canvas }) => {
    const trigger = canvas.getByRole("button", { name: "Language" });
    await expect(trigger).toHaveTextContent("ENG");
    await userEvent.click(trigger);
    await userEvent.click(await screen.findByRole("button", { name: "ARM" }));
    await expect(trigger).toHaveTextContent("ARM");
  },
};
