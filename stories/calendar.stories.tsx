import type { Meta, StoryObj } from "@storybook/react-vite";
import { Calendar } from "@tev/ui/calendar";

const meta = {
  title: "Primitives/Calendar",
  component: Calendar,
  argTypes: {
    mode: { control: "select", options: ["single", "multiple", "range"] },
    captionLayout: {
      control: "select",
      options: ["label", "dropdown", "dropdown-months", "dropdown-years"],
    },
    buttonVariant: {
      control: "select",
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
    },
    numberOfMonths: { control: { type: "number", min: 1, max: 3 } },
    showOutsideDays: { control: "boolean" },
    showWeekNumber: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: {
    mode: "single",
    captionLayout: "label",
    buttonVariant: "ghost",
    numberOfMonths: 1,
    showOutsideDays: true,
    showWeekNumber: false,
    disabled: false,
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
