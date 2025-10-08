/** DO NOT MODIFY — Critical hero/animation module. Any change must be explicitly requested. */

export interface CatalogItem {
  id: string;
  type: "pv" | "battery" | "hybrid" | "inverter" | "ev_charger";
  brand: string;
  model: string;
  tier: "Entry" | "Mid" | "Premium";
  
  // PV specific
  watts?: number;
  efficiency?: number;
  
  // Battery specific
  usableKWh?: number;
  surgeKW?: number;
  rtes?: number; // Round-trip efficiency
  chemistry?: "LFP" | "NMC";
  
  // Inverter specific
  acKw?: number;
  phase?: "single" | "three";
  shadeAssist?: "basic" | "good" | "very-good";
  
  // EV Charger specific
  power?: string;
  compatibleBrands?: string[];
  
  // Common properties
  warrantyYears: number;
  priceAud: number;
  reliableFlag: boolean;
  notes?: string[];
  
  // Metadata
  doNotSell?: boolean;
  hybridPreferredBrands?: string[];
  acCoupled?: boolean;
  allInOne?: boolean;
}

export interface SystemConfiguration {
  panels: CatalogItem[];
  inverter: CatalogItem;
  battery?: CatalogItem;
  evCharger?: CatalogItem;
  totalCost: number;
  systemSize: number;
  batterySize?: number;
}

export interface RecommendationScore {
  total: number;
  breakdown: {
    roi: number;
    performance: number;
    warranty: number;
    brand: number;
    reliability: number;
  };
  confidence: number;
  reasons: string[];
}

export interface Top3Recommendation {
  id: string;
  name: string;
  tier: "value" | "balanced" | "premium";
  configuration: SystemConfiguration;
  score: RecommendationScore;
  annualSavings: number;
  paybackYears: number;
  npv: number;
  assumptions: {
    tariff: string;
    fit: string;
    exportCap: string;
    usage: string;
    phase: string;
  };
  evCharger?: {
    brand: string;
    model: string;
    power: string;
    cost: number;
  };
}
