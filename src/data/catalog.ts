/** DO NOT MODIFY — Critical hero/animation module. Any change must be explicitly requested. */

export interface Inverter {
  id: string;
  brand: string;
  model: string;
  tier: 'Entry' | 'Mid' | 'Premium';
  acKw: number;
  phase: 'single' | 'three';
  shadeAssist: 'basic' | 'good' | 'very-good';
  pricePerKw: number;
  requiresOptimizers?: boolean;
  doNotSell?: boolean;
  monitoringApp?: string;
  monitoringFeatures?: string[];
}

export interface Battery {
  id: string;
  brand: string;
  model: string;
  tier: 'Entry' | 'Mid' | 'Premium';
  kwh: number;
  dod: number; // depth of discharge
  warrantyYears: number;
  chemistry: 'LFP' | 'NMC';
  pricePerKwh: number;
  hybridPreferredBrands?: string[];
  acCoupled?: boolean;
  allInOne?: boolean;
  monitoringApp?: string;
  monitoringFeatures?: string[];
}

export interface Panel {
  id: string;
  brand: string;
  model: string;
  tier: 'Entry' | 'Mid' | 'Premium';
  watts: number;
  efficiency: number;
  warrantyYears: number;
  pricePerWatt: number;
}

export interface EVCharger {
  id: string;
  brand: string;
  model: string;
  power: string;
  compatibleBrands: string[];
  cost: number;
  features: string[];
}

// Solar Panels
export const PANELS: Panel[] = [
  // Entry Range - Cost-Effective
  { id: 'jinko-standard', brand: 'Jinko', model: 'Standard Series', tier: 'Entry', watts: 400, efficiency: 20.93, warrantyYears: 25, pricePerWatt: 0.45 },
  { id: 'canadian-solar', brand: 'Canadian Solar', model: 'Standard Series', tier: 'Entry', watts: 400, efficiency: 20.5, warrantyYears: 25, pricePerWatt: 0.42 },
  
  // Mid Range - Balance of Quality & Value
  { id: 'trina-standard', brand: 'Trina', model: 'Standard Series', tier: 'Mid', watts: 450, efficiency: 21.5, warrantyYears: 25, pricePerWatt: 0.52 },
  { id: 'rec-standard', brand: 'REC', model: 'Standard Series', tier: 'Mid', watts: 430, efficiency: 21.2, warrantyYears: 20, pricePerWatt: 0.58 },
  
  // Premium Range - Superior Performance
  { id: 'rec-alpha', brand: 'REC', model: 'Alpha Series', tier: 'Premium', watts: 400, efficiency: 22.5, warrantyYears: 20, pricePerWatt: 0.75 },
  { id: 'tindo-australian', brand: 'Tindo Solar', model: 'Australian-made', tier: 'Premium', watts: 400, efficiency: 21.8, warrantyYears: 25, pricePerWatt: 0.85 },
];

