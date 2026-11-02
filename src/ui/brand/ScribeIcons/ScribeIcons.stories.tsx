import type { Meta, StoryObj } from "@storybook/react-vite";
import { ScribeIcons } from "./ScribeIcons.registry";

const meta = {
  title: "Brand/ScribeIcons",
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function Grid({ inverse }: { inverse?: boolean }) {
  return (
    <div
      className={
        inverse
          ? "grid grid-cols-6 gap-3 rounded-16 bg-surface-inverse p-4 text-content-inverse"
          : "grid grid-cols-6 gap-3 rounded-16 bg-surface-subtle p-4 text-content-primary"
      }
    >
      {Object.entries(ScribeIcons).map(([name, Icon]) => (
        <figure key={name} className="flex flex-col items-center gap-2 p-2">
          <div className="flex h-14 items-center justify-center">
            <Icon />
          </div>
          <figcaption className="text-center text-caption-10 break-all">{name}</figcaption>
        </figure>
      ))}
    </div>
  );
}

/** Every glyph at its Figma size, on the light canvas. */
export const AtFigmaSize: Story = { render: () => <Grid /> };

/** The same set on the inverse surface: single-colour glyphs follow currentColor. */
export const OnInverse: Story = { render: () => <Grid inverse /> };

/** `size` sets the longer side and keeps the aspect ratio. */
export const Sized: Story = {
  render: () => {
    const { SearchIcon, ZoomIcon, TranslateIcon } = ScribeIcons;
    return (
      <div className="flex items-end gap-6 text-content-primary">
        <SearchIcon size={16} />
        <SearchIcon size={24} />
        <ZoomIcon size={24} />
        <ZoomIcon size={48} />
        <TranslateIcon size={16} />
        <TranslateIcon size={32} />
      </div>
    );
  },
};
