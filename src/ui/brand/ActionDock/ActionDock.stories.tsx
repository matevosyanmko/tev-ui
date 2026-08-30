import type { Meta, StoryObj } from "@storybook/react-vite";

import { ActionDock } from "./ActionDock";
import { DockShape } from "./DockShape";
import { Button } from "../../primitives/Button/Button";
import { ExportPdfButton } from "../ExportPdfButton/ExportPdfButton";

const meta = {
  title: "Brand/ActionDock",
  component: ActionDock,
  // `children` is required, so meta has to supply it even though every story
  // below overrides it with its own `render`.
  args: {
    children: (
      <Button size="sm" variant="secondary">
        Reassign
      </Button>
    ),
  },
  decorators: [
    (Story) => (
      // The dock positions itself against a relatively-positioned card — that
      // card is what it notches into, so there is nothing to look at without it.
      <div className="relative h-[280px] w-[560px] rounded-[33px] bg-brand-purple-soft p-6">
        <p className="text-sm font-medium">Interaction detail</p>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ActionDock>;

export default meta;
type Story = StoryObj<typeof meta>;

/** One action: the shape shrinks to its minimum width. */
export const SingleAction: Story = {
  render: () => (
    <ActionDock>
      <ExportPdfButton label="PDF" onClick={() => {}} />
    </ActionDock>
  ),
};

/** Three actions: the background path is regenerated from the measured width. */
export const MultipleActions: Story = {
  render: () => (
    <ActionDock>
      <Button size="sm" variant="secondary">
        Reassign
      </Button>
      <Button size="sm" variant="secondary">
        Flag
      </Button>
      <ExportPdfButton label="PDF" onClick={() => {}} />
    </ActionDock>
  ),
};

/** The silhouette on its own, at three widths, with no content over it. */
export const ShapeOnly: Story = {
  render: () => (
    <div className="flex items-start gap-4">
      {[82, 140, 240].map((width) => (
        <DockShape key={width} width={width} />
      ))}
    </div>
  ),
};

/**
 * The path fills with `currentColor`, so recolouring the shape is just a text
 * colour on it — or, from outside, on any ancestor.
 */
export const Recoloured: Story = {
  render: () => (
    <div className="flex items-start gap-4">
      <DockShape width={140} />
      <DockShape width={140} className="text-brand-purple" />
      <DockShape width={140} className="text-brand-green" />
    </div>
  ),
};
