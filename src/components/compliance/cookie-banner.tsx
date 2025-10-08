"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Consent = {
  necessary: boolean; // always true
  analytics: boolean;
  marketing: boolean;
};

const CONSENT_COOKIE = "xtechs_consent_v1";

function getStoredConsent(): Consent | null {
  if (typeof document === "undefined") return null;
  const raw = decodeURIComponent(document.cookie.split("; ").find(c => c.startsWith(CONSENT_COOKIE + "="))?.split("=")[1] || "");
  try { return raw ? JSON.parse(raw) : null; } catch { return null; }
}

function setStoredConsent(value: Consent) {
  const expires = new Date(Date.now() + 365*24*60*60*1000).toUTCString();
  document.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(JSON.stringify(value))}; path=/; secure; samesite=lax; expires=${expires}`;
  window.dispatchEvent(new Event("xtechs:consent-updated"));
}

export default function CookieBanner() {
  const [show, setShow] = useState(false);
  const [consent, setConsent] = useState<Consent>({ necessary: true, analytics: false, marketing: false });

  useEffect(() => {
    const stored = getStoredConsent();
    if (!stored) setShow(true);
  }, []);

  const acceptAll = () => {
    setStoredConsent({ necessary: true, analytics: true, marketing: true });
    setShow(false);
  };

  const rejectAll = () => {
    setStoredConsent({ necessary: true, analytics: false, marketing: false });
    setShow(false);
  };

  const openPrefs = () => {
    const evt = new CustomEvent("xtechs:open-preferences");
    window.dispatchEvent(evt);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50">
      <div className="mx-auto max-w-5xl m-4 rounded-xl border bg-background shadow-lg p-4">
        <p className="text-sm">
          We use cookies for essential site functions and, with your consent, for analytics and marketing. See our{" "}
          <Link href="/privacy" className="underline">Privacy</Link> and{" "}
          <Link href="/cookies" className="underline">Cookie Policy</Link>.
        </p>
        <div className="mt-3 flex gap-2 flex-wrap">
          <Button onClick={acceptAll}>Accept all</Button>
          <Button variant="outline" onClick={rejectAll}>Reject non-essential</Button>
          <Button variant="ghost" onClick={openPrefs}>Preferences</Button>
        </div>
      </div>
    </div>
  );
}
