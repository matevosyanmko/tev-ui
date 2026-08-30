"use client";

import * as React from "react";
import { FileAudio, Upload, X } from "lucide-react";

import { cn } from "../../../utils.js";
import type { DropZoneProps } from "./DropZone.types.js";

/**
 * Click-or-drag file picker with an inline list of what has been chosen.
 *
 * Fully controlled: `files` is the caller's state and every change reports the
 * next array. That is what lets a form clear the selection on submit — an
 * uncontrolled version would keep the stale files after a successful upload.
 */
function DropZone({
  accept,
  multiple = false,
  files = [],
  onChange,
  disabled = false,
  labels,
  className,
  boxClassName,
  ...props
}: DropZoneProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = React.useState(false);

  // The <input> keeps its own value, and a file re-picked after being removed
  // would otherwise fire no change event at all (same value as last time).
  React.useEffect(() => {
    if (!files.length && inputRef.current) inputRef.current.value = "";
  }, [files.length]);

  function handleFiles(incoming: FileList | File[]) {
    const next = Array.from(incoming);
    if (!next.length) return;
    onChange(multiple ? [...files, ...next] : next);
    if (inputRef.current) inputRef.current.value = "";
  }

  function removeFile(index: number) {
    onChange(files.filter((_, i) => i !== index));
    if (inputRef.current) inputRef.current.value = "";
  }

  // Single-file mode replaces the box with the chosen file rather than
  // stacking a one-item list under a box that can no longer be used.
  const boxHidden = !multiple && files.length > 0;
  const removeLabel = labels?.remove ?? "Remove file";

  return (
    <div data-slot="drop-zone" className={cn("min-w-0", className)} {...props}>
      {!boxHidden ? (
        <div
          data-slot="drop-zone-box"
          data-dragging={(dragging && !disabled) || undefined}
          className={cn(
            "min-w-0 rounded-lg border-2 border-dashed p-4 text-center transition-colors sm:p-8",
            disabled
              ? "cursor-not-allowed border-border opacity-50"
              : "cursor-pointer border-border hover:border-primary",
            dragging && !disabled && "border-primary bg-accent",
            boxClassName,
          )}
          onClick={() => !disabled && inputRef.current?.click()}
          onDragOver={(event) => {
            event.preventDefault();
            if (!disabled) setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(event) => {
            event.preventDefault();
            setDragging(false);
            if (!disabled) handleFiles(event.dataTransfer.files);
          }}
        >
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            accept={accept}
            multiple={multiple}
            disabled={disabled}
            onChange={(event) => handleFiles(event.target.files ?? [])}
          />
          <Upload aria-hidden="true" className="mx-auto mb-3 size-8 text-muted-foreground" />
          <p className="text-sm font-medium break-words">
            {labels?.title ?? "Click or drag file to this area to upload"}
          </p>
          <p className="mt-1 text-xs break-words text-muted-foreground">
            {labels?.hint ?? "Support for single or bulk upload"}
          </p>
        </div>
      ) : null}

      {files.length > 0 ? (
        <ul data-slot="drop-zone-files" className={cn("space-y-2", !boxHidden && "mt-2")}>
          {files.map((file, index) => (
            <li
              key={`${file.name}-${file.lastModified}-${index}`}
              data-slot="drop-zone-file"
              className="flex min-w-0 items-center gap-2 rounded-[12px] border border-brand-lavender bg-brand-purple-soft px-3 py-2.5"
            >
              <FileAudio aria-hidden="true" className="size-4 shrink-0 text-brand-purple" />
              <span className="min-w-0 flex-1 truncate text-[13px] font-medium text-black">
                {file.name}
              </span>
              <span className="shrink-0 text-[11px] text-muted-foreground">
                {(file.size / 1024).toFixed(1)} KB
              </span>
              {!disabled ? (
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeFile(index);
                  }}
                  className="flex size-6 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-black/5 hover:text-destructive"
                  title={removeLabel}
                  aria-label={removeLabel}
                >
                  <X size={15} aria-hidden="true" />
                </button>
              ) : null}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export { DropZone };
