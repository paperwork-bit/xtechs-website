/** DO NOT MODIFY — Critical hero/animation module. Any change must be explicitly requested. */

// Central constants for solar calculations and assumptions
export const SOLAR_ASSUMPTIONS = {
  // System assumptions
  PANEL_WATTAGE: 440, // Watts per panel
  PANELS_PER_KW: 2.27, // 1000W / 440W
  
  // Financial assumptions
  STC_PRICE_PER_CERTIFICATE: 38, // AUD per STC
  DEEMING_PERIOD_YEARS: 6, // Federal STC deeming period
  
  // Solar Victoria assumptions
  SOLAR_VICTORIA_REBATE: 1400, // AUD
  SOLAR_VICTORIA_LOAN_AMOUNT: 1400, // AUD
  SOLAR_VICTORIA_LOAN_MONTHLY: 29.17, // AUD per month
  SOLAR_VICTORIA_LOAN_YEARS: 4, // Years
  
  // Energy assumptions
  AVERAGE_SUN_HOURS_PER_DAY: 4.5, // Hours
  AVERAGE_ENERGY_SAVINGS_PERCENTAGE: 80, // Percentage
  
  // Installation assumptions
  TYPICAL_INSTALLATION_TIME_HOURS: 24, // Hours
  
  // Buffer assumptions
  PRICING_BUFFER_PERCENTAGE: 5, // Percentage above break-even
} as const;

// STC Zone factors for different postcodes
export const STC_ZONE_FACTORS = {
  ZONE_1: 1.622, // Northern Australia
  ZONE_2: 1.536, // Central Australia
  ZONE_3: 1.382, // Southern Australia
  ZONE_4: 1.185, // Tasmania
} as const;

// Default system components pricing (placeholder)
export const DEFAULT_COMPONENT_PRICING = {
  SOLAR_PANELS_PER_WATT: 0.85, // AUD per watt
  INVERTER_PER_KW: 800, // AUD per kW
  MOUNTING_KIT: 2000, // AUD
  INDEPENDENT_INSPECTION: 500, // AUD
  BATTERY_PER_KWH: 1200, // AUD per kWh
} as const;
