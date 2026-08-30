import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { DropZone } from "./DropZone";

function fakeFile(name: string, kb: number) {
  return new File([new ArrayBuffer(kb * 1024)], name, { type: "audio/wav" });
}

const meta = {
  title: "Brand/DropZone",
  component: DropZone,
  argTypes: { multiple: { control: "boolean" }, disabled: { control: "boolean" } },
  args: { accept: "audio/*", multiple: false, disabled: false, onChange: () => {} },
  decorators: [
    (Story) => (
      <div className="w-[520px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DropZone>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Fully controlled — pick or drop a file and the list below is the caller's state. */
export const Empty: Story = {
  render: function EmptyStory(args) {
    const [files, setFiles] = React.useState<File[]>([]);
    return <DropZone {...args} files={files} onChange={setFiles} />;
  },
};

/** Single-file mode replaces the box entirely once something is chosen. */
export const SingleFileChosen: Story = {
  args: { files: [fakeFile("support-call-2026-08-14.wav", 4820)] },
};

/** Multi-file mode keeps the box open and stacks the list under it. */
export const MultipleFiles: Story = {
  args: {
    multiple: true,
    files: [
      fakeFile("inbound-0912.wav", 1180),
      fakeFile("inbound-0913.wav", 940),
      fakeFile("a-recording-with-a-genuinely-very-long-file-name.wav", 12400),
    ],
  },
};

/** Disabled hides the remove buttons too — nothing about the selection can change. */
export const Disabled: Story = {
  args: { disabled: true, multiple: true, files: [fakeFile("locked.wav", 300)] },
};

export const Translated: Story = {
  args: {
    labels: {
      title: "Нажмите или перетащите файл сюда",
      hint: "Поддерживается одиночная и массовая загрузка",
      remove: "Удалить файл",
    },
  },
};
