import type { Meta, StoryObj } from "@storybook/react-vite";
import { SearchField } from "@tev/ui/search-field";

const meta = {
  title: "Primitives/SearchField",
  component: SearchField,
  argTypes: {
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    className: { control: "text" },
    inputClassName: { control: "text" },
  },
  args: {
    placeholder: "Search calls",
    disabled: false,
    className: "w-64",
  },
} satisfies Meta<typeof SearchField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
