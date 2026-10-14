import type { Meta, StoryObj } from "@storybook/react-vite";
import { TruncatedText } from "../TruncatedText/TruncatedText";
import { CopyButton } from "./CopyButton";

const meta = {
  title: "Primitives/CopyButton",
  component: CopyButton,
  args: { value: "6710c2f9e4b0a1d3c8f5e912" },
  render: (args) => (
    <div className="flex justify-center p-12">
      <CopyButton {...args} />
    </div>
  ),
} satisfies Meta<typeof CopyButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Strings arrive as props, in the reader's language. */
export const Labels: Story = {
  args: { labels: { copy: "Պատճենել", copied: "Պատճենված է" } },
};

/** The usual pairing: an id cut short in a narrow column, with the whole value one click away. */
export const BesideTruncatedText: Story = {
  render: (args) => (
    <div className="flex w-40 items-center gap-1 rounded-md border p-3 text-xs">
      <TruncatedText>{args.value}</TruncatedText>
      <CopyButton {...args} />
    </div>
  ),
};
