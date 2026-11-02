import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, screen, userEvent, waitFor } from "storybook/test";

import { Button } from "../../primitives/Button/Button";
import { Chip } from "../../primitives/Chip/Chip";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "../../primitives/Popover/Popover";
import { CaretDownIcon, DownloadIcon, ExportIcon, SendIcon } from "../ScribeIcons/ScribeIcons";
import {
  Panel,
  PanelClose,
  PanelFooter,
  PanelHeader,
  PanelRow,
  PanelSection,
  PanelSeparator,
} from "./Panel";

const meta = {
  title: "Brand/Panel",
  component: Panel,
  globals: { theme: "scribe" },
  parameters: { layout: "padded" },
} satisfies Meta<typeof Panel>;

export default meta;
type Story = StoryObj<typeof meta>;

type ExportCopy = {
  export: string;
  close: string;
  download: string;
  share: string;
  rows: { description: string; action: string; kind: "download" | "send" }[];
};

const ENGLISH: ExportCopy = {
  export: "Export",
  close: "Close export menu",
  download: "Download",
  share: "Share",
  rows: [
    { description: "The summary ready to share", action: "PDF", kind: "download" },
    { description: "The summary, editable", action: "Word (.docs)", kind: "download" },
    {
      description: "Transcript timed to the meeting",
      action: "Subtitles (.srt)",
      kind: "download",
    },
    { description: "The summary ready to your inbox", action: "Email", kind: "send" },
    { description: "The summary ready to team channel", action: "Slack", kind: "send" },
  ],
};

function ExportMenuDemo({
  copy = ENGLISH,
  onAction,
  defaultOpen = true,
}: {
  copy?: ExportCopy;
  onAction?: (action: string) => void;
  defaultOpen?: boolean;
}) {
  const row = (r: ExportCopy["rows"][number]) => (
    <PanelRow key={r.action} description={r.description}>
      <Chip onClick={() => onAction?.(r.action)}>
        {r.action}
        {r.kind === "download" ? <DownloadIcon /> : <SendIcon />}
      </Chip>
    </PanelRow>
  );
  return (
    <div className="flex h-110 justify-end pr-25">
      <Popover defaultOpen={defaultOpen}>
        <PopoverTrigger asChild>
          <Button variant="ink" size="pill-md">
            <ExportIcon />
            {copy.export}
            <CaretDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent variant="panel" sideOffset={8}>
          <Panel>
            <PanelHeader>
              <PopoverClose asChild>
                <PanelClose label={copy.close} />
              </PopoverClose>
            </PanelHeader>
            <PanelSection label={copy.download}>{copy.rows.slice(0, 3).map(row)}</PanelSection>
            <PanelSeparator />
            <PanelSection label={copy.share}>{copy.rows.slice(3).map(row)}</PanelSection>
          </Panel>
        </PopoverContent>
      </Popover>
    </div>
  );
}

/**
 * The export menu (100:40882), built from the panel parts and nothing else:
 * `<PopoverContent variant="panel">`, a header holding only the close glyph,
 * two labelled sections of canvas rows with an outline Chip each (Download
 * glyph for files, the Send glyph for Email and Slack), the muted hairline
 * between them.
 */
export const ExportMenu: Story = {
  render: () => <ExportMenuDemo />,
};

const onExportAction = fn();

/** Clicking an action reports it; the close glyph and Escape both dismiss. */
export const ExportMenuInteraction: Story = {
  render: () => <ExportMenuDemo onAction={onExportAction} />,
  play: async ({ canvas }) => {
    onExportAction.mockClear();
    await userEvent.click(await screen.findByRole("button", { name: /PDF/ }));
    await expect(onExportAction).toHaveBeenCalledWith("PDF");
    await expect(screen.getByRole("group", { name: "Download" })).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Close export menu" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    await userEvent.click(canvas.getByRole("button", { name: /Export/ }));
    await screen.findByRole("button", { name: /Slack/ });
    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("button", { name: /Slack/ })).toBeNull());
  },
};

/** Closed: the Export pill alone; the panel grows out of it on open. */
export const ExportMenuClosed: Story = {
  render: () => <ExportMenuDemo defaultOpen={false} />,
};

/** Tab reaches the close glyph first, then each action, each with the focus ring. */
export const ExportMenuFocusVisible: Story = {
  render: () => <ExportMenuDemo />,
  play: async () => {
    const close = await screen.findByRole("button", { name: "Close export menu" });
    close.focus();
    await userEvent.tab();
    await expect(screen.getByRole("button", { name: /PDF/ })).toHaveFocus();
  },
};

/** Armenian: the descriptions wrap to two lines and the row grows. */
export const ExportMenuArmenian: Story = {
  render: () => (
    <ExportMenuDemo
      copy={{
        export: "Արտահանել",
        close: "Փակել",
        download: "Ներբեռնել",
        share: "Կիսվել",
        rows: [
          { description: "Ամփոփումը՝ պատրաստ կիսվելու", action: "PDF", kind: "download" },
          { description: "Ամփոփումը՝ խմբագրելի", action: "Word (.docx)", kind: "download" },
          {
            description: "Տառադարձումը՝ ժամանակացույցով",
            action: "Ենթագրեր (.srt)",
            kind: "download",
          },
          { description: "Ամփոփումը՝ ձեր փոստարկղին", action: "Էլ. փոստ", kind: "send" },
          { description: "Ամփոփումը՝ թիմի ալիքին", action: "Slack", kind: "send" },
        ],
      }}
    />
  ),
};

/** Every part on its own, inside a static panel surface: rows with a label, a description, long text, and a disabled control. */
export const Parts: Story = {
  render: () => (
    <div className="w-62.5 rounded-12 border border-stroke-ink bg-surface-primary px-2 py-2.5 shadow-popover">
      <Panel>
        <PanelHeader onClose={() => {}} closeLabel="Close">
          <Button variant="danger" size="pill-xs">
            Reset
          </Button>
        </PanelHeader>
        <PanelSection label="Rows">
          <PanelRow label="Date">
            <Chip onClick={() => {}}>
              October 20, 2026
              <CaretDownIcon />
            </Chip>
          </PanelRow>
          <PanelRow description="A description runs the free width and wraps onto a second and even a third line when it has to">
            <Chip onClick={() => {}}>
              PDF
              <DownloadIcon />
            </Chip>
          </PanelRow>
          <PanelRow description="Disabled control">
            <Chip onClick={() => {}} disabled>
              Slack
              <SendIcon />
            </Chip>
          </PanelRow>
        </PanelSection>
        <PanelSeparator />
        <PanelSection label="Empty section" />
        <PanelFooter onDiscard={() => {}} onSave={() => {}} />
      </Panel>
    </div>
  ),
};

/** The footer's two states: ready, and Save disabled until there is something to save. */
export const Footer: Story = {
  render: () => (
    <div className="flex w-50.5 flex-col gap-4">
      <PanelFooter onDiscard={fn()} onSave={fn()} />
      <PanelFooter onDiscard={fn()} onSave={fn()} saveDisabled />
      <PanelFooter labels={{ discard: "չեղարկել", save: "Պահպանել" }} />
    </div>
  ),
};
