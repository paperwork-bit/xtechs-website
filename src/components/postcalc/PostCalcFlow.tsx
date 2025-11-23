"use client";

import React, { useState, lazy, Suspense } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { RebateCalculation, RebateResults } from '@/lib/rebates';
import { LeadData } from './LeadCapture';

// Lazy load post-calculator components to avoid blocking hero
const RecapCard = lazy(() => import('./RecapCard'));
const LeadCapture = lazy(() => import('./LeadCapture'));

interface PostCalcFlowProps {
  inputs: RebateCalculation;
  results: RebateResults;
}

export default function PostCalcFlow({ inputs, results }: PostCalcFlowProps) {
  const [currentStep, setCurrentStep] = useState<'recap' | 'eligibility' | 'lead' | 'complete'>('recap');
  const [leadData, setLeadData] = useState<LeadData | null>(null);

  const handleBookConsult = () => {
    // Open calendar booking link
    window.open('https://calendly.com/xtechs/solar-consultation', '_blank');
  };

  const handleDownloadPDF = async () => {
    try {
      const response = await fetch('/api/pdf/generate-savings-report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs,
          results,
          leadData,
        }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `xTechs-Solar-Savings-Report-${new Date().toISOString().split('T')[0]}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error('PDF generation error:', error);
    }
  };

  const handleLeadSuccess = (data: LeadData) => {
    setLeadData(data);
    setCurrentStep('complete');
  };

  const handleEligibilityComplete = () => {
    setCurrentStep('lead');
  };

  return (
    <div className="space-y-6">
      {/* Progress Indicator */}
      <div className="flex items-center justify-center space-x-4">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
          currentStep === 'recap' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
        }`}>
          1
        </div>
        <div className={`w-16 h-1 ${currentStep === 'lead' || currentStep === 'complete' ? 'bg-blue-600' : 'bg-gray-200'}`} />
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
          currentStep === 'lead' ? 'bg-blue-600 text-white' : 
          currentStep === 'complete' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
        }`}>
          2
        </div>
        <div className={`w-16 h-1 ${currentStep === 'complete' ? 'bg-green-600' : 'bg-gray-200'}`} />
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
          currentStep === 'complete' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
        }`}>
          3
        </div>
      </div>

      {/* Step Content */}
      <Suspense fallback={
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </CardContent>
        </Card>
      }>
        {currentStep === 'recap' && (
          <RecapCard
            inputs={inputs}
            results={results}
            onBookConsult={handleBookConsult}
            onDownloadPDF={handleDownloadPDF}
          />
        )}

        {currentStep === 'eligibility' && (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <h3 className="text-xl font-semibold">Eligibility Check</h3>
                <p className="text-gray-600">
                  Based on your inputs, you appear to be eligible for solar rebates.
                </p>
                <button
                  onClick={handleEligibilityComplete}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                >
                  Continue to Lead Capture
                </button>
              </div>
            </CardContent>
          </Card>
        )}

        {currentStep === 'lead' && (
          <LeadCapture
            inputs={inputs}
            results={results}
            onSuccess={handleLeadSuccess}
          />
        )}

        {currentStep === 'complete' && (
          <Card className="border-green-200 bg-green-50">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <h3 className="text-xl font-semibold text-green-800">All Set!</h3>
                <p className="text-green-700">
                  Your personalized solar guide has been sent to your email. 
                  You can also download your PDF report anytime.
                </p>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={handleDownloadPDF}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
                  >
                    Download PDF
                  </button>
                  <button
                    onClick={handleBookConsult}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Book Consultation
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </Suspense>
    </div>
  );
}
