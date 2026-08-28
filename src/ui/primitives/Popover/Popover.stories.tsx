import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../Button/Button";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "./Popover";

const meta = {
  title: "Primitives/Popover",
  component: Popover,
  argTypes: {
    modal: { control: "boolean" },
  },
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Popover {...args}>
      <PopoverTrigger asChild>
        <Button>Call details</Button>
      </PopoverTrigger>
      <PopoverContent align="start">
        <PopoverHeader>
          <PopoverTitle>Outbound call</PopoverTitle>
          <PopoverDescription>
            2 min 14 s to +1 (415) 555-0132, answered by Ana R.
          </PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  ),
};
