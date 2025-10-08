"use client";

import { useEffect, useState } from "react";

/**
 * Hook to detect if component has mounted on client side
 * Prevents hydration mismatches by showing static content until mounted
 */
export function useIsMounted(): boolean {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted;
}

export default useIsMounted;
