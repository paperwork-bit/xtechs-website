/** DO NOT MODIFY — Critical hero/animation module. Any change must be explicitly requested. */

import { CatalogItem, Top3Recommendation, RecommendationScore } from '../catalog/types';
import { ROIInputs, annualSavings, paybackYears, npv, normalizeROIScore, calculateConfidence } from '@/lib/roi';
import { vicDefaults, exportCapKW, getRetailerList } from '@/lib/tariffModel';
import { estimateLoadRange } from '@/lib/pvUtil';

export interface IntakeData {
  postcode: string;
  propertyType: "res" | "business";
  phase?: "1p" | "3p" | "unknown";
  dailyKWh?: number;
  lastBill?: number;
  outageSensitivity?: "low" | "med" | "high";
  budgetBand?: "low" | "mid" | "high";
  brandPreference?: string;
  energyRetailer?: string;
}

export interface Top3Inputs extends IntakeData {
  catalog: CatalogItem[];
}

/**
 * Generates top 3 diversified recommendations
 */
export function generateTop3(inputs: Top3Inputs): Top3Recommendation[] {
  const { catalog, ...intakeData } = inputs;
  
  // Filter available items
  const availableItems = catalog.filter(item => !item.doNotSell);
  
  // Generate candidates for each tier
  const valueCandidates = generateCandidates(availableItems, "value", intakeData);
  const balancedCandidates = generateCandidates(availableItems, "balanced", intakeData);
  const premiumCandidates = generateCandidates(availableItems, "premium", intakeData);
  
  // Score and rank candidates
  const scoredValue = valueCandidates.map(config => ({
    config,
    score: calculateScore(config, intakeData, "value"),
  }));
  
  const scoredBalanced = balancedCandidates.map(config => ({
    config,
    score: calculateScore(config, intakeData, "balanced"),
  }));
  
  const scoredPremium = premiumCandidates.map(config => ({
    config,
    score: calculateScore(config, intakeData, "premium"),
  }));
  
  // Select best from each tier with diversity rules
  const recommendations: Top3Recommendation[] = [];
  
  // Brand-led (respect brand preference)
  const brandLed = selectBrandLed(scoredValue, scoredBalanced, scoredPremium, intakeData.brandPreference);
  if (brandLed) recommendations.push(brandLed);
  
  // Value (reliable, cost-effective)
  const value = selectValue(scoredValue, scoredBalanced, recommendations);
  if (value) recommendations.push(value);
  
  // Performance/Backup (maximize resilience)
  const performance = selectPerformance(scoredPremium, scoredBalanced, recommendations);
  if (performance) recommendations.push(performance);
  
  return recommendations.slice(0, 3);
}

/**
 * Generates system configurations for a given tier
 */
function generateCandidates(
  catalog: CatalogItem[],
  tier: "value" | "balanced" | "premium",
  intakeData: IntakeData
): any[] {
  const candidates: any[] = [];
  
  // Get items by tier
  const panels = catalog.filter(item => item.type === "pv" && item.tier === tier);
  const inverters = catalog.filter(item => item.type === "inverter" && item.tier === tier);
  const batteries = catalog.filter(item => item.type === "battery" && item.tier === tier);
  const evChargers = catalog.filter(item => item.type === "ev_charger");
  
  // System sizing based on tier and usage
  const [usageLo, usageHi] = estimateLoadRange(intakeData.dailyKWh, intakeData.propertyType);
  const avgUsage = (usageLo + usageHi) / 2;
  
  let systemSize: number;
  let batterySize: number;
  
  switch (tier) {
    case "value":
      systemSize = Math.min(Math.max(avgUsage / 4, 3), 6.6);
      batterySize = 0; // No battery for value tier
      break;
    case "balanced":
      systemSize = Math.min(Math.max(avgUsage / 3.5, 6.6), 10);
      batterySize = Math.min(Math.max(avgUsage / 2, 5), 10);
      break;
    case "premium":
      systemSize = Math.min(Math.max(avgUsage / 3, 10), 15);
      batterySize = Math.min(Math.max(avgUsage / 1.5, 10), 20);
      break;
  }
  
  // Generate combinations
  for (const panel of panels.slice(0, 2)) { // Limit to top 2 panels per tier
    for (const inverter of inverters.slice(0, 2)) {
      // Check phase compatibility
      if (intakeData.phase && intakeData.phase !== "unknown" && 
          inverter.phase && inverter.phase !== intakeData.phase) {
        continue;
      }
      
      // Check inverter sizing
      if (inverter.acKw && inverter.acKw < systemSize * 0.8) {
        continue;
      }
      
      const config: any = {
        panels: [panel],
        inverter,
        systemSize,
        totalCost: 0,
      };
      
      // Add battery for balanced and premium
      if (tier !== "value" && batteries.length > 0) {
        const battery = batteries[0]; // Use first battery for simplicity
        config.battery = battery;
        config.batterySize = batterySize;
      }
      
      // Add EV charger if specified
      if (intakeData.energyRetailer && evChargers.length > 0) {
        const evCharger = evChargers.find(ec => 
          ec.compatibleBrands?.includes(intakeData.energyRetailer || "")
        ) || evChargers[0];
        config.evCharger = evCharger;
      }
      
      // Calculate total cost
      config.totalCost = calculateTotalCost(config);
      candidates.push(config);
    }
  }
  
  return candidates;
}

