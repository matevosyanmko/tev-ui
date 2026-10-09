// The icon chip's colour pairs. Its own module because it exports a value,
// not a component. Brand-token pairs only; coral is the brand's status accent,
// kept for the tile that reports risk.
export const KPI_TILE_TONES = {
  purple: "bg-brand-lavender-soft text-brand-purple",
  green: "bg-brand-green text-brand-green-foreground",
  dark: "bg-black text-brand-green",
  coral: "bg-brand-coral text-black",
} as const;

export type KpiTileTone = keyof typeof KPI_TILE_TONES;
