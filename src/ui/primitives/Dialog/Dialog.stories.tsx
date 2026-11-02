import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, screen, userEvent, waitFor } from "storybook/test";

import { TranslateIcon } from "../../brand/ScribeIcons/ScribeIcons";
import { Button } from "../Button/Button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../Select/Select";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./Dialog";

const meta = {
  title: "Primitives/Dialog",
  component: Dialog,
  argTypes: {
    modal: { control: "boolean" },
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger asChild>
        <Button>Delete number</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete phone number?</DialogTitle>
          <DialogDescription>
            +1 (415) 555-0132 will stop receiving calls. This cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button variant="destructive">Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

// ---- TevScribe panel ------------------------------------------------------
//
// Story fixtures only: the package ships no flags, and the app owns the form.
const FLAG_BG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18"><clipPath id="c"><circle cx="9" cy="9" r="8"/></clipPath><g clip-path="url(#c)"><rect width="18" height="6" fill="#fff"/><rect y="6" width="18" height="6" fill="#00966E"/><rect y="12" width="18" height="6" fill="#D62612"/></g><circle cx="9" cy="9" r="8.5" fill="none" stroke="#000"/></svg>',
  );

const scribe = { globals: { theme: "scribe" } } as const;

/** A stand-in for the meetings page, so the blur and the dim have something to act on. */
function PageBehind() {
  return (
    <div className="flex min-h-dvh gap-5 bg-surface-inverse p-5">
      <div className="flex w-40 flex-col gap-3">
        <div className="h-20 rounded-16 inset-ring inset-ring-stroke-white" />
        <div className="h-36 rounded-16 inset-ring inset-ring-stroke-white" />
      </div>
      <div className="flex flex-1 flex-col gap-4 rounded-16 bg-surface-primary p-5">
        <p className="text-heading-24">Meetings</p>
        {["Product discussion", "UI/UX discussion", "Ai talks", "First week sprint"].map((t) => (
          <div key={t} className="flex h-16 items-center gap-4 rounded-16 bg-surface-subtle px-6">
            <span className="h-8 w-40 rounded-20 bg-surface-accent-green" />
            <span className="text-heading-16">{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function LanguageField({ label, hint }: { label: string; hint?: string }) {
  const [value, setValue] = React.useState("bg");
  return (
    <div className="flex flex-col gap-2">
      <span className="flex h-5 items-center text-body-14">{label}</span>
      <div className="flex h-16 items-center justify-between gap-4 rounded-16 bg-surface-primary p-4 inset-ring inset-ring-stroke-muted">
        <div className="flex items-center gap-2">
          <TranslateIcon />
          <Select value={value} onValueChange={setValue}>
            <SelectTrigger variant="pill" media={<img src={FLAG_BG} alt="" />} aria-label={label}>
              <SelectValue>{value === "bg" ? "Bulgarian" : "English"}</SelectValue>
            </SelectTrigger>
            <SelectContent variant="panel" position="popper" sideOffset={6}>
              <SelectItem value="bg">Bulgarian</SelectItem>
              <SelectItem value="en">English</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {hint ? (
          <p className="w-79.5 text-right text-caption-10 text-content-muted">{hint}</p>
        ) : null}
      </div>
    </div>
  );
}

function NewMeetingDialog({
  defaultOpen = true,
  copy = {
    title: "New meeting",
    description: "Paste a Google Meet or Zoom link and TevScribe will join to record it.",
    link: "Meeting link",
    placeholder: "Copy the meeting link",
    meeting: "Meeting language",
    summary: "Summary language",
    hint: "The summary and the attendee email will be in this language, whatever language is spoken. You can change it later on the meeting page.",
    start: "Start recording",
    open: "New meeting",
    close: "Close",
  },
}: {
  defaultOpen?: boolean;
  copy?: Record<
    | "title"
    | "description"
    | "link"
    | "placeholder"
    | "meeting"
    | "summary"
    | "hint"
    | "start"
    | "open"
    | "close",
    string
  >;
}) {
  return (
    <>
      <PageBehind />
      <Dialog defaultOpen={defaultOpen}>
        <DialogTrigger asChild>
          <Button variant="light" size="pill-md" className="fixed top-8 right-8">
            {copy.open}
          </Button>
        </DialogTrigger>
        <DialogContent variant="panel" closeLabel={copy.close}>
          <DialogHeader>
            <DialogTitle>{copy.title}</DialogTitle>
            <DialogDescription>{copy.description}</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <label className="flex flex-col gap-2">
              <span className="flex h-5 items-center text-body-14">{copy.link}</span>
              <input
                placeholder={copy.placeholder}
                className="h-16 rounded-16 bg-surface-primary px-4 text-heading-14 inset-ring inset-ring-stroke-muted outline-none placeholder:text-content-secondary focus-visible:inset-ring-stroke-ink"
              />
            </label>
            <LanguageField label={copy.meeting} />
            <LanguageField label={copy.summary} hint={copy.hint} />
          </div>
          <Button variant="ink" size="block">
            {copy.start}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}

/**
 * New meeting (100:41869): the canvas card, radius 40, 64px sides, the 32px
 * close glyph 16px above the title, the page behind blurred 10px and darkened.
 * The fields and the block button are the app's own composition.
 */
export const PanelNewMeeting: Story = {
  ...scribe,
  parameters: { layout: "fullscreen" },
  render: () => <NewMeetingDialog />,
};

/** Welcome (100:42294): the white surface, no close, everything centred 30px apart. */
export const PanelWelcome: Story = {
  ...scribe,
  parameters: { layout: "fullscreen" },
  render: () => (
    <>
      <PageBehind />
      <Dialog defaultOpen>
        <DialogContent
          variant="panel"
          surface="primary"
          showCloseButton={false}
          className="max-w-174 items-center gap-7.5 lg:py-16"
        >
          <span className="text-heading-32">TevScribe</span>
          <DialogHeader className="items-center gap-2.5 text-center">
            <DialogTitle className="text-display-80">Welcome</DialogTitle>
            <DialogDescription className="w-133.75 max-w-full">
              Let’s quickly learn how TevScribe helps you review interactions, search calls, and
              understand customer communication.
            </DialogDescription>
          </DialogHeader>
          <Button variant="framed" size="display">
            Start guided tour
          </Button>
          <DialogClose asChild>
            <Button
              variant="quiet"
              className="h-5 px-0 text-body-16 text-content-secondary no-underline"
            >
              skip onboarding
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  ),
};

/**
 * Closed, then opened from its trigger: the card fades and rises in on the
 * emphasized curve while the page blurs; Escape and the close glyph both
 * close it, faster, on the exit curve. Reduced motion drops the animation.
 */
export const PanelOpenAndClose: Story = {
  ...scribe,
  parameters: { layout: "fullscreen" },
  render: () => <NewMeetingDialog defaultOpen={false} />,
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole("button", { name: "New meeting" }));
    const dialog = await screen.findByRole("dialog", { name: "New meeting" });
    await expect(dialog).toHaveAttribute("data-variant", "panel");
    await userEvent.click(screen.getByRole("button", { name: "Close" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    await userEvent.click(canvas.getByRole("button", { name: "New meeting" }));
    await screen.findByRole("dialog");
    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  },
};

/**
 * Keyboard: focus lands on the meeting link, the close glyph comes last in
 * the tab order although it is drawn first, and it shows the focus ring.
 */
export const PanelFocusVisible: Story = {
  ...scribe,
  parameters: { layout: "fullscreen" },
  render: () => <NewMeetingDialog />,
  play: async () => {
    const dialog = await screen.findByRole("dialog");
    const close = screen.getByRole("button", { name: "Close" });
    await waitFor(() => expect(dialog.contains(document.activeElement)).toBe(true));
    await expect(
      close.compareDocumentPosition(screen.getByRole("button", { name: "Start recording" })),
    ).toBe(Node.DOCUMENT_POSITION_PRECEDING);
    close.focus();
    await expect(close).toHaveFocus();
  },
};

/** Armenian copy, which runs longer and wraps; the card keeps its width. */
export const PanelArmenian: Story = {
  ...scribe,
  parameters: { layout: "fullscreen" },
  render: () => (
    <NewMeetingDialog
      copy={{
        title: "Նոր հանդիպում",
        description:
          "Տեղադրեք Google Meet-ի կամ Zoom-ի հղումը, և TevScribe-ը կմիանա՝ այն ձայնագրելու համար։",
        link: "Հանդիպման հղում",
        placeholder: "Պատճենեք հանդիպման հղումը",
        meeting: "Հանդիպման լեզու",
        summary: "Ամփոփման լեզու",
        hint: "Ամփոփումը և մասնակիցների նամակը կլինեն այս լեզվով՝ անկախ խոսակցության լեզվից։ Կարող եք փոխել այն հանդիպման էջում։",
        start: "Սկսել ձայնագրումը",
        open: "Նոր հանդիպում",
        close: "Փակել",
      }}
    />
  ),
};

/** Taller than a short screen: the card keeps a 16px gutter and scrolls inside itself. */
export const PanelLongContent: Story = {
  ...scribe,
  parameters: { layout: "fullscreen", viewport: { defaultViewport: "mobile1" } },
  render: () => (
    <Dialog defaultOpen>
      <DialogContent variant="panel">
        <DialogHeader>
          <DialogTitle>Terms of recording</DialogTitle>
          <DialogDescription>
            {Array.from(
              { length: 12 },
              () =>
                "TevScribe joins the call as a visible participant and records audio for the transcript. ",
            ).join("")}
          </DialogDescription>
        </DialogHeader>
        <Button variant="ink" size="block">
          I agree
        </Button>
      </DialogContent>
    </Dialog>
  ),
};
