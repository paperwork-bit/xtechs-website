/** DO NOT MODIFY — Critical hero/animation module. Any change must be explicitly requested. */

import { UserInputs, SystemOption, RecommenderResult } from '@/types/recommender';
import { INVERTERS, BATTERIES, PANELS, EV_CHARGERS, getAvailableInverters, getAvailableBatteries, getAvailablePanels, getEVChargerByBrand } from '@/data/catalog';
import { DISABLED_INVERTER_BRANDS, PREMIUM_BATTERY_PREFERENCE, TREAT_PREMIUM_BATTERY_AS_AC_COUPLED, SYSTEM_SIZING, PRICING, getScoringWeights, getTeslaPW3Bonus } from '@/config/recommender.config';
import { calculateRebates, checkSolarVictoriaEligibility, getSTCZone } from '@/lib/rebates';

export function recommendSystems(inputs: UserInputs): RecommenderResult {
  // Calculate base usage from bill amount and period
  const annualUsage = calculateAnnualUsage(inputs.billAmount, inputs.billingPeriod, inputs.assumedTariffCents);
  
  // Calculate roof complexity factor
  const roofComplexity = getRoofComplexityFactor(inputs.roofType, inputs.storeys);
  
  // Calculate storey adder
  const storeyAdder = getStoreyAdder(inputs.storeys);
  
  // Generate three system options with proper SKU selection
  const options: SystemOption[] = [
    generateValueOption(inputs, annualUsage, roofComplexity, storeyAdder),
    generateBalancedOption(inputs, annualUsage, roofComplexity, storeyAdder),
    generatePremiumOption(inputs, annualUsage, roofComplexity, storeyAdder),
  ];
  
  return {
    options,
    assumptions: {
      tariff: inputs.assumedTariffCents,
      usage: annualUsage,
      roofComplexity,
      storeyAdder,
    },
  };
}

function calculateAnnualUsage(billAmount: number, period: 'monthly' | 'quarterly', tariffCents: number): number {
  const annualBill = period === 'monthly' ? billAmount * 12 : billAmount * 4;
  const tariffDollars = tariffCents / 100;
  return Math.round(annualBill / tariffDollars); // kWh per year
}

function getRoofComplexityFactor(roofType: string, storeys: number): number {
  const baseFactors = SYSTEM_SIZING.ROOF_COMPLEXITY;
  const storeyFactors = {
    1: 1.0,
    2: 1.1,
    3: 1.25,
  };
  
  return baseFactors[roofType as keyof typeof baseFactors] * storeyFactors[storeys as keyof typeof storeyFactors];
}

function getStoreyAdder(storeys: number): number {
  return (storeys - 1) * SYSTEM_SIZING.STOREY_ADDER_PER_LEVEL;
}

// SKU selection functions
function pickPanel(tier: 'Entry' | 'Mid' | 'Premium'): any {
  const panels = getAvailablePanels().filter(p => p.tier === tier);
  return panels[0] || null;
}

function pickInverter(inputs: UserInputs, pvKwTarget: number, tier: 'Entry' | 'Mid' | 'Premium'): any {
  const allInverters = getAvailableInverters()
    .filter(iv => !DISABLED_INVERTER_BRANDS.includes(iv.brand))
    .filter(iv => iv.phase === inputs.phase)
    .filter(iv => iv.tier === tier);
  
  // First try to find inverters that can handle the full system size
  let viableInverters = allInverters.filter(iv => iv.acKw >= pvKwTarget);
  
  // If no inverters can handle the full size, use the largest available
  if (viableInverters.length === 0) {
    viableInverters = allInverters.sort((a, b) => b.acKw - a.acKw);
  }
  
  // For Premium tier with AC-coupled battery, prefer Fronius
  if (tier === 'Premium' && TREAT_PREMIUM_BATTERY_AS_AC_COUPLED) {
    const froniusInverters = viableInverters.filter(iv => iv.brand === 'Fronius');
    if (froniusInverters.length > 0) {
      return froniusInverters[0];
    }
  }
  
  return viableInverters[0] || null;
}

function pickBattery(targetKwh: number, tier: 'Entry' | 'Mid' | 'Premium'): any {
  const pool = getAvailableBatteries().filter(b => b.tier === tier);
  
  // For Premium tier, prefer Tesla PW3
  if (tier === 'Premium') {
    const teslaPW3 = pool.find(b => b.id === 'tesla-powerwall-3');
    if (teslaPW3) return teslaPW3;
    
    const byd = pool.find(b => b.brand === 'BYD');
    if (byd) return byd;
  }
  
  // Find closest match by capacity
  return pool.reduce((best, current) => 
    Math.abs(current.kwh - targetKwh) < Math.abs(best.kwh - targetKwh) ? current : best
  );
}

