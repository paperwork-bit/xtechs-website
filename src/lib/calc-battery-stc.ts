export type BatteryStcInput = {
  usableKwh: number; // user input
  installYear: number; // defaults to current year in the UI
  stcPrice?: number; // optional override; default from config
};

export type BatteryStcOutput = {
  eligibleKwh: number;
  factor: number;
  stcCount: number; // floored
  rebateAud: number; // stcCount * price
  warnings: string[]; // e.g., “no factor for this year”
};

import { REBATE_CONFIG } from "@/lib/rebate-config";

export function calcFederalBatteryStc(input: BatteryStcInput): BatteryStcOutput {
  const cfg = REBATE_CONFIG;
  const price = input.stcPrice ?? cfg.stc.defaultBatteryPrice;
  const minK = cfg.batteryStc.minEligibleKwh;
  const maxK = cfg.batteryStc.maxEligibleKwh;

  const eligibleKwh = Math.max(minK, Math.min(maxK, input.usableKwh));
  const factor = cfg.batteryStc.factorByYear[input.installYear] ?? 0;
  const rawStc = eligibleKwh * factor;
  const stcCount = Math.max(0, Math.floor(rawStc));
  const rebateAud = stcCount * price;

  const warnings: string[] = [];
  if (!cfg.batteryStc.factorByYear[input.installYear]) {
    warnings.push(`No battery STC factor configured for ${input.installYear}.`);
  }
  if (input.usableKwh < minK) {
    warnings.push(`Battery must be at least ${minK} kWh usable to be eligible.`);
  }

  return { eligibleKwh, factor, stcCount, rebateAud, warnings };
}


