import type { Meta, StoryObj } from "@storybook/react-vite";

import { ActionDock } from "./ActionDock";
import { DockShape } from "./DockShape";
import { Button } from "../../primitives/Button/Button";
import { ExportPdfButton } from "../../brand/ExportPdfButton/ExportPdfButton";
import { FilterGroup } from "../../brand/FilterGroup/FilterGroup";
import { DateIcon } from "../../brand/Icons/Icons";
import { AppFilterRow } from "../AppFilterRow/AppFilterRow";

const meta = {
  title: "Layout/ActionDock",
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
} satisfies Meta<typeof ActionDock>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Sitting where it actually sits: the dock notches into the bottom-right
 * corner of an `<AppFilterRow>`, sharing its parent's `relative` box.
 */
export const WithAppFilterRow: Story = {
  render: () => (
    <div className="relative w-[560px]">
      <AppFilterRow>
        <FilterGroup
          icon={DateIcon}
          label="Date"
          className="h-12 rounded-[24px] bg-brand-surface-2 p-2"
        >
          <div className="flex h-8 items-center rounded-[24px] bg-brand-green px-3 text-[11px] font-semibold text-brand-green-foreground">
            Last 7 days
          </div>
        </FilterGroup>
      </AppFilterRow>
      <ActionDock>
        <ExportPdfButton label="PDF" onClick={() => {}} />
      </ActionDock>
    </div>
  ),
};

/** One action: the shape shrinks to its minimum width. */
export const SingleAction: Story = {
  decorators: [
    // The dock positions itself against a relatively-positioned box — here a
    // plain card standing in for `<AppFilterRow>` — so there is nothing to
    // look at without it.
    (Story) => (
      <div className="relative h-[280px] w-[560px] rounded-[33px] bg-brand-purple-soft p-6">
        <p className="text-sm font-medium">Interaction detail</p>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <ActionDock>
      <ExportPdfButton label="PDF" onClick={() => {}} />
    </ActionDock>
  ),
};

/** Three actions: the background path is regenerated from the measured width. */
export const MultipleActions: Story = {
  decorators: [
    (Story) => (
      <div className="relative h-[280px] w-[560px] rounded-[33px] bg-brand-purple-soft p-6">
        <p className="text-sm font-medium">Interaction detail</p>
        <Story />
      </div>
    ),
  ],
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
