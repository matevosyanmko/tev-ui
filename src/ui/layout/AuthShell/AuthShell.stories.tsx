import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { GoogleSignInButton } from "../../brand/GoogleSignInButton/GoogleSignInButton";
import { LangPicker } from "../../brand/LangPicker/LangPicker";
import {
  AuthShell,
  AuthShellArt,
  AuthShellCorner,
  AuthShellDescription,
  AuthShellFooter,
  AuthShellHeader,
  AuthShellPanel,
  AuthShellTitle,
} from "./AuthShell";

const meta = {
  title: "Layout/AuthShell",
  component: AuthShell,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof AuthShell>;

export default meta;
type Story = StoryObj<typeof meta>;

const LANGS = [
  { value: "en", label: "ENG" },
  { value: "am", label: "ARM" },
  { value: "ru", label: "RUS" },
];

function SignIn() {
  const [lang, setLang] = React.useState("en");
  return (
    <AuthShell>
      {/* No `src`: the art falls back to the theme's --brand-gradient. */}
      <AuthShellArt>
        <div className="flex size-14 items-center justify-center rounded-xl bg-black text-xl font-bold text-white lg:size-20 lg:rounded-2xl lg:text-3xl">
          A
        </div>
      </AuthShellArt>
      <AuthShellCorner>
        <LangPicker
          value={lang}
          options={LANGS}
          onChange={setLang}
          label="Language"
          className="[&>svg]:rotate-180 data-[state=open]:[&>svg]:rotate-0"
        />
      </AuthShellCorner>
      <AuthShellPanel>
        <AuthShellHeader>
          <AuthShellTitle>Welcome back!</AuthShellTitle>
          <AuthShellDescription>
            Sign in with the Google account whose calendar you want the assistant to join.
          </AuthShellDescription>
        </AuthShellHeader>
        <GoogleSignInButton asChild className="w-full">
          <a href="#oauth">Sign in with Google</a>
        </GoogleSignInButton>
        <AuthShellFooter>
          By signing in you agree to our{" "}
          <a href="#terms" className="font-medium text-foreground underline underline-offset-2">
            Terms
          </a>{" "}
          and{" "}
          <a href="#privacy" className="font-medium text-foreground underline underline-offset-2">
            Privacy Policy
          </a>
          .
        </AuthShellFooter>
      </AuthShellPanel>
    </AuthShell>
  );
}

/** Desktop: the art column on the left, the panel's rounded edge over it. */
export const Desktop: Story = { render: () => <SignIn /> };

/** Below `lg`: the art is a banner and the panel a sheet pulled up over it. */
export const Mobile: Story = {
  render: () => <SignIn />,
  globals: { viewport: { value: "mobile1", isRotated: false } },
};