function generateValueOption(inputs: UserInputs, annualUsage: number, roofComplexity: number, storeyAdder: number): SystemOption {
  // Smart sizing based on usage level
  let systemSize: number;
  if (inputs.usageLevel === 'basic') {
    systemSize = 6.6; // Base system for basic usage
  } else if (inputs.usageLevel === 'moderate') {
    systemSize = Math.min(Math.max(annualUsage / 1200, 6.6), 10); // Start from 6.6kW for moderate
  } else {
    systemSize = Math.min(Math.max(annualUsage / 1000, 8), 12); // Larger for heavy usage
  }
  
  const panel = pickPanel('Entry');
  const inverter = pickInverter(inputs, systemSize, 'Entry');
  const baseCost = systemSize * PRICING.BASE_COSTS.Entry * roofComplexity;
  let estimatedCost = Math.round(baseCost + storeyAdder);
  
  // Calculate number of panels
  const panelCount = Math.round((systemSize * 1000) / (panel?.watts || 400));
  
  // Add EV charger if needed
  let evCharger = null;
  if (inputs.hasElectricCar && inputs.evBrand) {
    evCharger = getEVChargerByBrand(inputs.evBrand);
    if (evCharger) {
      estimatedCost += evCharger.cost;
    }
  }
  
  // Keep estimatedCost for rebate calculations but don't use for ROI
  // ROI calculations removed - focusing on product features and rebates instead
  
  // Calculate rebates
  const stcZone = getSTCZone(inputs.suburbOrPostcode || '3000');
  const isEligibleForSolarVictoria = checkSolarVictoriaEligibility(inputs.suburbOrPostcode || '3000');
  const rebateInfo = calculateRebates({
    systemSize,
    batterySize: 0,
    postcode: inputs.suburbOrPostcode || '3000',
    stcZone,
    isEligibleForSolarVictoria,
  });
  
  // Build features from catalog data only
  const features = [
    `${panelCount}x ${panel?.brand} ${panel?.model} panels`,
    `${inverter?.brand} ${inverter?.model} inverter`,
    `${panel?.warrantyYears}-year panel warranty`,
  ];
  
  // Add monitoring from catalog
  if (inverter?.monitoringApp) {
    features.push(`${inverter.monitoringApp} monitoring`);
  }
  
  if (evCharger) {
    features.push(`${evCharger.brand} ${evCharger.model} EV charger (${evCharger.power})`);
    features.push(`Optimized for ${inputs.evBrand} EV charging`);
  }
  
  return {
    id: 'value',
    name: 'Value System',
    tier: 'value',
    systemSize: Math.round(systemSize * 10) / 10,
    features,
    description: 'Affordable starter system, ideal for first-time solar users with future expandability.',
    rebates: {
      federalSTCs: rebateInfo.federalSTCs,
      solarVictoriaRebate: rebateInfo.solarVictoriaRebate,
      totalRebates: rebateInfo.totalRebates,
    },
    evCharger: evCharger ? {
      brand: evCharger.brand,
      model: evCharger.model,
      power: evCharger.power,
    } : undefined,
  };
}

function generateBalancedOption(inputs: UserInputs, annualUsage: number, roofComplexity: number, storeyAdder: number): SystemOption {
  // Smart sizing based on usage level
  let systemSize: number;
  if (inputs.usageLevel === 'basic') {
    systemSize = 8.0; // Mid-tier for basic users wanting better components
  } else if (inputs.usageLevel === 'moderate') {
    systemSize = Math.min(Math.max(annualUsage / 1000, 10), 15); // Start from 10kW for moderate
  } else {
    systemSize = Math.min(Math.max(annualUsage / 800, 12), 20); // Larger for heavy usage
  }
  
  const batterySize = Math.min(Math.max(annualUsage / 2500, 8), 15); // 8-15kWh battery
  const panel = pickPanel('Mid');
  const inverter = pickInverter(inputs, systemSize, 'Mid');
  const battery = pickBattery(batterySize, 'Mid');
  const baseCost = systemSize * PRICING.BASE_COSTS.Mid * roofComplexity;
  const batteryCost = batterySize * PRICING.BATTERY_COSTS.Mid;
  let estimatedCost = Math.round(baseCost + batteryCost + storeyAdder);
  
  // Calculate number of panels
  const panelCount = Math.round((systemSize * 1000) / (panel?.watts || 400));
  
  // Add EV charger if needed
  let evCharger = null;
  if (inputs.hasElectricCar && inputs.evBrand) {
    evCharger = getEVChargerByBrand(inputs.evBrand);
    if (evCharger) {
      estimatedCost += evCharger.cost;
    }
  }
  
  // Keep estimatedCost for rebate calculations but don't use for ROI
  // ROI calculations removed - focusing on product features and rebates instead
  
  // Calculate rebates
  const stcZone = getSTCZone(inputs.suburbOrPostcode || '3000');
  const isEligibleForSolarVictoria = checkSolarVictoriaEligibility(inputs.suburbOrPostcode || '3000');
  const rebateInfo = calculateRebates({
    systemSize,
    batterySize,
    postcode: inputs.suburbOrPostcode || '3000',
    stcZone,
    isEligibleForSolarVictoria,
  });
  
  // Build features from catalog data only
  const features = [
    `${panelCount}x ${panel?.brand} ${panel?.model} panels`,
    `${inverter?.brand} ${inverter?.model} inverter`,
    `${battery?.brand} ${battery?.model} battery`,
    `${panel?.warrantyYears}-year panel warranty`,
  ];
  
  // Add monitoring from catalog
  if (inverter?.monitoringApp) {
    features.push(`${inverter.monitoringApp} monitoring`);
  }
  
  if (evCharger) {
    features.push(`${evCharger.brand} ${evCharger.model} EV charger (${evCharger.power})`);
    features.push(`Optimized for ${inputs.evBrand} EV charging`);
  }
  
  return {
    id: 'balanced',
    name: 'Balanced System',
    tier: 'balanced',
    systemSize: Math.round(systemSize * 10) / 10,
    batterySize: Math.round(batterySize * 10) / 10,
    features,
    description: 'Balanced mix of efficiency and storage, perfect for families or medium energy use.',
    rebates: {
      federalSTCs: rebateInfo.federalSTCs,
      solarVictoriaRebate: rebateInfo.solarVictoriaRebate,
      totalRebates: rebateInfo.totalRebates,
    },
    evCharger: evCharger ? {
      brand: evCharger.brand,
      model: evCharger.model,
      power: evCharger.power,
    } : undefined,
  };
}

