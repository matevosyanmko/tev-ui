import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../Button/Button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./Tooltip";

const meta = {
  title: "Primitives/Tooltip",
  component: Tooltip,
  argTypes: {
    defaultOpen: { control: "boolean" },
    delayDuration: { control: "number" },
    disableHoverableContent: { control: "boolean" },
  },
  args: { defaultOpen: false, delayDuration: 150 },
  render: (args) => (
    <TooltipProvider>
      <div className="flex justify-center p-16">
        <Tooltip {...args}>
          <TooltipTrigger asChild>
            <Button variant="outline">Retry call</Button>
          </TooltipTrigger>
          <TooltipContent>Places the call again with the same agent.</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  ),
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
