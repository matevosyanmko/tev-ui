import { GradientButton } from "../GradientButton/GradientButton.js";
import { cn } from "../../../utils.js";
import type { WelcomeDialogProps } from "./WelcomeDialog.types.js";

/**
 * The first screen of onboarding: a full-screen dim behind a large welcome
 * card with the brand CTA.
 *
 * `logo` is a node rather than a `src`, so the package ships no image asset and
 * a consumer can pass an <img>, an inline SVG, or nothing at all.
 *
 * Deliberately not built on <Dialog>: it has no dismiss affordance of its own
 * (skipping is an explicit choice, not an escape), and the Radix focus trap
 * would fight the tour that follows it.
 */
function WelcomeDialog({
  title,
  description,
  logo,
  onStart,
  onSkip,
  labels,
  className,
}: WelcomeDialogProps) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      data-slot="welcome-dialog"
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black/65 p-4 backdrop-blur-sm"
    >
      <div
        className={cn(
          "w-[696px] max-w-full shrink-0 rounded-[24px] bg-card px-16 py-14 text-center",
          className,
        )}
      >
        {logo ? <div className="mx-auto mb-7 w-[196px]">{logo}</div> : null}

        <h2 className="text-[80px] leading-[84px] font-extrabold tracking-tight text-card-foreground">
          {title}
        </h2>

        {description ? (
          <p className="mx-auto mt-1 mb-8 text-[20px] text-muted-foreground">{description}</p>
        ) : null}

        <GradientButton onClick={onStart}>{labels?.start ?? "Start"}</GradientButton>

        {onSkip ? (
          <button
            type="button"
            onClick={onSkip}
            className="mt-7 text-[16px] text-muted-foreground underline"
          >
            {labels?.skip ?? "Skip"}
          </button>
        ) : null}
      </div>
    </div>
  );
}

export { WelcomeDialog };
