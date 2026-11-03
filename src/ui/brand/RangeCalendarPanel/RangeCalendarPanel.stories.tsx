import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { hy } from "react-day-picker/locale";
import { expect, fn, screen, userEvent, waitFor } from "storybook/test";

import { Chip } from "../../primitives/Chip/Chip";
import { Popover, PopoverContent, PopoverTrigger } from "../../primitives/Popover/Popover";
import { CaretDownIcon } from "../ScribeIcons/ScribeIcons";
import { RangeCalendarPanel } from "./RangeCalendarPanel";
import type { DateRange, RangeCalendarPanelProps } from "./RangeCalendarPanel.types";

// The frame's own data: December 2022, today the 15th, 22–30 selected,
// meetings on the 8th, 14th, 19th and 30th.
const TODAY = new Date(2022, 11, 15);
const DRAWN_RANGE: DateRange = { from: new Date(2022, 11, 22), to: new Date(2022, 11, 30) };
const MARKED = [8, 14, 19, 30].map((d) => new Date(2022, 11, d));
const PRESETS = [
  { label: "All Time", range: undefined },
  { label: "In 2026", range: { from: new Date(2026, 0, 1), to: new Date(2026, 11, 31) } },
  { label: "This month", range: { from: new Date(2022, 11, 1), to: new Date(2022, 11, 31) } },
];

const meta = {
  title: "Brand/RangeCalendarPanel",
  component: RangeCalendarPanel,
  globals: { theme: "scribe" },
  args: {
    value: DRAWN_RANGE,
    today: TODAY,
    markedDates: MARKED,
    presets: PRESETS,
    onSave: fn(),
    onDiscard: fn(),
  },
  argTypes: {
    weekStartsOn: { control: "inline-radio", options: [0, 1, 6] },
  },
} satisfies Meta<typeof RangeCalendarPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

