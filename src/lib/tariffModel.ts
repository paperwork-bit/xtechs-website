/** DO NOT MODIFY — Critical hero/animation module. Any change must be explicitly requested. */

import VICSettings from '@/config/regionProfiles/VIC-2025H2.settings.json';

export interface TariffDefaults {
  flatKwh: number;
  dailySupply: number;
  fitKwh: number;
}

export interface ExportCap {
  inverterKW: number;
  exportKW: number;
}

/**
 * Returns VIC tariff defaults from settings
 */
export function vicDefaults(): TariffDefaults {
  return {
    flatKwh: VICSettings.vdoAnchors.flatKwh_mid,
    dailySupply: VICSettings.vdoAnchors.dailySupply,
    fitKwh: VICSettings.fitRange.mid,
  };
}

/**
 * Returns export capacity limits by phase
 */
export function exportCapKW(phase: "1p" | "3p" | "unknown"): number {
  if (phase === "3p") {
    return VICSettings.exportCaps["3p"].exportKW;
  }
  // Default to single-phase limit for 1p and unknown
  return VICSettings.exportCaps["1p"].exportKW;
}

/**
 * Returns export capacity configuration by phase
 */
export function getExportCap(phase: "1p" | "3p" | "unknown"): ExportCap {
  if (phase === "3p") {
    return VICSettings.exportCaps["3p"];
  }
  return VICSettings.exportCaps["1p"];
}

/**
 * Returns FiT rate by retailer (with admin override support)
 * Currently returns mid FiT for all retailers
 */
export function fitByRetailer(retailerName?: string): number {
  // TODO: Add admin override support for specific retailers
  // For now, return mid FiT for all retailers
  return VICSettings.fitRange.mid;
}

/**
 * Returns usage defaults by property type
 */
export function getUsageDefaults(propertyType: "res" | "business" = "res") {
  if (propertyType === "business") {
    // Business defaults (can be extended later)
    return {
      lo: 25,
      mid: 35,
      hi: 50,
    };
  }
  
  return {
    lo: VICSettings.usageDefaults.res_kWh_day_lo,
    mid: VICSettings.usageDefaults.res_kWh_day_mid,
    hi: VICSettings.usageDefaults.res_kWh_day_hi,
  };
}

/**
 * Returns battery round-trip efficiency defaults
 */
export function getBatteryDefaults() {
  return {
    rtes: VICSettings.battery.rtes_mid,
    range: VICSettings.battery.rtes_range,
  };
}

/**
 * Returns retailer list for dropdown
 */
export function getRetailerList(): string[] {
  return VICSettings.retailerListVIC;
}
