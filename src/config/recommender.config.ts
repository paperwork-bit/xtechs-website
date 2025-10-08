/** DO NOT MODIFY — Critical hero/animation module. Any change must be explicitly requested. */

// Brand restrictions and preferences
export const DISABLED_INVERTER_BRANDS = ['SolarEdge']; // No longer installed - replaced with Tesla Powerwall 3 // do not sell
export const PREMIUM_BATTERY_PREFERENCE = ['Tesla Powerwall 3', 'Tesla', 'BYD']; // priority order
export const TREAT_PREMIUM_BATTERY_AS_AC_COUPLED = true; // keeps PV inverter independent

// System sizing parameters
export const SYSTEM_SIZING = {
  // kW per panel (440W panels)
  PANEL_WATTS: 440,
  PANELS_PER_KW: 1000 / 440, // ~2.27 panels per kW
  
  // Export limits by phase
  EXPORT_LIMITS: {
    single: 5, // kW
    three: 10, // kW
  },
  
  // Roof complexity factors
  ROOF_COMPLEXITY: {
    tile: 1.0,
    tin: 0.9,
    flat: 1.2,
  },
  
  // Storey adders
  STOREY_ADDER_PER_LEVEL: 500, // AUD per additional storey
  
  // Usage level multipliers
  USAGE_MULTIPLIERS: {
    basic: 0.8,
    moderate: 1.0,
    heavy: 1.3,
  },
} as const;

// Pricing parameters
export const PRICING = {
  // Base costs per kW
  BASE_COSTS: {
    Entry: 1200,
    Mid: 1400,
    Premium: 1600,
  },
  
  // Battery costs per kWh
  BATTERY_COSTS: {
    Entry: 800,
    Mid: 1000,
    Premium: 1200,
  },
  
  // Savings percentages by tier
  SAVINGS_PERCENTAGES: {
    Entry: 0.25,
    Mid: 0.35,
    Premium: 0.45,
  },
} as const;

// Scoring weights for system selection
export function getScoringWeights(tier: 'value' | 'balanced' | 'premium') {
  const baseWeights = {
    cost: 0.4,
    performance: 0.3,
    warranty: 0.2,
    brand: 0.1,
  };
  
  // Adjust weights based on tier
  switch (tier) {
    case 'value':
      return { ...baseWeights, cost: 0.5, performance: 0.25 };
    case 'balanced':
      return baseWeights;
    case 'premium':
      return { ...baseWeights, cost: 0.3, performance: 0.4, warranty: 0.2, brand: 0.1 };
    default:
      return baseWeights;
  }
}

// Tesla Powerwall 3 bonus scoring
export function getTeslaPW3Bonus(tier: 'value' | 'balanced' | 'premium'): number {
  return tier === 'premium' ? 8 : 0; // Small preference bump for Premium tier
}
