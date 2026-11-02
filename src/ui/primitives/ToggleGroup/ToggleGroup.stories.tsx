import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent } from "storybook/test";

import { CalendarViewIcon, FilterIcon, ListViewIcon } from "../../brand/ScribeIcons/ScribeIcons";
import { Toggle } from "../Toggle/Toggle";
import { ToggleGroup, ToggleGroupItem } from "./ToggleGroup";

const meta = {
  title: "Primitives/ToggleGroup",
  component: ToggleGroup,
  argTypes: {
    variant: { control: "select", options: ["default", "outline", "boxed"] },
    size: { control: "select", options: ["default", "sm", "lg"] },
    spacing: { control: "number" },
    disabled: { control: "boolean" },
  },
  args: {
    type: "single",
    defaultValue: "day",
    variant: "outline",
    size: "default",
    spacing: 0,
  },
} satisfies Meta<typeof ToggleGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({ variant, size, spacing, disabled }) => (
    <ToggleGroup
      type="single"
      defaultValue="day"
      variant={variant}
      size={size}
      spacing={spacing}
      disabled={disabled}
    >
      <ToggleGroupItem value="day" aria-label="Day">
        Day
      </ToggleGroupItem>
      <ToggleGroupItem value="week" aria-label="Week">
        Week
      </ToggleGroupItem>
      <ToggleGroupItem value="month" aria-label="Month">
        Month
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

/**
 * TevScribe's toolbar (100:41115): the list/calendar view switch as 32px
 * boxes 8px apart, the chosen view ink-filled with a white stroke, and the
 * standalone filter toggle beside the search, ink-filled while its panel is
 * open (100:41492). Hover, Tab and Space all work.
 */
export const ScribeBoxed: Story = {
  globals: { theme: "scribe" },
  render: () => (
    <div className="flex items-center gap-2">
      <ToggleGroup type="single" defaultValue="list" variant="boxed" size="box" aria-label="View">
        <ToggleGroupItem value="list" aria-label="List view">
          <ListViewIcon />
        </ToggleGroupItem>
        <ToggleGroupItem value="calendar" aria-label="Calendar view">
          <CalendarViewIcon />
        </ToggleGroupItem>
      </ToggleGroup>
      <Toggle variant="boxed" size="box" aria-label="Filters">
        <FilterIcon />
      </Toggle>
      <Toggle variant="boxed" size="box" aria-label="Filters (open)" defaultPressed>
        <FilterIcon />
      </Toggle>
      <Toggle variant="boxed" size="box" aria-label="Filters (disabled)" disabled>
        <FilterIcon />
      </Toggle>
    </div>
  ),
  play: async ({ canvas }) => {
    const calendar = canvas.getByRole("radio", { name: "Calendar view" });
    await userEvent.click(calendar);
    await expect(calendar).toHaveAttribute("data-state", "on");
    await expect(canvas.getByRole("radio", { name: "List view" })).toHaveAttribute(
      "data-state",
      "off",
    );
    const filter = canvas.getByRole("button", { name: "Filters" });
    await userEvent.click(filter);
    await expect(filter).toHaveAttribute("aria-pressed", "true");
  },
};