/**
 * Calculates total system cost
 */
function calculateTotalCost(config: any): number {
  let total = 0;
  
  // Panel cost
  if (config.panels && config.panels.length > 0) {
    const panelCount = Math.round((config.systemSize * 1000) / (config.panels[0].watts || 440));
    total += panelCount * (config.panels[0].priceAud || 0);
  }
  
  // Inverter cost
  if (config.inverter) {
    total += config.inverter.priceAud || 0;
  }
  
  // Battery cost
  if (config.battery && config.batterySize) {
    total += config.batterySize * (config.battery.priceAud || 0);
  }
  
  // EV charger cost
  if (config.evCharger) {
    total += config.evCharger.priceAud || 0;
  }
  
  return total;
}

/**
 * Calculates recommendation score
 */
function calculateScore(
  config: any,
  intakeData: IntakeData,
  tier: "value" | "balanced" | "premium"
): RecommendationScore {
  const roiInputs: ROIInputs = {
    pvKW: config.systemSize,
    battKWh: config.batterySize || 0,
    inverterKW: config.inverter?.acKw || config.systemSize,
    userDailyKWh: intakeData.dailyKWh,
    phase: intakeData.phase || "unknown",
    tariff: vicDefaults(),
    upfrontCost: config.totalCost,
    energyRetailer: intakeData.energyRetailer,
  };
  
  // Calculate ROI score
  const roiScore = normalizeROIScore(roiInputs);
  
  // Performance score (based on system size and battery)
  const performanceScore = Math.min(1, (config.systemSize / 15) + (config.batterySize || 0) / 20);
  
  // Warranty score
  const warrantyScore = Math.min(1, (config.inverter?.warrantyYears || 5) / 25);
  
  // Brand score (preference matching)
  const brandScore = intakeData.brandPreference && 
    config.inverter?.brand === intakeData.brandPreference ? 1 : 0.5;
  
  // Reliability score
  const reliabilityScore = config.inverter?.reliableFlag ? 1 : 0.7;
  
  // Weighted total score
  const weights = getTierWeights(tier);
  const total = (
    roiScore * weights.roi +
    performanceScore * weights.performance +
    warrantyScore * weights.warranty +
    brandScore * weights.brand +
    reliabilityScore * weights.reliability
  );
  
  // Generate reasons
  const reasons = generateReasons(config, roiInputs, tier);
  
  // Calculate confidence
  const confidence = calculateConfidence(roiInputs);
  
  return {
    total,
    breakdown: {
      roi: roiScore,
      performance: performanceScore,
      warranty: warrantyScore,
      brand: brandScore,
      reliability: reliabilityScore,
    },
    confidence,
    reasons,
  };
}

/**
 * Gets scoring weights by tier
 */
function getTierWeights(tier: "value" | "balanced" | "premium") {
  switch (tier) {
    case "value":
      return { roi: 0.5, performance: 0.2, warranty: 0.15, brand: 0.1, reliability: 0.05 };
    case "balanced":
      return { roi: 0.4, performance: 0.3, warranty: 0.15, brand: 0.1, reliability: 0.05 };
    case "premium":
      return { roi: 0.3, performance: 0.4, warranty: 0.15, brand: 0.1, reliability: 0.05 };
  }
}

/**
 * Generates reason bullets for recommendation
 */
