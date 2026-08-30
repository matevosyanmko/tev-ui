import type { Meta, StoryObj } from "@storybook/react-vite";
import { ScrollArea } from "./ScrollArea";

const meta = {
  title: "Primitives/ScrollArea",
  component: ScrollArea,
  argTypes: {
    type: { control: "select", options: ["auto", "always", "scroll", "hover"] },
    scrollHideDelay: { control: "number" },
    dir: { control: "select", options: ["ltr", "rtl"] },
  },
  args: { type: "hover", className: "h-48 w-64 rounded-md border" },
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

const tags = Array.from({ length: 30 }, (_, i) => `Tag ${i + 1}`);

export const Default: Story = {
  render: (args) => (
    <ScrollArea {...args}>
      <div className="p-4">
        <h4 className="mb-3 text-sm leading-none font-medium">Tags</h4>
        {tags.map((tag) => (
          <div key={tag} className="border-b py-2 text-sm last:border-b-0">
            {tag}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};
