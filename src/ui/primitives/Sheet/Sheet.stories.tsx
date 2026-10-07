import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../Button/Button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./Sheet";

const meta = {
  title: "Primitives/Sheet",
  component: Sheet,
  argTypes: {
    modal: { control: "boolean" },
  },
} satisfies Meta<typeof Sheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Right: Story = {
  render: (args) => (
    <Sheet {...args}>
      <SheetTrigger asChild>
        <Button variant="outline">Edit agent</Button>
      </SheetTrigger>
      <SheetContent className="p-6">
        <SheetHeader>
          <SheetTitle>Edit agent</SheetTitle>
          <SheetDescription>Anna Petrosyan · Support, inbound voice</SheetDescription>
        </SheetHeader>
        <p className="text-sm">
          Changes apply to interactions analysed from now on; past scores are not recalculated.
        </p>
        <SheetFooter>
          <SheetClose asChild>
            <Button>Save</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

/** The mobile filter-drawer shape: full width, content height, from the bottom. */
export const Bottom: Story = {
  render: (args) => (
    <Sheet {...args}>
      <SheetTrigger asChild>
        <Button variant="outline">Filters</Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="rounded-t-[24px] p-6">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        <p className="text-sm">Channel, sentiment, direction and agent pickers go here.</p>
        <SheetFooter>
          <SheetClose asChild>
            <Button>Done</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

/** Left edge, no corner close — the panel supplies its own. */
export const LeftWithoutCloseButton: Story = {
  render: (args) => (
    <Sheet {...args}>
      <SheetTrigger asChild>
        <Button variant="outline">Open menu</Button>
      </SheetTrigger>
      <SheetContent side="left" showCloseButton={false} className="p-6">
        <SheetTitle>Menu</SheetTitle>
        <SheetClose asChild>
          <Button variant="outline">Close menu</Button>
        </SheetClose>
      </SheetContent>
    </Sheet>
  ),
};