function generateReasons(config: any, roiInputs: ROIInputs, tier: string): string[] {
  const reasons: string[] = [];
  const savings = annualSavings(roiInputs);
  const payback = paybackYears(roiInputs);
  
  // ROI reasons
  if (payback < 8) {
    reasons.push(`Fast payback of ${payback.toFixed(1)} years`);
  }
  
  // Performance reasons
  if (config.batterySize > 0) {
    reasons.push(`${config.batterySize}kWh battery provides backup power`);
  }
  
  // Brand reasons
  if (config.inverter?.brand) {
    reasons.push(`${config.inverter.brand} inverter with proven reliability`);
  }
  
  // Warranty reasons
  if (config.inverter?.warrantyYears >= 10) {
    reasons.push(`${config.inverter.warrantyYears}-year warranty coverage`);
  }
  
  return reasons.slice(0, 3); // Limit to 3 reasons
}

/**
 * Selects brand-led recommendation
 */
function selectBrandLed(
  scoredValue: any[],
  scoredBalanced: any[],
  scoredPremium: any[],
  brandPreference?: string
): Top3Recommendation | null {
  if (!brandPreference) return null;
  
  const allCandidates = [...scoredValue, ...scoredBalanced, ...scoredPremium];
  const brandMatches = allCandidates.filter(candidate => 
    candidate.config.inverter?.brand === brandPreference
  );
  
  if (brandMatches.length === 0) return null;
  
  const best = brandMatches.reduce((best, current) => 
    current.score.total > best.score.total ? current : best
  );
  
  return createRecommendation(best.config, best.score, "brand-led");
}

/**
 * Selects value recommendation
 */
function selectValue(scoredValue: any[], scoredBalanced: any[], existing: Top3Recommendation[]): Top3Recommendation | null {
  const candidates = [...scoredValue, ...scoredBalanced];
  const filtered = candidates.filter(candidate => 
    !existing.some(rec => rec.config.inverter?.brand === candidate.config.inverter?.brand)
  );
  
  if (filtered.length === 0) return null;
  
  const best = filtered.reduce((best, current) => 
    current.score.total > best.score.total ? current : best
  );
  
  return createRecommendation(best.config, best.score, "value");
}

/**
 * Selects performance recommendation
 */
function selectPerformance(scoredPremium: any[], scoredBalanced: any[], existing: Top3Recommendation[]): Top3Recommendation | null {
  const candidates = [...scoredPremium, ...scoredBalanced];
  const filtered = candidates.filter(candidate => 
    !existing.some(rec => rec.config.inverter?.brand === candidate.config.inverter?.brand)
  );
  
  if (filtered.length === 0) return null;
  
  const best = filtered.reduce((best, current) => 
    current.score.total > best.score.total ? current : best
  );
  
  return createRecommendation(best.config, best.score, "performance");
}

/**
 * Creates recommendation object
 */
function createRecommendation(config: any, score: RecommendationScore, tier: "value" | "balanced" | "premium"): Top3Recommendation {
  const roiInputs: ROIInputs = {
    pvKW: config.systemSize,
    battKWh: config.batterySize || 0,
    inverterKW: config.inverter?.acKw || config.systemSize,
    phase: "unknown",
    tariff: vicDefaults(),
    upfrontCost: config.totalCost,
  };
  
  const savings = annualSavings(roiInputs);
  const payback = paybackYears(roiInputs);
  const npvVal = npv(roiInputs);
  
  return {
    id: `${tier}-${config.inverter?.id || 'system'}`,
    name: `${tier.charAt(0).toUpperCase() + tier.slice(1)} System`,
    tier,
    configuration: config,
    score,
    annualSavings: savings.annual,
    paybackYears: payback,
    npv: npvVal,
    assumptions: {
      tariff: `${(vicDefaults().flatKwh * 100).toFixed(0)}c/kWh`,
      fit: `${(vicDefaults().fitKwh * 100).toFixed(0)}c`,
      exportCap: `${exportCapKW("1p")}kW`,
      usage: `${roiInputs.userDailyKWh || 18}kWh/day`,
      phase: "single-phase",
    },
    evCharger: config.evCharger ? {
      brand: config.evCharger.brand,
      model: config.evCharger.model,
      power: config.evCharger.power || "11kW",
      cost: config.evCharger.priceAud,
    } : undefined,
  };
}
