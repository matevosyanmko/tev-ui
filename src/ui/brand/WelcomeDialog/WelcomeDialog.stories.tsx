import type { Meta, StoryObj } from "@storybook/react-vite";

import { WelcomeDialog } from "./WelcomeDialog";

const meta = {
  title: "Brand/WelcomeDialog",
  component: WelcomeDialog,
  args: {
    title: "welcome",
    description: "Let's walk through the dashboard together — it takes about a minute.",
    onStart: () => {},
  },
  decorators: [
    (Story) => (
      // Fixed to the viewport in real use; the frame is only so the story has
      // something behind the dim.
      <div className="relative h-[620px] w-full">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof WelcomeDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { onSkip: () => {} } };

/** `logo` is a node, not a `src` — the package ships no image of its own. */
export const WithLogo: Story = {
  args: {
    onSkip: () => {},
    logo: (
      <svg viewBox="0 0 196 40" className="w-full" aria-label="Tevvoice">
        <text x="0" y="30" className="fill-brand-purple" fontSize="34" fontWeight="800">
          tevvoice
        </text>
      </svg>
    ),
  },
};

/** No skip: onboarding the user is not allowed to dismiss. */
export const WithoutSkip: Story = {};

export const Translated: Story = {
  args: {
    title: "բարի գալուստ",
    description: "Եկեք միասին ծանոթանանք վահանակին։",
    onSkip: () => {},
    labels: { start: "սկսել", skip: "բաց թողնել" },
  },
};
