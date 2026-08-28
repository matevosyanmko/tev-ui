import type * as React from "react";
import type { DayPicker } from "react-day-picker";

import type { Button } from "../Button/Button.js";

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  /** Button variant used for the month navigation arrows. */
  buttonVariant?: React.ComponentProps<typeof Button>["variant"];
};
