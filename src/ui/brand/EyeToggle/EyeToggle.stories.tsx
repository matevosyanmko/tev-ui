import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { EyeToggle } from "./EyeToggle";
import { Input } from "../../primitives/Input/Input";

const meta = {
  title: "Brand/EyeToggle",
  component: EyeToggle,
  argTypes: { visible: { control: "boolean" } },
  args: { visible: false, onToggle: () => {} },
} satisfies Meta<typeof EyeToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Hover it: the rest glyph swaps for the half-open one on Hover Purple. */
export const Hidden: Story = {};

export const Visible: Story = { args: { visible: true } };

/** In the field it belongs to, driving a real password input. */
export const InPasswordField: Story = {
  render: function InPasswordFieldStory() {
    const [visible, setVisible] = React.useState(false);
    return (
      <div className="relative w-72">
        <Input
          type={visible ? "text" : "password"}
          defaultValue="correct-horse-battery"
          className="pr-11"
          aria-label="Password"
        />
        <span className="absolute top-1/2 right-1.5 -translate-y-1/2">
          <EyeToggle visible={visible} onToggle={() => setVisible((v) => !v)} />
        </span>
      </div>
    );
  },
};

/** The two accessible names are the only strings it carries. */
export const Translated: Story = {
  args: { labels: { show: "Показать пароль", hide: "Скрыть пароль" } },
};
