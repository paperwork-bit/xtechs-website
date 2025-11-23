/** DO NOT MODIFY — Critical hero/animation module. Any change must be explicitly requested. */

export interface LeadInfo {
  name: string;
  email: string;
  phone?: string;
  suburbOrPostcode?: string;
  nmi?: string; // collected for reference only, no external fetch
}

export interface UserInputs {
  phase: 'single' | 'three';
  roofType: 'tile' | 'tin' | 'flat';
  storeys: 1 | 2 | 3;
  billingPeriod: 'monthly' | 'quarterly';
  billAmount: number; // AUD
  usageLevel: 'basic' | 'moderate' | 'heavy';
  assumedTariffCents: number; // default 32
  suburbOrPostcode?: string; // for rebate calculations
  hasElectricCar?: boolean;
  evBrand?: 'Tesla' | 'BYD' | 'BMW' | 'Mercedes' | 'Audi' | 'Volkswagen' | 'Hyundai' | 'Kia' | 'Nissan' | 'Other';
  energyRetailer?: string;
}

export interface SystemOption {
  id: string;
  name: string;
  tier: 'value' | 'balanced' | 'premium';
  systemSize: number; // kW
  batterySize?: number; // kWh
  features: string[];
  description: string;
  rebates: {
    federalSTCs: number;
    solarVictoriaRebate: number;
    totalRebates: number;
  };
  evCharger?: {
    brand: string;
    model: string;
    power: string;
  };
}

export interface RecommenderResult {
  options: SystemOption[];
  assumptions: {
    tariff: number;
    usage: number;
    roofComplexity: number;
    storeyAdder: number;
  };
}

export interface ConsentInfo {
  marketingOptIn?: boolean;
  ts: number;
}
