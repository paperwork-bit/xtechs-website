

import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Leaf, Battery, Sun, TrendingUp, DollarSign } from "lucide-react";


const CANONICAL_URL = "https://xtechs.com.au/guides/solar-panels-victoria";
export const metadata: Metadata = {
  title: "Complete Guide to Solar Panels in Victoria (2025 Edition) | xTechs Renewables",
  description:
    "Everything Victorian homeowners need to know in 2025: rebates, STCs, feed-in tariffs, costs, batteries, installer selection, and step-by-step application process.",
  alternates: { canonical: CANONICAL_URL },
  openGraph: {
    title: "Complete Guide to Solar Panels in Victoria (2025 Edition)",
    description:
      "Up-to-date VIC solar info for 2025: $1,400 Solar Victoria rebate, STCs, FiTs, new battery incentives, pricing and ROI.",
    url: CANONICAL_URL,
    type: "article",
  },
};



const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${CANONICAL_URL}#webpage`,
  url: CANONICAL_URL,
  name: "Complete Guide to Solar Panels in Victoria (2025 Edition)",
  description:
    "Up-to-date VIC solar guide for 2025: Solar Victoria rebates, STCs, FiTs, batteries, installation steps, costs and FAQs.",
  inLanguage: "en-AU",
  isPartOf: { "@type": "WebSite", "@id": "https://xtechs.com.au/#website" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": `${CANONICAL_URL}#breadcrumb`,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "WebSite",
        "@id": "https://xtechs.com.au/#website",
        url: "https://xtechs.com.au",
        name: "Home",
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "WebPage",
        "@id": `${CANONICAL_URL}#webpage`,
        url: CANONICAL_URL,
        name: "Complete Guide to Solar Panels in Victoria (2025 Edition)",
      },
    },
  ],
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  mainEntityOfPage: { "@type": "WebPage", "@id": `${CANONICAL_URL}#webpage` },
  headline: "Complete Guide to Solar Panels in Victoria (2025 Edition)",
  description:
    "Everything Victorian homeowners need to know in 2025: rebates, STCs, feed-in tariffs, costs, batteries, installer selection, and application steps.",
  author: { "@type": "Organization", name: "xTechs Renewables" },
  publisher: {
    "@type": "Organization",
    name: "xTechs Renewables",
    logo: { "@type": "ImageObject", url: "https://xtechs.com.au/android-chrome-512x512.png" },
  },
  inLanguage: "en-AU",
};