// Solar Inverters
export const INVERTERS: Inverter[] = [
  // Entry Range - Cost-Effective
  { 
    id: 'goodwe-standard-5kw', 
    brand: 'GoodWe', 
    model: 'Standard Series 5kW', 
    tier: 'Entry', 
    acKw: 5, 
    phase: 'single', 
    shadeAssist: 'basic', 
    pricePerKw: 220,
    monitoringApp: 'Built-in Wi-Fi monitoring',
    monitoringFeatures: ['98.2% maximum efficiency', 'Compact and lightweight design', '10-year standard warranty']
  },
  { 
    id: 'goodwe-standard-8kw', 
    brand: 'GoodWe', 
    model: 'Standard Series 8kW', 
    tier: 'Entry', 
    acKw: 8, 
    phase: 'single', 
    shadeAssist: 'basic', 
    pricePerKw: 220,
    monitoringApp: 'Built-in Wi-Fi monitoring',
    monitoringFeatures: ['98.2% maximum efficiency', 'Compact and lightweight design', '10-year standard warranty']
  },
  { 
    id: 'goodwe-standard-10kw', 
    brand: 'GoodWe', 
    model: 'Standard Series 10kW', 
    tier: 'Entry', 
    acKw: 10, 
    phase: 'single', 
    shadeAssist: 'basic', 
    pricePerKw: 220,
    monitoringApp: 'Built-in Wi-Fi monitoring',
    monitoringFeatures: ['98.2% maximum efficiency', 'Compact and lightweight design', '10-year standard warranty']
  },
  
  // Mid Range - Balance of Quality & Value
  { 
    id: 'sigenergy-hybrid-5kw', 
    brand: 'SigEnergy', 
    model: 'Hybrid Series 5kW', 
    tier: 'Mid', 
    acKw: 5, 
    phase: 'single', 
    shadeAssist: 'good', 
    pricePerKw: 260,
    monitoringApp: 'Advanced app monitoring system',
    monitoringFeatures: ['Battery-ready for future expansion', 'Australian technical support', '10-year warranty (extendable)']
  },
  { 
    id: 'sigenergy-hybrid-8kw', 
    brand: 'SigEnergy', 
    model: 'Hybrid Series 8kW', 
    tier: 'Mid', 
    acKw: 8, 
    phase: 'single', 
    shadeAssist: 'good', 
    pricePerKw: 260,
    monitoringApp: 'Advanced app monitoring system',
    monitoringFeatures: ['Battery-ready for future expansion', 'Australian technical support', '10-year warranty (extendable)']
  },
  { 
    id: 'sigenergy-hybrid-10kw', 
    brand: 'SigEnergy', 
    model: 'Hybrid Series 10kW', 
    tier: 'Mid', 
    acKw: 10, 
    phase: 'single', 
    shadeAssist: 'good', 
    pricePerKw: 260,
    monitoringApp: 'Advanced app monitoring system',
    monitoringFeatures: ['Battery-ready for future expansion', 'Australian technical support', '10-year warranty (extendable)']
  },
  { 
    id: 'sungrow-standard-5kw', 
    brand: 'Sungrow', 
    model: 'Standard Series 5kW', 
    tier: 'Mid', 
    acKw: 5, 
    phase: 'single', 
    shadeAssist: 'good', 
    pricePerKw: 250,
    monitoringApp: 'Sungrow monitoring app',
    monitoringFeatures: ['Up to 98.4% efficiency', 'Multi-MPPT tracking for optimal yield', 'Excellent high-temperature performance', '10-year warranty standard']
  },
  { 
    id: 'sungrow-standard-8kw', 
    brand: 'Sungrow', 
    model: 'Standard Series 8kW', 
    tier: 'Mid', 
    acKw: 8, 
    phase: 'single', 
    shadeAssist: 'good', 
    pricePerKw: 250,
    monitoringApp: 'Sungrow monitoring app',
    monitoringFeatures: ['Up to 98.4% efficiency', 'Multi-MPPT tracking for optimal yield', 'Excellent high-temperature performance', '10-year warranty standard']
  },
  { 
    id: 'sungrow-standard-10kw', 
    brand: 'Sungrow', 
    model: 'Standard Series 10kW', 
    tier: 'Mid', 
    acKw: 10, 
    phase: 'single', 
    shadeAssist: 'good', 
    pricePerKw: 250,
    monitoringApp: 'Sungrow monitoring app',
    monitoringFeatures: ['Up to 98.4% efficiency', 'Multi-MPPT tracking for optimal yield', 'Excellent high-temperature performance', '10-year warranty standard']
  },
  { 
    id: 'sungrow-standard-15kw', 
    brand: 'Sungrow', 
    model: 'Standard Series 15kW', 
    tier: 'Mid', 
    acKw: 15, 
    phase: 'three', 
    shadeAssist: 'good', 
    pricePerKw: 250,
    monitoringApp: 'Sungrow monitoring app',
    monitoringFeatures: ['Up to 98.4% efficiency', 'Multi-MPPT tracking for optimal yield', 'Excellent high-temperature performance', '10-year warranty standard']
  },
  
  // Premium Range - Superior Performance
  { 
    id: 'fronius-premium-5kw', 
    brand: 'Fronius', 
    model: 'Premium Series 5kW', 
    tier: 'Premium', 
    acKw: 5, 
    phase: 'single', 
    shadeAssist: 'very-good', 
    pricePerKw: 320,
    monitoringApp: 'Sophisticated monitoring system',
    monitoringFeatures: ['Dynamic Peak Manager for shade optimization', 'Modular design for easy servicing', 'Smart home integration capabilities', '10-year full warranty (extendable)']
  },
  { 
    id: 'fronius-premium-8kw', 
    brand: 'Fronius', 
    model: 'Premium Series 8kW', 
    tier: 'Premium', 
    acKw: 8, 
    phase: 'single', 
    shadeAssist: 'very-good', 
    pricePerKw: 320,
    monitoringApp: 'Sophisticated monitoring system',
    monitoringFeatures: ['Dynamic Peak Manager for shade optimization', 'Modular design for easy servicing', 'Smart home integration capabilities', '10-year full warranty (extendable)']
  },
  { 
    id: 'fronius-premium-10kw', 
    brand: 'Fronius', 
    model: 'Premium Series 10kW', 
    tier: 'Premium', 
    acKw: 10, 
    phase: 'single', 
    shadeAssist: 'very-good', 
    pricePerKw: 320,
    monitoringApp: 'Sophisticated monitoring system',
    monitoringFeatures: ['Dynamic Peak Manager for shade optimization', 'Modular design for easy servicing', 'Smart home integration capabilities', '10-year full warranty (extendable)']
  },
  { 
    id: 'fronius-three-phase-15kw', 
    brand: 'Fronius', 
    model: 'Three-Phase Series 15kW', 
    tier: 'Premium', 
    acKw: 15, 
    phase: 'three', 
    shadeAssist: 'very-good', 
    pricePerKw: 310,
    monitoringApp: 'Sophisticated monitoring system',
    monitoringFeatures: ['Dynamic Peak Manager for shade optimization', 'Modular design for easy servicing', 'Smart home integration capabilities', '10-year full warranty (extendable)']
  },
  { 
    id: 'fronius-three-phase-20kw', 
    brand: 'Fronius', 
    model: 'Three-Phase Series 20kW', 
    tier: 'Premium', 
    acKw: 20, 
    phase: 'three', 
    shadeAssist: 'very-good', 
    pricePerKw: 310,
    monitoringApp: 'Sophisticated monitoring system',
    monitoringFeatures: ['Dynamic Peak Manager for shade optimization', 'Modular design for easy servicing', 'Smart home integration capabilities', '10-year full warranty (extendable)']
  },
  { 
    id: 'fronius-three-phase-25kw', 
    brand: 'Fronius', 
    model: 'Three-Phase Series 25kW', 
    tier: 'Premium', 
    acKw: 25, 
    phase: 'three', 
    shadeAssist: 'very-good', 
    pricePerKw: 310,
    monitoringApp: 'Sophisticated monitoring system',
    monitoringFeatures: ['Dynamic Peak Manager for shade optimization', 'Modular design for easy servicing', 'Smart home integration capabilities', '10-year full warranty (extendable)']
  },
];

