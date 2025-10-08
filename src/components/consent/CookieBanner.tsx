"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { X, Settings, Shield } from 'lucide-react';
import { setConsent, getConsent, hasConsent } from '@/lib/consent';

interface CookieBannerProps {
  onAccept?: () => void;
  onReject?: () => void;
}

export default function CookieBanner({ onAccept, onReject }: CookieBannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [consent, setConsentState] = useState({
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Only show banner if no consent has been given
    if (!hasConsent()) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    setConsent(true, true);
    setIsVisible(false);
    onAccept?.();
  };

  const handleAcceptEssentials = () => {
    setConsent(false, false);
    setIsVisible(false);
    onReject?.();
  };

  const handleSavePreferences = () => {
    setConsent(consent.analytics, consent.marketing);
    setIsVisible(false);
    onAccept?.();
  };

  const handleAnalyticsChange = (checked: boolean) => {
    setConsentState(prev => ({ ...prev, analytics: checked }));
  };

  const handleMarketingChange = (checked: boolean) => {
    setConsentState(prev => ({ ...prev, marketing: checked }));
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold">Your privacy, your choice</h2>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowDetails(!showDetails)}
              className="p-1"
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>

          {/* Main Content */}
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              We use cookies to improve your experience and analyze site usage. 
              You can choose which cookies to allow.
            </p>

            {showDetails && (
              <div className="space-y-4 border-t pt-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="analytics"
                      checked={consent.analytics}
                      onCheckedChange={handleAnalyticsChange}
                    />
                    <div className="space-y-1">
                      <Label htmlFor="analytics" className="text-sm font-medium">
                        Analytics cookies
                      </Label>
                      <p className="text-xs text-gray-600">
                        Help us understand how you use our site to improve performance and user experience.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="marketing"
                      checked={consent.marketing}
                      onCheckedChange={handleMarketingChange}
                    />
                    <div className="space-y-1">
                      <Label htmlFor="marketing" className="text-sm font-medium">
                        Marketing cookies
                      </Label>
                      <p className="text-xs text-gray-600">
                        Allow us to show you relevant solar solutions and special offers.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              {showDetails ? (
                <>
                  <Button
                    variant="outline"
                    onClick={handleAcceptEssentials}
                    className="flex-1"
                  >
                    Accept essentials only
                  </Button>
                  <Button
                    onClick={handleSavePreferences}
                    className="flex-1"
                  >
                    Save preferences
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    onClick={handleAcceptEssentials}
                    className="flex-1"
                  >
                    Accept essentials
                  </Button>
                  <Button
                    onClick={handleAcceptAll}
                    className="flex-1"
                  >
                    Allow analytics
                  </Button>
                </>
              )}
            </div>

            {/* Footer */}
            <div className="text-xs text-gray-500 text-center pt-2">
              <a href="/privacy" className="underline hover:text-gray-700">
                Privacy Policy
              </a>
              {' • '}
              <a href="/cookies" className="underline hover:text-gray-700">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
