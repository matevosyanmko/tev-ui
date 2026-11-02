import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, screen, userEvent, waitFor, within } from "storybook/test";

import { Chip } from "../../primitives/Chip/Chip";
import { Popover, PopoverContent, PopoverTrigger } from "../../primitives/Popover/Popover";
import { toggleVariants } from "../../primitives/Toggle/Toggle.variants";
import { ChoiceListPanel } from "../ChoiceListPanel/ChoiceListPanel";
import { RangeCalendarPanel } from "../RangeCalendarPanel/RangeCalendarPanel";
import { CaretDownIcon, ChevronDownIcon, FilterIcon } from "../ScribeIcons/ScribeIcons";
import { TimeRangeWheel } from "../TimeRangeWheel/TimeRangeWheel";
import { FilterPanel } from "./FilterPanel";
import type { FilterPanelProps } from "./FilterPanel.types";

// Story fixtures only: the package ships no flags.
const FLAG_BG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18"><clipPath id="c"><circle cx="9" cy="9" r="8"/></clipPath><g clip-path="url(#c)"><rect width="18" height="6" fill="#fff"/><rect y="6" width="18" height="6" fill="#00966E"/><rect y="12" width="18" height="6" fill="#D62612"/></g><circle cx="9" cy="9" r="8.5" fill="none" stroke="#000"/></svg>',
  );

type Picker = "date" | "time" | "language";

type Copy = {
  filters: string;
  reset: string;
  close: string;
  date: string;
  time: string;
  status: string;
  language: string;
  dateValue: string;
  timeValue: string;
  upcoming: string;
  completed: string;
  languageValue: string;
};

const ENGLISH: Copy = {
  filters: "Filters",
  reset: "Reset",
  close: "Close filters",
  date: "Date",
  time: "Time",
  status: "Status",
  language: "Language",
  dateValue: "October 20, 2026",
  timeValue: "12:25 - 18:00",
  upcoming: "Upcoming",
  completed: "Completed",
  languageValue: "Bulgarian",
};

const onReset = fn();

/**
 * The app's composition: FilterPanel in a `panel` popover off the boxed
 * filter toggle, each row's control a Chip that opens its own `picker`
 * popover. Everything but FilterPanel itself is the app's code.
 */