// Solar Batteries
export const BATTERIES: Battery[] = [
  // Entry Range - Cost-Effective
  { 
    id: 'alpha-ess-standard', 
    brand: 'Alpha ESS', 
    model: 'Standard Series', 
    tier: 'Entry', 
    kwh: 10, 
    dod: 0.9, 
    warrantyYears: 10, 
    chemistry: 'LFP', 
    pricePerKwh: 820, 
    hybridPreferredBrands: ['GoodWe','Sungrow'],
    monitoringApp: 'User-friendly monitoring app',
    monitoringFeatures: ['Lithium-ion technology', 'Modular expandable design', '10-year warranty']
  },
  
  // Mid Range - Balance of Quality & Value
  { 
    id: 'sungrow-battery', 
    brand: 'Sungrow', 
    model: 'Battery Series', 
    tier: 'Mid', 
    kwh: 12, 
    dod: 0.9, 
    warrantyYears: 10, 
    chemistry: 'LFP', 
    pricePerKwh: 900, 
    hybridPreferredBrands: ['Sungrow'],
    monitoringApp: 'Sungrow monitoring app',
    monitoringFeatures: ['High cycle life (>6000 cycles)', 'Compact design with high energy density', 'Advanced BMS for safety and longevity', '10-year warranty']
  },
  { 
    id: 'sigenergy-battery', 
    brand: 'SigEnergy', 
    model: 'All-in-One Series', 
    tier: 'Mid', 
    kwh: 12, 
    dod: 0.9, 
    warrantyYears: 10, 
    chemistry: 'LFP', 
    pricePerKwh: 920, 
    hybridPreferredBrands: ['SigEnergy'],
    monitoringApp: 'SigEnergy monitoring app',
    monitoringFeatures: ['Modular design for capacity expansion', 'Backup power functionality', 'Compatible with SigEnergy inverters', '10-year warranty with local support']
  },
  
  // Premium Range - Superior Performance
  { 
    id: 'byd-premium', 
    brand: 'BYD', 
    model: 'Premium Series', 
    tier: 'Premium', 
    kwh: 12, 
    dod: 0.9, 
    warrantyYears: 10, 
    chemistry: 'LFP', 
    pricePerKwh: 1050,
    monitoringApp: 'BYD monitoring app',
    monitoringFeatures: ['LFP chemistry for superior safety', 'Modular design with high expandability', 'Compatible with multiple inverter brands', 'Up to 90% depth of discharge', '10-year warranty']
  },
  // Tesla Powerwall 3 as primary Premium option (replaces SolarEdge)
  { 
    id: 'tesla-powerwall-3', 
    brand: 'Tesla', 
    model: 'Powerwall 3', 
    tier: 'Premium', 
    kwh: 13.5, 
    dod: 0.9, 
    warrantyYears: 10, 
    chemistry: 'NMC', 
    pricePerKwh: 1200, 
    acCoupled: true, 
    allInOne: true,
    monitoringApp: 'Tesla App',
    monitoringFeatures: ['13.5kWh usable capacity per unit', 'Liquid cooling for optimal performance', 'Storm Watch weather monitoring', 'Sleek, compact all-in-one design', '10-year warranty']
  },
];

