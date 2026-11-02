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

// ---- TevScribe ------------------------------------------------------------

const scribe = { globals: { theme: "scribe" } } as const;

/**
 * `variant="panel"`: the 250px floating panel the filters and the export menu
 * sit in (100:43543, 100:40882) — 1px ink border inside the layout, radius
 * 12, 8×10 padding, the popover shadow. The contents here are placeholders;
 * see Brand/Panel and Brand/FilterPanel for the real ones.
 */
export const ScribePanel: Story = {
  ...scribe,
  render: () => (
    <div className="flex h-64 items-start justify-center">
      <Popover defaultOpen>
        <PopoverTrigger asChild>
          <Button variant="outline-ink" size="pill-md">
            Filters
          </Button>
        </PopoverTrigger>
        <PopoverContent variant="panel" sideOffset={8}>
          <div className="flex h-40 items-center justify-center rounded-8 bg-surface-subtle text-caption-10">
            panel content
          </div>
        </PopoverContent>
      </Popover>
    </div>
  ),
};

/**
 * `variant="picker"`: the date, time and language pickers (100:43738,
 * 100:43801, 100:43832) — radius 16, 16px in, an inset ink stroke, no shadow,
 * as wide as what is inside.
 */
export const ScribePicker: Story = {
  ...scribe,
  render: () => (
    <div className="flex h-64 items-start justify-center">
      <Popover defaultOpen>
        <PopoverTrigger asChild>
          <Button variant="outline-ink" size="pill-md">
            October 20, 2026
          </Button>
        </PopoverTrigger>
        <PopoverContent variant="picker" sideOffset={5}>
          <div className="flex h-24 w-50.5 items-center justify-center rounded-8 bg-surface-subtle text-caption-10">
            picker content
          </div>
        </PopoverContent>
      </Popover>
    </div>
  ),
};
