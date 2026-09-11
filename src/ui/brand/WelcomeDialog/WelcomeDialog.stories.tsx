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

/**
 * Armenian, with the copy the app actually ships — not a shortened sample.
 * Armenian runs ~35% longer than the English it was designed around, which is
 * what the title and the CTA have to survive.
 */
export const Translated: Story = {
  args: {
    title: "Բարի գալուստ",
    description:
      "Եկեք արագ ծանոթանանք, թե ինչպես է TevVoice-ն օգնում վերանայել փոխազդեցությունները, որոնել զանգեր և հասկանալ հաճախորդների հետ հաղորդակցումը։",
    onSkip: () => {},
    labels: { start: "Սկսել ուղեկցվող շրջայց", skip: "բաց թողնել ուսուցումը" },
  },
};

/** Russian, same production copy. The two-word title is the one that wraps. */
export const TranslatedRussian: Story = {
  args: {
    title: "Добро пожаловать",
    description:
      "Давайте быстро узнаем, как TevVoice помогает анализировать взаимодействия, искать звонки и понимать общение с клиентами.",
    onSkip: () => {},
    labels: { start: "Начать обучающий тур", skip: "пропустить обучение" },
  },
};
