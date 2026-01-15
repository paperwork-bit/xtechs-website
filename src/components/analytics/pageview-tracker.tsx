"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackPageView } from "@/lib/analytics";

const CONSENT_COOKIE = "xtechs_consent_v1";

function hasAnalyticsConsent(): boolean {
  if (typeof document === "undefined") return false;
  const raw = decodeURIComponent(
    document.cookie
      .split("; ")
      .find((c) => c.startsWith(CONSENT_COOKIE + "="))
      ?.split("=")[1] || ""
  );
  try {
    const parsed = raw ? JSON.parse(raw) : null;
    return Boolean(parsed?.analytics);
  } catch {
    return false;
  }
}

export function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const send = () => {
      if (!hasAnalyticsConsent()) return;
      if (typeof window === "undefined" || typeof window.gtag !== "function") return;
      trackPageView(window.location.href, document.title);
    };

    // Send on route change (and on first mount).
    send();

    // If user grants consent after landing, send once immediately.
    const onConsentUpdate = () => send();
    window.addEventListener("xtechs:consent-updated", onConsentUpdate);
    return () => window.removeEventListener("xtechs:consent-updated", onConsentUpdate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams?.toString()]);

  return null;
}


