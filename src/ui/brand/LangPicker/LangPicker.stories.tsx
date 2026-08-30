import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

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
