"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertCircle, Info, User, Mail, Phone, MapPin, Zap, Home, CreditCard, TrendingUp, Building2, Car } from 'lucide-react';
import { LeadInfo, UserInputs } from '@/types/recommender';
import { validateNMI } from '@/lib/recommender/utils';
import { getRetailerList } from '@/lib/tariffModel';

interface InputsFormProps {
  onSubmit: (data: { lead: LeadInfo; inputs: UserInputs }) => void;
  isLoading?: boolean;
}

export default function InputsForm({ onSubmit, isLoading = false }: InputsFormProps) {
  const [lead, setLead] = useState<LeadInfo>({
    name: '',
    email: '',
    phone: '',
    suburbOrPostcode: '',
    nmi: '',
  });
  
  const [inputs, setInputs] = useState<UserInputs>({
    phase: 'single',
    roofType: 'tile',
    storeys: 1,
    billingPeriod: 'monthly',
    billAmount: 200,
    usageLevel: 'moderate',
    assumedTariffCents: 32,
    hasElectricCar: false,
    evBrand: undefined,
    energyRetailer: undefined,
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [marketingOptIn, setMarketingOptIn] = useState(false);
  const [customRetailer, setCustomRetailer] = useState('');

  // Helper function to format display values
  const formatDisplayValue = (value: string, type: string) => {
    switch (type) {
      case 'phase':
        return value === 'single' ? 'Single Phase' : value === 'three' ? 'Three Phase' : 'Select phase';
      case 'roofType':
        return value === 'tile' ? 'Tile' : value === 'tin' ? 'Tin' : value === 'flat' ? 'Flat' : 'Select roof type';
      case 'storeys':
        return value === '1' ? '1 Storey' : value === '2' ? '2 Storeys' : value === '3' ? '3 Storeys' : 'Select storeys';
      case 'billingPeriod':
        return value === 'monthly' ? 'Monthly' : value === 'quarterly' ? 'Quarterly' : 'Select billing period';
      case 'usageLevel':
        return value === 'basic' ? 'Basic (Low usage)' : value === 'moderate' ? 'Moderate (Average usage)' : value === 'heavy' ? 'Heavy (High usage)' : 'Select usage level';
      case 'energyRetailer':
        return value || 'Select your energy retailer';
      case 'evBrand':
        return value || 'Select your EV brand';
      default:
        return value;
    }
  };

  const handleLeadChange = (field: keyof LeadInfo, value: string) => {
    setLead(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleInputChange = (field: keyof UserInputs, value: any) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    // Required fields
    if (!lead.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!lead.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // NMI validation
    const nmiValidation = validateNMI(lead.nmi);
    if (!nmiValidation.isValid) {
      newErrors.nmi = nmiValidation.error!;
    }
    
    // Bill amount validation
    if (inputs.billAmount <= 0) {
      newErrors.billAmount = 'Bill amount must be greater than 0';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    // Sanitize NMI
    const sanitizedLead = {
      ...lead,
      nmi: lead.nmi ? lead.nmi.trim().toUpperCase() : undefined,
    };
    
    onSubmit({
      lead: sanitizedLead,
      inputs,
    });
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold">Contact Information</CardTitle>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Contact Information */}
          <div className="space-y-4">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={lead.name}
                  onChange={(e) => handleLeadChange('name', e.target.value)}
                  placeholder="Your full name"
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && (
                  <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.name}
                  </p>
                )}
              </div>
              
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={lead.email}
                  onChange={(e) => handleLeadChange('email', e.target.value)}
                  placeholder="your.email@example.com"
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && (
                  <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.email}
                  </p>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={lead.phone}
                  onChange={(e) => handleLeadChange('phone', e.target.value)}
                  placeholder="04XX XXX XXX"
                />
              </div>
              
              <div>
                <Label htmlFor="suburbOrPostcode">Suburb or Postcode</Label>
                <Input
                  id="suburbOrPostcode"
                  value={lead.suburbOrPostcode}
                  onChange={(e) => handleLeadChange('suburbOrPostcode', e.target.value)}
                  placeholder="e.g., Richmond or 3121"
                />
              </div>
            </div>
            
            {/* NMI Field */}
            <div>
              <Label htmlFor="nmi">NMI (optional)</Label>
              <Input
                id="nmi"
                value={lead.nmi}
                onChange={(e) => handleLeadChange('nmi', e.target.value)}
                placeholder="e.g., 6401234567"
                className={errors.nmi ? 'border-red-500' : ''}
              />
              <p className="text-sm text-muted-foreground mt-1 flex items-start gap-1">
                <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                Found on your electricity bill. We use this only to reference your site; we don't access billing or personal data.
              </p>
              {errors.nmi && (
                <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.nmi}
                </p>
              )}
            </div>
          </div>

          {/* Technical Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Home className="w-5 h-5 text-green-600" />
              Technical Details
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="phase">Electrical Phase</Label>
                <Select value={inputs.phase} onValueChange={(value) => handleInputChange('phase', value)}>
                  <SelectTrigger>
                    <span className="text-sm">
                      {formatDisplayValue(inputs.phase, 'phase')}
                    </span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single Phase</SelectItem>
                    <SelectItem value="three">Three Phase</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="roofType">Roof Type</Label>
                <Select value={inputs.roofType} onValueChange={(value) => handleInputChange('roofType', value)}>
                  <SelectTrigger>
                    <span className="text-sm">
                      {formatDisplayValue(inputs.roofType, 'roofType')}
                    </span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tile">Tile</SelectItem>
                    <SelectItem value="tin">Tin</SelectItem>
                    <SelectItem value="flat">Flat</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="storeys">Storeys</Label>
                <Select value={inputs.storeys.toString()} onValueChange={(value) => handleInputChange('storeys', parseInt(value))}>
                  <SelectTrigger>
                    <span className="text-sm">
                      {formatDisplayValue(inputs.storeys.toString(), 'storeys')}
                    </span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Storey</SelectItem>
                    <SelectItem value="2">2 Storeys</SelectItem>
                    <SelectItem value="3">3 Storeys</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Billing Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-purple-600" />
              Billing Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="billingPeriod">Billing Period</Label>
                <Select value={inputs.billingPeriod} onValueChange={(value) => handleInputChange('billingPeriod', value)}>
                  <SelectTrigger>
                    <span className="text-sm">
                      {formatDisplayValue(inputs.billingPeriod, 'billingPeriod')}
                    </span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="billAmount">Bill Amount (AUD)</Label>
                <Input
                  id="billAmount"
                  type="number"
                  value={inputs.billAmount}
                  onChange={(e) => handleInputChange('billAmount', parseFloat(e.target.value) || 0)}
                  placeholder="200"
                  min="0"
                  step="0.01"
                  className={errors.billAmount ? 'border-red-500' : ''}
                />
                {errors.billAmount && (
                  <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.billAmount}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Usage Level */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-orange-600" />
              Energy Usage
            </h3>
            
            <div>
              <Label htmlFor="usageLevel">Usage Level</Label>
              <Select value={inputs.usageLevel} onValueChange={(value) => handleInputChange('usageLevel', value)}>
                <SelectTrigger>
                  <span className="text-sm">
                    {formatDisplayValue(inputs.usageLevel, 'usageLevel')}
                  </span>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic (Low usage)</SelectItem>
                  <SelectItem value="moderate">Moderate (Average usage)</SelectItem>
                  <SelectItem value="heavy">Heavy (High usage)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Energy Retailer */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Building2 className="w-5 h-5 text-indigo-600" />
              Energy Retailer
            </h3>
            
            <div>
              <Label htmlFor="energyRetailer">Who is your current energy retailer?</Label>
              <Select 
                value={inputs.energyRetailer || ''} 
                onValueChange={(value) => {
                  handleInputChange('energyRetailer', value);
                  if (value !== 'Other') {
                    setCustomRetailer('');
                  }
                }}
              >
                <SelectTrigger>
                  <span className="text-sm">
                    {formatDisplayValue(inputs.energyRetailer || '', 'energyRetailer')}
                  </span>
                </SelectTrigger>
                <SelectContent>
                  {getRetailerList().map((retailer) => (
                    <SelectItem key={retailer} value={retailer}>
                      {retailer}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground mt-1">
                We won't contact your retailer — this helps us tailor your assumptions.
              </p>
            </div>
            
            {inputs.energyRetailer === 'Other' && (
              <div>
                <Label htmlFor="customRetailer">Retailer Name</Label>
                <Input
                  id="customRetailer"
                  value={customRetailer}
                  onChange={(e) => {
                    setCustomRetailer(e.target.value);
                    handleInputChange('energyRetailer', e.target.value);
                  }}
                  placeholder="Enter your retailer name"
                />
              </div>
            )}
          </div>

          {/* Electric Vehicle */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Car className="w-5 h-5 text-emerald-600" />
              Electric Vehicle
            </h3>
            
            <div className="flex items-start space-x-2">
              <Checkbox
                id="hasElectricCar"
                checked={inputs.hasElectricCar}
                onCheckedChange={(checked) => {
                  handleInputChange('hasElectricCar', checked);
                  if (!checked) {
                    handleInputChange('evBrand', undefined);
                  }
                }}
              />
              <Label htmlFor="hasElectricCar" className="text-sm leading-relaxed">
                I have an electric vehicle or plan to get one
              </Label>
            </div>
            
            {inputs.hasElectricCar && (
              <div>
                <Label htmlFor="evBrand">EV Brand</Label>
                <Select value={inputs.evBrand || ''} onValueChange={(value) => handleInputChange('evBrand', value)}>
                  <SelectTrigger>
                    <span className="text-sm">
                      {formatDisplayValue(inputs.evBrand || '', 'evBrand')}
                    </span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Tesla">Tesla</SelectItem>
                    <SelectItem value="BYD">BYD</SelectItem>
                    <SelectItem value="BMW">BMW</SelectItem>
                    <SelectItem value="Mercedes">Mercedes</SelectItem>
                    <SelectItem value="Audi">Audi</SelectItem>
                    <SelectItem value="Volkswagen">Volkswagen</SelectItem>
                    <SelectItem value="Hyundai">Hyundai</SelectItem>
                    <SelectItem value="Kia">Kia</SelectItem>
                    <SelectItem value="Nissan">Nissan</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {/* Marketing Consent */}
          <div className="flex items-start space-x-2">
            <Checkbox
              id="marketing"
              checked={marketingOptIn}
              onCheckedChange={(checked) => setMarketingOptIn(checked as boolean)}
            />
            <Label htmlFor="marketing" className="text-sm leading-relaxed">
              I'd like to receive updates about solar solutions and special offers
            </Label>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full"
            size="lg"
          >
            {isLoading ? 'Generating Recommendations...' : 'Get My Solar Options'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}