"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Check, X as XIcon } from "lucide-react";

interface Package {
  id: number;
  tier: string;
  kwDC: number;
  panels: string;
  inverter: string;
  battery: string | null;
  warranty: string;
  price: string;
  estAnnualYield: string;
  billReduction: string;
}

interface CompareModalProps {
  packages: Package[];
  isOpen: boolean;
  onClose: () => void;
}

export function CompareModal({ packages, isOpen, onClose }: CompareModalProps) {
  if (!isOpen || packages.length === 0) return null;

  const maxPackages = Math.min(packages.length, 4);
  const packagesToCompare = packages.slice(0, maxPackages);

  const comparisonFeatures = [
    { label: "System Size", key: "kwDC", suffix: "kW" },
    { label: "Price", key: "price" },
    { label: "Annual Yield", key: "estAnnualYield" },
    { label: "Bill Reduction", key: "billReduction" },
    { label: "Panels", key: "panels" },
    { label: "Inverter", key: "inverter" },
    { label: "Battery", key: "battery" },
    { label: "Warranty", key: "warranty" },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-7xl max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Compare Packages</h2>
            <Button variant="outline" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <div className="min-w-full">
            {/* Header Row */}
            <div className="grid grid-cols-5 gap-4 p-6 bg-gray-50 border-b">
              <div className="font-semibold">Features</div>
              {packagesToCompare.map((pkg) => (
                <div key={pkg.id} className="text-center">
                  <Badge variant={pkg.tier === "Premium" ? "default" : pkg.tier === "Mid-range" ? "secondary" : "outline"} className="mb-2">
                    {pkg.tier}
                  </Badge>
                  <h3 className="font-semibold">{pkg.kwDC}kW System</h3>
                </div>
              ))}
            </div>

            {/* Comparison Rows */}
            {comparisonFeatures.map((feature) => (
              <div key={feature.key} className="grid grid-cols-5 gap-4 p-4 border-b hover:bg-gray-50">
                <div className="font-medium">{feature.label}</div>
                {packagesToCompare.map((pkg) => (
                  <div key={pkg.id} className="text-center">
                    {feature.key === "battery" ? (
                      pkg.battery ? (
                        <div className="flex items-center justify-center">
                          <Check className="h-4 w-4 text-green-600 mr-1" />
                          <span className="text-sm">{pkg.battery}</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          <XIcon className="h-4 w-4 text-red-600 mr-1" />
                          <span className="text-sm text-gray-500">No Battery</span>
                        </div>
                      )
                    ) : (
                      <span className="text-sm">
                        {pkg[feature.key as keyof Package]}
                        {feature.suffix && ` ${feature.suffix}`}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ))}

            {/* Action Row */}
            <div className="grid grid-cols-5 gap-4 p-6 bg-gray-50">
              <div className="font-semibold">Actions</div>
              {packagesToCompare.map((pkg) => (
                <div key={pkg.id} className="text-center">
                  <Button size="sm" className="w-full">
                    Request Quote
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
