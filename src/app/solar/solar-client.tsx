"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Filter, Star, Download, Plus } from "lucide-react";

export default function SolarClient() {
  const [filters, setFilters] = useState({
    systemSize: [6],
    inverterBrands: [] as string[],
    batteryBrands: [] as string[],
    roofTypes: [] as string[],
    budget: [10000, 50000]
  });

  const packages = [
    {
      id: 1,
      tier: "Premium",
      kwDC: 8.5,
      panels: "24x Jinko 355W",
      inverter: "Fronius Primo 8.2kW",
      battery: "Tesla Powerwall 3",
      warranty: "25 years panels, 10 years inverter",
      price: "$18,500",
      estAnnualYield: "12,500 kWh",
      billReduction: "85%",
      image: "/api/placeholder/400/300"
    },
    {
      id: 2,
      tier: "Mid-range",
      kwDC: 6.6,
      panels: "20x Longi 330W",
      inverter: "Sungrow 6kW",
      battery: "SigEnergy 10kWh",
      warranty: "25 years panels, 10 years inverter",
      price: "$14,200",
      estAnnualYield: "9,800 kWh",
      billReduction: "75%",
      image: "/api/placeholder/400/300"
    },
    {
      id: 3,
      tier: "Value",
      kwDC: 5.0,
      panels: "15x Canadian Solar 330W",
      inverter: "GoodWe 5kW",
      battery: null,
      warranty: "25 years panels, 10 years inverter",
      price: "$8,900",
      estAnnualYield: "7,200 kWh",
      billReduction: "65%",
      image: "/api/placeholder/400/300"
    }
  ];

  const inverterBrands = ["Sungrow", "Fronius", "GoodWe"];
  const batteryBrands = ["SigEnergy", "Tesla PW3", "Alpha/GoodWe"];
  const roofTypes = ["Tile", "Metal", "Concrete", "Flat"];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4">Solar Panels & Battery Storage Solutions</h1>
          <p className="text-center text-lg opacity-90 max-w-2xl mx-auto">
            Professional solar panel and battery storage installation across Victoria. Residential, commercial, and off-grid solutions.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="sticky top-16 z-40 bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Filter className="h-5 w-5" />
              <span className="font-medium">Filters</span>
            </div>
            <Button variant="outline" size="sm">
              Clear All
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filter Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Filter Packages</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* System Size */}
                <div>
                  <label className="block text-sm font-medium mb-2">System Size (kW)</label>
                  <Slider 
                    value={filters.systemSize}
                    onValueChange={(value) => setFilters({...filters, systemSize: value})}
                    max={20} 
                    step={0.5} 
                    className="w-full" 
                  />
                  <div className="flex justify-between text-sm text-gray-600 mt-1">
                    <span>3kW</span>
                    <span>20kW</span>
                  </div>
                </div>

                {/* Inverter Brands */}
                <div>
                  <label className="block text-sm font-medium mb-3">Inverter Brand</label>
                  <div className="space-y-2">
                    {inverterBrands.map((brand) => (
                      <div key={brand} className="flex items-center space-x-2">
                        <Checkbox 
                          id={brand}
                          checked={filters.inverterBrands.includes(brand)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setFilters({
                                ...filters,
                                inverterBrands: [...filters.inverterBrands, brand]
                              });
                            } else {
                              setFilters({
                                ...filters,
                                inverterBrands: filters.inverterBrands.filter(b => b !== brand)
                              });
                            }
                          }}
                        />
                        <label htmlFor={brand} className="text-sm">{brand}</label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Battery Brands */}
                <div>
                  <label className="block text-sm font-medium mb-3">Battery Brand</label>
                  <div className="space-y-2">
                    {batteryBrands.map((brand) => (
                      <div key={brand} className="flex items-center space-x-2">
                        <Checkbox 
                          id={brand}
                          checked={filters.batteryBrands.includes(brand)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setFilters({
                                ...filters,
                                batteryBrands: [...filters.batteryBrands, brand]
                              });
                            } else {
                              setFilters({
                                ...filters,
                                batteryBrands: filters.batteryBrands.filter(b => b !== brand)
                              });
                            }
                          }}
                        />
                        <label htmlFor={brand} className="text-sm">{brand}</label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Roof Types */}
                <div>
                  <label className="block text-sm font-medium mb-3">Roof Type</label>
                  <div className="space-y-2">
                    {roofTypes.map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox 
                          id={type}
                          checked={filters.roofTypes.includes(type)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setFilters({
                                ...filters,
                                roofTypes: [...filters.roofTypes, type]
                              });
                            } else {
                              setFilters({
                                ...filters,
                                roofTypes: filters.roofTypes.filter(t => t !== type)
                              });
                            }
                          }}
                        />
                        <label htmlFor={type} className="text-sm">{type}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Package Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {packages.map((pkg) => (
                <Card key={pkg.id} className="hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge variant={pkg.tier === "Premium" ? "default" : pkg.tier === "Mid-range" ? "secondary" : "outline"}>
                        {pkg.tier}
                      </Badge>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">4.8</span>
                      </div>
                    </div>
                    <CardTitle className="text-xl">{pkg.kwDC}kW System</CardTitle>
                    <CardDescription>{pkg.price}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Annual Yield:</span>
                        <p className="text-gray-600">{pkg.estAnnualYield}</p>
                      </div>
                      <div>
                        <span className="font-medium">Bill Reduction:</span>
                        <p className="text-gray-600">{pkg.billReduction}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Panels:</span>
                        <span className="text-gray-600">{pkg.panels}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Inverter:</span>
                        <span className="text-gray-600">{pkg.inverter}</span>
                      </div>
                      {pkg.battery && (
                        <div className="flex items-center justify-between text-sm">
                          <span>Battery:</span>
                          <span className="text-gray-600">{pkg.battery}</span>
                        </div>
                      )}
                    </div>

                    <div className="pt-4 space-y-2">
                      <Button className="w-full">
                        View Package
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        Add to Shortlist
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
