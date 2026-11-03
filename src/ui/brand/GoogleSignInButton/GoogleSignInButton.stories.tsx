import type { Meta, StoryObj } from "@storybook/react-vite";
import { GoogleMark, GoogleSignInButton } from "./GoogleSignInButton";

const meta = {
  title: "Brand/GoogleSignInButton",
  component: GoogleSignInButton,
  argTypes: {
    size: { control: "inline-radio", options: ["default", "sm", "outline-block"] },
    disabled: { control: "boolean" },
  },
  args: { size: "default" },
} satisfies Meta<typeof GoogleSignInButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/** No children: the English fallback label. */
export const Default: Story = {};

/** The sign-in screen's call to action: a link, full width of its column. */
export const AsLink: Story = {
  render: (args) => (
    <div className="w-80">
      <GoogleSignInButton {...args} asChild className="w-full">
        <a href="#oauth">Sign in with Google</a>
      </GoogleSignInButton>
    </div>
  ),
};

/** Inline, at the height of the app's own buttons — "connect your calendar" prompts. */
export const Small: Story = {
  args: { size: "sm", children: "Connect Google Calendar" },
};

/** Translated copy runs longer; the button grows with it. */
export const Translated: Story = {
  args: { children: "Войти через Google" },
};

export const Disabled: Story = { args: { disabled: true } };

/** The mark on its own, e.g. beside "Connected as …". */
export const Mark: Story = {
  render: () => <GoogleMark className="size-8" />,
};

/**
 * TevScribe's login (100:43473): a 64px block with a 1.5px ink stroke and
 * Figma's "G" after the label. Hover tints it; Tab rings it.
 */
export const ScribeOutlineBlock: Story = {
  globals: { theme: "scribe" },
  args: { size: "outline-block", children: "continue with google" },
  decorators: [
    (Story) => (
      <div className="w-137">
        <Story />
      </div>
    ),
  ],
};

/** As a link to the OAuth route, disabled, and in Armenian. */
export const ScribeOutlineBlockStates: Story = {
  globals: { theme: "scribe" },
  render: () => (
    <div className="flex w-137 flex-col gap-4">
      <GoogleSignInButton size="outline-block" asChild>
        <a href="#oauth">continue with google</a>
      </GoogleSignInButton>
      <GoogleSignInButton size="outline-block" disabled>
        continue with google
      </GoogleSignInButton>
      <GoogleSignInButton size="outline-block">շարունակել Google-ով</GoogleSignInButton>
    </div>
  ),
};
