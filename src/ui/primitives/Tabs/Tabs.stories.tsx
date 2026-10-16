import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./Tabs";

const meta = {
  title: "Primitives/Tabs",
  component: Tabs,
  args: { defaultValue: "transcript" },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

const PANELS = (
  <>
    <TabsContent value="transcript" className="text-sm">
      00:00 Anna — Let's start with the roadmap.
    </TabsContent>
    <TabsContent value="recording" className="text-sm">
      The recording plays here.
    </TabsContent>
    <TabsContent value="summary" className="text-sm">
      The team agreed to ship the mobile pass first.
    </TabsContent>
  </>
);

/** The segmented control: a muted track with the active tab raised on it. */
export const Default: Story = {
  render: (args) => (
    <Tabs {...args} className="w-96">
      <TabsList>
        <TabsTrigger value="transcript">Transcript</TabsTrigger>
        <TabsTrigger value="recording">Recording</TabsTrigger>
        <TabsTrigger value="summary">Summary</TabsTrigger>
      </TabsList>
      {PANELS}
    </Tabs>
  ),
};

/** Plain labels on a rule, the active one underlined. */
export const Line: Story = {
  render: (args) => (
    <Tabs {...args} className="w-96">
      <TabsList variant="line" className="w-full justify-start border-b p-0">
        <TabsTrigger value="transcript">Transcript</TabsTrigger>
        <TabsTrigger value="recording">Recording</TabsTrigger>
        <TabsTrigger value="summary">Summary</TabsTrigger>
      </TabsList>
      {PANELS}
    </Tabs>
  ),
};

export const Vertical: Story = {
  args: { orientation: "vertical" },
  render: (args) => (
    <Tabs {...args} className="w-96">
      <TabsList>
        <TabsTrigger value="transcript">Transcript</TabsTrigger>
        <TabsTrigger value="recording">Recording</TabsTrigger>
        <TabsTrigger value="summary">Summary</TabsTrigger>
      </TabsList>
      {PANELS}
    </Tabs>
  ),
};
