import type { Meta, StoryObj } from "@storybook/react-vite";

import { AppHeader } from "./AppHeader";
import { AppLogo, AppLogoMark, AppLogoWordmark } from "../AppLogo/AppLogo";

const MARK =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect width='40' height='40' rx='10' fill='%235F02F4'/%3E%3C/svg%3E";
const WORDMARK =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='90' height='20'%3E%3Ctext x='0' y='15' font-family='sans-serif' font-size='16' font-weight='700' fill='black'%3ETevoice%3C/text%3E%3C/svg%3E";

const meta = {
  title: "Layout/AppHeader",
  component: AppHeader,
} satisfies Meta<typeof AppHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The app's own logo and account cluster fill the two ends of the row. */
export const Default: Story = {
  render: () => (
    <AppHeader>
      <AppLogo>
        <AppLogoMark src={MARK} alt="" />
        <AppLogoWordmark src={WORDMARK} alt="Tevoice" />
      </AppLogo>
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-brand-surface-2" />
        <div className="h-11 w-40 rounded-[20px] bg-brand-purple" />
      </div>
    </AppHeader>
  ),
};
