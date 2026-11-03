import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

import { ChevronDownIcon } from "../../brand/ScribeIcons/ScribeIcons";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./Collapsible";

const meta = {
  title: "Primitives/Collapsible",
  component: Collapsible,
  args: { defaultOpen: true },
  argTypes: { disabled: { control: "boolean" } },
} satisfies Meta<typeof Collapsible>;

export default meta;
type Story = StoryObj<typeof meta>;

const ROWS = ["Design talks", "Sprint planning", "Weekly sync"];

/** A day of meetings, folded from its heading: the trigger is the caller's own button. */
export const DayGroup: Story = {
  render: (args) => (
    <Collapsible {...args} className="w-96 rounded-16 bg-surface-subtle p-5">
      <h2>
        <CollapsibleTrigger className="group flex w-full items-center justify-between gap-2 rounded-8 text-heading-16 text-content-primary outline-none focus-visible:ring-2 focus-visible:ring-ring/50">
          Yesterday (02.11.26)
          <ChevronDownIcon className="transition-transform duration-(--duration-base) ease-standard group-data-[state=open]:rotate-180 motion-reduce:transition-none" />
        </CollapsibleTrigger>
      </h2>
      <CollapsibleContent>
        <ul className="flex flex-col pt-4">
          {ROWS.map((row) => (
            <li key={row} className="border-b border-stroke-subtle bg-surface-primary px-4 py-3 text-body-14 first:rounded-t-12 last:rounded-b-12 last:border-b-0">
              {row}
            </li>
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  ),
};

export const Closed: Story = { ...DayGroup, args: { defaultOpen: false } };

/** The heading toggles the rows, and says which way it went. */
export const Toggles: Story = {
  ...DayGroup,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: /yesterday/i });
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await expect(canvas.getByText("Design talks")).toBeVisible();
  },
};
