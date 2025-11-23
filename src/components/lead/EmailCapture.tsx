"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { X, Mail, Loader2, CheckCircle } from 'lucide-react';
import { captureUTMParams, storeUTMParams } from '@/lib/utm';
import { canSendMarketing, queueEvent } from '@/lib/consent';

interface EmailCaptureProps {
  variant: 'inline' | 'sticky' | 'slide-in';
  onClose?: () => void;
  onSuccess?: (email: string) => void;
}

export default function EmailCapture({ variant, onClose, onSuccess }: EmailCaptureProps) {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [postcode, setPostcode] = useState('');
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState('');
  
  const slideInRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Capture UTM parameters on mount
    const utm = captureUTMParams();
    storeUTMParams(utm);

    // Show slide-in after delay or scroll
    if (variant === 'slide-in') {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 8000);

      const handleScroll = () => {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        if (scrollPercent >= 50) {
          setIsVisible(true);
          clearTimeout(timer);
          window.removeEventListener('scroll', handleScroll);
        }
      };

      window.addEventListener('scroll', handleScroll);
      
      return () => {
        clearTimeout(timer);
        window.removeEventListener('scroll', handleScroll);
      };
    } else {
      setIsVisible(true);
    }
  }, [variant]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    if (!consent) {
      setError('Please accept the terms to continue');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const utm = captureUTMParams();
      
      const response = await fetch('/api/leads/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          firstName: firstName.trim() || null,
          postcode: postcode.trim() || null,
          consentMarketing: consent,
          utm,
          source: 'email_capture',
          variant,
          createdAt: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        onSuccess?.(email);
        
        // Track conversion if marketing consent is given
        if (canSendMarketing()) {
          queueEvent('email_capture_success', {
            email,
            variant,
            source: 'email_capture',
          });
        }
      } else {
        throw new Error('Failed to subscribe');
      }
    } catch (error) {
      console.error('Email capture error:', error);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  if (!isVisible) return null;

  if (isSuccess) {
    return (
      <div className={`fixed z-40 ${
        variant === 'sticky' ? 'bottom-4 left-4 right-4' : 
        variant === 'slide-in' ? 'bottom-4 right-4' : ''
      }`}>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 shadow-lg max-w-sm">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-green-800">Thank you!</p>
              <p className="text-xs text-green-700">Check your email for your solar guide.</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="p-1 ml-auto"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const containerClasses = {
    'inline': 'w-full max-w-md mx-auto',
    'sticky': 'fixed bottom-4 left-4 right-4 z-40 max-w-sm',
    'slide-in': 'fixed bottom-4 right-4 z-40 max-w-sm',
  };

  return (
    <div className={containerClasses[variant]}>
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-semibold">Get your tailored solar guide</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="p-1"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <Label htmlFor="email" className="text-xs">Email *</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              className="h-8 text-sm"
              required
            />
          </div>

          {variant !== 'sticky' && (
            <>
              <div>
                <Label htmlFor="firstName" className="text-xs">First name</Label>
                <Input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Your first name"
                  className="h-8 text-sm"
                />
              </div>

              <div>
                <Label htmlFor="postcode" className="text-xs">Postcode</Label>
                <Input
                  id="postcode"
                  type="text"
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                  placeholder="3000"
                  maxLength={4}
                  className="h-8 text-sm"
                />
              </div>
            </>
          )}

          <div className="flex items-start space-x-2">
            <Checkbox
              id="consent"
              checked={consent}
              onCheckedChange={(checked) => setConsent(checked as boolean)}
              className="mt-0.5"
            />
            <Label htmlFor="consent" className="text-xs leading-relaxed">
              We'll email your savings report & rebate checklist. Unsubscribe anytime.
            </Label>
          </div>

          {error && (
            <p className="text-xs text-red-600">{error}</p>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-8 text-sm"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                Sending...
              </>
            ) : (
              'Get My Guide'
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
