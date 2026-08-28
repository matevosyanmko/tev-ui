import type { Meta, StoryObj } from "@storybook/react-vite";
import { ToggleGroup, ToggleGroupItem } from "./ToggleGroup";

const meta = {
  title: "Primitives/ToggleGroup",
  component: ToggleGroup,
  argTypes: {
    variant: { control: "select", options: ["default", "outline"] },
    size: { control: "select", options: ["default", "sm", "lg"] },
    spacing: { control: "number" },
    disabled: { control: "boolean" },
  },
  args: {
    type: "single",
    defaultValue: "day",
    variant: "outline",
    size: "default",
    spacing: 0,
  },
} satisfies Meta<typeof ToggleGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({ variant, size, spacing, disabled }) => (
    <ToggleGroup
      type="single"
      defaultValue="day"
      variant={variant}
      size={size}
      spacing={spacing}
      disabled={disabled}
    >
      <ToggleGroupItem value="day" aria-label="Day">
        Day
      </ToggleGroupItem>
      <ToggleGroupItem value="week" aria-label="Week">
        Week
      </ToggleGroupItem>
      <ToggleGroupItem value="month" aria-label="Month">
        Month
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};
