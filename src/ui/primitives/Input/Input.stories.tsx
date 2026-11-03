import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent } from "storybook/test";

import { TranslateIcon } from "../../brand/ScribeIcons/ScribeIcons";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../Select/Select";
import { FieldBox, Input } from "./Input";

const meta = {
  title: "Primitives/Input",
  component: Input,
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "search", "tel", "url", "file"],
    },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    readOnly: { control: "boolean" },
    variant: { control: "inline-radio", options: ["default", "field"] },
  },
  args: { type: "email", placeholder: "you@example.com" },
  render: (args) => (
    <div className="w-72">
      <Input {...args} />
    </div>
  ),
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

// ---- TevScribe field ------------------------------------------------------

/** The label above a field, as New meeting sets it (body 14, ink). */
const FieldLabel = ({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) => (
  <label htmlFor={htmlFor} className="flex h-5 items-center text-body-14 text-content-primary">
    {children}
  </label>
);

/**
 * New meeting's link field (100:41869): 64px, white, radius 16, a muted
 * hairline inside it, the placeholder in bold 14 secondary grey. Typing,
 * then Tab away and back: focus inks the hairline and adds the ring.
 */
export const Field: Story = {
  globals: { theme: "scribe" },
  args: { variant: "field", placeholder: "Copy the meeting link", type: "text" },
  render: (args) => (
    <div className="flex w-133.75 flex-col gap-2 bg-surface-subtle p-6">
      <FieldLabel htmlFor="meeting-link">Meeting link</FieldLabel>
      <Input id="meeting-link" {...args} />
    </div>
  ),
  play: async ({ canvas }) => {
    const field = canvas.getByRole("textbox", { name: "Meeting link" });
    await expect(field).toHaveAttribute("data-variant", "field");
    await userEvent.click(field);
    await userEvent.type(field, "https://meet.google.com/abc-defg-hij");
    await expect(field).toHaveValue("https://meet.google.com/abc-defg-hij");
    await expect(field).toHaveFocus();
  },
};

/** Invalid: `aria-invalid` (FormControl sets it) turns the hairline red. */
export const FieldInvalid: Story = {
  globals: { theme: "scribe" },
  args: {
    variant: "field",
    type: "text",
    defaultValue: "meet.google",
    "aria-invalid": true,
    "aria-describedby": "meeting-link-error",
  },
  render: (args) => (
    <div className="flex w-133.75 flex-col gap-2 bg-surface-subtle p-6">
      <FieldLabel htmlFor="meeting-link-invalid">Meeting link</FieldLabel>
      <Input id="meeting-link-invalid" {...args} />
      <p id="meeting-link-error" className="text-body-12 text-content-accent-coral">
        Paste a Google Meet, Zoom or Teams link
      </p>
    </div>
  ),
};

/** Disabled: the whole field at half strength. */
export const FieldDisabled: Story = {
  globals: { theme: "scribe" },
  args: { variant: "field", type: "text", placeholder: "Copy the meeting link", disabled: true },
  render: (args) => (
    <div className="flex w-133.75 flex-col gap-2 bg-surface-subtle p-6">
      <FieldLabel htmlFor="meeting-link-disabled">Meeting link</FieldLabel>
      <Input id="meeting-link-disabled" {...args} />
    </div>
  ),
};

function LanguageRow({ hint }: { hint?: string }) {
  const [value, setValue] = React.useState("en");
  return (
    <FieldBox className={hint ? "justify-between gap-4" : undefined}>
      <div className="flex shrink-0 items-center gap-2">
        <TranslateIcon className="text-icon-ink" />
        <Select value={value} onValueChange={setValue}>
          <SelectTrigger variant="pill" aria-label="Summary language">
            <SelectValue />
          </SelectTrigger>
          <SelectContent variant="panel" position="popper" sideOffset={6}>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="hy">Armenian</SelectItem>
            <SelectItem value="ru">Russian</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {hint ? <p className="w-79.5 text-right text-caption-10 text-content-muted">{hint}</p> : null}
    </FieldBox>
  );
}

/**
 * `FieldBox`: the same 64px box around a control that is not a text input —
 * New meeting's language rows, the translate glyph and the language pill,
 * with the summary hint on the right.
 */
export const FieldBoxRows: Story = {
  name: "FieldBox (language rows)",
  globals: { theme: "scribe" },
  render: () => (
    <div className="flex w-133.75 flex-col gap-4 bg-surface-subtle p-6">
      <div className="flex flex-col gap-2">
        <span className="flex h-5 items-center text-body-14 text-content-primary">
          Meeting language
        </span>
        <LanguageRow />
      </div>
      <div className="flex flex-col gap-2">
        <span className="flex h-5 items-center text-body-14 text-content-primary">
          Summary language
        </span>
        <LanguageRow hint="The summary and the attendee email will be in this language, whatever language is spoken. You can change it later on the meeting page." />
      </div>
    </div>
  ),
};
