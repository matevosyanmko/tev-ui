import * as React from "react";

import { cn } from "../../../utils.js";
import { Button } from "../../primitives/Button/Button.js";
import { Separator } from "../../primitives/Separator/Separator.js";
import { CloseCircleIcon } from "../ScribeIcons/ScribeIcons.js";
import type {
  PanelCloseProps,
  PanelFooterProps,
  PanelHeaderProps,
  PanelRowProps,
  PanelSectionProps,
} from "./Panel.types.js";

/**
 * The inside of a TevScribe floating panel: the filters (100:43543), the
 * export menu (100:40882) and the pickers. The surface is the container's —
 * `<PopoverContent variant="panel">` or `"picker"` — so these parts work in a
 * sheet or inline too. Domain-free: every string is the caller's.
 *
 *   <Panel>
 *     <PanelHeader onClose={close} />
 *     <PanelSection label="Download">
 *       <PanelRow description="The summary ready to share">
 *         <Chip onClick={pdf}>PDF <DownloadIcon /></Chip>
 *       </PanelRow>
 *     </PanelSection>
 *     <PanelSeparator />
 *   </Panel>
 */
function Panel({ className, ...props }: React.ComponentProps<"div">) {
  // 16px between header, sections and separators, as the export menu draws.
  return <div data-slot="panel" className={cn("flex flex-col gap-4", className)} {...props} />;
}

/**
 * The 21px close square. Its own export so a popover can wrap it,
 * `<PopoverClose asChild><PanelClose /></PopoverClose>`, and stay uncontrolled.
 * The glyph carries its own white fill and ink stroke, so hover dims it
 * rather than filling behind it.
 */
const PanelClose = React.forwardRef<HTMLButtonElement, PanelCloseProps>(function PanelClose(
  { className, label, ...props },
  ref,
) {
  return (
    <Button
      ref={ref}
      type="button"
      variant="ghost"
      size="icon-pill"
      data-brand="panel-close"
      aria-label={label ?? "Close"}
      className={cn(
        "size-5.25 rounded-8 transition-opacity duration-(--duration-fast) ease-standard hover:bg-transparent hover:opacity-70 motion-reduce:transition-none dark:hover:bg-transparent",
        className,
      )}
      {...props}
    >
      <CloseCircleIcon />
    </Button>
  );
});

/** Actions on the right, then the close glyph; 8px apart. */
function PanelHeader({ className, children, onClose, closeLabel, ...props }: PanelHeaderProps) {
  return (
    <div
      data-slot="panel-header"
      className={cn("flex items-center justify-end gap-2", className)}
      {...props}
    >
      {children}
      {onClose ? <PanelClose label={closeLabel} onClick={onClose} /> : null}
    </div>
  );
}

/** A labelled group of rows, 10px apart. */
function PanelSection({ className, label, children, ...props }: PanelSectionProps) {
  const labelId = React.useId();
  return (
    <div
      data-slot="panel-section"
      role="group"
      aria-labelledby={label ? labelId : undefined}
      className={cn("flex flex-col gap-2.5", className)}
      {...props}
    >
      {label ? (
        <div id={labelId} data-slot="panel-section-label" className="text-caption-10">
          {label}
        </div>
      ) : null}
      {children}
    </div>
  );
}

/**
 * A canvas card: text on the left, the control on the right. A trigger in
 * the control slot that is open (`data-state="open"`) turns its ScribeIcons
 * caret or chevron (`CaretDownIcon`, `ChevronDownIcon`) up, as the filter
 * rows draw it (100:43660).
 */
function PanelRow({ className, label, description, children, ...props }: PanelRowProps) {
  const labelId = React.useId();
  return (
    <div
      data-slot="panel-row"
      role={label ? "group" : undefined}
      aria-labelledby={label ? labelId : undefined}
      className={cn(
        "flex w-full items-center justify-between gap-2 rounded-8 bg-surface-subtle p-2 text-content-primary",
        "transition-colors duration-(--duration-fast) ease-standard hover:bg-surface-neutral-subtle/70 motion-reduce:transition-none",
        className,
      )}
      {...props}
    >
      {label ? (
        <span
          id={labelId}
          data-slot="panel-row-label"
          className="flex h-8 shrink-0 items-center px-3 text-caption-10"
        >
          {label}
        </span>
      ) : null}
      {description ? (
        <span
          data-slot="panel-row-description"
          className="flex min-h-8 min-w-0 flex-1 items-center text-caption-10"
        >
          {description}
        </span>
      ) : null}
      {children ? (
        <div
          data-slot="panel-row-control"
          className={cn(
            "flex shrink-0 items-center gap-2.25",
            "[&_[data-icon$=DownIcon]]:transition-transform [&_[data-icon$=DownIcon]]:duration-(--duration-fast) [&_[data-icon$=DownIcon]]:ease-standard motion-reduce:[&_[data-icon$=DownIcon]]:transition-none",
            "[&_[data-state=open]_[data-icon$=DownIcon]]:rotate-180",
          )}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}

/**
 * The muted hairline between sections. Figma draws it as a zero-height
 * stroke, so it takes no room: the 16px gaps either side are all there is.
 */
function PanelSeparator({ className, ...props }: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-brand="panel-separator"
      className={cn("-mb-px bg-stroke-muted", className)}
      {...props}
    />
  );
}

/** The pickers' footer: an underlined "discard" and a black Save, 14px apart, at the end. */
function PanelFooter({
  className,
  onDiscard,
  onSave,
  saveDisabled,
  labels,
  ...props
}: PanelFooterProps) {
  return (
    <div
      data-slot="panel-footer"
      className={cn("flex items-center justify-end gap-3.5", className)}
      {...props}
    >
      <Button type="button" variant="quiet" size="compact" onClick={onDiscard}>
        {labels?.discard ?? "discard"}
      </Button>
      <Button type="button" variant="ink" size="compact" onClick={onSave} disabled={saveDisabled}>
        {labels?.save ?? "Save"}
      </Button>
    </div>
  );
}

export { Panel, PanelClose, PanelFooter, PanelHeader, PanelRow, PanelSection, PanelSeparator };
