import type { LocalBusinessPartner } from "@/lib/partners/localBusinessPartners";
import { PartnerReferralTracker } from "@/components/partners/PartnerReferralTracker";
import { LocalBusinessPartnerEnquiryForm } from "@/components/partners/LocalBusinessPartnerEnquiryForm";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle2, Clock, Gift, Quote, ShieldCheck, Sparkles, TrendingDown, Wrench } from "lucide-react";

export function LocalBusinessPartnerLanding({ partner }: { partner: LocalBusinessPartner }) {
  const rewardItems = [
    {
      label: (
        <>
          <strong>Solar + Battery</strong> → <strong>${partner.giftCard.solarBatteryAmount}</strong>{" "}
          {partner.giftCard.brandName} Gift Card
        </>
      ),
    },
    {
      label: (
        <>
          <strong>Solar Only</strong> OR <strong>Battery Only</strong> →{" "}
          <strong>${partner.giftCard.solarOnlyOrBatteryOnlyAmount}</strong> Gift Card
        </>
      ),
    },
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <div id="top" />
      <PartnerReferralTracker attribution={partner.attribution} />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-gray-200 dark:border-gray-800">
        {/* Decorative gradients */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute -bottom-28 -right-28 h-[30rem] w-[30rem] rounded-full bg-amber-400/20 blur-3xl" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50/70 to-white dark:from-slate-950/40 dark:to-black" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-14 md:py-18">
          <div className="flex flex-col items-center text-center gap-6">
            <div className="flex flex-wrap items-center justify-center gap-2">
                {partner.badges.map((b) => (
                  <Badge
                    key={`${b.variant}-${b.label}`}
                    variant={b.variant}
                    className={b.variant === "secondary" ? "bg-blue-600 text-white hover:bg-blue-600" : undefined}
                  >
                    {b.label}
                  </Badge>
                ))}
            </div>

            {/* Partnership logos (showcase) */}
            <div className="w-full max-w-4xl">
              <div className="rounded-3xl bg-black px-6 py-6 sm:px-10 sm:py-8 shadow-sm">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8">
                  <Image
                    src={partner.logos.partner.src}
                    alt={partner.logos.partner.alt}
                    width={partner.logos.partner.width}
                    height={partner.logos.partner.height}
                    className="h-14 sm:h-16 md:h-20 w-auto object-contain"
                    priority
                  />
                  <div className="sm:hidden h-px w-24 bg-white/15" aria-hidden="true" />
                  <div className="hidden sm:block h-14 md:h-16 w-px bg-white/15" aria-hidden="true" />
                  <Image
                    src={partner.logos.xtechs.src}
                    alt={partner.logos.xtechs.alt}
                    width={partner.logos.xtechs.width}
                    height={partner.logos.xtechs.height}
                    className="h-12 sm:h-14 md:h-18 w-auto object-contain"
                    priority
                  />
                </div>
                <div className="mt-4 text-xs text-white/70">Local partnership</div>
              </div>
            </div>

            <div className="max-w-3xl">
              <h1 className="mt-2 text-4xl md:text-5xl font-bold tracking-tight">{partner.hero.headline}</h1>
              <p className="mt-4 text-lg text-gray-700 dark:text-gray-200">{partner.hero.subheadline}</p>

              <p className="mt-5 text-sm text-gray-600 dark:text-gray-300">{partner.hero.intro}</p>

              <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
                <Button asChild size="lg">
                  <a href="#get-a-quote">Get My Quote</a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="#rewards">
                    See Gift Card Rewards
                  </a>
                </Button>
              </div>

              <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
                Offer terms apply.{" "}
                <a className="underline underline-offset-4" href="#offer-terms">
                  View terms
                </a>
                .
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="bg-slate-50 dark:bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 space-y-12">
          {/* Partnership story + trust */}
          <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-7">
              <div className="prose dark:prose-invert max-w-none">
                <h2>Why This Partnership Exists</h2>
                <p>Most people don’t trust solar ads. And honestly — that’s fair.</p>
                <p>
                  Local businesses don’t recommend companies unless they genuinely believe in their work and are willing
                  to put their reputation on the line.
                </p>
                <p>
                  {partner.partnerName} has partnered with xTechs Renewables because of our:
                </p>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {(partner.trustBullets ?? []).map((b) => {
                  const Icon =
                    b.title.toLowerCase().includes("professional") ? Sparkles :
                    b.title.toLowerCase().includes("transparent") ? ShieldCheck :
                    b.title.toLowerCase().includes("quality") ? Wrench :
                    CheckCircle2;
                  const iconClass =
                    Icon === CheckCircle2 ? "text-emerald-600" : "text-blue-600";

                  return (
                    <Card key={b.title} className="py-0 gap-0">
                      <CardContent className="py-5">
                        <div className="flex items-start gap-3">
                          <Icon className={`h-5 w-5 ${iconClass} mt-0.5`} />
                          <div>
                            <p className="font-semibold">{b.title}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{b.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {partner.testimonial ? (
                <div className="mt-6 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-5">
                  <div className="flex items-start gap-3">
                    <Quote className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-800 dark:text-gray-100">“{partner.testimonial.quote}”</p>
                      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">{partner.testimonial.byline}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-6 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-5">
                  <p className="text-sm text-gray-700 dark:text-gray-200">
                    This isn’t a promotion. <strong>It’s a local endorsement.</strong>
                  </p>
                </div>
              )}
            </div>

            <div className="lg:col-span-5 space-y-4">
              {/* Offer terms */}
              <Card id="offer-terms" className="py-0 gap-0 scroll-mt-24">
                <CardHeader className="border-b border-gray-200 dark:border-gray-800 pt-6 [&.border-b]:pb-4">
                  <CardTitle className="text-xl">Offer terms</CardTitle>
                </CardHeader>
                <CardContent className="pt-4 pb-6">
                  <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-200">
                    {partner.offerTerms.map((t) => (
                      <li key={t} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 mt-0.5 text-emerald-600" />
                        <span>{t}</span>
                      </li>
                    ))}
                    <li className="pt-2 text-xs text-gray-500 dark:text-gray-400">
                      By submitting this form you agree to be contacted about your enquiry. See our{" "}
                      <Link className="underline underline-offset-4" href="/privacy">
                        Privacy Policy
                      </Link>
                      .
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Quick summary */}
              <Card className="py-0 gap-0">
                <CardHeader className="border-b border-gray-200 dark:border-gray-800 pt-6 [&.border-b]:pb-4">
                  <CardTitle className="text-xl">What happens next</CardTitle>
                </CardHeader>
                <CardContent className="pt-4 pb-6 space-y-3 text-sm text-gray-700 dark:text-gray-200">
                  <p className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 text-emerald-600" />
                    We review your details and confirm the best available rebates.
                  </p>
                  <p className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 text-emerald-600" />
                    We design a properly sized system (no overselling).
                  </p>
                  <p className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 text-emerald-600" />
                    Your gift card offer is recorded as a {partner.partnerName} referral.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Battery rebate explainer (shorter + expandable) */}
          <Card className="py-0 gap-0">
            <CardHeader className="border-b border-gray-200 dark:border-gray-800 pt-6 [&.border-b]:pb-4">
              <CardTitle className="text-xl flex items-center gap-2">
                <TrendingDown className="h-5 w-5 text-amber-600" />
                How the Federal Battery Rebate Works (simple version)
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 pb-6">
              <div className="grid gap-4 lg:grid-cols-12">
                <div className="lg:col-span-7">
                  <div className="space-y-3 text-sm text-gray-700 dark:text-gray-200">
                    <p>There is no fixed cash rebate for batteries.</p>
                    <p>
                      Your discount is applied upfront at installation and depends on the available government credits at
                      that time.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 mt-0.5 text-emerald-600" />
                        <span>
                          <strong>Install earlier</strong> → bigger discount
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 mt-0.5 text-emerald-600" />
                        <span>
                          <strong>Install later</strong> → smaller discount
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-5">
                    <Accordion type="single" collapsible>
                      <AccordionItem value="why-reduces" className="border-gray-200 dark:border-gray-800">
                        <AccordionTrigger className="text-left">Why the rebate reduces over time</AccordionTrigger>
                        <AccordionContent className="text-sm text-gray-700 dark:text-gray-200">
                          <div className="space-y-3">
                            <p>The rebate reduces over time by design as batteries become more common and prices fall.</p>
                            <ul className="list-disc pl-5 space-y-1">
                              <li>Installing later generally means less support is applied upfront</li>
                              <li>The lost rebate typically can’t be “claimed later”</li>
                              <li>Correct sizing matters (oversized batteries can receive reduced support)</li>
                            </ul>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <Card className="py-0 gap-0">
                    <CardHeader className="border-b border-gray-200 dark:border-gray-800 pt-6 [&.border-b]:pb-4">
                      <CardTitle className="text-xl">What this means for you</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4 pb-6">
                      <div className="space-y-3 text-sm text-gray-700 dark:text-gray-200">
                        <p>If you’re already considering Solar or Battery:</p>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 mt-0.5 text-emerald-600" />
                            <span>Installing sooner can mean more rebate applied upfront</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 mt-0.5 text-emerald-600" />
                            <span>Waiting can mean paying more for the same system</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 mt-0.5 text-emerald-600" />
                            <span>The lost rebate typically cannot be recovered later</span>
                          </li>
                        </ul>
                        <p className="font-semibold">Timing matters — especially when you’re close to a decision.</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* How it works */}
          <Card className="py-0 gap-0">
            <CardHeader className="border-b border-gray-200 dark:border-gray-800 pt-6 [&.border-b]:pb-4">
              <CardTitle className="text-xl">How It Works</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 pb-6">
              <div className="grid gap-4 md:grid-cols-4">
                {[
                  { n: "1", text: "Request your quote through this page" },
                  { n: "2", text: "Receive a properly sized Solar and/or Battery solution" },
                  { n: "3", text: "Install with xTechs Renewables" },
                  { n: "4", text: `Receive your ${partner.giftCard.brandName} gift card` },
                ].map((s) => (
                  <div
                    key={s.n}
                    className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                        {s.n}
                      </div>
                      <p className="text-sm font-medium">{s.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">No pressure. No obligation. Just clear information.</p>
            </CardContent>
          </Card>

          {/* Eligibility + form */}
          <div id="get-a-quote" className="grid gap-6 lg:grid-cols-12 lg:items-start scroll-mt-24">
            <div className="lg:col-span-12">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Get Your Solar & Battery Quote</h2>
              <p className="mt-2 text-gray-700 dark:text-gray-200">
                Send your details and we’ll confirm rebates, design the right system size, and record your {partner.partnerName} gift card offer.
              </p>
            </div>

            {/* Rewards (right column on desktop, directly after header on mobile) */}
            <div className="lg:col-span-5 lg:col-start-8 lg:row-start-2">
              <div id="rewards" className="scroll-mt-24 sticky top-24 space-y-4">
                <div className="rewards-shell">
                  <Card className="bg-white dark:bg-black gap-0">
                    <CardHeader className="border-b border-gray-200 dark:border-gray-800 pt-6 [&.border-b]:pb-4">
                      <CardTitle className="text-xl flex items-center gap-2">
                        <Gift className="h-5 w-5 text-blue-600" />
                        Gift Card Rewards
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4 pb-6 space-y-4">
                      <div className="rewards-collapsed rounded-lg border border-gray-200 dark:border-gray-800 p-4">
                        <p className="text-sm text-gray-700 dark:text-gray-200">
                          Click below to reveal the gift card amounts.
                        </p>
                        <Button asChild className="mt-4 w-full">
                          <a href="#rewards">Show Gift Card Rewards</a>
                        </Button>
                      </div>

                      <div className="rewards-expanded">
                        <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-4">
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                            When you install Solar and/or Battery with xTechs Renewables using this page, you receive a{" "}
                            <strong>{partner.giftCard.brandName} gift card</strong>.
                          </p>
                          <ul className="space-y-2 text-sm">
                            {rewardItems.map((ri, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 mt-0.5 text-emerald-600" />
                                <span>{ri.label}</span>
                              </li>
                            ))}
                            <li className="flex items-start gap-2">
                              <Clock className="h-4 w-4 mt-0.5 text-blue-600" />
                              <span>Gift card valid for {partner.giftCard.validityMonths} months</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <ShieldCheck className="h-4 w-4 mt-0.5 text-blue-600" />
                              <span>Issued after installation completion</span>
                            </li>
                          </ul>
                        </div>

                        <div className="rounded-lg border border-blue-200 dark:border-blue-900/40 bg-blue-50 dark:bg-blue-900/20 p-4">
                          <p className="font-semibold text-blue-900 dark:text-blue-100 mb-1">Why this matters</p>
                          <p className="text-sm text-blue-800 dark:text-blue-200">
                            You lower your energy bills and get rewarded to spend locally.
                          </p>
                        </div>

                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Prefer to talk first?{" "}
                          <Link className="underline underline-offset-4" href="/contact">
                            Contact us
                          </Link>{" "}
                          and mention “{partner.partnerName}”.
                        </div>

                        <div className="pt-2">
                          <a className="text-xs text-gray-500 dark:text-gray-400 underline underline-offset-4" href="#top">
                            Hide rewards
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="py-0 gap-0">
                  <CardHeader className="border-b border-gray-200 dark:border-gray-800 pt-6 [&.border-b]:pb-4">
                    <CardTitle className="text-xl">Quick reminder</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4 pb-6 space-y-3 text-sm text-gray-700 dark:text-gray-200">
                    <p className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 mt-0.5 text-emerald-600" />
                      Offer terms apply and will be confirmed before you proceed.
                    </p>
                    <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-amber-900 dark:border-amber-900/40 dark:bg-amber-900/20 dark:text-amber-100">
                      <p className="font-semibold">Battery rebate</p>
                      <p className="text-sm mt-1">Install earlier → bigger discount. Install later → smaller discount.</p>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Offer terms:{" "}
                      <a className="underline underline-offset-4" href="#offer-terms">
                        view here
                      </a>
                      .
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Form (left column on desktop, after rewards on mobile) */}
            <div className="lg:col-span-7 lg:col-start-1 lg:row-start-2">
              <div className="mt-6 lg:mt-0">
                <LocalBusinessPartnerEnquiryForm partner={partner} />
              </div>
            </div>
          </div>

          {/* FAQ (optional) */}
          {partner.faq?.length ? (
            <Card className="py-0 gap-0">
              <CardHeader className="border-b border-gray-200 dark:border-gray-800 pt-6 [&.border-b]:pb-4">
                <CardTitle className="text-xl">FAQ</CardTitle>
              </CardHeader>
              <CardContent className="pt-4 pb-6">
                <Accordion type="single" collapsible>
                  {partner.faq.map((f, idx) => (
                    <AccordionItem
                      key={`${partner.slug}-faq-${idx}`}
                      value={`${partner.slug}-faq-${idx}`}
                      className="border-gray-200 dark:border-gray-800"
                    >
                      <AccordionTrigger className="text-left">{f.question}</AccordionTrigger>
                      <AccordionContent className="text-sm text-gray-700 dark:text-gray-200">
                        {f.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ) : null}

          <div className="pt-4 text-center text-sm text-gray-600 dark:text-gray-300">
            Local Businesses Supporting Smarter Energy Choices
          </div>
        </div>
      </section>
    </main>
  );
}

