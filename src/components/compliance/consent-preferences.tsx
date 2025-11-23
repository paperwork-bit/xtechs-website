"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const CONSENT_COOKIE = "xtechs_consent_v1";
type Consent = { necessary: boolean; analytics: boolean; marketing: boolean; };

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

export default function ConsentPreferences() {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<Consent>({ necessary: true, analytics: false, marketing: false });

  useEffect(() => {
    const stored = getStoredConsent();
    if (stored) setState(stored);

    const onOpen = () => setOpen(true);
    window.addEventListener("xtechs:open-preferences" as any, onOpen);
    return () => window.removeEventListener("xtechs:open-preferences" as any, onOpen);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="w-full max-w-lg rounded-xl bg-background border shadow-lg p-6 space-y-4">
        <h3 className="text-lg font-semibold">Cookie Preferences</h3>
        <div className="space-y-3 text-sm">
          <label className="flex items-start gap-3">
            <input type="checkbox" checked readOnly className="mt-1" />
            <span><strong>Necessary</strong> — required for core functionality.</span>
          </label>
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              className="mt-1"
              checked={state.analytics}
              onChange={(e) => setState(s => ({ ...s, analytics: e.target.checked }))}
            />
            <span><strong>Analytics</strong> — help us improve site performance.</span>
          </label>
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              className="mt-1"
              checked={state.marketing}
              onChange={(e) => setState(s => ({ ...s, marketing: e.target.checked }))}
            />
            <span><strong>Marketing</strong> — personalised content/ads.</span>
          </label>
        </div>
        <div className="flex gap-2 justify-end">
          <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            onClick={() => {
              setStoredConsent(state);
              setOpen(false);
            }}
          >
            Save preferences
          </Button>
        </div>
      </div>
    </div>
  );
}
