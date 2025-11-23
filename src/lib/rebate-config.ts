export type Audience = "Residential" | "Business";

export const rebateConfig = {
  stc: {
    endYear: 2030,
    defaultPrice: 37, // A$ per STC (PV)
    defaultBatteryPrice: 37, // A$ per STC (Battery)
    zoneMultipliers: {
      1: 1.622,
      2: 1.536,
      3: 1.382,
      4: 1.185,
    } as Record<1|2|3|4, number>,
  },
  victoria: {
    enabled: true,
    pvRebateMaxAud: 1400, // A$
    pvLoanMaxAud: 0, // not shown/used now
    battery: {
      enabled: false,
      rebateMaxAud: 0,
      minKwh: 0,
    },
    eligibilityNotes:
      "Estimates only. Eligibility, caps and program status may change.",
    lastUpdated: "2025-06-01",
  },
  batteryStc: {
    minEligibleKwh: 5,
    maxEligibleKwh: 50,
    factorByYear: {
      2025: 9.3,
      2026: 8.3,
      2027: 7.4,
      2028: 6.5,
      2029: 5.6,
      2030: 4.7,
    } as Record<number, number>,
  },
  labels: {
    disclaimerBattery:
      "Estimates only. Eligibility, caps, and STC market price may change.",
  },
} as const;

export function currencyAud(amount: number): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount);
}

export function isConfigStale(cfgDate: string): boolean {
  const updated = new Date(cfgDate);
  const now = new Date();
  const diffDays = (now.getTime() - updated.getTime()) / (1000 * 60 * 60 * 24);
  return diffDays > 180;
}

// Alias export for callers that expect REBATE_CONFIG naming convention
export const REBATE_CONFIG = rebateConfig;


