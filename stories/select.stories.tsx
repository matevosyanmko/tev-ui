import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@tev/ui/select";

const meta = {
  title: "Primitives/Select",
  component: Select,
  argTypes: {
    disabled: { control: "boolean" },
    required: { control: "boolean" },
  },
  args: { defaultValue: "support" },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Select {...args}>
      <SelectTrigger className="w-56">
        <SelectValue placeholder="Select a queue" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Teams</SelectLabel>
          <SelectItem value="support">Support</SelectItem>
          <SelectItem value="sales">Sales</SelectItem>
          <SelectItem value="billing" disabled>
            Billing
          </SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Agents</SelectLabel>
          <SelectItem value="voicemail">Voicemail</SelectItem>
          <SelectItem value="after-hours">After hours</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};
