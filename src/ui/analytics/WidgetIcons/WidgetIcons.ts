import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Award,
  Ban,
  CalendarDays,
  CarFront,
  ChartColumn,
  CircleCheck,
  CircleX,
  Clock3,
  Flag,
  Frown,
  Gauge,
  Headphones,
  Hourglass,
  Info,
  MapPin,
  Meh,
  MessageCircle,
  MessageSquareText,
  Percent,
  Phone,
  PhoneIncoming,
  PhoneMissed,
  PhoneOutgoing,
  Repeat,
  ShieldAlert,
  ShieldCheck,
  Smile,
  Star,
  Target,
  ThumbsDown,
  ThumbsUp,
  Timer,
  TrendingDown,
  TrendingUp,
  TriangleAlert,
  UserCheck,
  Users,
  Wallet,
  Zap,
} from "lucide-react";

/*
 * The icons a stored analytics widget may name — the `icon` of an icon KPI
 * tile, say. A widget stores the name (lucide's kebab-case, as on lucide.dev),
 * not a component, so the admin that saves it and the app that draws it must
 * resolve names the same way: this is that one map.
 *
 * Separate from brand `Icons` on purpose. Those are Figma glyphs for app
 * chrome, picked by component name; these are plain lucide icons, picked by
 * an admin per widget. Nothing here shares a name with that set.
 *
 * Names are persisted, so a released name is never renamed or removed. The
 * server that validates widgets keeps the same list (tevoice-auth-service,
 * models/analytics_primitives.py ICON_OPTIONS): add a name in both.
 */

export const WIDGET_ICON_NAMES = [
  "message-square-text",
  "message-circle",
  "phone",
  "phone-incoming",
  "phone-outgoing",
  "phone-missed",
  "headphones",
  "users",
  "user-check",
  "gauge",
  "smile",
  "meh",
  "frown",
  "thumbs-up",
  "thumbs-down",
  "star",
  "award",
  "target",
  "circle-check",
  "circle-x",
  "triangle-alert",
  "shield-alert",
  "shield-check",
  "ban",
  "clock-3",
  "timer",
  "hourglass",
  "calendar-days",
  "repeat",
  "trending-up",
  "trending-down",
  "activity",
  "chart-column",
  "percent",
  "zap",
  "flag",
  "car-front",
  "map-pin",
  "wallet",
  "info",
] as const;

export type WidgetIconName = (typeof WIDGET_ICON_NAMES)[number];

/** Every widget icon, by its stored name. */
export const WidgetIcons: Record<WidgetIconName, LucideIcon> = {
  "message-square-text": MessageSquareText,
  "message-circle": MessageCircle,
  phone: Phone,
  "phone-incoming": PhoneIncoming,
  "phone-outgoing": PhoneOutgoing,
  "phone-missed": PhoneMissed,
  headphones: Headphones,
  users: Users,
  "user-check": UserCheck,
  gauge: Gauge,
  smile: Smile,
  meh: Meh,
  frown: Frown,
  "thumbs-up": ThumbsUp,
  "thumbs-down": ThumbsDown,
  star: Star,
  award: Award,
  target: Target,
  "circle-check": CircleCheck,
  "circle-x": CircleX,
  "triangle-alert": TriangleAlert,
  "shield-alert": ShieldAlert,
  "shield-check": ShieldCheck,
  ban: Ban,
  "clock-3": Clock3,
  timer: Timer,
  hourglass: Hourglass,
  "calendar-days": CalendarDays,
  repeat: Repeat,
  "trending-up": TrendingUp,
  "trending-down": TrendingDown,
  activity: Activity,
  "chart-column": ChartColumn,
  percent: Percent,
  zap: Zap,
  flag: Flag,
  "car-front": CarFront,
  "map-pin": MapPin,
  wallet: Wallet,
  info: Info,
};

export function isWidgetIconName(value: unknown): value is WidgetIconName {
  return typeof value === "string" && Object.prototype.hasOwnProperty.call(WidgetIcons, value);
}

/** The icon for a stored name, or undefined for an unknown one. */
export function getWidgetIcon(name: unknown): LucideIcon | undefined {
  return isWidgetIconName(name) ? WidgetIcons[name] : undefined;
}
