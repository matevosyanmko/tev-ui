import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent } from "storybook/test";

import {
  ChevronDownIcon,
  ExportIcon,
  GoogleIcon,
  LeaveIcon,
  PlusIcon,
  RegenerateIcon,
  TrashIcon,
} from "../../brand/ScribeIcons/ScribeIcons";
import { Button } from "./Button";

const meta = {
  title: "Primitives/Button",
  component: Button,
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
        "ink",
        "outline-ink",
        "danger",
        "accent",
        "light",
        "quiet",
        "quiet-inverse",
        "framed",
      ],
    },
    size: {
      control: "select",
      options: [
        "default",
        "xs",
        "sm",
        "lg",
        "icon",
        "pill-xs",
        "pill-sm",
        "pill-md",
        "compact",
        "block",
        "icon-pill",
        "icon-box",
        "display",
      ],
    },
    disabled: { control: "boolean" },
  },
  args: { children: "Button", variant: "default", size: "default" },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

// Everything below is the TevScribe set, pinned to its theme. Hover, focus and
// press are live: point at, tab to and press any of them.
const scribe = { globals: { theme: "scribe" } } as const;

/** The meetings list's row actions (100:41115) and the expanded card's green Join (100:43894). */
export const ScribeRowActions: Story = {
  ...scribe,
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="ink" size="pill-sm">
        Join
      </Button>
      <Button variant="outline-ink" size="pill-sm">
        Review
      </Button>
      <Button variant="danger" size="pill-sm">
        LeaveMeeting
        <LeaveIcon />
      </Button>
      <Button variant="accent" size="pill-sm">
        Join
      </Button>
    </div>
  ),
};

/**
 * Page actions: New meeting on the black chrome (100:41115), and the detail
 * header's Export / Regenerate / Delete (100:40786).
 */
export const ScribePageActions: Story = {
  ...scribe,
  render: () => (
    <div className="flex flex-col items-start gap-6">
      <div className="rounded-16 bg-surface-inverse p-4">
        <Button variant="light" size="pill-md" className="px-5">
          New meeting
          <PlusIcon />
        </Button>
      </div>
      <div className="flex items-center gap-1.5">
        <Button variant="outline-ink" size="pill-md">
          <ExportIcon />
          Export
          <ChevronDownIcon />
        </Button>
        <Button variant="outline-ink" size="pill-md">
          <RegenerateIcon />
          Regenrate
        </Button>
        <Button variant="danger" size="icon-pill" aria-label="Delete meeting">
          <TrashIcon />
        </Button>
      </div>
    </div>
  ),
};

/** 64px blocks: the login pair (100:43473) and the New meeting modal's CTA (100:41869). */
export const ScribeBlocks: Story = {
  ...scribe,
  render: () => (
    <div className="flex w-137 flex-col gap-4">
      <Button variant="ink" size="block">
        Log in
      </Button>
      <Button variant="outline-ink" size="block">
        continue with google
        <GoogleIcon />
      </Button>
      <Button variant="ink" size="block">
        Start recording
      </Button>
    </div>
  ),
};

/** The date picker footer (100:43738) and the filter panel's Reset (100:43543). */
export const ScribePickerFooter: Story = {
  ...scribe,
  render: () => (
    <div className="flex flex-col items-end gap-6">
      <Button variant="danger" size="pill-xs">
        Reset
      </Button>
      <div className="flex items-center justify-end gap-3.5">
        <Button variant="quiet" size="compact">
          discard
        </Button>
        <Button variant="ink" size="compact">
          Save
        </Button>
      </div>
      <div className="flex items-center gap-4 rounded-16 bg-surface-inverse p-4">
        <Button variant="quiet-inverse" size="pill-sm">
          log out
        </Button>
      </div>
    </div>
  ),
};

/** The Welcome popup's framed call to action (100:42294). */
export const ScribeFramedCta: Story = {
  ...scribe,
  render: () => (
    <Button variant="framed" size="display">
      Start guided tour
    </Button>
  ),
};

/** Disabled, a long label, and Armenian copy (which falls back to Noto Sans Armenian). */
export const ScribeEdgeCases: Story = {
  ...scribe,
  render: () => (
    <div className="flex flex-col items-start gap-4">
      <div className="flex items-center gap-4">
        <Button variant="ink" size="pill-sm" disabled>
          Join
        </Button>
        <Button variant="outline-ink" size="pill-md" disabled>
          <RegenerateIcon />
          Regenrate
        </Button>
        <Button variant="danger" size="pill-sm" disabled>
          LeaveMeeting
          <LeaveIcon />
        </Button>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ink" size="pill-sm">
          Միանալ
        </Button>
        <Button variant="outline-ink" size="pill-sm">
          Դիտել
        </Button>
        <Button variant="danger" size="pill-sm">
          Լքել հանդիպումը
          <LeaveIcon />
        </Button>
      </div>
      <div className="w-137">
        <Button variant="ink" size="block">
          Սկսել ձայնագրումը
        </Button>
      </div>
      <Button variant="outline-ink" size="pill-md">
        <ExportIcon />
        Export the whole transcript as a document
        <ChevronDownIcon />
      </Button>
    </div>
  ),
};

/** Keyboard focus: Tab lands on the button and draws the ring; Enter activates it. */
export const ScribeFocusVisible: Story = {
  ...scribe,
  args: { variant: "ink", size: "pill-sm", children: "Join", onClick: fn() },
  play: async ({ args, canvas }) => {
    const button = canvas.getByRole("button", { name: "Join" });
    await userEvent.tab();
    await expect(button).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};