// EV Chargers
export const EV_CHARGERS: EVCharger[] = [
  // Entry Range - Cost-Effective
  { 
    id: 'tesla-wall-connector', 
    brand: 'Tesla', 
    model: 'Wall Connector', 
    power: 'Up to 22kW', 
    compatibleBrands: ['Tesla'], 
    cost: 750, 
    features: ['Up to 22kW charging capability (vehicle dependent)', '4-year warranty', 'Wi-Fi connectivity for remote updates', 'Weather-resistant design for indoor/outdoor installation'] 
  },
  
  // Mid Range - Balance of Quality & Value
  { 
    id: 'sigenergy-basic', 
    brand: 'SigEnergy', 
    model: 'Basic EV Charger', 
    power: '7.4kW', 
    compatibleBrands: ['Other'], 
    cost: 650, 
    features: ['Up to 7.4kW charging capacity', '2-year warranty', 'Universal vehicle compatibility', 'Easy smartphone control', 'Solar-aware charging modes'] 
  },
  { 
    id: 'zappi-myenergi', 
    brand: 'Zappi (MyEnergi)', 
    model: 'Smart Charger', 
    power: '7kW', 
    compatibleBrands: ['Other'], 
    cost: 800, 
    features: ['7kW charging capability', '2-year warranty', 'Energy monitoring via app', 'Solar-aware charging modes'] 
  },
  
  // Premium Range - Superior Performance
  { 
    id: 'sigenergy-premium', 
    brand: 'SigEnergy', 
    model: 'Premium EV Charger', 
    power: '22kW', 
    compatibleBrands: ['Other'], 
    cost: 1200, 
    features: ['22kW three-phase capability', 'Smart grid integration', '3-year warranty', 'Dynamic load management', 'Advanced smartphone app'] 
  },
  { 
    id: 'fronius-wattpilot', 
    brand: 'Fronius', 
    model: 'Wattpilot', 
    power: '22kW', 
    compatibleBrands: ['Other'], 
    cost: 1500, 
    features: ['Up to 22kW charging capability', 'Next-level solar integration', '3-year warranty', 'Dynamic power management', 'Solar optimization technology'] 
  },
];

// Helper functions
export function getAvailablePanels(): Panel[] {
  return PANELS;
}

export function getAvailableInverters(): Inverter[] {
  return INVERTERS.filter(inverter => !inverter.doNotSell);
}

export function getAvailableBatteries(): Battery[] {
  return BATTERIES;
}

export function getAvailableEVChargers(): EVCharger[] {
  return EV_CHARGERS;
}

export function getPanelsByTier(tier: Panel['tier']): Panel[] {
  return getAvailablePanels().filter(panel => panel.tier === tier);
}

export function getInvertersByTier(tier: Inverter['tier']): Inverter[] {
  return getAvailableInverters().filter(inverter => inverter.tier === tier);
}

export function getBatteriesByTier(tier: Battery['tier']): Battery[] {
  return getAvailableBatteries().filter(battery => battery.tier === tier);
}

export function getInvertersByPhase(phase: Inverter['phase']): Inverter[] {
  return getAvailableInverters().filter(inverter => inverter.phase === phase);
}

export function getEVChargerByBrand(evBrand: string): EVCharger | null {
  const chargers = getAvailableEVChargers();
  
  // First try to find exact brand match
  const brandMatch = chargers.find(charger => 
    charger.compatibleBrands.includes(evBrand)
  );
  
  if (brandMatch) return brandMatch;
  
  // Fallback to universal charger
  return chargers.find(charger => charger.id === 'universal-charger-11kw') || null;
}
