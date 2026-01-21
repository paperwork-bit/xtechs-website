"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import type { LocalBusinessPartner } from "@/lib/partners/localBusinessPartners";
import { getStoredUTMParams } from "@/lib/utm";
import { queueEvent } from "@/lib/consent";

type Interest = "solar_battery" | "solar_only" | "battery_only" | "not_sure";

export function LocalBusinessPartnerEnquiryForm({ partner }: { partner: LocalBusinessPartner }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const hasTrackedStartRef = useRef(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    suburb: "",
    postcode: "",
    interest: "not_sure" as Interest,
    notes: "",
  });

  const interestLabel: Record<Interest, string> = {
    solar_battery: "Solar + Battery",
    solar_only: "Solar only",
    battery_only: "Battery only",
    not_sure: "Not sure yet",
  };

  const canSubmit = useMemo(() => {
    if (!form.name.trim()) return false;
    if (!form.email.trim()) return false;
    // loose client-side check; server validates properly
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) return false;
    return true;
  }, [form.email, form.name]);

  const rewardTextForPartner = (interest: Interest) => {
    if (interest === "solar_battery")
      return `$${partner.giftCard.solarBatteryAmount} ${partner.giftCard.brandName} Gift Card`;
    if (interest === "solar_only" || interest === "battery_only")
      return `$${partner.giftCard.solarOnlyOrBatteryOnlyAmount} ${partner.giftCard.brandName} Gift Card`;
    return "Gift card depends on final install type";
  };

  const onStart = useCallback(() => {
    if (hasTrackedStartRef.current) return;
    hasTrackedStartRef.current = true;
    queueEvent("partner_form_start", {
      partnerSlug: partner.slug,
      leadSource: partner.attribution.leadSource,
    });
  }, [partner.attribution.leadSource, partner.slug]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    setStatus("loading");
    setError(null);

    try {
      const [firstName, ...rest] = form.name.trim().split(/\s+/);
      const lastName = rest.join(" ").trim();
      const storedUtm = getStoredUTMParams();
      const utmBlock = Object.keys(storedUtm || {}).length ? `UTM: ${JSON.stringify(storedUtm)}` : null;
      const offerTermsBlock = partner.offerTerms?.length ? `Offer terms:\n- ${partner.offerTerms.join("\n- ")}` : null;

      const messageLines = [
        "Local Business Partner Enquiry",
        `Partner: ${partner.partnerName} (${partner.slug})`,
        `Interest: ${form.interest}`,
        `Expected reward: ${rewardTextForPartner(form.interest)}`,
        form.postcode?.trim() ? `Postcode: ${form.postcode.trim()}` : null,
        form.suburb?.trim() ? `Suburb: ${form.suburb.trim()}` : null,
        form.phone?.trim() ? `Phone: ${form.phone.trim()}` : null,
        typeof window !== "undefined" ? `Landing page: ${window.location.href}` : null,
        typeof document !== "undefined" && document.referrer ? `Referrer: ${document.referrer}` : null,
        utmBlock,
        offerTermsBlock,
        form.notes?.trim() ? `Notes:\n${form.notes.trim()}` : null,
      ].filter(Boolean) as string[];

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim() || undefined,
          message: messageLines.join("\n"),
          source: partner.attribution.leadSource,
          tenantId: "Sales",
          // captchaToken intentionally omitted (optional)
          // First/last included for future-proofing even though /api/leads uses full name
          firstName,
          lastName: lastName || undefined,
        }),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || "Submission failed. Please try again.");
      }

      setStatus("success");
      queueEvent("partner_form_submit_success", {
        partnerSlug: partner.slug,
        leadSource: partner.attribution.leadSource,
        interest: form.interest,
        rewardEstimate: rewardTextForPartner(form.interest),
      });
    } catch (err: any) {
      setStatus("error");
      setError(err?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <Card className="border border-gray-200 dark:border-gray-800">
      <CardHeader>
        <CardTitle className="text-xl">Get Your Quote</CardTitle>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          This form tags your enquiry as a <strong>{partner.partnerName} referral</strong> so your gift card offer is recorded.
          No pressure. No obligation.
        </p>
      </CardHeader>
      <CardContent>
        {status === "success" ? (
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-emerald-900 dark:border-emerald-900/40 dark:bg-emerald-900/20 dark:text-emerald-100">
            <p className="font-semibold">Thank You for your details.</p>
            <p className="text-sm mt-1">Our Solar Expert will get in touch with you.</p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-5" onFocus={onStart}>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-1.5">
                <Label htmlFor="partner-name">Full name *</Label>
                <Input
                  id="partner-name"
                  value={form.name}
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                  placeholder="Your name"
                  required
                />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="partner-email">Email *</Label>
                <Input
                  id="partner-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-1.5">
                <Label htmlFor="partner-phone">Phone (optional)</Label>
                <Input
                  id="partner-phone"
                  value={form.phone}
                  onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                  placeholder="04XX XXX XXX"
                />
              </div>
              <div className="grid gap-1.5">
                <Label>What are you looking to install?</Label>
                <Select
                  value={form.interest}
                  onValueChange={(value) => setForm((p) => ({ ...p, interest: value as Interest }))}
                >
                  <SelectTrigger>
                    <span>{interestLabel[form.interest] || "Select one"}</span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="solar_battery">Solar + Battery</SelectItem>
                    <SelectItem value="solar_only">Solar only</SelectItem>
                    <SelectItem value="battery_only">Battery only</SelectItem>
                    <SelectItem value="not_sure">Not sure yet</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  Reward estimate: <strong>{rewardTextForPartner(form.interest)}</strong>
                </p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-1.5">
                <Label htmlFor="partner-postcode">Postcode (optional)</Label>
                <Input
                  id="partner-postcode"
                  value={form.postcode}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, postcode: e.target.value.replace(/\D/g, "").slice(0, 4) }))
                  }
                  placeholder="3000"
                  maxLength={4}
                />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="partner-suburb">Suburb (optional)</Label>
                <Input
                  id="partner-suburb"
                  value={form.suburb}
                  onChange={(e) => setForm((p) => ({ ...p, suburb: e.target.value }))}
                  placeholder="Your suburb"
                />
              </div>
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="partner-notes">Notes (optional)</Label>
              <Textarea
                id="partner-notes"
                value={form.notes}
                onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
                placeholder="Anything helpful (e.g., current solar, blackout concerns, usage patterns)."
                rows={5}
              />
            </div>

            {status === "error" && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800 dark:border-red-900/40 dark:bg-red-900/20 dark:text-red-100">
                {error ?? "Something went wrong. Please try again."}
              </div>
            )}

            <Button type="submit" className="w-full" disabled={status === "loading" || !canSubmit}>
              {status === "loading" ? "Submitting..." : "Get My Quote"}
            </Button>

            <p className="text-xs text-gray-500 dark:text-gray-400">
              By submitting, you agree to be contacted about your enquiry. Read our{" "}
              <a className="underline underline-offset-4" href="/privacy">
                Privacy Policy
              </a>
              .
            </p>
          </form>
        )}
      </CardContent>
    </Card>
  );
}

