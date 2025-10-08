"use client";

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, CheckCircle } from 'lucide-react';
import { LeadInfo, UserInputs, RecommenderResult, ConsentInfo } from '@/types/recommender';
import { recommendSystems } from '@/lib/recommender/engine';
import InputsForm from './InputsForm';
import OptionsDisplay from './OptionsDisplay';

export default function RecommenderEntry() {
  const [currentStep, setCurrentStep] = useState<'form' | 'loading' | 'results' | 'success'>('form');
  const [result, setResult] = useState<RecommenderResult | null>(null);
  const [leadData, setLeadData] = useState<{ lead: LeadInfo; inputs: UserInputs } | null>(null);

  const handleFormSubmit = async (data: { lead: LeadInfo; inputs: UserInputs }) => {
    setCurrentStep('loading');
    setLeadData(data);
    
    try {
      // Generate recommendations
      const recommendations = recommendSystems(data.inputs);
      setResult(recommendations);
      
      // Save lead data (including NMI if provided)
      await saveLeadData(data, recommendations);
      
      setCurrentStep('results');
    } catch (error) {
      console.error('Error generating recommendations:', error);
      setCurrentStep('form');
    }
  };

  const saveLeadData = async (data: { lead: LeadInfo; inputs: UserInputs }, result: RecommenderResult) => {
    try {
      const leadRecord = {
        ...data.lead,
        inputs: data.inputs,
        options: result.options,
        consent: {
          marketingOptIn: true, // Based on form submission
          ts: Date.now(),
        } as ConsentInfo,
        createdAt: new Date().toISOString(),
      };

      // Save to your database/API
      const response = await fetch('/api/leads/recommender', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leadRecord),
      });

      if (!response.ok) {
        console.warn('Failed to save lead data:', await response.text());
      }
    } catch (error) {
      console.warn('Error saving lead data:', error);
    }
  };

  const handleEmailOptions = async () => {
    if (!leadData || !result) return;
    
    try {
      const response = await fetch('/api/leads/email-options', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lead: leadData.lead,
          options: result.options,
        }),
      });

      if (response.ok) {
        setCurrentStep('success');
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  const handleBookConsultation = () => {
    // Open calendar booking link
    window.open('https://calendly.com/xtechs/solar-consultation', '_blank');
  };

  if (currentStep === 'loading') {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center space-y-4">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto" />
            <div>
              <h3 className="text-lg font-semibold">Generating Your Options</h3>
              <p className="text-muted-foreground">
                Analyzing your requirements and calculating optimal solutions...
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (currentStep === 'success') {
    return (
      <Card className="w-full max-w-2xl mx-auto border-green-200 bg-green-50">
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center space-y-4">
            <CheckCircle className="w-12 h-12 text-green-600 mx-auto" />
            <div>
              <h3 className="text-lg font-semibold text-green-800">Email Sent!</h3>
              <p className="text-green-700">
                Your solar options have been sent to your email address.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (currentStep === 'results' && result) {
    return (
      <OptionsDisplay
        result={result}
        onEmailOptions={handleEmailOptions}
        onBookConsultation={handleBookConsultation}
      />
    );
  }

  return (
    <InputsForm
      onSubmit={handleFormSubmit}
      isLoading={currentStep === 'loading'}
    />
  );
}
