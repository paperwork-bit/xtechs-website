"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { RebateCalculation, RebateResults } from '@/lib/rebates';

interface LeadCaptureProps {
  inputs: RebateCalculation;
  results: RebateResults;
  onSuccess: (leadData: LeadData) => void;
}

export interface LeadData {
  name: string;
  email: string;
  phone: string;
  suburb: string;
  postcode: string;
  consentMarketing: boolean;
  consentAnalytics: boolean;
  utm: Record<string, string>;
  calculatorResults: {
    inputs: RebateCalculation;
    results: RebateResults;
  };
  createdAt: string;
}

export default function LeadCapture({ inputs, results, onSuccess }: LeadCaptureProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    suburb: '',
    postcode: inputs.postcode || '',
  });
  
  const [consent, setConsent] = useState({
    marketing: false,
    analytics: false,
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleConsentChange = (field: 'marketing' | 'analytics', checked: boolean) => {
    setConsent(prev => ({ ...prev, [field]: checked }));
  };

  const validateForm = () => {
    if (!formData.email.trim()) {
      setErrorMessage('Email is required');
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage('Please enter a valid email address');
      return false;
    }
    
    if (!formData.name.trim()) {
      setErrorMessage('Name is required');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setSubmitStatus('error');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');
    
    try {
      // Capture UTM parameters
      const urlParams = new URLSearchParams(window.location.search);
      const utm: Record<string, string> = {};
      ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(param => {
        const value = urlParams.get(param);
        if (value) utm[param] = value;
      });
      
      const leadData: LeadData = {
        ...formData,
        consentMarketing: consent.marketing,
        consentAnalytics: consent.analytics,
        utm,
        calculatorResults: {
          inputs,
          results,
        },
        createdAt: new Date().toISOString(),
      };
      
      // Submit to API
      const response = await fetch('/api/leads/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leadData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit lead data');
      }
      
      setSubmitStatus('success');
      onSuccess(leadData);
      
    } catch (error) {
      console.error('Lead capture error:', error);
      setSubmitStatus('error');
      setErrorMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <CheckCircle className="w-12 h-12 text-green-600 mx-auto" />
            <div>
              <h3 className="text-lg font-semibold text-green-800">Thank you!</h3>
              <p className="text-green-700">
                Your savings report has been sent to your email. Check your inbox for your personalized solar guide.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-2 border-blue-100 bg-blue-50/50">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-blue-900">
          Get Your Personalized Solar Guide
        </CardTitle>
        <p className="text-blue-700 text-sm">
          We'll email your savings report & rebate checklist. Unsubscribe anytime.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Your full name"
              required
            />
          </div>
          
          {/* Email */}
          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="your.email@example.com"
              required
            />
          </div>
          
          {/* Phone */}
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="04XX XXX XXX"
            />
          </div>
          
          {/* Suburb */}
          <div>
            <Label htmlFor="suburb">Suburb</Label>
            <Input
              id="suburb"
              type="text"
              value={formData.suburb}
              onChange={(e) => handleInputChange('suburb', e.target.value)}
              placeholder="Your suburb"
            />
          </div>
          
          {/* Postcode */}
          <div>
            <Label htmlFor="postcode">Postcode</Label>
            <Input
              id="postcode"
              type="text"
              value={formData.postcode}
              onChange={(e) => handleInputChange('postcode', e.target.value)}
              placeholder="3000"
              maxLength={4}
            />
          </div>
          
          {/* Consent Checkboxes */}
          <div className="space-y-3 pt-2">
            <div className="flex items-start space-x-2">
              <Checkbox
                id="marketing"
                checked={consent.marketing}
                onCheckedChange={(checked) => handleConsentChange('marketing', checked as boolean)}
              />
              <Label htmlFor="marketing" className="text-sm leading-relaxed">
                I'd like to receive updates about solar solutions and special offers
              </Label>
            </div>
            
            <div className="flex items-start space-x-2">
              <Checkbox
                id="analytics"
                checked={consent.analytics}
                onCheckedChange={(checked) => handleConsentChange('analytics', checked as boolean)}
              />
              <Label htmlFor="analytics" className="text-sm leading-relaxed">
                I consent to analytics tracking to improve the website experience
              </Label>
            </div>
          </div>
          
          {/* Error Message */}
          {submitStatus === 'error' && (
            <div className="flex items-center gap-2 text-red-600 text-sm">
              <AlertCircle className="w-4 h-4" />
              {errorMessage}
            </div>
          )}
          
          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              'Get My Solar Guide'
            )}
          </Button>
          
          {/* Legal Text */}
          <p className="text-xs text-gray-600 text-center">
            By subscribing you agree to receive updates from xTechs. Unsubscribe anytime.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
