import * as React from "react";
import dayjs from "dayjs";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { DateRangePicker } from "./DateRangePicker";
import { DateRangePanel } from "./DateRangePanel";
import type { DateMode, DateRangeValue } from "./DateRangePicker.types";

const meta = {
  title: "Brand/DateRangePicker",
  component: DateRangePicker,
  argTypes: { mode: { control: "inline-radio", options: ["year", "month", "custom"] } },
  args: { mode: "custom", onChange: () => {} },
  decorators: [
    (Story) => (
      // The trigger is `h-full` by design — it stretches to whatever filter row
      // it sits in — so the story has to give it one.
      <div className="flex h-11 w-[420px] items-stretch">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DateRangePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

function ControlledPicker({
  initialMode = "custom",
  initialValue,
  ...props
}: {
  initialMode?: DateMode;
  initialValue?: DateRangeValue;
} & Partial<React.ComponentProps<typeof DateRangePicker>>) {
  const [mode, setMode] = React.useState<DateMode>(initialMode);
  const [value, setValue] = React.useState<DateRangeValue | undefined>(initialValue);
  return (
    <DateRangePicker
      {...props}
      mode={mode}
      onModeChange={setMode}
      value={value}
      onChange={setValue}
    />
  );
}

/** Nothing chosen yet — the trigger shows the placeholder. */
export const Empty: Story = { render: () => <ControlledPicker /> };

/** Custom mode: presets, two draft fields, and a two-month calendar. */
export const CustomRange: Story = {
  render: () => (
    <ControlledPicker
      initialValue={[dayjs().subtract(6, "day").startOf("day"), dayjs().endOf("day")]}
    />
  ),
};

/** Month mode: a year select over twelve cells; the range becomes the whole month. */
export const MonthMode: Story = {
  render: () => (
    <ControlledPicker
      initialMode="month"
      initialValue={[dayjs().startOf("month"), dayjs().endOf("month")]}
    />
  ),
};

/** Year mode: pick a year and the popover closes with that whole year selected. */
export const YearMode: Story = {
  render: () => (
    <ControlledPicker
      initialMode="year"
      initialValue={[dayjs().startOf("year"), dayjs().endOf("year")]}
    />
  ),
};

/** A shorter year list, for products with less history to look back over. */
export const ShortYearSpan: Story = {
  render: () => <ControlledPicker initialMode="year" yearSpan={3} />,
};

/** Every string, including the twelve month names, comes from `labels`. */
export const Translated: Story = {
  render: () => (
    <ControlledPicker
      labels={{
        selectRange: "Выберите период",
        year: "Год",
        month: "Месяц",
        custom: "Произвольно",
        last7Days: "7 дней",
        last30Days: "30 дней",
        last90Days: "90 дней",
        thisMonth: "Этот месяц",
        from: "С",
        to: "По",
        discard: "Отменить",
        save: "Сохранить",
        months: [
          "Январь",
          "Февраль",
          "Март",
          "Апрель",
          "Май",
          "Июнь",
          "Июль",
          "Август",
          "Сентябрь",
          "Октябрь",
          "Ноябрь",
          "Декабрь",
        ],
      }}
    />
  ),
};

function ControlledPanel() {
  const [mode, setMode] = React.useState<DateMode>("custom");
  const [value, setValue] = React.useState<DateRangeValue>([
    dayjs().subtract(29, "day").startOf("day"),
    dayjs().endOf("day"),
  ]);
  const [open, setOpen] = React.useState(true);
  return open ? (
    <div className="w-[343px] rounded-[20px] bg-popover p-3 text-popover-foreground">
      <DateRangePanel
        mode={mode}
        onModeChange={setMode}
        value={value}
        onChange={setValue}
        onClose={() => setOpen(false)}
      />
    </div>
  ) : (
    <button type="button" className="text-sm underline" onClick={() => setOpen(true)}>
      Reopen
    </button>
  );
}

/**
 * The popover's body on its own, in-flow — how a mobile filter sheet shows
 * it, expanded under its row rather than as a popover over the sheet.
 */
export const PanelInFlow: Story = {
  globals: { viewport: { value: "mobile1", isRotated: false } },
  decorators: [
    (Story) => (
      // `self-start`: the meta's decorator is a 44px flex row for the trigger.
      <div className="self-start bg-brand-surface-1 p-4">
        <Story />
      </div>
    ),
  ],
  render: () => <ControlledPanel />,
};
