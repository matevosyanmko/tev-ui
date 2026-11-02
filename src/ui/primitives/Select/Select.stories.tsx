import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, screen, userEvent, waitFor } from "storybook/test";

import { TranslateIcon } from "../../brand/ScribeIcons/ScribeIcons";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "./Select";

const meta = {
  title: "Primitives/Select",
  component: Select,
  argTypes: {
    disabled: { control: "boolean" },
    required: { control: "boolean" },
  },
  args: { defaultValue: "support" },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Select {...args}>
      <SelectTrigger className="w-56">
        <SelectValue placeholder="Select a queue" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Teams</SelectLabel>
          <SelectItem value="support">Support</SelectItem>
          <SelectItem value="sales">Sales</SelectItem>
          <SelectItem value="billing" disabled>
            Billing
          </SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Agents</SelectLabel>
          <SelectItem value="voicemail">Voicemail</SelectItem>
          <SelectItem value="after-hours">After hours</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

// ---- TevScribe language pill -------------------------------------------
//
// The flag is the caller's artwork: an <img> (or any element) handed to
// `media`. These two are story fixtures only; the package ships no flags.
const FLAGS: Record<string, string> = {
  bg: "data:image/svg+xml;utf8," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18"><clipPath id="c"><circle cx="9" cy="9" r="8"/></clipPath><g clip-path="url(#c)"><rect width="18" height="6" fill="#fff"/><rect y="6" width="18" height="6" fill="#00966E"/><rect y="12" width="18" height="6" fill="#D62612"/></g><circle cx="9" cy="9" r="8.5" fill="none" stroke="#000"/></svg>'),
  am: "data:image/svg+xml;utf8," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18"><clipPath id="c"><circle cx="9" cy="9" r="8"/></clipPath><g clip-path="url(#c)"><rect width="18" height="6" fill="#D90012"/><rect y="6" width="18" height="6" fill="#0033A0"/><rect y="12" width="18" height="6" fill="#F2A800"/></g><circle cx="9" cy="9" r="8.5" fill="none" stroke="#000"/></svg>'),
  en: "data:image/svg+xml;utf8," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18"><clipPath id="c"><circle cx="9" cy="9" r="8"/></clipPath><g clip-path="url(#c)"><rect width="18" height="18" fill="#012169"/><path d="M0 7h18v4H0zM7 0h4v18H7z" fill="#fff"/><path d="M0 8h18v2H0zM8 0h2v18H8z" fill="#C8102E"/></g><circle cx="9" cy="9" r="8.5" fill="none" stroke="#000"/></svg>'),
};
const LANGUAGES = [
  { value: "bg", label: "Bulgarian" },
  { value: "am", label: "Armenian" },
  { value: "en", label: "English" },
];
const Flag = ({ code }: { code: string }) => <img src={FLAGS[code]} alt="" />;

function LanguagePill({
  size,
  initial = "bg",
  disabled,
  labels = LANGUAGES,
}: {
  size?: "default" | "lg";
  initial?: string;
  disabled?: boolean;
  labels?: { value: string; label: string }[];
}) {
  const [value, setValue] = React.useState(initial);
  return (
    <Select value={value} onValueChange={setValue} disabled={disabled}>
      <SelectTrigger
        variant="pill"
        size={size}
        media={<Flag code={value} />}
        aria-label="Summary language"
      >
        <SelectValue>{labels.find((l) => l.value === value)?.label}</SelectValue>
      </SelectTrigger>
      <SelectContent variant="panel" position="popper" sideOffset={6} className="w-41.5">
        {labels.map((l) => (
          <SelectItem key={l.value} value={l.value}>
            <Flag code={l.value} />
            {l.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

const scribe = { globals: { theme: "scribe" } } as const;

/**
 * The language pill as drawn: in a meeting row and on cards (100:41115,
 * 100:43864) with the 24px translate glyph before it, inside the New meeting
 * modal's field (100:41869), and the larger settings pill (100:40567).
 * Click one: the options open in the white panel (100:43832).
 */
export const ScribeLanguagePill: Story = {
  ...scribe,
  render: () => (
    <div className="flex flex-col items-start gap-6">
      <div className="flex h-8 items-center gap-2">
        <TranslateIcon />
        <LanguagePill />
      </div>
      <div className="flex h-16 w-133.75 items-center gap-2 rounded-16 bg-surface-primary p-4 inset-ring inset-ring-stroke-muted">
        <TranslateIcon />
        <LanguagePill />
      </div>
      <div className="flex items-center gap-2">
        <TranslateIcon />
        <LanguagePill size="lg" />
      </div>
    </div>
  ),
};

/** Opening the pill and choosing an option; the chosen option is filled ink. */
export const ScribeLanguagePillOpen: Story = {
  ...scribe,
  render: () => <LanguagePill />,
  play: async ({ canvas }) => {
    const trigger = canvas.getByRole("combobox", { name: "Summary language" });
    await userEvent.click(trigger);
    const armenian = await screen.findByRole("option", { name: "Armenian" });
    await userEvent.click(armenian);
    await waitFor(() => expect(trigger).toHaveTextContent("Armenian"));
    await waitFor(() => expect(screen.queryByRole("listbox")).not.toBeInTheDocument());
    await waitFor(() => expect(document.body).not.toHaveStyle({ pointerEvents: "none" }));
    await userEvent.click(trigger);
    await expect(await screen.findByRole("option", { name: "Armenian" })).toHaveAttribute(
      "data-state",
      "checked",
    );
  },
};

/** Disabled, and Armenian option names. */
export const ScribeLanguagePillEdgeCases: Story = {
  ...scribe,
  render: () => (
    <div className="flex items-center gap-4">
      <LanguagePill disabled />
      <LanguagePill
        initial="am"
        labels={[
          { value: "bg", label: "Բուլղարերեն" },
          { value: "am", label: "Հայերեն" },
          { value: "en", label: "Անգլերեն" },
        ]}
      />
    </div>
  ),
};
