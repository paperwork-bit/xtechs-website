/** DO NOT MODIFY — Critical hero/animation module. Any change must be explicitly requested. */

export interface ConsentData {
  analytics: boolean;
  marketing: boolean;
  timestamp: number;
}

export interface ConsentEvent {
  type: string;
  data: any;
  timestamp: number;
}

class ConsentManager {
  private consent: ConsentData | null = null;
  private eventQueue: ConsentEvent[] = [];
  private isInitialized = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.loadConsent();
      this.isInitialized = true;
    }
  }

  private loadConsent(): void {
    try {
      const stored = localStorage.getItem('xtechsConsent');
      if (stored) {
        this.consent = JSON.parse(stored);
      }
    } catch (error) {
      console.warn('Failed to load consent data:', error);
    }
  }

  private saveConsent(): void {
    if (typeof window === 'undefined') return;
    
    try {
      if (this.consent) {
        localStorage.setItem('xtechsConsent', JSON.stringify(this.consent));
      } else {
        localStorage.removeItem('xtechsConsent');
      }
    } catch (error) {
      console.warn('Failed to save consent data:', error);
    }
  }

  public getConsent(): ConsentData | null {
    return this.consent;
  }

  public hasConsent(): boolean {
    return this.consent !== null;
  }

  public setConsent(analytics: boolean, marketing: boolean): void {
    this.consent = {
      analytics,
      marketing,
      timestamp: Date.now(),
    };
    this.saveConsent();
    this.flushEventQueue();
  }

  public canTrackAnalytics(): boolean {
    return this.consent?.analytics === true;
  }

  public canSendMarketing(): boolean {
    return this.consent?.marketing === true;
  }

  public queueEvent(type: string, data: any): void {
    if (!this.isInitialized) return;
    
    this.eventQueue.push({
      type,
      data,
      timestamp: Date.now(),
    });

    // Auto-flush if we have consent
    if (this.hasConsent()) {
      this.flushEventQueue();
    }
  }

  public flushEventQueue(): void {
    if (!this.canTrackAnalytics()) {
      this.eventQueue = [];
      return;
    }

    // Process queued events
    this.eventQueue.forEach(event => {
      this.processEvent(event);
    });

    this.eventQueue = [];
  }

  private processEvent(event: ConsentEvent): void {
    // Process analytics events here
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', event.type, event.data);
    }
  }

  public reset(): void {
    this.consent = null;
    this.eventQueue = [];
    if (typeof window !== 'undefined') {
      localStorage.removeItem('xtechsConsent');
    }
  }
}

// Singleton instance
export const consentManager = new ConsentManager();

// Utility functions
export const getConsent = () => consentManager.getConsent();
export const hasConsent = () => consentManager.hasConsent();
export const setConsent = (analytics: boolean, marketing: boolean) => 
  consentManager.setConsent(analytics, marketing);
export const canTrackAnalytics = () => consentManager.canTrackAnalytics();
export const canSendMarketing = () => consentManager.canSendMarketing();
export const queueEvent = (type: string, data: any) => consentManager.queueEvent(type, data);
export const resetConsent = () => consentManager.reset();

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}
