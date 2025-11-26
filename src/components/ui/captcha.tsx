"use client"

import React, { useEffect, useRef, useState } from 'react'
import { AlertCircle } from 'lucide-react'

interface CaptchaProps {
  onVerify: (token: string | null) => void
  onExpire?: () => void
  onError?: () => void
  theme?: 'light' | 'dark' | 'auto'
  size?: 'normal' | 'compact'
  className?: string
}

// Declare Turnstile types
declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: {
        sitekey: string
        callback?: (token: string) => void
        'error-callback'?: () => void
        'expired-callback'?: () => void
        theme?: 'light' | 'dark' | 'auto'
        size?: 'normal' | 'compact'
      }) => string
      reset: (widgetId?: string) => void
      remove: (widgetId?: string) => void
    }
  }
}

export function Captcha({
  onVerify,
  onExpire,
  onError,
  theme = 'light',
  size = 'normal',
  className = ''
}: CaptchaProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasInteracted, setHasInteracted] = useState(false)

  // Get Turnstile site key from environment variables
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''

  useEffect(() => {
    // Check if Turnstile is already loaded
    if (typeof window !== 'undefined' && window.turnstile) {
      setIsLoaded(true)
      return
    }

    // Load Turnstile script if not already loaded
    const script = document.createElement('script')
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js'
    script.async = true
    script.defer = true
    script.onload = () => {
      setIsLoaded(true)
      setError(null)
    }
    script.onerror = () => {
      setError('Failed to load Turnstile')
      setIsLoaded(false)
    }
    document.head.appendChild(script)

    return () => {
      // Cleanup: remove script if component unmounts
      const existingScript = document.querySelector('script[src="https://challenges.cloudflare.com/turnstile/v0/api.js"]')
      if (existingScript) {
        // Don't remove script as it might be used by other components
      }
    }
  }, [])

  useEffect(() => {
    // Render Turnstile widget when loaded and container is ready
    if (isLoaded && containerRef.current && siteKey && !widgetIdRef.current) {
      try {
        if (window.turnstile) {
          const widgetId = window.turnstile.render(containerRef.current, {
            sitekey: siteKey,
            callback: (token: string) => {
              if (token) {
                setError(null)
                setHasInteracted(true)
                onVerify(token)
              }
            },
            'error-callback': () => {
              setError('Turnstile verification failed. Please try again.')
              setHasInteracted(false)
              onVerify(null)
              onError?.()
            },
            'expired-callback': () => {
              setError('Turnstile expired. Please verify again.')
              setHasInteracted(false)
              onVerify(null)
              onExpire?.()
            },
            theme: theme,
            size: size
          })
          widgetIdRef.current = widgetId
        }
      } catch (err) {
        console.error('Error rendering Turnstile:', err)
        setError('Failed to initialize Turnstile')
      }
    }
  }, [isLoaded, siteKey, theme, size, onVerify, onExpire, onError])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current)
        } catch (err) {
          console.error('Error removing Turnstile widget:', err)
        }
        widgetIdRef.current = null
      }
    }
  }, [])

  if (!siteKey) {
    return (
      <div className={`p-4 text-center text-sm text-yellow-600 ${className}`}>
        <AlertCircle className="h-4 w-4 inline mr-1" />
        Turnstile site key not configured. Please set NEXT_PUBLIC_TURNSTILE_SITE_KEY.
      </div>
    )
  }

  if (!isLoaded) {
    return (
      <div className={`flex items-center justify-center p-4 ${className}`}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        <span className="ml-2 text-sm text-gray-600">Loading security verification...</span>
      </div>
    )
  }

  return (
    <div className={className}>
      <div ref={containerRef} className="cf-turnstile" />
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
export const resetCaptcha = (widgetId: string | null) => {
  if (widgetId && typeof window !== 'undefined' && window.turnstile) {
    try {
      window.turnstile.reset(widgetId)
    } catch (err) {
      console.error('Error resetting Turnstile:', err)
    }
  }
}
