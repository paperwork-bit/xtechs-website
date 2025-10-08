/** DO NOT MODIFY — Critical hero/animation module. Any change must be explicitly requested. */

export interface RebateInfo {
  federalSTCs: number;
  solarVictoriaRebate: number;
  totalRebates: number;
  breakdown: {
    stcValue: number;
    stcCount: number;
    solarVictoriaValue: number;
  };
}

export interface RebateInputs {
  systemSize: number; // kW
  batterySize?: number; // kWh
  postcode: string;
  stcZone: number;
  isEligibleForSolarVictoria: boolean;
}

/**
 * Calculates Federal STCs (Small-scale Technology Certificates)
 */
export function calculateFederalSTCs(systemSize: number, stcZone: number): { count: number; value: number } {
  // STC calculation: system size (kW) × zone factor × deeming period (years)
  const deemingPeriod = 6; // 6 years for 2025
  const stcPrice = 38; // $38 per STC (approximate current price)
  
  const stcCount = Math.floor(systemSize * stcZone * deemingPeriod);
  const stcValue = stcCount * stcPrice;
  
  return { count: stcCount, value: stcValue };
}

/**
 * Calculates Solar Victoria rebate eligibility and amount
 */
export function calculateSolarVictoriaRebate(
  systemSize: number, 
  batterySize: number = 0,
  isEligible: boolean
): number {
  if (!isEligible) return 0;
  
  // Solar Victoria rebate amounts (2025)
  const pvRebate = 1400; // $1,400 for PV systems
  const batteryRebate = batterySize > 0 ? 1400 : 0; // Additional $1,400 for battery
  
  return pvRebate + batteryRebate;
}

/**
 * Calculates all applicable rebates
 */
export function calculateRebates(inputs: RebateInputs): RebateInfo {
  const { systemSize, batterySize = 0, stcZone, isEligibleForSolarVictoria } = inputs;
  
  // Calculate Federal STCs
  const stcCalculation = calculateFederalSTCs(systemSize, stcZone);
  
  // Calculate Solar Victoria rebate
  const solarVictoriaRebate = calculateSolarVictoriaRebate(
    systemSize, 
    batterySize, 
    isEligibleForSolarVictoria
  );
  
  const totalRebates = stcCalculation.value + solarVictoriaRebate;
  
  return {
    federalSTCs: stcCalculation.value,
    solarVictoriaRebate,
    totalRebates,
    breakdown: {
      stcValue: stcCalculation.value,
      stcCount: stcCalculation.count,
      solarVictoriaValue: solarVictoriaRebate,
    },
  };
}

/**
 * Determines Solar Victoria eligibility based on postcode and other factors
 */
export function checkSolarVictoriaEligibility(postcode: string): boolean {
  // Convert postcode to number for range checking
  const postcodeNum = parseInt(postcode);
  
  // Solar Victoria is available for Victorian postcodes
  // Generally covers 3000-3999 range
  if (postcodeNum >= 3000 && postcodeNum <= 3999) {
    return true;
  }
  
  return false;
}

/**
 * Gets STC zone factor based on postcode
 */
export function getSTCZone(postcode: string): number {
  const postcodeNum = parseInt(postcode);
  
  // STC Zone factors for different regions
  if (postcodeNum >= 3000 && postcodeNum <= 3999) {
    // Victoria - Zone 4
    return 1.185;
  } else if (postcodeNum >= 2000 && postcodeNum <= 2999) {
    // NSW - Zone 3
    return 1.382;
  } else if (postcodeNum >= 4000 && postcodeNum <= 4999) {
    // Queensland - Zone 3
    return 1.382;
  } else if (postcodeNum >= 5000 && postcodeNum <= 5999) {
    // South Australia - Zone 3
    return 1.382;
  } else if (postcodeNum >= 6000 && postcodeNum <= 6999) {
    // Western Australia - Zone 4
    return 1.185;
  } else if (postcodeNum >= 7000 && postcodeNum <= 7999) {
    // Tasmania - Zone 4
    return 1.185;
  } else if (postcodeNum >= 800 && postcodeNum <= 999) {
    // Northern Territory - Zone 1
    return 1.622;
  } else if (postcodeNum >= 200 && postcodeNum <= 299) {
    // ACT - Zone 3
    return 1.382;
  }
  
  // Default to Victoria zone if unknown
  return 1.185;
}

/**
 * Formats rebate information for display
 */
export function formatRebateInfo(rebates: RebateInfo): {
  federalSTCs: string;
  solarVictoria: string;
  total: string;
  breakdown: string[];
} {
  const formatCurrency = (amount: number) => `$${amount.toLocaleString()}`;
  
  return {
    federalSTCs: formatCurrency(rebates.federalSTCs),
    solarVictoria: formatCurrency(rebates.solarVictoriaRebate),
    total: formatCurrency(rebates.totalRebates),
    breakdown: [
      `Federal STCs: ${rebates.breakdown.stcCount} certificates × $38 = ${formatCurrency(rebates.breakdown.stcValue)}`,
      `Solar Victoria: ${formatCurrency(rebates.breakdown.solarVictoriaValue)}`,
      `Total Rebates: ${formatCurrency(rebates.totalRebates)}`,
    ],
  };
}