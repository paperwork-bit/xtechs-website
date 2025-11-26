// Security utilities for API routes

/**
 * Rate limiting using Cloudflare's built-in rate limiting
 * Note: For more advanced rate limiting, consider using Cloudflare Rate Limiting Rules
 * or implementing a KV-based solution
 */
export function getRateLimitHeaders(limit: number = 100, window: number = 60) {
  return {
    'X-RateLimit-Limit': limit.toString(),
    'X-RateLimit-Window': window.toString(),
  };
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254; // RFC 5321 limit
}

/**
 * Sanitize string input to prevent XSS
 * Removes potentially dangerous characters
 */
export function sanitizeString(input: string, maxLength: number = 1000): string {
  if (typeof input !== 'string') return '';
  
  // Trim and limit length
  let sanitized = input.trim().slice(0, maxLength);
  
  // Remove null bytes
  sanitized = sanitized.replace(/\0/g, '');
  
  // Basic XSS prevention - remove script tags and event handlers
  sanitized = sanitized
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
    .replace(/javascript:/gi, '');
  
  return sanitized;
}

/**
 * Validate phone number format (basic validation)
 */
export function isValidPhone(phone: string): boolean {
  // Allow digits, spaces, +, -, (, )
  const phoneRegex = /^[\d\s\+\-\(\)]{7,20}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

/**
 * Validate date format (YYYY-MM-DD)
 */
export function isValidDate(date: string): boolean {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) return false;
  
  const d = new Date(date);
  return d instanceof Date && !isNaN(d.getTime());
}

/**
 * Validate time format (HH:MM)
 */
export function isValidTime(time: string): boolean {
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
  return timeRegex.test(time);
}

/**
 * Verify Cloudflare Turnstile token
 */
export async function verifyCaptcha(token: string | null | undefined, request?: Request): Promise<boolean> {
  if (!token) return false;
  
  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  if (!secretKey) {
    console.warn('TURNSTILE_SECRET_KEY not configured');
    return false; // Fail closed if not configured
  }

  try {
    // Get client IP for verification (optional but recommended)
    const clientIP = request ? getClientIP(request) : null;
    
    const formData = new URLSearchParams();
    formData.append('secret', secretKey);
    formData.append('response', token);
    if (clientIP && clientIP !== 'unknown') {
      formData.append('remoteip', clientIP);
    }

    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData.toString()
    });

    const result = await response.json();
    return result.success === true;
  } catch (error) {
    console.error('Turnstile verification error:', error);
    return false; // Fail closed on error
  }
}

/**
 * Get client IP address from request headers
 */
export function getClientIP(request: Request): string {
  return request.headers.get("x-forwarded-for")?.split(',')[0]?.trim() ||
         request.headers.get("cf-connecting-ip") ||
         request.headers.get("x-real-ip") ||
         "unknown";
}

/**
 * CORS headers for API responses
 */
export function getCORSHeaders(origin: string | null): Record<string, string> {
  const allowedOrigins = [
    'https://xtechsrenewables.com.au',
    'https://www.xtechsrenewables.com.au',
    'http://localhost:3000',
    'http://localhost:3001',
  ];

  const allowedOrigin = origin && allowedOrigins.includes(origin) ? origin : allowedOrigins[0];

  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
  };
}

/**
 * Validate input length
 */
export function validateLength(input: string, min: number, max: number): boolean {
  return input.length >= min && input.length <= max;
}

/**
 * Sanitize and validate name
 */
export function sanitizeName(name: string): string | null {
  const sanitized = sanitizeString(name, 100);
  if (!validateLength(sanitized, 1, 100)) return null;
  return sanitized;
}

/**
 * Sanitize and validate message/notes
 */
export function sanitizeMessage(message: string, maxLength: number = 5000): string | null {
  const sanitized = sanitizeString(message, maxLength);
  if (!validateLength(sanitized, 0, maxLength)) return null;
  return sanitized;
}

