"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronUp, Mail, Calendar, Info } from 'lucide-react';
import { SystemOption, RecommenderResult } from '@/types/recommender';
import { formatCurrency, formatNumber } from '@/lib/recommender/utils';

interface OptionsDisplayProps {
  result: RecommenderResult;
  onEmailOptions: () => void;
  onBookConsultation: () => void;
}

export default function OptionsDisplay({ result, onEmailOptions, onBookConsultation }: OptionsDisplayProps) {
  const [showAssumptions, setShowAssumptions] = useState(false);

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'value': return 'bg-green-100 text-green-800 border-green-200';
      case 'balanced': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'premium': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'value': return '💰';
      case 'balanced': return '⚖️';
      case 'premium': return '👑';
      default: return '🔧';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Your Solar Options</h2>
        <p className="text-muted-foreground">
          Based on your inputs, here are three tailored PV/Battery solutions
        </p>
      </div>

      {/* Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {result.options.map((option) => (
          <Card key={option.id} className={`relative border-2 ${getTierColor(option.tier)}`}>
            <CardHeader className="text-center pb-4">
              <div className="text-2xl mb-2">{getTierIcon(option.tier)}</div>
              <CardTitle className="text-xl">{option.name}</CardTitle>
              <Badge variant="secondary" className="w-fit mx-auto">
                {option.tier.charAt(0).toUpperCase() + option.tier.slice(1)}
              </Badge>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* System Details */}
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {option.systemSize} kW
                </div>
                {option.batterySize && (
                  <div className="text-lg text-green-600">
                    + {option.batterySize} kWh Battery
                  </div>
                )}
              </div>

              {/* Features */}
              <div>
                <h4 className="font-semibold mb-2">Key Features:</h4>
                <ul className="space-y-1 text-sm">
                  {option.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tesla-specific highlights */}
              {option.features.some(f => f.includes('Tesla')) && (
                <div className="mt-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span className="text-sm font-medium text-blue-800 dark:text-blue-200">Premium Backup</span>
                  </div>
                  <p className="text-xs text-blue-700 dark:text-blue-300">
                    Tesla Powerwall 3 provides industry-leading backup power with 13.5 kWh capacity and 10-year warranty.
                  </p>
                </div>
              )}

              {/* EV Charger highlights */}
              {option.evCharger && (
                <div className="mt-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-sm font-medium text-green-800 dark:text-green-200">EV Charging</span>
                  </div>
                  <p className="text-xs text-green-700 dark:text-green-300">
                    {option.evCharger.brand} {option.evCharger.model} ({option.evCharger.power}) - Perfect match for your EV brand with smart charging features.
                  </p>
                </div>
              )}

              {/* Description */}
              <p className="text-sm text-muted-foreground">
                {option.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Assumptions Toggle */}
      <div className="text-center">
        <Button
          variant="outline"
          onClick={() => setShowAssumptions(!showAssumptions)}
          className="gap-2"
        >
          {showAssumptions ? (
            <>
              <ChevronUp className="w-4 h-4" />
              Hide Assumptions
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              Show Assumptions
            </>
          )}
        </Button>
      </div>

      {/* Assumptions Drawer */}
      {showAssumptions && (
        <Card className="border-dashed">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="w-5 h-5" />
              Assumptions & Disclaimers
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Calculation Assumptions:</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Tariff: {result.assumptions.tariff}¢/kWh</li>
                  <li>• Annual Usage: {formatNumber(result.assumptions.usage)} kWh</li>
                  <li>• Roof Complexity: {result.assumptions.roofComplexity}x</li>
                  <li>• Storey Adder: {formatCurrency(result.assumptions.storeyAdder)}</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Important Notes:</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• NMI is collected for reference only; we do not fetch billing or personal data.</li>
                  <li>• All values are indicative; final specs and pricing are confirmed after site/design and distributor pre-approval.</li>
                  <li>• Export limits, rebates and pricing are indicative; your DNSP and final design may change these.</li>
                  <li>• Payback periods are estimates based on current tariffs and usage patterns.</li>
                  <li>• Premium systems feature Tesla Powerwall 3 with AC-coupled design for optimal serviceability.</li>
                  <li>• SolarEdge inverters are not currently available; Fronius provides superior shade handling.</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button onClick={onEmailOptions} variant="outline" className="gap-2">
          <Mail className="w-4 h-4" />
          Email me these options
        </Button>
        <Button onClick={onBookConsultation} className="gap-2">
          <Calendar className="w-4 h-4" />
          Book consultation
        </Button>
      </div>
    </div>
  );
}
