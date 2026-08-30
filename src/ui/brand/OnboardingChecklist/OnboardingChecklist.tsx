import { Check } from "lucide-react";

import { cn } from "../../../utils.js";
import type { OnboardingChecklistProps } from "./OnboardingChecklist.types.js";

/**
 * The "let's get started" panel, pinned to the bottom-right corner: a progress
 * bar over a connected list of tasks, with the completed ones ticked.
 *
 * Independent of <ProductTour> on purpose — the two are different onboarding
 * surfaces and an app may show either, both, or neither.
 */
function OnboardingChecklist({
  tasks,
  completed,
  onNext,
  onFinish,
  onSkip,
  labels,
  className,
}: OnboardingChecklistProps) {
  const total = tasks.length;
  const done = Math.min(Math.max(0, completed), total);
  const isLast = done >= total - 1;

  return (
    <div
      data-slot="onboarding-checklist"
      className={cn(
        "fixed right-4 bottom-4 z-[130] flex w-[330px] max-w-[calc(100vw-32px)]",
        "max-h-[calc(100dvh-32px)] flex-col overflow-hidden rounded-[24px]",
        "border-2 border-brand-purple bg-brand-surface-2 text-white shadow-2xl",
        className,
      )}
    >
      <div className="shrink-0 px-5 pt-5">
        <h3 className="text-[22px] font-extrabold lowercase tracking-tight">
          {labels?.heading ?? "Let's get started"}
        </h3>
        <div className="mt-3 flex items-center gap-2">
          <span className="text-[12px] font-bold">
            {done}/{total}
          </span>
          <div
            role="progressbar"
            aria-valuenow={done}
            aria-valuemin={0}
            aria-valuemax={total}
            className="h-3 flex-1 overflow-hidden rounded-full bg-white"
          >
            <div
              className="h-full rounded-full bg-[image:var(--brand-gradient-progress)] transition-all"
              style={{ width: total ? `${(done / total) * 100}%` : "0%" }}
            />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4">
        <ol className="relative space-y-4">
          {tasks.map((task, index) => {
            const isDone = index < done;
            const isLastTask = index === total - 1;
            return (
              <li key={index} className="relative flex gap-3">
                {/* The connector between markers. Not drawn after the last
                    one, where it would run off the end of the list. */}
                {!isLastTask ? (
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute top-8 left-[15px] h-[calc(100%+2px)] w-[2px]",
                      isDone ? "bg-brand-green" : "bg-white/20",
                    )}
                  />
                ) : null}
                <span
                  className={cn(
                    "z-[1] flex size-8 shrink-0 items-center justify-center rounded-full border-2 text-[12px] font-bold",
                    isDone
                      ? "border-brand-green bg-brand-green text-brand-green-foreground"
                      : "border-brand-purple text-white",
                  )}
                >
                  {isDone ? <Check size={15} strokeWidth={3} aria-hidden="true" /> : index + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <span className="inline-block rounded-full bg-brand-green px-3 py-1 text-[12px] font-bold text-brand-green-foreground">
                    {task.title}
                  </span>
                  {task.description ? (
                    <span className="mt-1 block text-[11px] leading-5 text-white/65">
                      {task.description}
                    </span>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="shrink-0 space-y-2 p-4">
        <button
          type="button"
          onClick={isLast ? onFinish : onNext}
          className="h-11 w-full rounded-xl bg-[image:var(--brand-gradient-progress)] text-[14px] font-bold text-white transition-opacity hover:opacity-95"
        >
          {isLast ? (labels?.finish ?? "Finish") : (labels?.next ?? "Next")}
        </button>
        {onSkip ? (
          <button
            type="button"
            onClick={onSkip}
            className="block w-full text-center text-[11px] font-medium text-white/45 underline-offset-2 hover:underline"
          >
            {labels?.skip ?? "Skip"}
          </button>
        ) : null}
      </div>
    </div>
  );
}

export { OnboardingChecklist };
