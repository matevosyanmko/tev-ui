export interface LangOption {
  value: string;
  /** Short display code, e.g. "ENG". */
  label: string;
}

export interface LangPickerProps {
  value: string;
  options: LangOption[];
  onChange: (value: string) => void;
  /** Accessible name for the trigger. */
  label?: string;
  /** Classes for the trigger pill. */
  className?: string;
  /** Classes for the dropdown panel. */
  contentClassName?: string;
}
