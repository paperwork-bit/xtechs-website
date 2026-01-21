"use client";

import { useEffect } from "react";
import { captureUTMParams, storeUTMParams } from "@/lib/utm";
import type { LocalBusinessPartner } from "@/lib/partners/localBusinessPartners";

/**
 * Stores a consistent partner referral marker in sessionStorage
 * so downstream lead capture can attribute enquiries correctly.
 */
export function PartnerReferralTracker({
  attribution,
}: {
  attribution: LocalBusinessPartner["attribution"];
}) {
  useEffect(() => {
    const captured = captureUTMParams();

    // Force partner attribution for this landing page.
    storeUTMParams({
      ...captured,
      utm_source: attribution.utm_source,
      utm_medium: captured.utm_medium ?? attribution.utm_medium ?? "referral",
      utm_campaign: captured.utm_campaign ?? attribution.utm_campaign ?? "local_business_partners",
      utm_content: captured.utm_content ?? attribution.utm_content,
    });
  }, [attribution.utm_campaign, attribution.utm_content, attribution.utm_medium, attribution.utm_source]);

  return null;
}

