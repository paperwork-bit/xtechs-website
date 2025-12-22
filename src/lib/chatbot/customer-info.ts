/**
 * Customer Information Types and Utilities
 */

export interface CustomerInfo {
  fullName: string;
  email: string;
  address: string;
  phone?: string;
  siteVisitDate?: string;
  siteVisitTime?: string;
  systemType?: string; // e.g., "Solar PV + Battery", "EV Charging", etc.
  collectedAt: Date;
}

/**
 * Validate customer information
 */
export function validateCustomerInfo(info: Partial<CustomerInfo>): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!info.fullName || info.fullName.trim().length < 2) {
    errors.push('Full name is required (minimum 2 characters)');
  }

  if (!info.email || !isValidEmail(info.email)) {
    errors.push('Valid email address is required');
  }

  if (!info.address || info.address.trim().length < 5) {
    errors.push('Address is required (minimum 5 characters)');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Simple email validation
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Format customer info for use in responses
 */
export function formatCustomerInfoForContext(info: CustomerInfo): string {
  const parts: string[] = [];
  
  if (info.fullName) {
    parts.push(`Customer name: ${info.fullName}`);
  }
  
  if (info.address) {
    parts.push(`Location: ${info.address}`);
  }
  
  if (info.email) {
    parts.push(`Email: ${info.email}`);
  }

  return parts.join('. ');
}

/**
 * Extract location context from address (for personalized responses)
 */
export function extractLocationContext(address: string): {
  isVictoria: boolean;
  isMelbourne: boolean;
  location?: string;
} {
  const lowerAddress = address.toLowerCase();
  const isVictoria = lowerAddress.includes('vic') || 
                     lowerAddress.includes('victoria') ||
                     lowerAddress.includes('melbourne') ||
                     lowerAddress.includes('geelong') ||
                     lowerAddress.includes('ballarat') ||
                     lowerAddress.includes('bendigo');
  
  const isMelbourne = lowerAddress.includes('melbourne') ||
                      lowerAddress.includes('rowville') ||
                      lowerAddress.includes('dandenong') ||
                      lowerAddress.includes('frankston');

  // Try to extract suburb/city
  let location: string | undefined;
  const suburbMatch = lowerAddress.match(/(\w+)\s*(vic|victoria|melbourne)/i);
  if (suburbMatch) {
    location = suburbMatch[1];
  }

  return {
    isVictoria,
    isMelbourne,
    location,
  };
}

