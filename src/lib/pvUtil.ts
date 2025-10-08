/** DO NOT MODIFY — Critical hero/animation module. Any change must be explicitly requested. */

import { getUsageDefaults } from './tariffModel';

/**
 * Estimates daily load range based on provided usage or defaults
 */
export function estimateLoadRange(
  kWh?: number, 
  propertyType: "res" | "business" = "res"
): [number, number] {
  if (kWh) {
    // ±15% band around provided usage
    const lo = Math.max(1, kWh * 0.85);
    const hi = kWh * 1.15;
    return [lo, hi];
  }
  
  // Use defaults from settings
  const defaults = getUsageDefaults(propertyType);
  return [defaults.lo, defaults.hi];
}

/**
 * Returns PV yield per kW per day for Victoria
 */
export function pvYieldPerkW(perDay: boolean = true): number {
  // 4.0 kWh/kW/day for VIC
  return perDay ? 4.0 : 4.0 * 365; // Annual if perDay = false
}

/**
 * Estimates self-consumption share based on battery presence and size
 */
export function estimateSelfUseShare(hasBattery: boolean, battKWh: number = 0): number {
  if (!hasBattery) {
    return 0.50; // 50% self-consumption without battery
  }
  
  // With battery: 60% base + up to 25% additional based on battery size
  const batteryBonus = Math.min(0.3, (battKWh / 10) * 0.25);
  const selfUse = 0.6 + batteryBonus;
  
  return Math.min(0.85, selfUse); // Cap at 85%
}

/**
 * Applies export capacity limits to exported energy
 */
export function applyExportCap(
  exportKWhDay: number, 
  inverterKW: number, 
  phase: "1p" | "3p" | "unknown"
): number {
  const exportCap = phase === "3p" ? 15 : 5; // kW export limit
  
  if (inverterKW <= exportCap) {
    return exportKWhDay; // No capping needed
  }
  
  // Proportionally cap export based on inverter size vs export limit
  const capRatio = exportCap / inverterKW;
  return exportKWhDay * capRatio;
}

/**
 * Calculates daily PV generation
 */
export function calculateDailyPVGeneration(pvKW: number): number {
  return pvKW * pvYieldPerkW();
}

/**
 * Calculates daily energy flows
 */
export function calculateEnergyFlows(
  pvKW: number,
  dailyUsage: number,
  hasBattery: boolean = false,
  battKWh: number = 0,
  phase: "1p" | "3p" | "unknown" = "1p"
) {
  const pvGeneration = calculateDailyPVGeneration(pvKW);
  const selfUseShare = estimateSelfUseShare(hasBattery, battKWh);
  
  // Energy flows
  const selfConsumption = Math.min(pvGeneration, dailyUsage * selfUseShare);
  const gridConsumption = Math.max(0, dailyUsage - selfConsumption);
  const exportEnergy = Math.max(0, pvGeneration - selfConsumption);
  
  // Apply export cap
  const cappedExport = applyExportCap(exportEnergy, pvKW, phase);
  const lostExport = exportEnergy - cappedExport;
  
  return {
    pvGeneration,
    selfConsumption,
    gridConsumption,
    exportEnergy: cappedExport,
    lostExport,
    selfUseShare,
  };
}

/**
 * Estimates battery backup capacity in hours
 */
export function estimateBackupHours(
  battKWh: number,
  dailyUsage: number,
  rtes: number = 0.93
): number {
  if (battKWh === 0) return 0;
  
  // Assume 80% depth of discharge for backup
  const usableEnergy = battKWh * 0.8 * rtes;
  const hourlyUsage = dailyUsage / 24;
  
  return usableEnergy / hourlyUsage;
}