/** How the app mounts it: in a picker popover under the filter row's date pill. */
function InPicker({
  defaultOpen = true,
  trigger = "October 20, 2026",
  ...props
}: RangeCalendarPanelProps & { defaultOpen?: boolean; trigger?: string }) {
  const [open, setOpen] = React.useState(defaultOpen);
  return (
    <div className="flex h-96 justify-center">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Chip>
            {trigger}
            <CaretDownIcon />
          </Chip>
        </PopoverTrigger>
        <PopoverContent variant="picker" sideOffset={5}>
          <RangeCalendarPanel
            {...props}
            onSave={(range) => {
              props.onSave(range);
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
 * 100:43738 as drawn: 234px with the picker surface, the 22–30 band with ink
 * ends, today (15) bold, dots on the 8th, 14th, 19th and 30th (white-rimmed on
 * the ink end), Sun and Sat coral in the header and the grid.
 */
export const AsDrawn: Story = {
  render: (args) => <InPicker {...args} />,
};

/**
 * `dimPastDays`: past and future told apart around today (the 15th). The
 * days before it stay the muted grey, the days after it outside the range
 * read ink; the range, the band and the coral weekends keep precedence.
 * (100:43738 itself draws the 16th–21st muted too, which is the default.)
 */
export const PastAndFuture: Story = {
  args: { dimPastDays: true },
  render: (args) => <InPicker {...args} />,
  play: async () => {
    const day = async (name: RegExp) => screen.findByRole("button", { name });
    await expect(await day(/December 14th/)).toHaveAttribute("data-tone", "plain");
    await expect(await day(/December 15th/)).toHaveAttribute("data-tone", "today");
    await expect(await day(/December 16th/)).toHaveAttribute("data-tone", "future");
    await expect(await day(/December 17th/)).toHaveAttribute("data-tone", "weekend");
    await expect(await day(/December 23rd/)).toHaveAttribute("data-tone", "middle");
    await expect(await day(/December 22nd/)).toHaveAttribute("data-tone", "endpoint");
  },
};

/** Closed: only the date pill. Opening grows the picker out of it. */
export const Closed: Story = {
  render: (args) => <InPicker {...args} defaultOpen={false} />,
};

/**
 * Picking a range: a first click starts it (a lone ink day), the second
 * closes it, a third starts over. Save hands back the draft; discard drops it.
 */
export const SelectAndSave: Story = {
  args: { value: undefined },
  render: (args) => <InPicker {...args} />,
  play: async ({ args }) => {
    await userEvent.click(await screen.findByRole("button", { name: /December 5th/ }));
    await userEvent.click(screen.getByRole("button", { name: /December 9th/ }));
    const middle = screen.getByRole("button", { name: /December 7th/ });
    await expect(middle).toHaveAttribute("data-tone", "middle");
    await userEvent.click(screen.getByRole("button", { name: "Save" }));
    await expect(args.onSave).toHaveBeenCalledWith({
      from: new Date(2022, 11, 5),
      to: new Date(2022, 11, 9),
    });
  },
};

/** Presets: choosing one fills the draft and shows its chip selected; it follows the draft. */
export const Presets: Story = {
  render: (args) => <InPicker {...args} />,
  play: async () => {
    const thisMonth = await screen.findByRole("button", { name: "This month" });
    await userEvent.click(thisMonth);
    await expect(thisMonth).toHaveAttribute("aria-pressed", "true");
    const allTime = screen.getByRole("button", { name: "All Time" });
    await userEvent.click(allTime);
    await expect(allTime).toHaveAttribute("aria-pressed", "true");
    await expect(thisMonth).toHaveAttribute("aria-pressed", "false");
  },
};

/** discard closes the picker and reports nothing saved. */
export const Discard: Story = {
  render: (args) => <InPicker {...args} />,
  play: async ({ args }) => {
    await userEvent.click(await screen.findByRole("button", { name: /December 2nd/ }));
    await userEvent.click(screen.getByRole("button", { name: "discard" }));
    await expect(args.onDiscard).toHaveBeenCalled();
    await expect(args.onSave).not.toHaveBeenCalled();
    await waitFor(() => expect(screen.queryByRole("grid")).toBeNull());
  },
};

/** Keyboard: Tab into the grid, arrows move the focus ring, Enter picks. */
export const KeyboardFocus: Story = {
  render: (args) => <InPicker {...args} />,
  play: async () => {
    const grid = await screen.findByRole("grid");
    const start = screen.getByRole("button", { name: /December 22nd/ });
    start.focus();
    await userEvent.keyboard("{ArrowRight}");
    await expect(screen.getByRole("button", { name: /December 23rd/ })).toHaveFocus();
    await expect(grid).toBeInTheDocument();
  },
};

/** Empty: no value, no presets, no marked days. Save is still allowed (no limit). */
export const Empty: Story = {
  args: { value: undefined, presets: undefined, markedDates: undefined },
  render: (args) => <InPicker {...args} />,
};

/** Week starting on Monday: the coral follows Saturday and Sunday to the last two columns. */
export const WeekStartsMonday: Story = {
  args: { weekStartsOn: 1 },
  render: (args) => <InPicker {...args} />,
};

/** Armenian: month and weekday names from the `hy` locale, presets and buttons from labels. */
export const Armenian: Story = {
  args: {
    locale: hy,
    weekStartsOn: 1,
    presets: [
      { label: "Ամբողջ ժամանակը", range: undefined },
      { label: "2026-ին", range: PRESETS[1].range },
      { label: "Այս ամիս", range: PRESETS[2].range },
    ],
    labels: {
      discard: "չեղարկել",
      save: "Պահպանել",
      previousMonth: "Նախորդ ամիս",
      nextMonth: "Հաջորդ ամիս",
      marked: "կան հանդիպումներ",
    },
  },
  render: (args) => <InPicker {...args} trigger="Հոկտեմբերի 20, 2026" />,
};

/** Long preset labels wrap to a second row instead of clipping. */
export const LongPresets: Story = {
  args: {
    presets: [
      { label: "All Time", range: undefined },
      { label: "Since the last billing cycle", range: PRESETS[2].range },
      { label: "Previous quarter", range: PRESETS[1].range },
    ],
  },
  render: (args) => <InPicker {...args} />,
};
