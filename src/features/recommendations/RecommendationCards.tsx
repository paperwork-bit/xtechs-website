"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronUp, Mail, Calendar, Info, AlertTriangle } from 'lucide-react';
import { SystemOption } from '@/types/recommender';
import { formatCurrency, formatNumber } from '@/lib/recommender/utils';

interface RecommendationCardsProps {
  recommendations: SystemOption[];
  onEmailOptions: () => void;
  onBookConsultation: () => void;
}

export default function RecommendationCards({ 
  recommendations, 
  onEmailOptions, 
  onBookConsultation 
}: RecommendationCardsProps) {
  const [showAssumptions, setShowAssumptions] = React.useState(false);

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

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'bg-green-100 text-green-800';
    if (confidence >= 0.6) return 'bg-yellow-100 text-yellow-800';
    return 'bg-orange-100 text-orange-800';
  };

  const getConfidenceLabel = (confidence: number) => {
    if (confidence >= 0.8) return 'High';
    if (confidence >= 0.6) return 'Medium';
    return 'Low';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Your Solar Recommendations</h2>
        <p className="text-muted-foreground">
          Based on your inputs, here are three tailored PV/Battery solutions
        </p>
      </div>

      {/* Assumptions Chip Row */}
      <div className="flex flex-wrap gap-2 justify-center">
        <Badge variant="outline" className="text-xs">
          Tariff 30c/kWh
        </Badge>
        <Badge variant="outline" className="text-xs">
          FiT 4c
        </Badge>
        <Badge variant="outline" className="text-xs">
          Export cap 5kW
        </Badge>
        <Badge variant="outline" className="text-xs">
          Usage ~18kWh/day
        </Badge>
        <Badge variant="outline" className="text-xs">
          Single-phase
        </Badge>
      </div>

      {/* Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recommendations.map((recommendation) => (
          <Card key={recommendation.id} className={`relative border-2 ${getTierColor(recommendation.tier)}`}>
            <CardHeader className="text-center pb-4">
              <div className="text-2xl mb-2">{getTierIcon(recommendation.tier)}</div>
              <CardTitle className="text-xl">{recommendation.name}</CardTitle>
              <div className="flex justify-center gap-2 mt-2">
                <Badge variant="secondary" className="w-fit">
                  {recommendation.tier.charAt(0).toUpperCase() + recommendation.tier.slice(1)}
                </Badge>
                <Badge 
                  variant="outline" 
                  className={`text-xs ${getConfidenceColor(recommendation.score.confidence)}`}
                >
                  Confidence: {getConfidenceLabel(recommendation.score.confidence)} ({recommendation.score.confidence.toFixed(2)})
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* System Details */}
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {recommendation.systemSize} kW
                </div>
                {recommendation.batterySize && (
                  <div className="text-lg text-green-600">
                    + {recommendation.batterySize} kWh Battery
                  </div>
                )}
              </div>

              {/* Rebates & Savings */}
              <div className="space-y-2">
                <div className="flex justify-between text-green-600">
                  <span>Annual Savings:</span>
                  <span className="font-semibold">{formatCurrency(recommendation.annualSavings)}</span>
                </div>
                <div className="flex justify-between text-blue-600">
                  <span>Federal STCs:</span>
                  <span className="font-semibold">{formatCurrency(recommendation.rebates.federalSTCs)}</span>
                </div>
                <div className="flex justify-between text-purple-600">
                  <span>Solar Victoria:</span>
                  <span className="font-semibold">{formatCurrency(recommendation.rebates.solarVictoriaRebate)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-2">
                  <span>Total Rebates:</span>
                  <span className="text-green-600">{formatCurrency(recommendation.rebates.totalRebates)}</span>
                </div>
              </div>

              {/* Why This Pick */}
              <div>
                <h4 className="font-semibold mb-2">Why this pick:</h4>
                <ul className="space-y-1 text-sm">
                  {recommendation.score.reasons.map((reason, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full flex-shrink-0" />
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Export Cap Warning */}
              {recommendation.systemSize > 5 && (
                <div className="p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded border border-yellow-200 dark:border-yellow-800">
                  <div className="flex items-center gap-2 text-xs text-yellow-800 dark:text-yellow-200">
                    <AlertTriangle className="w-3 h-3" />
                    Export may be limited to 5 kW on single-phase; we applied a cap in estimates.
                  </div>
                </div>
              )}

              {/* Tesla-specific highlights */}
              {recommendation.features.some(f => f.includes('Tesla')) && (
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
              {recommendation.evCharger && (
                <div className="mt-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-sm font-medium text-green-800 dark:text-green-200">EV Charging</span>
                  </div>
                  <p className="text-xs text-green-700 dark:text-green-300">
                    {recommendation.evCharger.brand} {recommendation.evCharger.model} ({recommendation.evCharger.power}) - Perfect match for your EV brand with smart charging features.
                  </p>
                </div>
              )}
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
                  <li>• Tariff: 30c/kWh</li>
                  <li>• FiT: 4c</li>
                  <li>• Export Cap: 5kW</li>
                  <li>• Usage: ~18kWh/day</li>
                  <li>• Phase: Single-phase</li>
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
