import type { Meta, StoryObj } from "@storybook/react-vite";
import { Label } from "../Label/Label";
import { Switch } from "./Switch";

const meta = {
  title: "Primitives/Switch",
  component: Switch,
  argTypes: {
    size: { control: "inline-radio", options: ["default", "sm"] },
    disabled: { control: "boolean" },
  },
  args: { size: "default", "aria-label": "Calendar auto-join" },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Off: Story = {};

export const On: Story = { args: { defaultChecked: true } };

export const Small: Story = { args: { size: "sm", defaultChecked: true } };

export const Disabled: Story = { args: { disabled: true, defaultChecked: true } };

/**
 * The usual shape: a setting's label on the left, the switch on the right. A
 * <label> pointing at the switch makes the words a press target as well.
 */
export const WithLabel: Story = {
  render: (args) => (
    <div className="flex w-80 items-center justify-between gap-4">
      <Label htmlFor="auto-join">Join my calendar meetings automatically</Label>
      <Switch {...args} id="auto-join" aria-label={undefined} />
    </div>
  ),
};
