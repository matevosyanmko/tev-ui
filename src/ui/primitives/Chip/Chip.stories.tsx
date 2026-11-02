import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent } from "storybook/test";

import { ChevronDownIcon } from "../../brand/ScribeIcons/ScribeIcons";
import { Chip } from "./Chip";

const meta = {
  title: "Primitives/Chip",
  component: Chip,
  globals: { theme: "scribe" },
  argTypes: {
    surface: { control: "inline-radio", options: ["outline", "subtle", "grey"] },
    size: { control: "inline-radio", options: ["xs", "sm", "md", "wide", "micro"] },
    weight: { control: "inline-radio", options: ["regular", "strong"] },
    selected: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: { children: "12:35m", surface: "outline", size: "sm", weight: "regular" },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Every chip the frames draw, at its drawn size. */
export const AsDrawn: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-5">
      {/* Status pill chips (100:41115), on the coral and green segments they sit on. */}
      <div className="flex items-center gap-3">
        <span className="flex h-8 items-center rounded-20 bg-status-live pr-2 pl-3">
          <Chip size="sm">12:35m</Chip>
        </span>
        <span className="flex h-8 items-center rounded-20 bg-status-neutral pr-2 pl-3">
          <Chip size="sm">12:00 - 13:00</Chip>
        </span>
        <span className="flex h-8 items-center rounded-20 bg-status-success pr-1.5 pl-3">
          <Chip size="sm">Duration: 25m</Chip>
        </span>
      </div>
      {/* The grey time chip in later rows and cards (100:41324). */}
      <Chip surface="grey" size="wide" className="w-25.5">
        12:00 - 13:00
      </Chip>
      {/* Main information in the detail screen (100:40794). */}
      <div className="flex items-center gap-5">
        <Chip surface="subtle" size="wide">
          October 20, 2026
        </Chip>
        <Chip surface="subtle" size="wide">
          10:00 - 10:25
        </Chip>
        <Chip surface="subtle" size="wide">
          Duration 25m
        </Chip>
      </div>
      {/* Date and time presets (100:43738, 100:43801). */}
      <div className="flex items-center gap-1">
        <Chip size="xs">All Time</Chip>
        <Chip size="xs">In 2026</Chip>
        <Chip size="xs">This month</Chip>
        <Chip size="xs">All day</Chip>
        <Chip size="xs">Last 12 hours</Chip>
      </div>
      {/* The filter panel's date field (100:43543). */}
      <Chip>
        October 20, 2026
        <ChevronDownIcon />
      </Chip>
      {/* Calendar toolbar (100:40076). */}
      <div className="flex items-center gap-2">
        <Chip size="wide" weight="strong" className="gap-2.5">
          <span>today</span>
          <span aria-hidden="true">I</span>
          <span>22.04.2026</span>
        </Chip>
        <Chip surface="grey" size="wide" weight="strong">
          GMT4+
        </Chip>
      </div>
      {/* The micro card's chip (100:43960), on its coral segment. */}
      <span className="flex h-4 items-center rounded-10 bg-status-live pr-1 pl-1.5">
        <Chip size="micro">12:35m</Chip>
      </span>
    </div>
  ),
};

function StatusFilter() {
  const [upcoming, setUpcoming] = React.useState(true);
  const [completed, setCompleted] = React.useState(false);
  return (
    <div className="flex items-center gap-2.25 rounded-8 bg-surface-subtle p-2">
      <Chip selected={upcoming} onClick={() => setUpcoming((v) => !v)}>
        Upcoming
      </Chip>
      <Chip selected={completed} onClick={() => setCompleted((v) => !v)}>
        Completed
      </Chip>
      <Chip selected={false} disabled>
        Failed
      </Chip>
    </div>
  );
}

/**
 * Toggle chips: the filter panel's status row (100:43543). Figma draws no
 * selected chip, so selected is filled ink, the look every other TevScribe
 * selection has. Hover lifts to the canvas grey; Tab shows the focus ring.
 */
export const Selectable: Story = {
  render: () => <StatusFilter />,
  play: async ({ canvas }) => {
    const completed = canvas.getByRole("button", { name: "Completed" });
    await expect(completed).toHaveAttribute("aria-pressed", "false");
    await userEvent.click(completed);
    await expect(completed).toHaveAttribute("aria-pressed", "true");
    await expect(canvas.getByRole("button", { name: "Failed" })).toBeDisabled();
  },
};

/** Long and Armenian labels: chips never wrap, so the row has to make room. */
export const EdgeCases: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-3">
      <Chip size="sm">Duration: 1h 12m 30s</Chip>
      <Chip surface="subtle" size="wide">
        Wednesday, September 30, 2026
      </Chip>
      <div className="flex items-center gap-1">
        <Chip size="xs">Ամբողջ ժամանակը</Chip>
        <Chip size="xs">2026-ին</Chip>
        <Chip size="xs">Այս ամիս</Chip>
      </div>
      <Chip selected>Առաջիկա</Chip>
    </div>
  ),
};
