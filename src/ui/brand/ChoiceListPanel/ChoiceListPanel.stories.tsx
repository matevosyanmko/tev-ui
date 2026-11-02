import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, screen, userEvent, within } from "storybook/test";

import { Chip } from "../../primitives/Chip/Chip";
import { Popover, PopoverContent, PopoverTrigger } from "../../primitives/Popover/Popover";
import { ChevronDownIcon } from "../ScribeIcons/ScribeIcons";
import { ChoiceListPanel } from "./ChoiceListPanel";
import type { ChoiceListOption, ChoiceListPanelProps } from "./ChoiceListPanel.types";

// Story fixtures only: the package ships no flags.
const flag = (stripes: string[]) =>
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18"><clipPath id="c"><circle cx="9" cy="9" r="8"/></clipPath><g clip-path="url(#c)">${stripes
      .map((c, i) => `<rect y="${i * 6}" width="18" height="6" fill="${c}"/>`)
      .join("")}</g><circle cx="9" cy="9" r="8.5" fill="none" stroke="#000"/></svg>`,
  );
const FLAGS = {
  bg: flag(["#fff", "#00966E", "#D62612"]),
  am: flag(["#D90012", "#0033A0", "#F2A800"]),
  ru: flag(["#fff", "#0039A6", "#D52B1E"]),
  en: flag(["#012169", "#fff", "#C8102E"]),
};
const Flag = ({ code }: { code: keyof typeof FLAGS }) => <img src={FLAGS[code]} alt="" />;

const LANGUAGES: ChoiceListOption[] = [
  { value: "hy", label: "Armenian", media: <Flag code="am" /> },
  { value: "en", label: "English", media: <Flag code="en" /> },
  { value: "ru", label: "Russian", media: <Flag code="ru" /> },
  { value: "bg", label: "Bulgarian", media: <Flag code="bg" /> },
];

const meta = {
  title: "Brand/ChoiceListPanel",
  component: ChoiceListPanel,
  globals: { theme: "scribe" },
  args: {
    options: LANGUAGES,
    value: ["hy"],
    labels: { all: "All Languages", list: "Summary languages" },
    onSave: fn(),
    onDiscard: fn(),
  },
} satisfies Meta<typeof ChoiceListPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

/** How the app mounts it: in a picker popover under the filter row's language pill. */
function InPicker({
  defaultOpen = true,
  ...props
}: ChoiceListPanelProps & { defaultOpen?: boolean }) {
  const [open, setOpen] = React.useState(defaultOpen);
  return (
    <div className="flex h-80 justify-center">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Chip className="gap-2">
            <img src={FLAGS.bg} alt="" className="size-4 rounded-full" />
            <span className="flex items-center gap-0.5">
              Bulgarian
              <ChevronDownIcon />
            </span>
          </Chip>
        </PopoverTrigger>
        <PopoverContent variant="picker" sideOffset={7}>
          <ChoiceListPanel
            {...props}
            onSave={(value) => {
              props.onSave(value);
              setOpen(false);
            }}
            onDiscard={() => {
              props.onDiscard?.();
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

/**
 * 100:43832 as drawn: four Bulgarian pills, the "All Languages" chip and the
 * footer, 166px wide on the picker surface (the footer sets the width).
 */
export const AsDrawn: Story = {
  args: {
    value: [],
    options: [1, 2, 3, 4].map((n) => ({
      value: `bg-${n}`,
      label: "Bulgarian",
      media: <Flag code="bg" />,
    })),
  },
  render: (args) => <InPicker {...args} />,
};

/** The real list, one language chosen: the chosen pill is filled ink. */
export const Selected: Story = {
  render: (args) => <InPicker {...args} />,
};

/** Closed: only the language pill. */
export const Closed: Story = {
  render: (args) => <InPicker {...args} defaultOpen={false} />,
};

/** Toggling pills and saving: the result comes back in option order. */
export const MultiSelect: Story = {
  render: (args) => <InPicker {...args} />,
  play: async ({ args }) => {
    const russian = await screen.findByRole("button", { name: "Russian" });
    await userEvent.click(russian);
    await expect(russian).toHaveAttribute("aria-pressed", "true");
    await userEvent.click(screen.getByRole("button", { name: "Armenian" }));
    await userEvent.click(screen.getByRole("button", { name: "English" }));
    await userEvent.click(screen.getByRole("button", { name: "Save" }));
    await expect(args.onSave).toHaveBeenCalledWith(["en", "ru"]);
  },
};

/** The "all" chip picks every option, and once they all are, clears them. */
export const AllToggle: Story = {
  render: (args) => <InPicker {...args} />,
  play: async () => {
    const all = await screen.findByRole("button", { name: "All Languages" });
    await userEvent.click(all);
    await expect(all).toHaveAttribute("aria-pressed", "true");
    const list = within(screen.getByRole("group", { name: "Summary languages" }));
    for (const name of ["Armenian", "English", "Russian", "Bulgarian"]) {
      await expect(list.getByRole("button", { name })).toHaveAttribute("aria-pressed", "true");
    }
    await userEvent.click(all);
    await expect(screen.getByRole("button", { name: "Armenian" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  },
};

/** Keyboard: Tab walks the pills with the focus ring; Space toggles. */
export const KeyboardFocus: Story = {
  render: (args) => <InPicker {...args} />,
  play: async () => {
    const armenian = await screen.findByRole("button", { name: "Armenian" });
    armenian.focus();
    await userEvent.tab();
    const english = screen.getByRole("button", { name: "English" });
    await expect(english).toHaveFocus();
    await userEvent.keyboard(" ");
    await expect(english).toHaveAttribute("aria-pressed", "true");
  },
};

/** A disabled option is skipped by "all" and cannot be toggled. */
export const DisabledOption: Story = {
  args: {
    options: [...LANGUAGES.slice(0, 3), { ...LANGUAGES[3], disabled: true }],
  },
  render: (args) => <InPicker {...args} />,
};

/** No options: a muted line instead of the list, and no "all" chip. */
export const Empty: Story = {
  args: { options: [], value: [], labels: { empty: "No languages yet" } },
  render: (args) => <InPicker {...args} />,
};

/** Armenian labels and long option names: the panel widens to the widest pill. */
export const ArmenianLongText: Story = {
  args: {
    value: ["hy"],
    options: [
      { value: "hy", label: "Հայերեն (արևելահայերեն)", media: <Flag code="am" /> },
      { value: "en", label: "Անգլերեն", media: <Flag code="en" /> },
      { value: "ru", label: "Ռուսերեն", media: <Flag code="ru" /> },
    ],
    labels: { all: "Բոլոր լեզուները", discard: "չեղարկել", save: "Պահպանել" },
  },
  render: (args) => <InPicker {...args} />,
};
