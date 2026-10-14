"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";

import { cn } from "../../../utils.js";
import { buttonVariants } from "../Button/Button.variants.js";
import { Tooltip, TooltipContent, TooltipTrigger } from "../Tooltip/Tooltip.js";
import type { CopyButtonProps } from "./CopyButton.types.js";

/** How long the check mark and "Copied" stay before it reads "Copy" again. */
const COPIED_MS = 1500;

async function writeClipboard(text: string) {
  if (window.isSecureContext && navigator.clipboard) return navigator.clipboard.writeText(text);
  // Plain http (a phone on a dev server's LAN address) has no async
  // clipboard; the old selection-based copy still works there.
  const previous = document.activeElement;
  const area = document.createElement("textarea");
  area.value = text;
  area.setAttribute("readonly", "");
  area.style.position = "fixed";
  area.style.opacity = "0";
  document.body.append(area);
  area.select();
  const copied = document.execCommand("copy");
  area.remove();
  if (previous instanceof HTMLElement) previous.focus();
  if (!copied) throw new Error("Copy was refused");
}

/**
 * A small icon button that puts `value` on the clipboard, for an id, a path or
 * a link sitting next to it — usually one shown cut short by `TruncatedText`.
 * The icon turns into a check and the tooltip says "Copied" for a moment.
 */
function CopyButton({ value, labels, className, onClick, ...props }: CopyButtonProps) {
  const [hovered, setHovered] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), COPIED_MS);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;
    // A refused write (no permission) leaves nothing to confirm.
    writeClipboard(value).then(
      () => setCopied(true),
      () => undefined,
    );
  };

  const label = copied ? (labels?.copied ?? "Copied") : (labels?.copy ?? "Copy");

  return (
    // A click closes a tooltip; `copied` holds it open to show the confirmation.
    <Tooltip open={hovered || copied} onOpenChange={setHovered}>
      <TooltipTrigger asChild>
        <button
          type="button"
          data-slot="copy-button"
          aria-label={label}
          className={cn(
            buttonVariants({ variant: "ghost", size: "icon-xs" }),
            "text-muted-foreground hover:text-foreground",
            className,
          )}
          onClick={handleClick}
          {...props}
        >
          {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
        </button>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}

export { CopyButton };
