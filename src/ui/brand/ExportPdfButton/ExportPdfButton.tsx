import { FileDown } from "lucide-react";

import { Button } from "../../primitives/Button/Button.js";
import { cn } from "../../../utils.js";
import type { ExportPdfButtonProps } from "./ExportPdfButton.types.js";

/**
 * The green pill that triggers a PDF export, styled after the Alerts page.
 * Callers own the export itself and pass it in as `onClick`; this component is
 * only the trigger's look and its icon.
 */
function ExportPdfButton({ label, className, ...props }: ExportPdfButtonProps) {
  return (
    <Button
      type="button"
      data-brand="export-pdf-button"
      className={cn(
        "h-8 shrink-0 rounded-full bg-brand-green px-5 text-[10px] font-semibold",
        "text-brand-green-foreground hover:bg-brand-green/90",
        className,
      )}
      {...props}
    >
      {label}
      <FileDown size={14} aria-hidden="true" />
    </Button>
  );
}

export { ExportPdfButton };