function Filters({
  copy = ENGLISH,
  picker,
  defaultOpen = true,
  rows,
}: {
  copy?: Copy;
  picker?: Picker;
  defaultOpen?: boolean;
  rows?: FilterPanelProps["rows"];
}) {
  const [open, setOpen] = React.useState(defaultOpen);
  const [openPicker, setOpenPicker] = React.useState<Picker | undefined>();
  // The open-state stories open their picker once the panel has taken focus,
  // as a click would; opened in the same commit, the panel's autofocus
  // counts as focus outside the picker and dismisses it.
  React.useEffect(() => {
    if (!picker) return;
    const t = window.setTimeout(() => setOpenPicker(picker), 50);
    return () => window.clearTimeout(t);
  }, [picker]);
  const [status, setStatus] = React.useState({ upcoming: false, completed: false });
  const pickerProps = (name: Picker) => ({
    open: openPicker === name,
    onOpenChange: (next: boolean) => setOpenPicker(next ? name : undefined),
  });
  const closePicker = () => setOpenPicker(undefined);

  const defaultRows: FilterPanelProps["rows"] = [
    {
      id: "date",
      label: copy.date,
      control: (
        <Popover {...pickerProps("date")}>
          <PopoverTrigger asChild>
            <Chip>
              {copy.dateValue}
              <CaretDownIcon />
            </Chip>
          </PopoverTrigger>
          <PopoverContent variant="picker" sideOffset={5}>
            <RangeCalendarPanel
              today={new Date(2022, 11, 15)}
              value={{ from: new Date(2022, 11, 22), to: new Date(2022, 11, 30) }}
              markedDates={[8, 14, 19, 30].map((d) => new Date(2022, 11, d))}
              presets={[
                { label: "All Time", range: undefined },
                {
                  label: "In 2026",
                  range: { from: new Date(2026, 0, 1), to: new Date(2026, 11, 31) },
                },
                {
                  label: "This month",
                  range: { from: new Date(2022, 11, 1), to: new Date(2022, 11, 31) },
                },
              ]}
              onSave={closePicker}
              onDiscard={closePicker}
            />
          </PopoverContent>
        </Popover>
      ),
    },
    {
      id: "time",
      label: copy.time,
      control: (
        <Popover {...pickerProps("time")}>
          <PopoverTrigger asChild>
            <Chip>
              {copy.timeValue}
              <CaretDownIcon />
            </Chip>
          </PopoverTrigger>
          <PopoverContent variant="picker" sideOffset={5}>
            <TimeRangeWheel
              value={{ from: "11:30", to: "18:30" }}
              presets={[
                { label: "All day", value: { from: "00:00", to: "23:59" } },
                { label: "Last 12 hours", value: { from: "06:30", to: "18:30" } },
              ]}
              onSave={closePicker}
              onDiscard={closePicker}
            />
          </PopoverContent>
        </Popover>
      ),
    },
    {
      id: "status",
      label: copy.status,
      control: (
        <>
          <Chip
            selected={status.upcoming}
            onClick={() => setStatus((s) => ({ ...s, upcoming: !s.upcoming }))}
          >
            {copy.upcoming}
          </Chip>
          <Chip
            selected={status.completed}
            onClick={() => setStatus((s) => ({ ...s, completed: !s.completed }))}
          >
            {copy.completed}
          </Chip>
        </>
      ),
    },
    {
      id: "language",
      label: copy.language,
      control: (
        <Popover {...pickerProps("language")}>
          <PopoverTrigger asChild>
            <Chip className="gap-2">
              <img src={FLAG_BG} alt="" className="size-4 rounded-full" />
              <span className="flex items-center gap-0.5">
                {copy.languageValue}
                <ChevronDownIcon />
              </span>
            </Chip>
          </PopoverTrigger>
          <PopoverContent variant="picker" sideOffset={7}>
            <ChoiceListPanel
              options={[1, 2, 3, 4].map((n) => ({
                value: `bg-${n}`,
                label: "Bulgarian",
                media: <img src={FLAG_BG} alt="" />,
              }))}
              labels={{ all: "All Languages" }}
              onSave={closePicker}
              onDiscard={closePicker}
            />
          </PopoverContent>
        </Popover>
      ),
    },
  ];

  return (
    <div className="flex h-150 justify-end pr-40">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          {/* The boxed filter toggle's look on a plain button: Toggle is not a
              forwardRef, which a Radix trigger needs for anchoring. */}
          <button
            type="button"
            aria-label={copy.filters}
            aria-pressed={open}
            data-state={open ? "on" : "off"}
            className={toggleVariants({ variant: "boxed", size: "box" })}
          >
            <FilterIcon />
          </button>
        </PopoverTrigger>
        <PopoverContent variant="panel" align="end" sideOffset={8}>
          <FilterPanel
            rows={rows ?? defaultRows}
            onReset={() => {
              onReset();
              setStatus({ upcoming: false, completed: false });
            }}
            onClose={() => setOpen(false)}
            labels={{ title: copy.filters, reset: copy.reset, close: copy.close }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

const meta = {
  title: "Brand/FilterPanel",
  component: FilterPanel,
  globals: { theme: "scribe" },
  parameters: { layout: "padded" },
  args: { rows: [] },
} satisfies Meta<typeof FilterPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 100:43543 as drawn: 250x275, Reset and the close square, then the Date,
 * Time, Status and Language rows with their pills.
 */
export const AsDrawn: Story = {
  render: () => <Filters />,
};

/** Closed: the boxed filter toggle alone; it fills ink while the panel is open. */
export const Closed: Story = {
  render: () => <Filters defaultOpen={false} />,
};

/** The Date row open (100:43660): its chevron turns up, the range picker hangs off the pill. */
export const DateOpen: Story = {
  render: () => <Filters picker="date" />,
};

/** The Time row open (100:43699): the time wheel under the time pill. */
export const TimeOpen: Story = {
  render: () => <Filters picker="time" />,
};

/** The Language row open (100:43621): the language multi-select under the pill. */
export const LanguageOpen: Story = {
  render: () => <Filters picker="language" />,
};

/**
 * Status chips toggle (filled ink while on), Reset reports and clears them,
 * the close square shuts the panel. Rows tint on hover.
 */
export const Interaction: Story = {
  render: () => <Filters />,
  play: async ({ canvas }) => {
    onReset.mockClear();
    const panel = within(await screen.findByRole("group", { name: "Filters" }));
    const upcoming = panel.getByRole("button", { name: "Upcoming" });
    await userEvent.click(upcoming);
    await expect(upcoming).toHaveAttribute("aria-pressed", "true");
    await userEvent.click(panel.getByRole("button", { name: "Reset" }));
    await expect(onReset).toHaveBeenCalled();
    await expect(upcoming).toHaveAttribute("aria-pressed", "false");
    await userEvent.click(panel.getByRole("button", { name: "October 20, 2026" }));
    await screen.findByRole("grid");
    await userEvent.click(screen.getByRole("button", { name: "discard" }));
    await waitFor(() => expect(screen.queryByRole("grid")).toBeNull());
    await userEvent.click(panel.getByRole("button", { name: "Close filters" }));
    await waitFor(() => expect(screen.queryByRole("group", { name: "Filters" })).toBeNull());
    await expect(canvas.getByRole("button", { name: "Filters" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  },
};

/** Keyboard: Tab from Reset reaches the close square, then each row's control, with the focus ring. */
export const KeyboardFocus: Story = {
  render: () => <Filters />,
  play: async () => {
    const panel = within(await screen.findByRole("group", { name: "Filters" }));
    panel.getByRole("button", { name: "Reset" }).focus();
    await userEvent.tab();
    await expect(panel.getByRole("button", { name: "Close filters" })).toHaveFocus();
    await userEvent.tab();
    await expect(panel.getByRole("button", { name: "October 20, 2026" })).toHaveFocus();
  },
};

/** Armenian: longer labels and values; the rows keep the label left, the control right. */
export const Armenian: Story = {
  render: () => (
    <Filters
      copy={{
        filters: "Զտիչներ",
        reset: "Զրոյացնել",
        close: "Փակել զտիչները",
        date: "Ամսաթիվ",
        time: "Ժամ",
        status: "Կարգավիճակ",
        language: "Լեզու",
        dateValue: "Հոկտ. 20, 2026",
        timeValue: "12:25 - 18:00",
        upcoming: "Առաջիկա",
        completed: "Ավարտված",
        languageValue: "Բուլղարերեն",
      }}
    />
  ),
};

/** No rows: the header alone. */
export const Empty: Story = {
  render: () => <Filters rows={[]} />,
};
