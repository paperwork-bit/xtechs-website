/** DO NOT MODIFY — Critical hero/animation module. Any change must be explicitly requested. */

export function sanitizeNMI(nmi?: string): string | null {
  if (!nmi) return null;
  const v = nmi.trim().toUpperCase();
  return /^[A-Z0-9]{10,11}$/.test(v) ? v : null;
}

export function validateNMI(nmi?: string): { isValid: boolean; error?: string } {
  if (!nmi) return { isValid: true }; // Optional field
  
  const sanitized = sanitizeNMI(nmi);
  if (!sanitized) {
    return {
      isValid: false,
      error: 'Enter a valid 10–11 character NMI (letters/numbers only).'
    };
  }
  
  return { isValid: true };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-AU').format(num);
}
