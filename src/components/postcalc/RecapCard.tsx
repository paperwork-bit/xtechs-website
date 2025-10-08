"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronUp, Download, Calendar } from 'lucide-react';
import { calculateSystemCost, calculateFinalPrice } from '@/lib/rebates';
import { RebateCalculation, RebateResults } from '@/lib/rebates';
import BreakdownDrawer from './BreakdownDrawer';

interface RecapCardProps {
  inputs: RebateCalculation;
  results: RebateResults;
  onBookConsult: () => void;
  onDownloadPDF: () => void;
}

export default function RecapCard({ inputs, results, onBookConsult, onDownloadPDF }: RecapCardProps) {
  const [showBreakdown, setShowBreakdown] = useState(false);
  
  const systemCost = calculateSystemCost(inputs.systemSizeKw, inputs.includeBattery, inputs.batterySizeKwh);
  const finalPrice = calculateFinalPrice(systemCost, results.totalRebates);
  const outOfPocket = finalPrice;
  
  const formatCurrency = (amount: number) => 
    new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(amount);

  return (
    <div className="space-y-4">
      <Card className="border-2 border-blue-100 bg-blue-50/50">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-semibold text-blue-900 flex items-center gap-2">
            Your Solar Savings Summary
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Ready to Save
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Key Numbers Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-white rounded-lg border">
              <div className="text-2xl font-bold text-gray-900">{formatCurrency(systemCost)}</div>
              <div className="text-sm text-gray-600">System Cost (est.)</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg border">
              <div className="text-2xl font-bold text-green-600">{formatCurrency(results.totalRebates)}</div>
              <div className="text-sm text-gray-600">Total Rebates</div>
            </div>
          </div>
          
          {/* Federal STC Breakdown */}
          <div className="bg-white rounded-lg border p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Federal STC Rebate (PV)</span>
              <span className="font-semibold text-blue-600">{formatCurrency(results.federalStcPv)}</span>
            </div>
            {results.federalStcBattery > 0 && (
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Federal STC Rebate (Battery)</span>
                <span className="font-semibold text-blue-600">{formatCurrency(results.federalStcBattery)}</span>
              </div>
            )}
            {results.solarVictoriaRebate > 0 && (
              <div className="flex justify-between items-center">
                <span className="font-medium">Solar Victoria Rebate</span>
                <span className="font-semibold text-green-600">{formatCurrency(results.solarVictoriaRebate)}</span>
              </div>
            )}
          </div>
          
          {/* Final Price */}
          <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border-2 border-blue-200 p-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">{formatCurrency(outOfPocket)}</div>
              <div className="text-sm text-gray-600">Estimated out-of-pocket cost</div>
              <div className="text-xs text-gray-500 mt-1">
                Includes ~5% buffer over break-even after rebates
              </div>
            </div>
          </div>
          
          {/* Breakdown Toggle */}
          <Button
            variant="outline"
            onClick={() => setShowBreakdown(!showBreakdown)}
            className="w-full justify-between"
          >
            <span>See breakdown</span>
            {showBreakdown ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </Button>
          
          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button onClick={onBookConsult} className="flex-1 gap-2">
              <Calendar className="w-4 h-4" />
              Book a Consult
            </Button>
            <Button onClick={onDownloadPDF} variant="outline" className="flex-1 gap-2">
              <Download className="w-4 h-4" />
              Download PDF
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Breakdown Drawer */}
      {showBreakdown && (
        <BreakdownDrawer
          inputs={inputs}
          results={results}
          systemCost={systemCost}
          finalPrice={finalPrice}
        />
      )}
    </div>
  );
}
