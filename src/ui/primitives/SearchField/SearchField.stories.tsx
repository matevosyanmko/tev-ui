import type { Meta, StoryObj } from "@storybook/react-vite";
import { SearchField } from "./SearchField";

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

/** TevScribe's toolbar search (100:41115): empty, typed, disabled, Armenian. */
export const ScribePill: Story = {
  globals: { theme: "scribe" },
  render: () => (
    <div className="flex w-202.5 flex-col gap-4">
      <SearchField variant="pill" placeholder="Search" aria-label="Search meetings" />
      <SearchField variant="pill" placeholder="Search" defaultValue="Product discussion" />
      <SearchField variant="pill" placeholder="Search" disabled />
      <SearchField variant="pill" placeholder="Որոնել" />
    </div>
  ),
};
