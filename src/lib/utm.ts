/** DO NOT MODIFY — Critical hero/animation module. Any change must be explicitly requested. */

export interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  referrer?: string;
  landing_page?: string;
}

export function captureUTMParams(): UTMParams {
  if (typeof window === 'undefined') return {};

  const urlParams = new URLSearchParams(window.location.search);
  const utm: UTMParams = {};

  // Capture UTM parameters
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(param => {
    const value = urlParams.get(param);
    if (value) {
      utm[param as keyof UTMParams] = value;
    }
  });

  // Capture referrer
  if (document.referrer) {
    utm.referrer = document.referrer;
  }

  // Capture landing page
  utm.landing_page = window.location.href;

  return utm;
}

export function storeUTMParams(utm: UTMParams): void {
  if (typeof window === 'undefined') return;

  try {
    sessionStorage.setItem('xtechsUTM', JSON.stringify(utm));
  } catch (error) {
    console.warn('Failed to store UTM parameters:', error);
  }
}

export function getStoredUTMParams(): UTMParams {
  if (typeof window === 'undefined') return {};

  try {
    const stored = sessionStorage.getItem('xtechsUTM');
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.warn('Failed to retrieve UTM parameters:', error);
    return {};
  }
}

export function clearUTMParams(): void {
  if (typeof window === 'undefined') return;

  try {
    sessionStorage.removeItem('xtechsUTM');
  } catch (error) {
    console.warn('Failed to clear UTM parameters:', error);
  }
}
