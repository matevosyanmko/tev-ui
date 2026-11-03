import * as React from "react";
import { type VariantProps } from "class-variance-authority";

import { cn } from "../../../utils.js";
import { fieldBoxClassName, inputVariants } from "./Input.variants.js";

export interface InputProps
  extends React.ComponentProps<"input">, VariantProps<typeof inputVariants> {}

/**
 * A text input. `variant="field"` is TevScribe's 64px field (New meeting's
 * link field, 100:41869); put a control that is not a text input in the
 * matching `FieldBox`.
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, type, variant = "default", ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      type={type}
      data-slot="input"
      data-variant={variant === "field" ? "field" : undefined}
      className={cn(inputVariants({ variant }), className)}
      {...props}
    />
  );
});

Input.displayName = "Input";

/**
 * The field's box without the input: the New meeting language rows, a
 * translate glyph and a language pill inside the same white 64px box as the
 * link field. A flex row, 8px apart, 16px in; lay it out further with
 * `className` (the summary language row puts its hint on the right).
 */
function FieldBox({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="field-box" className={cn(fieldBoxClassName, className)} {...props} />;
}

export { FieldBox, Input };
