"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Zap, Battery, Shield } from 'lucide-react';

export default function SimpleRecommender() {
  const options = [
    {
      id: 'value',
      name: 'Value System',
      tier: 'value',
      systemSize: '5.5 kW',
      batterySize: null,
      features: ['Standard efficiency panels', 'String inverter', '10-year warranty'],
      icon: '💰',
      color: 'bg-green-100 text-green-800 border-green-200',
    },
    {
      id: 'balanced',
      name: 'Balanced System',
      tier: 'balanced',
      systemSize: '8.0 kW',
      batterySize: '8.0 kWh',
      features: ['High efficiency panels', 'Hybrid inverter', 'Battery storage', 'Smart monitoring'],
      icon: '⚖️',
      color: 'bg-blue-100 text-blue-800 border-blue-200',
    },
    {
      id: 'premium',
      name: 'Premium System',
      tier: 'premium',
      systemSize: '12.0 kW',
      batterySize: '15.0 kWh',
      features: ['Premium efficiency panels', 'Micro-inverters', 'Large battery storage', 'Advanced monitoring'],
      icon: '👑',
      color: 'bg-purple-100 text-purple-800 border-purple-200',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Your Solar Options</h2>
        <p className="text-muted-foreground text-lg">
          Here are three tailored PV/Battery solutions for your home
        </p>
      </div>

      {/* Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {options.map((option) => (
          <Card key={option.id} className={`relative border-2 ${option.color}`}>
            <CardHeader className="text-center pb-4">
              <div className="text-3xl mb-2">{option.icon}</div>
              <CardTitle className="text-xl">{option.name}</CardTitle>
              <Badge variant="secondary" className="w-fit mx-auto">
                {option.tier.charAt(0).toUpperCase() + option.tier.slice(1)}
              </Badge>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* System Details */}
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 flex items-center justify-center gap-2">
                  <Zap className="w-6 h-6" />
                  {option.systemSize}
                </div>
                {option.batterySize && (
                  <div className="text-lg text-green-600 flex items-center justify-center gap-2 mt-1">
                    <Battery className="w-5 h-5" />
                    {option.batterySize} Battery
                  </div>
                )}
              </div>

              {/* Features */}
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Key Features:
                </h4>
                <ul className="space-y-1 text-sm">
                  {option.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button variant="outline" className="gap-2">
          📧 Get Detailed Quote
        </Button>
        <Button className="gap-2">
          📅 Book Consultation
        </Button>
      </div>

      {/* Note */}
      <div className="text-center text-sm text-muted-foreground">
        <p>These are example options. Fill out the form above for personalized recommendations based on your specific needs.</p>
      </div>
    </div>
  );
}
