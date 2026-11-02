import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, screen, userEvent, waitFor } from "storybook/test";

import { Chip } from "../../primitives/Chip/Chip";
import { Popover, PopoverContent, PopoverTrigger } from "../../primitives/Popover/Popover";
import { CaretDownIcon } from "../ScribeIcons/ScribeIcons";
import { TimeRangeWheel } from "./TimeRangeWheel";
import type { TimeRangeWheelProps } from "./TimeRangeWheel.types";

const PRESETS = [
  { label: "All day", value: { from: "00:00", to: "23:59" } },
  // The app computes this from the clock; fixed here so the story is stable.
  { label: "Last 12 hours", value: { from: "06:30", to: "18:30" } },
];

const meta = {
  title: "Brand/TimeRangeWheel",
  component: TimeRangeWheel,
  globals: { theme: "scribe" },
  args: {
    value: { from: "11:30", to: "18:30" },
    presets: PRESETS,
    onSave: fn(),
    onDiscard: fn(),
  },
  argTypes: {
    step: { control: "inline-radio", options: [1, 5, 15, 30] },
  },
} satisfies Meta<typeof TimeRangeWheel>;

export default meta;
type Story = StoryObj<typeof meta>;

/** How the app mounts it: in a picker popover under the filter row's time pill. */
function InPicker({
  defaultOpen = true,
  trigger = "12:25 - 18:00",
  ...props
}: TimeRangeWheelProps & { defaultOpen?: boolean; trigger?: string }) {
  const [open, setOpen] = React.useState(defaultOpen);
  return (
    <div className="flex h-72 justify-center">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Chip>
            {trigger}
            <CaretDownIcon />
          </Chip>
        </PopoverTrigger>
        <PopoverContent variant="picker" sideOffset={5}>
          <TimeRangeWheel
            {...props}
            onSave={(value) => {
              props.onSave(value);
              setOpen(false);
            }}
            onDiscard={() => {
              props.onDiscard?.();
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

/**
 * 100:43801 as drawn: 234px on the picker surface, the canvas box with the
 * two wheels on 11:30 and 18:30, the rows either side at 10% ink, the presets
 * and discard / Save.
 */
export const AsDrawn: Story = {
  render: (args) => <InPicker {...args} />,
};

/** Closed: only the time pill. */
export const Closed: Story = {
  render: (args) => <InPicker {...args} defaultOpen={false} />,
};

/**
 * Keyboard: each wheel is a spinbutton. ArrowDown steps a minute, PageDown an
 * hour, End and Home jump to the ends of the day; the wheel glides to the new
 * row (instantly with reduced motion). Save hands back the draft.
 */
export const Keyboard: Story = {
  render: (args) => <InPicker {...args} />,
  play: async ({ args }) => {
    const from = await screen.findByRole("spinbutton", { name: "From" });
    from.focus();
    await userEvent.keyboard("{ArrowDown}");
    await expect(from).toHaveAttribute("aria-valuetext", "11:31");
    await userEvent.keyboard("{PageDown}");
    await expect(from).toHaveAttribute("aria-valuetext", "12:31");
    await userEvent.keyboard("{End}");
    await expect(from).toHaveAttribute("aria-valuetext", "23:59");
    await userEvent.keyboard("{Home}");
    await expect(from).toHaveAttribute("aria-valuetext", "00:00");
    await userEvent.keyboard("{ArrowUp}");
    await expect(from).toHaveAttribute("aria-valuetext", "00:00");
    await userEvent.click(screen.getByRole("button", { name: "Save" }));
    await expect(args.onSave).toHaveBeenCalledWith({ from: "00:00", to: "18:30" });
  },
};

/** Scrolling a wheel two rows commits the row that settles in the middle. */
export const Scroll: Story = {
  render: (args) => <InPicker {...args} />,
  play: async () => {
    const to = await screen.findByRole("spinbutton", { name: "To" });
    to.scrollBy({ top: 36, behavior: "instant" });
    await waitFor(() => expect(to).toHaveAttribute("aria-valuetext", "18:32"));
  },
};

/** Presets set both wheels; the chip stays selected while the draft matches it. */
export const Presets: Story = {
  render: (args) => <InPicker {...args} />,
  play: async () => {
    const allDay = await screen.findByRole("button", { name: "All day" });
    await userEvent.click(allDay);
    await expect(allDay).toHaveAttribute("aria-pressed", "true");
    await expect(screen.getByRole("spinbutton", { name: "From" })).toHaveAttribute(
      "aria-valuetext",
      "00:00",
    );
    await expect(screen.getByRole("spinbutton", { name: "To" })).toHaveAttribute(
      "aria-valuetext",
      "23:59",
    );
  },
};

/** A 15-minute step: a value off the grid (17:40) lands on the option before it. */
export const QuarterHourStep: Story = {
  args: { step: 15, value: { from: "09:00", to: "17:40" } },
  render: (args) => <InPicker {...args} />,
};

/** Empty: no value (the whole day) and no presets. */
export const Empty: Story = {
  args: { value: undefined, presets: undefined },
  render: (args) => <InPicker {...args} />,
};

/** Armenian labels; the times stay 24-hour digits. */
export const Armenian: Story = {
  args: {
    presets: [
      { label: "Ամբողջ օրը", value: { from: "00:00", to: "23:59" } },
      { label: "Վերջին 12 ժամը", value: { from: "06:30", to: "18:30" } },
    ],
    labels: { from: "Սկիզբ", to: "Ավարտ", discard: "չեղարկել", save: "Պահպանել" },
  },
  render: (args) => <InPicker {...args} />,
};
