"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Info } from 'lucide-react';
import { RebateCalculation, RebateResults } from '@/lib/rebates';
import { SOLAR_ASSUMPTIONS, STC_ZONE_FACTORS } from '@/config/assumptions';

interface BreakdownDrawerProps {
  inputs: RebateCalculation;
  results: RebateResults;
  systemCost: number;
  finalPrice: number;
}

export default function BreakdownDrawer({ inputs, results, systemCost, finalPrice }: BreakdownDrawerProps) {
  const formatCurrency = (amount: number) => 
    new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(amount);

  const formatNumber = (num: number) => 
    new Intl.NumberFormat('en-AU').format(num);

  return (
    <Card className="border border-gray-200">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Info className="w-5 h-5 text-blue-600" />
          Detailed Breakdown & Assumptions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* System Details */}
        <div>
          <h4 className="font-semibold mb-3">System Configuration</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">System Size:</span>
              <span className="ml-2 font-medium">{inputs.systemSizeKw} kW</span>
            </div>
            <div>
              <span className="text-gray-600">Panels:</span>
              <span className="ml-2 font-medium">{Math.round(inputs.systemSizeKw * SOLAR_ASSUMPTIONS.PANELS_PER_KW)} panels</span>
            </div>
            <div>
              <span className="text-gray-600">STC Zone:</span>
              <span className="ml-2 font-medium">{inputs.stcZone}</span>
            </div>
            <div>
              <span className="text-gray-600">Audience:</span>
              <span className="ml-2 font-medium capitalize">{inputs.audience}</span>
            </div>
            {inputs.includeBattery && inputs.batterySizeKwh && (
              <div className="col-span-2">
                <span className="text-gray-600">Battery:</span>
                <span className="ml-2 font-medium">{inputs.batterySizeKwh} kWh</span>
              </div>
            )}
          </div>
        </div>

        {/* STC Calculation */}
        <div>
          <h4 className="font-semibold mb-3">Federal STC Calculation</h4>
          <div className="bg-blue-50 rounded-lg p-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>System size:</span>
              <span className="font-medium">{inputs.systemSizeKw} kW</span>
            </div>
            <div className="flex justify-between">
              <span>Zone factor ({inputs.stcZone}):</span>
              <span className="font-medium">{STC_ZONE_FACTORS[inputs.stcZone]}</span>
            </div>
            <div className="flex justify-between">
              <span>Deeming period:</span>
              <span className="font-medium">{SOLAR_ASSUMPTIONS.DEEMING_PERIOD_YEARS} years</span>
            </div>
            <div className="flex justify-between border-t pt-2">
              <span>STC certificates (PV):</span>
              <span className="font-medium">{formatNumber(results.stcCertificates)}</span>
            </div>
            <div className="flex justify-between">
              <span>STC price:</span>
              <span className="font-medium">{formatCurrency(SOLAR_ASSUMPTIONS.STC_PRICE_PER_CERTIFICATE)} per STC</span>
            </div>
            <div className="flex justify-between font-semibold border-t pt-2">
              <span>Total PV STC value:</span>
              <span className="text-blue-600">{formatCurrency(results.federalStcPv)}</span>
            </div>
          </div>
        </div>

        {/* Battery STC Calculation */}
        {inputs.includeBattery && inputs.batterySizeKwh && results.federalStcBattery > 0 && (
          <div>
            <h4 className="font-semibold mb-3">Battery STC Calculation</h4>
            <div className="bg-green-50 rounded-lg p-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Battery size:</span>
                <span className="font-medium">{inputs.batterySizeKwh} kWh</span>
              </div>
              <div className="flex justify-between">
                <span>Zone factor ({inputs.stcZone}):</span>
                <span className="font-medium">{STC_ZONE_FACTORS[inputs.stcZone]}</span>
              </div>
              <div className="flex justify-between">
                <span>Deeming period:</span>
                <span className="font-medium">{SOLAR_ASSUMPTIONS.DEEMING_PERIOD_YEARS} years</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span>STC certificates (Battery):</span>
                <span className="font-medium">{formatNumber(results.batteryStcCertificates)}</span>
              </div>
              <div className="flex justify-between font-semibold border-t pt-2">
                <span>Total Battery STC value:</span>
                <span className="text-green-600">{formatCurrency(results.federalStcBattery)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Solar Victoria */}
        {results.solarVictoriaRebate > 0 && (
          <div>
            <h4 className="font-semibold mb-3">Solar Victoria Rebate</h4>
            <div className="bg-green-50 rounded-lg p-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Rebate amount:</span>
                <span className="font-medium">{formatCurrency(SOLAR_ASSUMPTIONS.SOLAR_VICTORIA_REBATE)}</span>
              </div>
              <div className="flex justify-between">
                <span>Interest-free loan option:</span>
                <span className="font-medium">{formatCurrency(SOLAR_ASSUMPTIONS.SOLAR_VICTORIA_LOAN_AMOUNT)}</span>
              </div>
              <div className="text-xs text-gray-600 mt-2">
                Loan: {formatCurrency(SOLAR_ASSUMPTIONS.SOLAR_VICTORIA_LOAN_MONTHLY)}/month for {SOLAR_ASSUMPTIONS.SOLAR_VICTORIA_LOAN_YEARS} years
              </div>
            </div>
          </div>
        )}

        {/* Cost Breakdown */}
        <div>
          <h4 className="font-semibold mb-3">Cost Breakdown</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>System cost (estimated):</span>
              <span className="font-medium">{formatCurrency(systemCost)}</span>
            </div>
            <div className="flex justify-between text-green-600">
              <span>Less total rebates:</span>
              <span className="font-medium">-{formatCurrency(results.totalRebates)}</span>
            </div>
            <div className="flex justify-between border-t pt-2 font-semibold">
              <span>Break-even cost:</span>
              <span>{formatCurrency(systemCost - results.totalRebates)}</span>
            </div>
            <div className="flex justify-between text-blue-600">
              <span>Buffer ({SOLAR_ASSUMPTIONS.PRICING_BUFFER_PERCENTAGE}%):</span>
              <span className="font-medium">+{formatCurrency((systemCost - results.totalRebates) * (SOLAR_ASSUMPTIONS.PRICING_BUFFER_PERCENTAGE / 100))}</span>
            </div>
            <div className="flex justify-between border-t pt-2 font-bold text-lg">
              <span>Final customer price:</span>
              <span className="text-blue-600">{formatCurrency(finalPrice)}</span>
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h5 className="font-semibold text-yellow-800 mb-2">Important Notes</h5>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Prices are estimates and may vary based on specific site conditions</li>
            <li>• Rebate amounts are subject to government policy changes</li>
            <li>• Final pricing requires a detailed site assessment</li>
            <li>• STC certificates are typically assigned to the installer</li>
            <li>• Solar Victoria rebates have eligibility criteria and may have waiting periods</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
