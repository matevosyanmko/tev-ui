import type { Meta, StoryObj } from "@storybook/react-vite";
import { Separator } from "@tev/ui/separator";

const meta = {
  title: "Primitives/Separator",
  component: Separator,
  argTypes: {
    orientation: { control: "select", options: ["horizontal", "vertical"] },
    decorative: { control: "boolean" },
  },
  args: { orientation: "horizontal", decorative: true },
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({ orientation = "horizontal", ...args }) =>
    orientation === "vertical" ? (
      <div className="flex h-10 items-center gap-4 text-sm">
        <span>Overview</span>
        <Separator orientation={orientation} {...args} />
        <span>Numbers</span>
        <Separator orientation={orientation} {...args} />
        <span>Settings</span>
      </div>
    ) : (
      <div className="flex w-72 flex-col gap-3 text-sm">
        <div>Overview</div>
        <Separator orientation={orientation} {...args} />
        <div>Numbers</div>
        <Separator orientation={orientation} {...args} />
        <div>Settings</div>
      </div>
    ),
};
