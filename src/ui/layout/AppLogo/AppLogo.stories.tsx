import type { Meta, StoryObj } from "@storybook/react-vite";

import { AppLogo, AppLogoMark, AppLogoWordmark } from "./AppLogo";

// Placeholder art so the story needs no app asset — a real consumer passes
// its own logo files as `src`.
const MARK =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect width='40' height='40' rx='10' fill='%235F02F4'/%3E%3C/svg%3E";
const WORDMARK =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='90' height='20'%3E%3Ctext x='0' y='15' font-family='sans-serif' font-size='16' font-weight='700' fill='white'%3ETevoice%3C/text%3E%3C/svg%3E";

const meta = {
  title: "Layout/AppLogo",
  component: AppLogo,
  decorators: [
    (Story) => (
      <div className="bg-brand-surface-1 p-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AppLogo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <AppLogo className="h-10" onClick={() => {}}>
      <AppLogoMark src={MARK} alt="" />
      <AppLogoWordmark src={WORDMARK} alt="Tevoice" />
    </AppLogo>
  ),
};

/**
 * `asChild` is how a router link gets in — the library itself has no routing
 * dependency. Swap the <button> for <Link to="/"> and everything else is
 * unchanged.
 */
export const AsChild: Story = {
  render: () => (
    <AppLogo asChild className="h-10">
      <a href="#home">
        <AppLogoMark src={MARK} alt="" />
        <AppLogoWordmark src={WORDMARK} alt="Tevoice" />
      </a>
    </AppLogo>
  ),
};
