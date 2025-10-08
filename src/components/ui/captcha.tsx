"use client"

import React, { useRef, useEffect, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { AlertCircle } from 'lucide-react'

interface CaptchaProps {
  onVerify: (token: string | null) => void
  onExpire?: () => void
  onError?: () => void
  theme?: 'light' | 'dark'
  size?: 'compact' | 'normal'
  className?: string
}

export function Captcha({
  onVerify,
  onExpire,
  onError,
  theme = 'light',
  size = 'normal',
  className = ''
}: CaptchaProps) {
  const recaptchaRef = useRef<ReCAPTCHA>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Get reCAPTCHA site key from environment variables
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI' // Test key

  useEffect(() => {
    // Check if reCAPTCHA is loaded
    if (typeof window !== 'undefined' && window.grecaptcha) {
      setIsLoaded(true)
    } else {
      // Load reCAPTCHA script if not already loaded
      const script = document.createElement('script')
      script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`
      script.async = true
      script.defer = true
      script.onload = () => setIsLoaded(true)
      script.onerror = () => setError('Failed to load reCAPTCHA')
      document.head.appendChild(script)
    }
  }, [siteKey])

  const handleVerify = (token: string | null) => {
    if (token) {
      setError(null)
      onVerify(token)
    } else {
      setError('Please complete the CAPTCHA verification')
      onVerify(null)
    }
  }

  const handleExpire = () => {
    setError('CAPTCHA expired. Please try again.')
    onExpire?.()
  }

  const handleError = () => {
    setError('CAPTCHA verification failed. Please try again.')
    onError?.()
  }

  const reset = () => {
    recaptchaRef.current?.reset()
    setError(null)
  }

  if (!isLoaded) {
    return (
      <div className={`flex items-center justify-center p-4 ${className}`}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        <span className="ml-2 text-sm text-gray-600">Loading CAPTCHA...</span>
      </div>
    )
  }

  return (
    <div className={className}>
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey={siteKey}
        onChange={handleVerify}
        onExpired={handleExpire}
        onErrored={handleError}
        theme={theme}
        size={size}
      />
      {error && (
        <div className="flex items-center mt-2 text-sm text-red-600">
          <AlertCircle className="h-4 w-4 mr-1" />
          {error}
        </div>
      )}
    </div>
  )
}

// Export reset function for external use
export const resetCaptcha = (ref: React.RefObject<ReCAPTCHA>) => {
  ref.current?.reset()
}

