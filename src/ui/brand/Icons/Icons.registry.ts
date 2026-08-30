import type { BrandIcon } from "./Icons.types.js";
import {
  DateIcon,
  ChannelIcon,
  StatementIcon,
  DirectionIcon,
  AgentIcon,
  AnalyticsIcon,
  InteractionSearchIcon,
  IntegrationIcon,
  HomeIcon,
  NotificationBellIcon,
  SettingsIcon,
  AlertsIcon,
  TeamQualityIcon,
  AuditIcon,
  KpiIcon,
} from "./Icons.js";

/**
 * Every brand glyph, by name.
 *
 * Kept out of Icons.tsx so that file only exports components — the same React
 * Fast Refresh rule that puts cva maps in a `.variants.ts`. It exists for
 * config-driven call sites (a nav entry that stores `icon: "HomeIcon"` rather
 * than a component reference); import the named component directly everywhere
 * else, so the rest of the set stays tree-shakeable.
 */
export const Icons: Record<string, BrandIcon> = {
  DateIcon,
  ChannelIcon,
  StatementIcon,
  DirectionIcon,
  AgentIcon,
  AnalyticsIcon,
  InteractionSearchIcon,
  IntegrationIcon,
  HomeIcon,
  NotificationBellIcon,
  SettingsIcon,
  AlertsIcon,
  TeamQualityIcon,
  AuditIcon,
  KpiIcon,
};