const faqItems = [
  {
    q: "Is solar still worth it in Victoria with low feed‑in tariffs?",
    a: "Yes. The value has shifted to self‑consumption and battery optimisation. With the Solar Victoria $1,400 rebate, STCs (~30% off) and a new federal battery discount (~30% off) from July 2025, most homes still see strong paybacks.",
  },
  {
    q: "What’s the Solar Victoria rebate amount in 2025?",
    a: "Up to $1,400 for eligible PV systems, plus an optional $1,400 interest‑free loan repaid over four years via monthly instalments.",
  },
  {
    q: "What’s happening with batteries in 2025?",
    a: "Solar Victoria’s battery loans have closed, but the new federal ‘Cheaper Home Batteries Program’ offers around a 30% point‑of‑sale discount on eligible batteries from July 2025.",
  },
  {
    q: "What’s the minimum feed‑in tariff in Victoria for 2025–26?",
    a: "The minimum flat FiT for 2025–26 is 0.04 cents/kWh. Time‑varying FiTs range from 0.00c/kWh (day) to higher rates in the evening, depending on retailer and time.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

// =========================
// Utility
// =========================
const Section = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => (
  <section id={id} className="scroll-mt-24">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{title}</h2>
    <div className="prose prose-slate max-w-none">{children}</div>
  </section>
);

// =========================
// Page
// =========================

export default function VictoriaSolarGuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* JSON-LD */}
      <Script
        id="vic-webpage-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <Script
        id="vic-breadcrumb-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Script
        id="vic-article-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Script
        id="vic-faq-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* HERO */}
      <div className="relative overflow-hidden bg-gradient-brand-primary text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-5 bg-gradient-brand-secondary text-white border-2 border-brand-secondary-light">
              2025 Victoria Solar
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Complete Guide to <span className="text-brand-secondary-light">Solar Panels in Victoria</span> (2025)
            </h1>
            <p className="text-lg md:text-2xl text-white/90 mb-8">
              Rebates, STCs, feed‑in tariffs, batteries and pricing — everything you need to make the smartest solar decision this year.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-brand-secondary hover:bg-brand-secondary/90 text-black font-semibold">
                <Link href="/contact">Get a Solar Quote</Link>
              </Button>
              <Button asChild size="lg" className="bg-white text-brand-primary hover:bg-gray-100 font-semibold border-2 border-white">
                <Link href="#toc">Jump to Guide</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* KEY HIGHLIGHTS */}
      <div className="container mx-auto px-4 -mt-8 md:-mt-12">
        <div className="grid md:grid-cols-4 gap-4">
          <Card className="p-5 bg-white/90 backdrop-blur border-l-4 border-brand-secondary">
            <div className="flex items-center gap-3">
              <DollarSign className="text-brand-secondary h-6 w-6" />
              <h3 className="font-semibold">Up to $1,400 Rebate</h3>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Solar Victoria PV rebatefree loan. {/* [1](https://solarpowernation.com.au/victorias-solar-rebates-and-incentives-in-2025/) */}
            </p>
          </Card>
          <Card className="p-5 bg-white/90 backdrop-blur border-l-4 border-green-500">
            <div className="flex items-center gap-3">
              <Sun className="text-green-600 h-6 w-6" />
              <h3 className="font-semibold">~30% STC Discount</h3>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Federal STCs reduce upfront system cost (varies by size/zone). {/* [2](https://www.solarchoice.net.au/learn/solar-rebates/victoria/) */}
            </p>
          </Card>
          <Card className="p-5 bg-white/90 backdrop-blur border-l-4 border-amber-500">
            <div className="flex items-center gap-3">
              <Battery className="text-amber-600 h-6 w-6" />
              <h3 className="font-semibold">~30% Battery Discount</h3>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Federal Cheaper Home Batteries Program (from July 2025). {/* [1](https://solarpowernation.com.au/victorias-solar-rebates-and-incentives-in-2025/)[3](https://electricalmasters.com.au/solar-panel-rebate-complete-guide-2025-updated-edition/) */}
            </p>
          </Card>
          <Card className="p-5 bg-white/90 backdrop-blur border-l-4 border-blue-500">
            <div className="flex items-center gap-3">
              <TrendingUp className="text-blue-600 h-6 w-6" />
              <h3 className="font-semibold">FiT Update</h3>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              2025–26 minimum flat FiT: 0.04c/kWh; tariffs vary by time/retailer. {/* [4](https://www.esc.vic.gov.au/media-centre/solar-minimum-feed-tariffs-2025-26)[5](https://solarcalculator.com.au/feed-in-tariffs/vic/) */}
            </p>
          </Card>
        </div>
      </div>

      {/* BODY: TOC + Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          {/* TOC */}
          <aside id="toc" className="lg:sticky lg:top-24 h-max bg-white border rounded-xl p-5 shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-3">On this page</h4>
            <nav className="text-sm space-y-2">
              <a className="block text-blue-700 hover:underline" href="#intro">1. Introduction</a>
              <a className="block text-blue-700 hover:underline" href="#rebates">2. Rebates & Incentives</a>
              <a className="block text-blue-700 hover:underline" href="#costs">3. System Costs</a>
              <a className="block text-blue-700 hover:underline" href="#panels">4. Panels</a>
              <a className="block text-blue-700 hover:underline" href="#inverters">5. Inverters</a>
              <a className="block text-blue-700 hover:underline" href="#batteries">6. Batteries</a>
              <a className="block text-blue-700 hover:underline" href="#process">7. Installation Process</a>
              <a className="block text-blue-700 hover:underline" href="#installer">8. Choosing an Installer</a>
              <a className="block text-blue-700 hover:underline" href="#faqs">9. FAQs</a>
              <a className="block text-blue-700 hover:underline" href="#summary">10. Summary</a>
            </nav>
            <div className="mt-5">
              <Button asChild className="w-full">
                <Link href="/contact">Get a Quote</Link>
              </Button>
            </div>
          </aside>

          {/* CONTENT */}
          <main className="space-y-12">
            <Section id="intro" title="1) Introduction: Why Victoria is Solar-Ready in 2025">
              <p>
                Victoria remains one of Australia’s most active residential solar markets. In 2025, homeowners can still
                access the Solar Homes program for PV rebates and loans, benefit from federal STCs (~30% upfront
                savings), and — from July 2025 — a new federal battery discount that improves battery ROI. Meanwhile,
                feed‑in tariffs have fallen, so maximising self‑consumption matters more than ever. {/* [1](https://solarpowernation.com.au/victorias-solar-rebates-and-incentives-in-2025/)[2](https://www.solarchoice.net.au/learn/solar-rebates/victoria/)[3](https://electricalmasters.com.au/solar-panel-rebate-complete-guide-2025-updated-edition/)[4](https://www.esc.vic.gov.au/media-centre/solar-minimum-feed-tariffs-2025-26) */}
              </p>
            </Section>

            <Section id="rebates" title="2) Rebates & Incentives in Victoria (2025)">
              <h3 className="text-xl font-semibold">Solar Victoria Rebate & Interest-free Loan</h3>
              <p>
                Eligible households can receive up to <strong>$1,400</strong> off a PV system, with an optional
                <strong> $1,400 interest‑free loan</strong> repaid over four years and applied at installation via the
                installer portal (no waiting for reimbursement). Key eligibility: taxable household income under $210k,
                property value under $3M, and no previous Solar Homes PV/battery rebate at that property. {/* [1](https://solarpowernation.com.au/victorias-solar-rebates-and-incentives-in-2025/) */}
              </p>

              <h4 className="font-semibold mt-4">Federal STCs (~30% Off)</h4>
              <p>
                Federal Small‑scale Technology Certificates (STCs) reduce upfront cost — typically around 30% for common
                system sizes — but vary by size, zone and certificate price. STCs phase down annually until 2030. {/* [2](https://www.solarchoice.net.au/learn/solar-rebates/victoria/)[3](https://electricalmasters.com.au/solar-panel-rebate-complete-guide-2025-updated-edition/) */}
              </p>

              <h4 className="font-semibold mt-4">Batteries: 2025 Update</h4>
              <p>
                Solar Victoria’s battery loans have closed. From <strong>1 July 2025</strong>, the federal{" "}
                <em>Cheaper Home Batteries Program</em> provides about a <strong>30% point‑of‑sale discount</strong> on
                eligible batteries (generally VPP‑capable), delivered through retailers. {/* [1](https://solarpowernation.com.au/victorias-solar-rebates-and-incentives-in-2025/)[3](https://electricalmasters.com.au/solar-panel-rebate-complete-guide-2025-updated-edition/) */}
              </p>

              <h4 className="font-semibold mt-4">Feed‑in Tariffs (FiTs)</h4>
              <p>
                The Essential Services Commission set a <strong>0.04c/kWh</strong> minimum flat FiT for{" "}
                <strong>2025–26</strong>, with time‑varying FiTs that can be zero during the day and higher in evening
                peaks; retailers may offer different rates. Strategy: prioritise self‑consumption and consider batteries
                to shift usage. {/* [4](https://www.esc.vic.gov.au/media-centre/solar-minimum-feed-tariffs-2025-26)[5](https://solarcalculator.com.au/feed-in-tariffs/vic/) */}
              </p>
            </Section>

            <Section id="costs" title="3) Solar System Costs in Victoria (After Rebates)">
              <p>
                Actual pricing depends on panel/inverter brand, roof complexity, access, monitoring and electrical
                upgrades. Typical post‑rebate ranges:
              </p>
              <div className="overflow-x-auto mt-4">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left p-3 font-semibold">System Size</th>
                      <th className="text-left p-3 font-semibold">Estimated Cost (After STCs + VIC Rebate)</th>
                      <th className="text-left p-3 font-semibold">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="p-3">3–4 kW</td>
                      <td className="p-3">$2,500 – $4,000</td>
                      <td className="p-3">Small households; limited roof area.</td>
                    </tr>
                    <tr>
                      <td className="p-3">5–6.6 kW</td>
                      <td className="p-3">$3,500 – $6,500</td>
                      <td className="p-3">Most common size in VIC.</td>
                    </tr>
                    <tr>
                      <td className="p-3">~10 kW</td>
                      <td className="p-3">$6,000 – $10,000</td>
                      <td className="p-3">Larger homes; EVs and electrification.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* These ranges reflect typical VIC pricing after STCs (approx. 30%) and the $1,400 VIC rebate. [2](https://www.solarchoice.net.au/learn/solar-rebates/victoria/)[1](https://solarpowernation.com.au/victorias-solar-rebates-and-incentives-in-2025/) */}
            </Section>

            <Section id="panels" title="4) Solar Panels: Technologies & How to Choose">
              <ul>
                <li>
                  <strong>Monocrystalline:</strong> high efficiency and widely available; good all‑rounder.
                </li>
                <li>
                  <strong>N‑type TOPCon:</strong> higher efficiency and lower degradation trends; 2025 favourite for value.
                </li>
                <li>
                  <strong>HJT (Heterojunction):</strong> premium performance; strong thermal characteristics.
                </li>
                <li>
                  <strong>Bifacial:</strong> useful on reflective surfaces or tilt arrays; check racking compatibility.
                </li>
              </ul>
            </Section>

            <Section id="inverters" title="5) Inverters Explained">
              <ul>
                <li>
                  <strong>String inverters:</strong> cost‑effective and reliable; best for unshaded roofs.
                </li>
                <li>
                  <strong>Microinverters:</strong> panel‑level optimisation; great for shade/complex roofs; higher upfront cost.
                </li>
                <li>
                  <strong>Hybrid inverters:</strong> integrate batteries (DC‑coupled) and simplify future upgrades.
                </li>
              </ul>
            </Section>

            <Section id="batteries" title="6) Batteries in Victoria (2025)">
              <p>
                With FiTs near zero during the day, batteries shine by increasing self‑consumption and shifting energy to
                peak times. The new federal discount (~30%) further improves ROI, especially for homes with EVs and
                electrified heating. {/* [4](https://www.esc.vic.gov.au/media-centre/solar-minimum-feed-tariffs-2025-26)[1](https://solarpowernation.com.au/victorias-solar-rebates-and-incentives-in-2025/)[3](https://electricalmasters.com.au/solar-panel-rebate-complete-guide-2025-updated-edition/) */}
              </p>
              <ul className="mt-3">
                <li>6–10 kWh: smaller homes / night‑time essentials</li>
                <li>10–15 kWh: typical households</li>
                <li>15–20 kWh: high usage / EV charging / all‑electric homes</li>
              </ul>
            </Section>

            <Section id="process" title="7) Installation Process in Victoria">
              <ol className="list-decimal pl-6">
                <li>
                  <strong>Site assessment & design:</strong> roof space, shading, switchboard check, structural and layout plan.
                </li>
                <li>
                  <strong>Quote & Solar Victoria application:</strong> installer uploads quote to the Solar Victoria portal;
                  you provide eligibility documents, receive approval/QR code, and proceed to install within the timeframe. {/* [1](https://solarpowernation.com.au/victorias-solar-rebates-and-incentives-in-2025/) */}
                </li>
                <li>
                  <strong>Installation & commissioning:</strong> typically 1–2 days; grid connection paperwork lodged by the installer.
                </li>
                <li>
                  <strong>Monitoring & optimisation:</strong> set up the app, add consumption metering, and fine‑tune usage patterns.
                </li>
              </ol>
            </Section>

            <Section id="installer" title="8) Choosing a Solar Installer">
              <ul>
                <li>Use a <strong>Solar Victoria authorised retailer</strong> (smooths rebate process and protects eligibility). {/* [1](https://solarpowernation.com.au/victorias-solar-rebates-and-incentives-in-2025/) */}</li>
                <li>CEC‑accredited installers and compliant products from approved lists.</li>
                <li>Transparent warranties: panels (20–25 yr product; 25–30 yr performance), inverters (~10 yr), batteries (~10 yr).</li>
                <li>Ask for consumption monitoring and shade modelling; avoid pressure tactics and unknown brands.</li>
              </ul>
            </Section>

            <Section id="faqs" title="9) FAQs">
              <div className="space-y-6">
                {faqItems.map((f, idx) => (
                  <div key={idx} className="bg-white border rounded-xl p-5 shadow-sm">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="text-green-600 h-5 w-5 shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold">{f.q}</h4>
                        <p className="mt-1 text-gray-700">{f.a}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* FAQ facts are consistent with 2025 policy updates on VIC rebate/loan, FiTs and federal battery discount. [1](https://solarpowernation.com.au/victorias-solar-rebates-and-incentives-in-2025/)[4](https://www.esc.vic.gov.au/media-centre/solar-minimum-feed-tariffs-2025-26)[3](https://electricalmasters.com.au/solar-panel-rebate-complete-guide-2025-updated-edition/) */}
            </Section>

            <Section id="summary" title="10) Summary: Is Solar Worth It in Victoria in 2025?">
              <p>
                Yes. Despite low daytime FiTs, the combination of the Solar Victoria rebate + optional loan, federal STC
                savings and the new federal battery discount makes solar one of the strongest upgrades for Victorian
                households — especially when paired with smart self‑consumption and load shifting. {/* [1](https://solarpowernation.com.au/victorias-solar-rebates-and-incentives-in-2025/)[2](https://www.solarchoice.net.au/learn/solar-rebates/victoria/)[3](https://electricalmasters.com.au/solar-panel-rebate-complete-guide-2025-updated-edition/) */}
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Button asChild className="bg-brand-secondary text-black hover:bg-brand-secondary/90">
                  <Link href="/contact">Book a Site Assessment</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/pv-battery#faq">Read PV & Battery FAQs</Link>
                </Button>
              </div>
            </Section>
          </main>
        </div>
      </div>

      {/* FOOTNOTE / DISCLAIMER */}
      <div className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Notes & Disclaimers</h3>
              <p className="text-sm text-gray-600">
                Incentives, FiTs and eligibility criteria change periodically. Always confirm latest details with Solar
                Victoria, your retailer and installer. Pricing ranges are indicative only and may vary by brand, site
                conditions and electrical scope.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
