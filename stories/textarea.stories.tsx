import type { Meta, StoryObj } from "@storybook/react-vite";
import { Textarea } from "@tev/ui/textarea";

const meta = {
  title: "Primitives/Textarea",
  component: Textarea,
  argTypes: {
    placeholder: { control: "text" },
    rows: { control: { type: "number", min: 2, max: 12 } },
    disabled: { control: "boolean" },
    readOnly: { control: "boolean" },
  },
  args: { placeholder: "Add a note about this call…", rows: 4 },
  render: (args) => (
    <div className="w-96">
      <Textarea {...args} />
    </div>
  ),
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
