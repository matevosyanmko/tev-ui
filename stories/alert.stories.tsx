import type { Meta, StoryObj } from "@storybook/react-vite";
import { Alert, AlertDescription, AlertTitle } from "@tev/ui/alert";

const meta = {
  title: "Primitives/Alert",
  component: Alert,
  argTypes: {
    variant: { control: "select", options: ["default", "destructive"] },
  },
  args: { variant: "default" },
  render: (args) => (
    <Alert {...args}>
      <AlertTitle>Call recording unavailable</AlertTitle>
      <AlertDescription>
        The recording for this conversation is still processing. Check back in a few minutes.
      </AlertDescription>
    </Alert>
  ),
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
