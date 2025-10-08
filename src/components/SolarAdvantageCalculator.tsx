"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, MapPin, Battery, Users, AlertCircle, CheckCircle, Zap, Info } from "lucide-react";
import { zoneForPostcode } from "@/data/postcode_zone_compact";
import { ZONE_FACTORS, DEEMING_YEARS, STC_PRICE, MODULE_OPTIONS, AUDIENCE_OPTIONS, SOLAR_VICTORIA_ELIGIBILITY, type AudienceType } from "@/config/stcConfig";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useIsCoarsePointer } from "@/lib/use-is-coarse-pointer";

interface CalculatorState {
  postcode: string;
  panelCount: number;
  moduleWatt: number;
  includeBattery: boolean;
  batterySize: number;
  audience: AudienceType;
  solarVictoriaEligibility: string[];
}

export default function SolarAdvantageCalculator() {
  const [state, setState] = useState<CalculatorState>({
    postcode: "",
    panelCount: 15, // Default to ~6.6kW with 440W panels
    moduleWatt: 440,
    includeBattery: false,
    batterySize: 10,
    audience: "residential",
    solarVictoriaEligibility: [],
  });

  const [showProposalDetails, setShowProposalDetails] = useState(false);
  const isCoarse = useIsCoarsePointer();

  const InfoHint: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => {
	const trigger = (
		<button
			aria-label={label}
			className="inline-flex items-center justify-center rounded-full h-5 w-5 ml-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
			type="button"
		>
			<Info className="h-3.5 w-3.5" />
		</button>
	);

	if (isCoarse) {
		return (
			<Dialog>
				<DialogTrigger asChild>{trigger}</DialogTrigger>
				<DialogContent>
					<DialogTitle className="text-base font-semibold">{label}</DialogTitle>
					<DialogDescription asChild>
						<div className="mt-2 max-w-[320px] text-sm leading-5 text-gray-700 dark:text-gray-200">{children}</div>
					</DialogDescription>
					<div className="mt-4 text-right">
						<DialogClose className="px-3 py-1 rounded-md border">Got it</DialogClose>
					</div>
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>{trigger}</TooltipTrigger>
				<TooltipContent side="top">
					<div className="max-w-[320px] text-sm leading-5 text-gray-700 dark:text-gray-200">{children}</div>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

  // Calculate system size from panels
  const systemSizeKw = useMemo(() => {
    return (state.panelCount * state.moduleWatt) / 1000;
  }, [state.panelCount, state.moduleWatt]);

  // Calculate panel limits based on module wattage
  const panelLimits = useMemo(() => {
    const minPanels = Math.ceil(3000 / state.moduleWatt);
    const maxPanels = Math.floor(30000 / state.moduleWatt);
    return { minPanels, maxPanels };
  }, [state.moduleWatt]);

  // Clamp panel count when module wattage changes
  React.useEffect(() => {
    const { minPanels, maxPanels } = panelLimits;
    if (state.panelCount < minPanels || state.panelCount > maxPanels) {
      setState(prev => ({
        ...prev,
        panelCount: Math.max(minPanels, Math.min(maxPanels, prev.panelCount))
      }));
    }
  }, [state.moduleWatt, panelLimits, state.panelCount]);

  const zone = useMemo(() => {
    if (state.postcode.length === 4) {
      return zoneForPostcode(state.postcode);
    }
    return null;
  }, [state.postcode]);

  const stcCalculation = useMemo(() => {
    if (!zone) return null;
    
    const zoneFactor = ZONE_FACTORS[zone as keyof typeof ZONE_FACTORS];
    
    // Solar STCs
    const rawSolarStcs = systemSizeKw * zoneFactor * DEEMING_YEARS;
    const solarStcs = Math.floor(rawSolarStcs); // Floor to whole certificates
    const solarValue = solarStcs * STC_PRICE;
    
    // Battery STCs (if battery is included)
    const batteryStcs = state.includeBattery ? Math.floor(state.batterySize * zoneFactor * DEEMING_YEARS) : 0;
    const batteryValue = batteryStcs * STC_PRICE;
    
    // Solar Victoria rebate
    const solarVictoriaEligible = state.solarVictoriaEligibility.length === 4;
    const solarVictoriaRebate = solarVictoriaEligible ? 1400 : 0;
    
    // Total rebates
    const totalRebates = solarValue + batteryValue + solarVictoriaRebate;
    
    return {
      solarStcs,
      rawSolarStcs,
      solarValue,
      batteryStcs,
      batteryValue,
      solarVictoriaRebate,
      totalRebates,
      zoneFactor,
      solarVictoriaEligible,
      breakdown: `${state.panelCount} panels × ${state.moduleWatt} W = ${systemSizeKw.toFixed(1)} kW × zone factor ${zoneFactor.toFixed(3)} × ${DEEMING_YEARS} years`,
      batteryBreakdown: state.includeBattery ? `${state.batterySize} kW × zone factor ${zoneFactor.toFixed(3)} × ${DEEMING_YEARS} years` : null,
    };
  }, [systemSizeKw, state.panelCount, state.moduleWatt, state.batterySize, state.includeBattery, state.solarVictoriaEligibility.length, zone]);

  const isCalculationEnabled = zone !== null && state.postcode.length === 4;

  const handlePostcodeChange = (value: string) => {
    const numericValue = value.replace(/\D/g, "").slice(0, 4);
    setState(prev => ({ ...prev, postcode: numericValue }));
  };

  const handleSolarVictoriaChange = (id: string, checked: boolean) => {
    setState(prev => ({
      ...prev,
      solarVictoriaEligibility: checked
        ? [...prev.solarVictoriaEligibility, id]
        : prev.solarVictoriaEligibility.filter(item => item !== id)
    }));
  };

  // Helpers for proposal
  const inverterOptionsKw = [3, 5, 6, 8, 10, 15, 20, 25, 30];
  const requiredInverterKw = systemSizeKw / 1.33; // must support up to 133%
  const selectedInverterKw = inverterOptionsKw.find((kw) => kw >= requiredInverterKw) ?? inverterOptionsKw[inverterOptionsKw.length - 1];

  // Panels derived from spec: each is 0.44 kW
  const panelsByRule = Math.max(1, Math.round(systemSizeKw / 0.44));

  // Rough internal estimate for market price (not shown per-line). Values are placeholders for dynamic pricing examples.
  const estimatedMarketPrice = useMemo(() => {
    const pvPrice = systemSizeKw * 1200; // $/kW heuristic
    const inverterPrice = selectedInverterKw * 150; // $/kW heuristic
    const batteryPrice = state.includeBattery ? state.batterySize * 400 : 0; // $/kWh heuristic
    const fixeds = 800; // mounts, inspection, misc
    return Math.max(0, Math.round(pvPrice + inverterPrice + batteryPrice + fixeds));
  }, [systemSizeKw, selectedInverterKw, state.includeBattery, state.batterySize]);

  const rebatesTotal = stcCalculation?.totalRebates ?? 0;
  const breakEvenAfterRebates = Math.max(0, estimatedMarketPrice - rebatesTotal);
  const finalCustomerPrice = Math.round(breakEvenAfterRebates * 1.05); // ~5% buffer above break-even

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {/* Input Panel */}
        <Card className="shadow-lg h-full lg:min-h-[640px] flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-blue-600" />
              System Details
            </CardTitle>
            <CardDescription>
              Enter your location and system specifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 flex-1 flex flex-col">
            {/* Postcode Input */}
            <div className="space-y-2">
              <Label htmlFor="postcode">Postcode *</Label>
              <Input
                id="postcode"
                type="text"
                placeholder="3000"
                value={state.postcode}
                onChange={(e) => handlePostcodeChange(e.target.value)}
                maxLength={4}
                className="text-center text-lg font-mono"
              />
              {state.postcode.length === 4 && zone && (
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    STC Zone: {zone}
                  </Badge>
                </div>
              )}
              {state.postcode.length === 4 && !zone && (
                <div className="flex items-center gap-2 text-sm text-red-600">
                  <AlertCircle className="h-4 w-4" />
                  <span>Invalid postcode for Victoria</span>
                </div>
              )}
            </div>


            {/* Panel Count Slider */}
            <div className="space-y-3">
              <Label>System Size: {systemSizeKw.toFixed(1)} kW</Label>
              <Slider
                value={[state.panelCount]}
                onValueChange={(value) => setState(prev => ({ ...prev, panelCount: value[0] }))}
                min={panelLimits.minPanels}
                max={panelLimits.maxPanels}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{((panelLimits.minPanels * state.moduleWatt) / 1000).toFixed(1)} kW</span>
                <span>{((panelLimits.maxPanels * state.moduleWatt) / 1000).toFixed(1)} kW</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Panels: {state.panelCount} × {state.moduleWatt} W
              </p>
            </div>

            {/* Battery Toggle */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="battery"
                checked={state.includeBattery}
                onCheckedChange={(checked) => setState(prev => ({ ...prev, includeBattery: !!checked }))}
              />
              <Label htmlFor="battery" className="flex items-center gap-2">
                <Battery className="h-4 w-4" />
                Include Battery Storage
              </Label>
            </div>

            {/* Battery Size Slider - Only show if battery is included */}
            {state.includeBattery && (
              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <Battery className="h-4 w-4" />
                  Battery Size: {state.batterySize} kW
                </Label>
                <Slider
                  value={[state.batterySize]}
                  onValueChange={(value) => setState(prev => ({ ...prev, batterySize: value[0] }))}
                  min={5}
                  max={50}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>5 kW</span>
                  <span>50 kW</span>
                </div>
              </div>
            )}

            {/* Audience Selection */}
            <div className="space-y-2">
              <Label htmlFor="audience">Audience</Label>
              <Select
                value={state.audience}
                onValueChange={(value) => setState(prev => ({ ...prev, audience: value as AudienceType }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {AUDIENCE_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        {option.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Solar Victoria Eligibility */}
            <div className="space-y-3">
              <Label>Solar Victoria Eligibility</Label>
              <div className="space-y-2">
                {SOLAR_VICTORIA_ELIGIBILITY.map((item) => (
                  <div key={item.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={item.id}
                      checked={state.solarVictoriaEligibility.includes(item.id)}
                      onCheckedChange={(checked) => handleSolarVictoriaChange(item.id, !!checked)}
                    />
                    <Label htmlFor={item.id} className="text-sm">
                      {item.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Panel */}
        <Card className="shadow-lg lg:col-span-1 h-full lg:min-h-[640px] flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-green-600" />
              Estimated Rebates
            </CardTitle>
            <CardDescription>
              Your potential savings and incentives
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 flex-1 flex flex-col">
            {isCalculationEnabled && stcCalculation ? (
              <>
                {/* Solar Victoria Rebates */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-medium text-green-900 mb-2 flex items-center gap-2">
                    Solar Victoria Rebates
                    <InfoHint label="Solar Victoria: eligibility and options">
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Eligibility requires meeting all 4 checklist items.</li>
                        <li>Rebate $1,400; optional interest-free loan of $1,400 over 4 years.</li>
                      </ul>
                    </InfoHint>
                  </h4>
                  <div className="space-y-2">
                    {stcCalculation.solarVictoriaEligible ? (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-green-800">
                          <CheckCircle className="h-4 w-4" />
                          <span className="text-sm">Eligible for Solar Victoria rebates</span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-amber-700">
                        <AlertCircle className="h-4 w-4" />
                        <span className="text-sm">
                          {state.solarVictoriaEligibility.length}/4 criteria met - Check all requirements
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Federal STCs (PV) */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-blue-900">Federal STCs (PV)</h3>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <Badge variant="default" className="bg-blue-600">
                          {stcCalculation.solarStcs} STCs
                        </Badge>
                        <p className="text-sm font-medium text-blue-900 mt-1">
                          ${stcCalculation.solarValue.toLocaleString()}
                        </p>
                      </div>
                      <InfoHint label="PV STC calculation details">
                        <div className="space-y-2">
                          <p className="font-mono text-sm">{stcCalculation.breakdown}</p>
                          <p className="text-sm">Raw calculation: {stcCalculation.rawSolarStcs.toFixed(1)} STCs (floored to {stcCalculation.solarStcs})</p>
                          <p className="text-sm">* STC price: ${STC_PRICE} per STC</p>
                        </div>
                      </InfoHint>
                    </div>
                  </div>
                </div>

                {/* Federal STCs (Battery) */}
                {state.includeBattery && stcCalculation.batteryBreakdown && (
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-green-900">Federal STCs (Battery)</h3>
                      <div className="flex items-center gap-2">
                        <div className="text-right">
                          <Badge variant="default" className="bg-green-600">{stcCalculation.batteryStcs} STCs</Badge>
                          <p className="text-sm font-medium text-green-900 mt-1">${stcCalculation.batteryValue.toLocaleString()}</p>
                        </div>
                        <InfoHint label="Battery STC calculation details">
                          <div className="space-y-2">
                            <p className="font-mono text-sm">{stcCalculation.batteryBreakdown}</p>
                            <p className="text-sm">Total: {stcCalculation.batteryStcs} STCs</p>
                          </div>
                        </InfoHint>
                      </div>
                    </div>
                  </div>
                )}

                {/* Total Rebates */}
                <div className="rounded-lg border bg-white p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Total Rebates</h3>
                    <p className="text-xl font-bold text-purple-900">${stcCalculation.totalRebates.toLocaleString()}</p>
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                    <div className="rounded bg-blue-50 px-2 py-1">PV STCs: ${stcCalculation.solarValue.toLocaleString()}</div>
                    {state.includeBattery && (
                      <div className="rounded bg-green-50 px-2 py-1">Battery STCs: ${stcCalculation.batteryValue.toLocaleString()}</div>
                    )}
                    <div className="rounded bg-emerald-50 px-2 py-1">Solar Victoria: ${stcCalculation.solarVictoriaRebate.toLocaleString()}</div>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Calculator className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Enter a valid Victorian postcode to see your rebate estimates</p>
              </div>
            )}

            {/* Calculate Button */}
            <Button 
              className="w-full mt-auto" 
              size="lg"
              disabled={!isCalculationEnabled}
              onClick={() => {
                if (isCalculationEnabled && stcCalculation) {
                  console.log("Calculated Rebates:", {
                    postcode: state.postcode,
                    zone: zone,
                    panelCount: state.panelCount,
                    moduleWatt: state.moduleWatt,
                    systemSizeKw: systemSizeKw,
                    solarStcs: stcCalculation.solarStcs,
                    solarValue: stcCalculation.solarValue,
                    solarVictoriaRebate: stcCalculation.solarVictoriaRebate,
                    totalRebates: stcCalculation.totalRebates,
                    solarVictoriaEligible: stcCalculation.solarVictoriaEligible
                  });
                  
                  const solarVictoriaInfo = stcCalculation.solarVictoriaEligible 
                    ? `\nSolar Victoria Rebate: $${stcCalculation.solarVictoriaRebate.toLocaleString()}\nInterest-free loan option: $29.17/month for 4 years`
                    : '\nSolar Victoria: Not eligible (need all 4 criteria)';
                  
                  const batteryInfo = state.includeBattery ? `\nFederal STCs (Battery): ${stcCalculation.batteryStcs} STCs ($${stcCalculation.batteryValue.toLocaleString()})` : '';
                  
                  alert(`Total Rebates: $${stcCalculation.totalRebates.toLocaleString()}\n\nBreakdown:\nFederal STCs (PV): ${stcCalculation.solarStcs} STCs ($${stcCalculation.solarValue.toLocaleString()})${batteryInfo}${solarVictoriaInfo}\n\nSystem: ${state.panelCount} panels × ${state.moduleWatt}W = ${systemSizeKw.toFixed(1)}kW`);
                }
              }}
            >
              {isCalculationEnabled ? "Calculate Rebates" : "Enter Valid Postcode"}
            </Button>
          </CardContent>
        </Card>
        {/* Proposal & Details Panel */}
        <Card className="shadow-lg lg:col-span-1 h-full lg:min-h-[640px] flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-blue-600" />
              Proposal Summary
            </CardTitle>
            <CardDescription>
              System components and estimated customer price
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 text-sm flex-1 flex flex-col">
            {/* Proposal Table */}
            <div className="rounded-lg border overflow-hidden">
              <div className="grid grid-cols-12 bg-muted/50 px-3 py-2 text-xs font-medium">
                <div className="col-span-6">Particulars</div>
                <div className="col-span-2 text-center">Qty</div>
                <div className="col-span-2 text-right">Unit Price</div>
                <div className="col-span-2 text-right">Total</div>
              </div>
              <div className="divide-y divide-gray-200 dark:divide-gray-800 max-h-60 overflow-y-auto">
                <div className="grid grid-cols-12 px-3 py-2">
                  <div className="col-span-6">Solar Panels ({Math.max(panelsByRule, state.panelCount)} × 440 W)</div>
                  <div className="col-span-2 text-center">{Math.max(panelsByRule, state.panelCount)}</div>
                  <div className="col-span-2 text-right">XXX</div>
                  <div className="col-span-2 text-right">XXX</div>
                </div>
                <div className="grid grid-cols-12 px-3 py-2">
                  <div className="col-span-6">Inverter ({selectedInverterKw} kW)</div>
                  <div className="col-span-2 text-center">1</div>
                  <div className="col-span-2 text-right">XXX</div>
                  <div className="col-span-2 text-right">XXX</div>
                </div>
                <div className="grid grid-cols-12 px-3 py-2">
                  <div className="col-span-6">Mounting Kit</div>
                  <div className="col-span-2 text-center">1</div>
                  <div className="col-span-2 text-right">XXX</div>
                  <div className="col-span-2 text-right">XXX</div>
                </div>
                <div className="grid grid-cols-12 px-3 py-2">
                  <div className="col-span-6">Independent Inspection</div>
                  <div className="col-span-2 text-center">1</div>
                  <div className="col-span-2 text-right">XXX</div>
                  <div className="col-span-2 text-right">XXX</div>
                </div>
                {state.includeBattery && (
                  <div className="grid grid-cols-12 px-3 py-2">
                    <div className="col-span-6">Battery · Model X (Capacity {state.batterySize} kWh)</div>
                    <div className="col-span-2 text-center">1</div>
                    <div className="col-span-2 text-right">XXX</div>
                    <div className="col-span-2 text-right">XXX</div>
                  </div>
                )}
              </div>
              <div className="px-3 py-2 text-xs text-muted-foreground border-t">
                All pricing lines use placeholder values (XXX). Contact us for an exact quote.
              </div>
            </div>

            {/* Pricing Summary */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Estimated market price</span>
                <span className="font-medium">${estimatedMarketPrice.toLocaleString()}</span>
              </div>
              <div className="border-t pt-2 space-y-1">
                <div className="flex items-center justify-between text-emerald-700">
                  <span>PV STCs</span>
                  <span>-${(stcCalculation?.solarValue ?? 0).toLocaleString()}</span>
                </div>
                {state.includeBattery && (
                  <div className="flex items-center justify-between text-emerald-700">
                    <span>Battery STCs</span>
                    <span>-${(stcCalculation?.batteryValue ?? 0).toLocaleString()}</span>
                  </div>
                )}
                {stcCalculation?.solarVictoriaRebate ? (
                  <div className="flex items-center justify-between text-emerald-700">
                    <span>Solar Victoria</span>
                    <span>-${stcCalculation.solarVictoriaRebate.toLocaleString()}</span>
                  </div>
                ) : null}
              </div>
              <div className="border-t pt-2 flex items-center justify-between">
                <span className="font-medium">Estimated final customer price</span>
                <span className="text-lg font-bold text-purple-900">${finalCustomerPrice.toLocaleString()}</span>
              </div>
              <p className="text-xs text-muted-foreground">The prices you see are just estimates — reach out and we’ll give you the exact quote for your project.</p>
            </div>

            <div className="pt-2 mt-auto">
              <Button asChild className="w-full" size="lg">
                <a href="/contact">Contact Us for Exact Pricing</a>
              </Button>
            </div>

          </CardContent>
        </Card>
      </div>
    </div>
  );
}