function generatePremiumOption(inputs: UserInputs, annualUsage: number, roofComplexity: number, storeyAdder: number): SystemOption {
  // Smart sizing based on usage level
  let systemSize: number;
  if (inputs.usageLevel === 'basic') {
    systemSize = 10.0; // Premium for basic users wanting best components
  } else if (inputs.usageLevel === 'moderate') {
    systemSize = Math.min(Math.max(annualUsage / 800, 12), 20); // Start from 12kW for moderate
  } else {
    systemSize = Math.min(Math.max(annualUsage / 600, 15), 25); // Larger for heavy usage
  }
  
  const batterySize = Math.min(Math.max(annualUsage / 2000, 12), 25); // 12-25kWh battery
  const panel = pickPanel('Premium');
  const inverter = pickInverter(inputs, systemSize, 'Premium');
  const battery = pickBattery(batterySize, 'Premium');
  const baseCost = systemSize * PRICING.BASE_COSTS.Premium * roofComplexity;
  const batteryCost = batterySize * PRICING.BATTERY_COSTS.Premium;
  let estimatedCost = Math.round(baseCost + batteryCost + storeyAdder);
  
  // Tesla PW3 bonus scoring
  const teslaBonus = getTeslaPW3Bonus('premium');
  estimatedCost -= teslaBonus; // Small cost reduction for Tesla preference
  
  // Calculate number of panels
  const panelCount = Math.round((systemSize * 1000) / (panel?.watts || 400));
  
  // Add EV charger if needed - prefer brand matching
  let evCharger = null;
  if (inputs.hasElectricCar && inputs.evBrand) {
    evCharger = getEVChargerByBrand(inputs.evBrand);
    if (evCharger) {
      estimatedCost += evCharger.cost;
    }
  }
  
  // Keep estimatedCost for rebate calculations but don't use for ROI
  // ROI calculations removed - focusing on product features and rebates instead
  
  // Calculate rebates
  const stcZone = getSTCZone(inputs.suburbOrPostcode || '3000');
  const isEligibleForSolarVictoria = checkSolarVictoriaEligibility(inputs.suburbOrPostcode || '3000');
  const rebateInfo = calculateRebates({
    systemSize,
    batterySize,
    postcode: inputs.suburbOrPostcode || '3000',
    stcZone,
    isEligibleForSolarVictoria,
  });
  
  // Build features from catalog data only
  const features = [
    `${panelCount}x ${panel?.brand} ${panel?.model} panels`,
    `${inverter?.brand} ${inverter?.model} inverter`,
    `${battery?.brand} ${battery?.model} (${battery?.kwh} kWh, ${battery?.warrantyYears}-yr warranty)`,
    `${panel?.warrantyYears}-year panel warranty`,
  ];
  
  // Add monitoring from catalog
  if (inverter?.monitoringApp) {
    features.push(`${inverter.monitoringApp} monitoring`);
  }
  
  // Add AC-coupled explanation if Tesla is selected
  if (battery?.brand === 'Tesla' && TREAT_PREMIUM_BATTERY_AS_AC_COUPLED) {
    features.push('AC-coupled layout keeps PV inverter independent (service-friendly)');
  }
  
  if (evCharger) {
    features.push(`${evCharger.brand} ${evCharger.model} EV charger (${evCharger.power})`);
    features.push(`Optimized for ${inputs.evBrand} EV charging`);
  }
  
  return {
    id: 'premium',
    name: 'Premium System',
    tier: 'premium',
    systemSize: Math.round(systemSize * 10) / 10,
    batterySize: Math.round(batterySize * 10) / 10,
    features,
    description: 'Top-tier solution with premium components, maximum reliability, and future-proof storage.',
    rebates: {
      federalSTCs: rebateInfo.federalSTCs,
      solarVictoriaRebate: rebateInfo.solarVictoriaRebate,
      totalRebates: rebateInfo.totalRebates,
    },
    evCharger: evCharger ? {
      brand: evCharger.brand,
      model: evCharger.model,
      power: evCharger.power,
    } : undefined,
  };
}