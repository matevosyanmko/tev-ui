import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, waitFor } from "storybook/test";

import { FilterIcon } from "../../brand/ScribeIcons/ScribeIcons";
import { Popover, PopoverContent, PopoverTrigger } from "../Popover/Popover";
import { Toggle } from "./Toggle";

const meta = {
  title: "Primitives/Toggle",
  component: Toggle,
  argTypes: {
    variant: { control: "select", options: ["default", "outline"] },
    size: { control: "select", options: ["default", "sm", "lg"] },
    defaultPressed: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: {
    children: "Toggle",
    variant: "outline",
    size: "default",
    defaultPressed: false,
    "aria-label": "Toggle",
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/**
 * TevScribe's filter button (100:41492): a boxed Toggle that opens the
 * Filters panel and stays pressed (ink) while any filter is on. As a
 * `PopoverTrigger asChild` its `data-state` reads "open" / "closed", so the
 * pressed look keys off `aria-pressed` too — open the panel and it stays ink.
 */
export const BoxedPopoverTrigger: Story = {
  globals: { theme: "scribe" },
  args: { variant: "boxed", size: "box", "aria-label": "Filters", children: undefined },
  render: function BoxedPopoverTriggerStory(args) {
    const [active, setActive] = React.useState(true);
    return (
      <div className="flex h-60 items-start gap-4 p-6">
        <Popover>
          <PopoverTrigger asChild>
            <Toggle {...args} pressed={active}>
              <FilterIcon />
            </Toggle>
          </PopoverTrigger>
          <PopoverContent variant="panel" align="start" sideOffset={8}>
            <button
              type="button"
              className="text-label-12 text-content-primary underline"
              onClick={() => setActive((on) => !on)}
            >
              {active ? "Clear the filters" : "Turn a filter on"}
            </button>
          </PopoverContent>
        </Popover>
      </div>
    );
  },
  play: async ({ canvas, canvasElement }) => {
    // surface-inverse under the TevScribe theme.
    const ink = "rgb(0, 0, 0)";
    const trigger = canvas.getByRole("button", { name: "Filters" });
    await expect(trigger).toHaveAttribute("data-state", "closed");
    await expect(trigger).toHaveAttribute("aria-pressed", "true");
    await waitFor(() => expect(getComputedStyle(trigger).backgroundColor).toBe(ink));

    await userEvent.click(trigger);
    await waitFor(() => expect(trigger).toHaveAttribute("data-state", "open"));
    await expect(trigger).toHaveAttribute("aria-pressed", "true");
    await waitFor(() => expect(getComputedStyle(trigger).backgroundColor).toBe(ink));

    // Cleared while open: no longer pressed, so the white box comes back.
    const doc = canvasElement.ownerDocument;
    await userEvent.click(doc.querySelector<HTMLElement>("[data-slot=popover-content] button")!);
    await expect(trigger).toHaveAttribute("aria-pressed", "false");
    await waitFor(() => expect(getComputedStyle(trigger).backgroundColor).not.toBe(ink));
  },
};
