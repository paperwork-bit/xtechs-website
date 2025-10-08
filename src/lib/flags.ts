/**
 * Animation control flags and utilities
 */

export const disableAnim = (): boolean => {
  if (typeof window === "undefined") {
    // Server-side: check environment variable
    return process.env.NEXT_PUBLIC_DISABLE_ANIM === "1";
  }
  
  // Client-side: check URL params or environment variable
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.has("noAnim") || process.env.NEXT_PUBLIC_DISABLE_ANIM === "1";
};

export const isDev = (): boolean => {
  return process.env.NODE_ENV !== "production";
};

export const getDebugInfo = () => {
  if (!isDev()) return null;
  
  return {
    disableAnim: disableAnim(),
    isClient: typeof window !== "undefined",
    userAgent: typeof window !== "undefined" ? window.navigator.userAgent : "server",
    url: typeof window !== "undefined" ? window.location.href : "server"
  };
};
