import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { OnboardingChecklist } from "./OnboardingChecklist";

const TASKS = [
  {
    title: "Connect a channel",
    description: "Link voice, webchat or email so interactions start flowing in.",
  },
  {
    title: "Invite your team",
    description: "Agents need accounts before their quality scores appear.",
  },
  { title: "Set an alert threshold", description: "Pick the numbers you want to hear about." },
  {
    title: "Review your first digest",
    description: "It lands a week after your first interaction.",
  },
];

const meta = {
  title: "Brand/OnboardingChecklist",
  component: OnboardingChecklist,
  args: { tasks: TASKS, completed: 1, onNext: () => {}, onFinish: () => {} },
  decorators: [
    (Story) => (
      // It pins itself to the viewport's bottom-right; this frame is only here
      // so the story has something to sit against.
      <div className="relative h-[560px] w-full">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof OnboardingChecklist>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InProgress: Story = {};

export const NothingDone: Story = { args: { completed: 0 } };

/** On the last task the primary button becomes "finish". */
export const LastTask: Story = { args: { completed: TASKS.length - 1 } };

/** Interactive: step through and watch the connector and the bar fill. */
export const Steppable: Story = {
  render: function SteppableStory(args) {
    const [completed, setCompleted] = React.useState(0);
    return (
      <OnboardingChecklist
        {...args}
        completed={completed}
        onNext={() => setCompleted((current) => current + 1)}
        onFinish={() => setCompleted(0)}
        onSkip={() => setCompleted(0)}
      />
    );
  },
};

export const Translated: Story = {
  args: {
    onSkip: () => {},
    labels: { heading: "начнём", next: "далее", finish: "готово", skip: "пропустить" },
  },
};
