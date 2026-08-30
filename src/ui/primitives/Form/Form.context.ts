import * as React from "react";
import { useFormContext, useFormState } from "react-hook-form";

// The contexts and the hook live here rather than in form.jsx so that file only
// exports components — a prerequisite for React Fast Refresh to hot-swap the
// form primitives instead of remounting (and clearing) the form.
// Both contexts are only ever read from inside their matching provider, so the
// empty default is a placeholder rather than a real value — cast it so callers
// see the shape the providers actually supply.
export const FormFieldContext = React.createContext<{ name: string }>({} as { name: string });
export const FormItemContext = React.createContext<{ id: string }>({} as { id: string });

export const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState } = useFormContext();
  const formState = useFormState({ name: fieldContext.name });
  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};
