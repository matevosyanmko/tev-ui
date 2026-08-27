import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "@tev/ui/input";
import { Label } from "@tev/ui/label";

const meta = {
  title: "Primitives/Label",
  component: Label,
  argTypes: {
    children: { control: "text" },
    htmlFor: { control: "text" },
  },
  args: { children: "Email address", htmlFor: "label-story-email" },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="grid w-72 gap-2">
      <Label {...args} />
      <Input id="label-story-email" type="email" placeholder="you@example.com" />
    </div>
  ),
};
