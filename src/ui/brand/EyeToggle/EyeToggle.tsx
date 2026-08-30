import { cn } from "../../../utils.js";
import type { EyeToggleProps } from "./EyeToggle.types.js";

// The three glyphs, inlined rather than imported as .svg files: a published
// package cannot rely on the consumer's bundler having an SVG loader, and
// `currentColor` lets one copy of each path serve both the dark rest state and
// the white on-purple states.

function EyeRestGlyph() {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className="size-8">
      <path
        d="M16 18.25C17.2426 18.25 18.25 17.2426 18.25 16C18.25 14.7574 17.2426 13.75 16 13.75C14.7574 13.75 13.75 14.7574 13.75 16C13.75 17.2426 14.7574 18.25 16 18.25Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.75 16C13.25 24 18.75 24 24.25 16C18.75 8 13.25 8 7.75 16Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function EyeHalfOpenGlyph() {
  return (
    <svg viewBox="0 0 17 16" fill="none" aria-hidden="true" className="size-4">
      <path
        d="M8.50018 8.56018C9.70516 8.56018 10.682 9.87789 10.682 8.48463C10.682 7.09137 9.70516 5.96191 8.50018 5.96191C7.29519 5.96191 6.31836 7.09137 6.31836 8.48463C6.31836 9.87789 7.29519 8.56018 8.50018 8.56018Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M0.5 8.48465C6.07576 12.7167 10.4394 13.6058 16.5 8.48465C13.8333 5.12118 10.4394 3.99997 8.01515 4C5.34848 4 3.16667 5.68181 0.5 8.48465Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function EyeClosedGlyph() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="size-4">
      <path
        d="M1.31494 5.4375C5.83629 9.98061 10.149 10.0349 14.6703 5.49177"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.54429 7.54855C3.73688 7.33466 3.72888 7.02397 3.52642 6.85461C3.32397 6.68525 3.00373 6.72135 2.81115 6.93525L3.17772 7.2419L3.54429 7.54855ZM0.496588 9.50591C0.304004 9.71981 0.312005 10.0305 0.514458 10.1999C0.716911 10.3692 1.03715 10.3331 1.22974 10.1192L0.863162 9.81256L0.496588 9.50591ZM3.17772 7.2419L2.81115 6.93525L0.496588 9.50591L0.863162 9.81256L1.22974 10.1192L3.54429 7.54855L3.17772 7.2419Z"
        fill="currentColor"
      />
      <path
        d="M12.6998 7.48878C12.5389 7.25242 12.5936 6.95035 12.8221 6.81409C13.0505 6.67782 13.3661 6.75896 13.527 6.99531L13.1134 7.24205L12.6998 7.48878ZM15.2772 9.56598C15.4381 9.80234 15.3834 10.1044 15.1549 10.2407C14.9265 10.3769 14.6109 10.2958 14.45 10.0594L14.8636 9.81271L15.2772 9.56598ZM13.1134 7.24205L13.527 6.99531L15.2772 9.56598L14.8636 9.81271L14.45 10.0594L12.6998 7.48878L13.1134 7.24205Z"
        fill="currentColor"
      />
      <path
        d="M8.91202 9.00697C8.91203 8.77647 8.65827 8.55938 8.34524 8.52209C8.03221 8.48481 7.77845 8.64145 7.77845 8.87195L8.34524 8.93946L8.91202 9.00697ZM7.77841 11.4949C7.77841 11.7254 8.03217 11.9425 8.3452 11.9798C8.65822 12.0171 8.91199 11.8605 8.91199 11.6299L8.3452 11.5624L7.77841 11.4949ZM8.34524 8.93946L7.77845 8.87195L7.77841 11.4949L8.3452 11.5624L8.91199 11.6299L8.91202 9.00697L8.34524 8.93946Z"
        fill="currentColor"
      />
    </svg>
  );
}

/**
 * The password-reveal eye, following the Figma flow:
 *
 *   rest (hidden)     dark open eye, no background
 *   hover (hidden)    white half-open glyph on Hover Purple
 *   clicked (visible) white closed glyph on Main Purple, Hover Purple on hover
 *
 * The rest → hover glyph swap is CSS-only (`group-hover`) rather than state:
 * a React hover state would re-render the whole field on every pointer move,
 * and would stick if the pointer left during a re-render.
 */
function EyeToggle({ visible, onToggle, labels, className, ...props }: EyeToggleProps) {
  return (
    <button
      type="button"
      data-slot="eye-toggle"
      data-visible={visible || undefined}
      aria-label={visible ? (labels?.hide ?? "Hide password") : (labels?.show ?? "Show password")}
      aria-pressed={visible}
      onClick={onToggle}
      className={cn(
        "group flex size-8 items-center justify-center rounded-[8px] transition-colors",
        "text-brand-surface-1 hover:bg-brand-purple-hover hover:text-white",
        visible && "bg-brand-purple text-white",
        className,
      )}
      {...props}
    >
      {visible ? (
        <EyeClosedGlyph />
      ) : (
        <>
          <span className="group-hover:hidden">
            <EyeRestGlyph />
          </span>
          <span className="hidden group-hover:block">
            <EyeHalfOpenGlyph />
          </span>
        </>
      )}
    </button>
  );
}

export { EyeToggle };
