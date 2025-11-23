// STC Configuration for Solar Advantage Calculator

export const ZONE_FACTORS: Record<1|2|3|4, number> = {
  1: 1.622, // Northern Victoria (highest solar irradiance)
  2: 1.536, // Central Victoria
  3: 1.382, // Southern Victoria
  4: 1.185, // Alpine and remote areas (lowest solar irradiance)
} as const;

export const DEEMING_YEARS = 6; // Current deeming period (decreases each year until 2030)

export const STC_PRICE = 38; // Price per STC in AUD

export const MODULE_OPTIONS = [
  { value: 415, label: "415 W" },
  { value: 440, label: "440 W" },
  { value: 475, label: "475 W" },
] as const;

export const AUDIENCE_OPTIONS = [
  { value: "residential", label: "Residential" },
  { value: "business", label: "Business" },
  { value: "builder", label: "Builders" },
] as const;

export const SOLAR_VICTORIA_ELIGIBILITY = [
  { id: "homeowner", label: "I am the homeowner" },
  { id: "income", label: "Annual income under $210,000" },
  { id: "property", label: "Property value under $3 million" },
  { id: "existing", label: "No solar installed in the last 10 years" },
] as const;

export type ZoneFactor = keyof typeof ZONE_FACTORS;
export type AudienceType = typeof AUDIENCE_OPTIONS[number]["value"];
