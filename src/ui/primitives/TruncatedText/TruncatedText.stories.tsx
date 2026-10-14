import type { Meta, StoryObj } from "@storybook/react-vite";
import { TruncatedText } from "./TruncatedText";

const meta = {
  title: "Primitives/TruncatedText",
  component: TruncatedText,
  argTypes: {
    side: { control: "inline-radio", options: ["top", "right", "bottom", "left"] },
  },
  args: { side: "top", children: "/api/interactions/6710c2f9e4b0a1d3c8f5e912/analysis" },
  render: (args) => (
    <div className="w-56 rounded-md border p-3 text-sm">
      <TruncatedText {...args} />
    </div>
  ),
} satisfies Meta<typeof TruncatedText>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Cut short, so hovering it shows the whole path. */
export const Default: Story = {};

/** Fits, so there is no tooltip to show. */
export const Fits: Story = {
  args: { children: "Audit log" },
};

/** Beside an icon in a flex row it takes the space left over. */
export const InFlexRow: Story = {
  render: (args) => (
    <div className="flex w-56 items-center gap-2 rounded-md border p-3 text-sm">
      <span aria-hidden="true" className="size-2.5 shrink-0 rounded-full bg-brand-purple" />
      <TruncatedText {...args}>
        support-team-lead@a-very-long-company-name.example.com
      </TruncatedText>
    </div>
  ),
};
