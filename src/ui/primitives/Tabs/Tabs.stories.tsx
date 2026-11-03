import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent } from "storybook/test";

import { RecordingIcon, SummaryIcon, TranscriptIcon } from "../../brand/ScribeIcons/ScribeIcons";
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

/**
 * TevScribe's black Details bar (100:40786, summary active in 100:41019):
 * three icon-and-label tabs filling the row, the active one outlined in
 * white. Arrow keys move between them; hover brings up a faint outline.
 */
export const ScribeInverse: Story = {
  globals: { theme: "scribe" },
  render: (args) => (
    <Tabs {...args} className="w-290">
      <TabsList variant="inverse">
        <TabsTrigger value="transcript">
          <TranscriptIcon />
          Recordings (Audio)
        </TabsTrigger>
        <TabsTrigger value="recording">
          <RecordingIcon />
          Recording
        </TabsTrigger>
        <TabsTrigger value="summary">
          <SummaryIcon />
          Summary
        </TabsTrigger>
      </TabsList>
      {PANELS}
    </Tabs>
  ),
  play: async ({ canvas }) => {
    const summary = canvas.getByRole("tab", { name: "Summary" });
    await userEvent.click(summary);
    await expect(summary).toHaveAttribute("data-state", "active");
    await userEvent.keyboard("{ArrowLeft}");
    await expect(canvas.getByRole("tab", { name: "Recording" })).toHaveFocus();
  },
};

/** Armenian labels and a disabled tab. */
export const ScribeInverseEdgeCases: Story = {
  globals: { theme: "scribe" },
  render: (args) => (
    <Tabs {...args} className="w-290">
      <TabsList variant="inverse">
        <TabsTrigger value="transcript">
          <TranscriptIcon />
          Ձայնագրություններ (աուդիո)
        </TabsTrigger>
        <TabsTrigger value="recording" disabled>
          <RecordingIcon />
          Ձայնագրություն
        </TabsTrigger>
        <TabsTrigger value="summary">
          <SummaryIcon />
          Ամփոփում
        </TabsTrigger>
      </TabsList>
      {PANELS}
    </Tabs>
  ),
};
