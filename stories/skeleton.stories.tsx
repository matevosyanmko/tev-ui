import type { Meta, StoryObj } from "@storybook/react-vite";
import { Skeleton } from "@tev/ui/skeleton";

const meta = {
  title: "Primitives/Skeleton",
  component: Skeleton,
  argTypes: {
    className: { control: "text" },
  },
  args: { className: "h-4 w-[250px]" },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
