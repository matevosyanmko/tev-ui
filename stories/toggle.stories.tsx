import type { Meta, StoryObj } from "@storybook/react-vite";
import { Toggle } from "@tev/ui/toggle";

const meta = {
  title: "Primitives/Toggle",
  component: Toggle,
  argTypes: {
    variant: { control: "select", options: ["default", "outline"] },
    size: { control: "select", options: ["default", "sm", "lg"] },
    defaultPressed: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: {
    children: "Toggle",
    variant: "outline",
    size: "default",
    defaultPressed: false,
    "aria-label": "Toggle",
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
