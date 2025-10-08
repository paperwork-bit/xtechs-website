/** DO NOT MODIFY — Critical hero/animation module. Any change must be explicitly requested. */

import { calculateEnergyFlows } from './pvUtil';
import { vicDefaults, fitByRetailer } from './tariffModel';

export interface ROIInputs {
  pvKW: number;
  battKWh: number;
  inverterKW: number;
  userDailyKWh?: number;
  phase: "1p" | "3p" | "unknown";
  tariff?: {
    flatKwh: number;
    dailySupply: number;
    fitKwh: number;
  };
  rtes?: number;
  upfrontCost: number;
  years?: number;
  degrPV?: number;
  degrBatt?: number;
  energyRetailer?: string;
}

export interface AnnualSavings {
  annual: number;
  gridAvoided: number;
  exportCapped: number;
  breakdown: {
    gridSavings: number;
    exportRevenue: number;
    dailySupplySavings: number;
  };
}

/**
 * Calculates annual savings from solar and battery system
 */
export function annualSavings(inputs: ROIInputs): AnnualSavings {
  const {
    pvKW,
    battKWh,
    userDailyKWh = 18, // Default usage
    phase,
    tariff = vicDefaults(),
    rtes = 0.93,
    energyRetailer,
  } = inputs;
  
  // Get retailer-specific FiT
  const fitKwh = fitByRetailer(energyRetailer);
  
  // Calculate daily energy flows
  const flows = calculateEnergyFlows(pvKW, userDailyKWh, battKWh > 0, battKWh, phase);
  
  // Daily savings breakdown
  const gridSavings = flows.gridConsumption * tariff.flatKwh;
  const exportRevenue = flows.exportEnergy * fitKwh;
  const dailySupplySavings = tariff.dailySupply; // Fixed daily charge savings
  
  const dailyTotal = gridSavings + exportRevenue + dailySupplySavings;
  const annual = dailyTotal * 365;
  
  return {
    annual,
    gridAvoided: flows.gridConsumption * 365,
    exportCapped: flows.exportEnergy * 365,
    breakdown: {
      gridSavings: gridSavings * 365,
      exportRevenue: exportRevenue * 365,
      dailySupplySavings: dailySupplySavings * 365,
    },
  };
}

/**
 * Calculates payback period in years
 */
export function paybackYears(inputs: ROIInputs): number {
  const savings = annualSavings(inputs);
  const { upfrontCost, years = 15 } = inputs;
  
  if (savings.annual <= 0) return Infinity;
  
  // Simple payback calculation
  return upfrontCost / savings.annual;
}

/**
 * Calculates Net Present Value
 */
export function npv(inputs: ROIInputs, discount: number = 0.05): number {
  const { upfrontCost, years = 15, degrPV = 0.005, degrBatt = 0.02 } = inputs;
  const baseSavings = annualSavings(inputs);
  
  let npv = -upfrontCost; // Initial investment
  
  for (let year = 1; year <= years; year++) {
    // Apply degradation
    const pvDegradation = Math.pow(1 - degrPV, year - 1);
    const battDegradation = Math.pow(1 - degrBatt, year - 1);
    
    // Assume battery degradation affects export revenue more than grid savings
    const yearSavings = (baseSavings.breakdown.gridSavings * pvDegradation) +
                       (baseSavings.breakdown.exportRevenue * pvDegradation * battDegradation) +
                       baseSavings.breakdown.dailySupplySavings;
    
    const discountFactor = Math.pow(1 + discount, year);
    npv += yearSavings / discountFactor;
  }
  
  return npv;
}

/**
 * Calculates internal rate of return (IRR) approximation
 */
export function irr(inputs: ROIInputs): number {
  const { upfrontCost, years = 15 } = inputs;
  const baseSavings = annualSavings(inputs);
  
  if (baseSavings.annual <= 0) return 0;
  
  // Simple IRR approximation: annual return / initial investment
  return (baseSavings.annual / upfrontCost) * 100;
}

/**
 * Calculates levelized cost of energy (LCOE)
 */
export function lcoe(inputs: ROIInputs): number {
  const { upfrontCost, years = 15, pvKW, degrPV = 0.005 } = inputs;
  const baseSavings = annualSavings(inputs);
  
  let totalGeneration = 0;
  let totalCost = upfrontCost;
  
  for (let year = 1; year <= years; year++) {
    const degradation = Math.pow(1 - degrPV, year - 1);
    const annualGeneration = pvKW * 4.0 * 365 * degradation; // 4 kWh/kW/day
    totalGeneration += annualGeneration;
  }
  
  return totalCost / totalGeneration;
}

/**
 * Normalizes ROI score for ranking (0-1 scale)
 */
export function normalizeROIScore(inputs: ROIInputs): number {
  const payback = paybackYears(inputs);
  const npvVal = npv(inputs);
  
  // Use payback-based normalization (inverse relationship)
  const paybackScore = Math.max(0, Math.min(1, 1 / (1 + payback / 12)));
  
  // Use NPV-based normalization (positive NPV = good)
  const npvScore = Math.max(0, Math.min(1, npvVal / (inputs.upfrontCost || 1)));
  
  // Weighted combination (70% payback, 30% NPV)
  return paybackScore * 0.7 + npvScore * 0.3;
}

/**
 * Calculates confidence score based on input completeness
 */
export function calculateConfidence(inputs: ROIInputs): number {
  let confidence = 0.5; // Base confidence
  
  // Increase confidence for provided inputs
  if (inputs.userDailyKWh) confidence += 0.2;
  if (inputs.energyRetailer) confidence += 0.1;
  if (inputs.phase !== "unknown") confidence += 0.1;
  if (inputs.tariff) confidence += 0.1;
  
  // Ensure minimum confidence
  return Math.max(0.35, Math.min(1.0, confidence));
}
