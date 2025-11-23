"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Save, RotateCcw } from 'lucide-react';

interface VICSettings {
  region: string;
  vdoAnchors: {
    flatKwh_mid: number;
    flatKwh_lo: number;
    flatKwh_hi: number;
    dailySupply: number;
  };
  fitRange: {
    min: number;
    mid: number;
    max: number;
    note: string;
  };
  exportCaps: {
    "1p": { inverterKW: number; exportKW: number };
    "3p": { inverterKW: number; exportKW: number };
  };
  usageDefaults: {
    res_kWh_day_lo: number;
    res_kWh_day_hi: number;
    res_kWh_day_mid: number;
  };
  battery: {
    rtes_mid: number;
    rtes_range: [number, number];
  };
  retailerListVIC: string[];
  retailerNotes: string;
}

export default function PricingSettings() {
  const [settings, setSettings] = useState<VICSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      // In a real app, this would load from your backend
      // For now, we'll use the default settings
      const defaultSettings: VICSettings = {
        region: "VIC-2025H2",
        vdoAnchors: { flatKwh_mid: 0.30, flatKwh_lo: 0.25, flatKwh_hi: 0.35, dailySupply: 1.10 },
        fitRange: { min: 0.02, mid: 0.04, max: 0.07, note: "Retailer-set FiT from 1 Jul 2025" },
        exportCaps: { "1p": { inverterKW: 10, exportKW: 5 }, "3p": { inverterKW: 30, exportKW: 15 } },
        usageDefaults: { res_kWh_day_lo: 14, res_kWh_day_hi: 22, res_kWh_day_mid: 18 },
        battery: { rtes_mid: 0.93, rtes_range: [0.90, 0.95] },
        retailerListVIC: ["AGL", "Origin Energy", "EnergyAustralia", "Red Energy", "Powershop", "Simply Energy", "Momentum Energy", "Alinta Energy", "Tango Energy", "Other"],
        retailerNotes: "Retailer name is used for display/context only; pricing still uses static defaults unless an admin overrides."
      };
      
      setSettings(defaultSettings);
    } catch (error) {
      console.error('Failed to load settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!settings) return;
    
    setIsSaving(true);
    try {
      // In a real app, this would save to your backend
      localStorage.setItem('vic-pricing-settings', JSON.stringify(settings));
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Failed to save settings:', error);
      alert('Failed to save settings');
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset to default settings?')) {
      loadSettings();
    }
  };

  const updateSetting = (path: string, value: any) => {
    if (!settings) return;
    
    const newSettings = { ...settings };
    const keys = path.split('.');
    let current: any = newSettings;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
    setSettings(newSettings);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p>Loading settings...</p>
        </div>
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Failed to load settings</p>
        <Button onClick={loadSettings} className="mt-4">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Pricing Settings</h1>
        <div className="flex gap-2">
          <Button onClick={handleReset} variant="outline" className="gap-2">
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>
          <Button onClick={handleSave} disabled={isSaving} className="gap-2">
            <Save className="w-4 h-4" />
            {isSaving ? 'Saving...' : 'Save Settings'}
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tariff Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="flatKwh_mid">Flat Rate (Mid) - $/kWh</Label>
              <Input
                id="flatKwh_mid"
                type="number"
                step="0.01"
                value={settings.vdoAnchors.flatKwh_mid}
                onChange={(e) => updateSetting('vdoAnchors.flatKwh_mid', parseFloat(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="dailySupply">Daily Supply Charge - $/day</Label>
              <Input
                id="dailySupply"
                type="number"
                step="0.01"
                value={settings.vdoAnchors.dailySupply}
                onChange={(e) => updateSetting('vdoAnchors.dailySupply', parseFloat(e.target.value))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Feed-in Tariff (FiT) Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="fit_min">FiT Min - $/kWh</Label>
              <Input
                id="fit_min"
                type="number"
                step="0.01"
                value={settings.fitRange.min}
                onChange={(e) => updateSetting('fitRange.min', parseFloat(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="fit_mid">FiT Mid - $/kWh</Label>
              <Input
                id="fit_mid"
                type="number"
                step="0.01"
                value={settings.fitRange.mid}
                onChange={(e) => updateSetting('fitRange.mid', parseFloat(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="fit_max">FiT Max - $/kWh</Label>
              <Input
                id="fit_max"
                type="number"
                step="0.01"
                value={settings.fitRange.max}
                onChange={(e) => updateSetting('fitRange.max', parseFloat(e.target.value))}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="fit_note">FiT Note</Label>
            <Input
              id="fit_note"
              value={settings.fitRange.note}
              onChange={(e) => updateSetting('fitRange.note', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Export Capacity Limits</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Single Phase (1p)</h4>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="export_1p">Export Limit - kW</Label>
                  <Input
                    id="export_1p"
                    type="number"
                    value={settings.exportCaps["1p"].exportKW}
                    onChange={(e) => updateSetting('exportCaps.1p.exportKW', parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="inverter_1p">Inverter Limit - kW</Label>
                  <Input
                    id="inverter_1p"
                    type="number"
                    value={settings.exportCaps["1p"].inverterKW}
                    onChange={(e) => updateSetting('exportCaps.1p.inverterKW', parseInt(e.target.value))}
                  />
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Three Phase (3p)</h4>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="export_3p">Export Limit - kW</Label>
                  <Input
                    id="export_3p"
                    type="number"
                    value={settings.exportCaps["3p"].exportKW}
                    onChange={(e) => updateSetting('exportCaps.3p.exportKW', parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="inverter_3p">Inverter Limit - kW</Label>
                  <Input
                    id="inverter_3p"
                    type="number"
                    value={settings.exportCaps["3p"].inverterKW}
                    onChange={(e) => updateSetting('exportCaps.3p.inverterKW', parseInt(e.target.value))}
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Usage Defaults</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="usage_lo">Low Usage - kWh/day</Label>
              <Input
                id="usage_lo"
                type="number"
                value={settings.usageDefaults.res_kWh_day_lo}
                onChange={(e) => updateSetting('usageDefaults.res_kWh_day_lo', parseInt(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="usage_mid">Mid Usage - kWh/day</Label>
              <Input
                id="usage_mid"
                type="number"
                value={settings.usageDefaults.res_kWh_day_mid}
                onChange={(e) => updateSetting('usageDefaults.res_kWh_day_mid', parseInt(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="usage_hi">High Usage - kWh/day</Label>
              <Input
                id="usage_hi"
                type="number"
                value={settings.usageDefaults.res_kWh_day_hi}
                onChange={(e) => updateSetting('usageDefaults.res_kWh_day_hi', parseInt(e.target.value))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Battery Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="rtes_mid">Round-trip Efficiency (Mid)</Label>
            <Input
              id="rtes_mid"
              type="number"
              step="0.01"
              min="0"
              max="1"
              value={settings.battery.rtes_mid}
              onChange={(e) => updateSetting('battery.rtes_mid', parseFloat(e.target.value))}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Retailer List</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="retailer_notes">Retailer Notes</Label>
            <Input
              id="retailer_notes"
              value={settings.retailerNotes}
              onChange={(e) => updateSetting('retailerNotes', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
