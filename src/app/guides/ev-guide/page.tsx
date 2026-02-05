import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Car,
  PlugZap,
  ShieldCheck,
  Gauge,
  Home,
  Wrench,
  BarChart3,
  Cpu,
  CheckCircle2,
  Clock,
  Sun,
  Network,
} from "lucide-react";

/**
 * ROUTE: /guides/ev-charger-installation
 * STYLE: Keeps brand colours (bg-gradient-brand-primary/secondary, brand-secondary-light accents)
 * LAYOUT: New structure vs. solar & battery pages to avoid repetition.
 */

const CANONICAL_URL = "https://xtechs.com.au/guides/ev-charger-installation";

export const metadata: Metadata = {
  title: "EV Charger Installation Guide (Home & Small Business) | xTechs Renewables",
  description:
    "A practical, brand‑neutral guide to Level 1 vs Level 2 chargers, single‑ vs three‑phase, safety & compliance, smart charging, solar integration, apartments/strata, and FAQs.",
  alternates: { canonical: CANONICAL_URL },
  openGraph: {
    title: "EV Charger Installation Guide (Home & Small Business)",
    description:
      "Understand charger types, wiring & RCD protection, load management, smart features, solar pairing, and the install process.",
    url: CANONICAL_URL,
    type: "article",
  },
};

// -------------------- JSON-LD --------------------
const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${CANONICAL_URL}#webpage`,
  url: CANONICAL_URL,
  name: "EV Charger Installation Guide (Home & Small Business)",
  description:
    "Comprehensive guide to home and SME EV charging: types, installation, safety, smart features and FAQs.",
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
        name: "EV Charger Installation Guide",
      },
    },
  ],
};

const faqItems = [
  {
    q: "Do I need a dedicated circuit for a wall charger?",
    a: "Yes—fixed EV chargers are normally installed on a dedicated final sub‑circuit sized for the charger and wiring method. Your electrician confirms this during design and will follow local service & installation rules.",
  },
  {
    q: "Single‑phase vs three‑phase at home?",
    a: "Single‑phase typically supports ~7 kW chargers, while three‑phase allows 11–22 kW hardware (vehicle‑dependent). If you already have three‑phase or plan multiple EVs, three‑phase can future‑proof.",
  },
  {
    q: "Type A vs Type B RCDs for EV chargers?",
    a: "Many modern chargers include 6 mA DC fault detection (RDC‑DD), allowing an upstream Type A RCD/RCBO; if not provided (or specified by the manufacturer), a Type B device is used. Your electrician selects per datasheet and wiring rules.",
  },
  {
    q: "Will a charger work in a blackout?",
    a: "Standard wall chargers don’t provide backup. If you need driving ‘top‑up’ during outages, discuss storage + backup circuits or vehicle‑to‑home/grid capable systems (where supported).",
  },
  {
    q: "Can I restrict charging to solar surplus?",
    a: "Yes—many smart chargers support solar‑aware modes via CT metering or API control, prioritising excess PV and integrating with time‑of‑use tariffs.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

// -------------------- Utility --------------------
const Kicker = ({ children }: { children: React.ReactNode }) => (
  <Badge className="mb-4 bg-gradient-brand-secondary text-white border-2 border-brand-secondary-light">
    {children}
  </Badge>
);

const Section = ({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) => (
  <section id={id} className="scroll-mt-24">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
      {title}
    </h2>
    <div className="prose prose-slate max-w-none">{children}</div>
  </section>
);

export default function EvChargerInstallationGuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* JSON-LD */}
      <Script
        id="ev-webpage-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <Script
        id="ev-breadcrumb-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Script
        id="ev-faq-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* HERO */}
      <div className="relative overflow-hidden bg-gradient-brand-primary text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <Kicker>EV Charging 101</Kicker>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-brand-secondary-light">EV Charger Installation</span> Guide
            </h1>
            <p className="text-lg md:text-2xl text-white/90 mb-8">
              Choose the right charger, understand wiring & safety, add smart features, and install with confidence at home or work.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-brand-secondary hover:bg-brand-secondary/90 text-black font-semibold"
              >
                <Link href="/contact">Get an EV Charger Quote</Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-white text-brand-primary hover:bg-gray-100 font-semibold border-2 border-white"
              >
                <Link href="#toc">Jump to Guide</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* BENEFIT STRIP (new 4-up) */}
      <div className="container mx-auto px-4 -mt-8 md:-mt-12">
        <div className="grid md:grid-cols-4 gap-4">
          <Card className="p-5 bg-white/90 backdrop-blur border-l-4 border-brand-secondary">
            <div className="flex items-center gap-3">
              <PlugZap className="text-brand-secondary h-6 w-6" />
              <h3 className="font-semibold">Faster at Home</h3>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Upgrade from a portable lead to a wall charger for reliable overnight top‑ups.
            </p>
          </Card>
          <Card className="p-5 bg-white/90 backdrop-blur border-l-4 border-green-500">
            <div className="flex items-center gap-3">
              <BarChart3 className="text-green-600 h-6 w-6" />
              <h3 className="font-semibold">Tariff & Solar Savvy</h3>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Schedule off‑peak or prioritise PV surplus with smart charging controls.
            </p>
          </Card>
          <Card className="p-5 bg-white/90 backdrop-blur border-l-4 border-amber-500">
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-amber-600 h-6 w-6" />
              <h3 className="font-semibold">Safe & Compliant</h3>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Installed by licensed electricians with appropriate RCD protection and clearances.
            </p>
          </Card>
          <Card className="p-5 bg-white/90 backdrop-blur border-l-4 border-blue-500">
            <div className="flex items-center gap-3">
              <Network className="text-blue-600 h-6 w-6" />
              <h3 className="font-semibold">Future‑Ready</h3>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Plan for multiple EVs, three‑phase upgrades, and dynamic load management.
            </p>
          </Card>
        </div>
      </div>

      {/* BODY: Content + TOC */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
          {/* MAIN */}
          <main className="space-y-12">
            <Section id="types" title="1) Charger Types & Connectors (Quick Explainer)">
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <Home className="h-5 w-5 text-brand-secondary" />
                    <h4 className="font-semibold">Level 1 vs Level 2</h4>
                  </div>
                  <p className="text-sm text-gray-700">
                    <strong>Level 1</strong> uses a standard outlet and is the slowest option—fine for light daily use.
                    <strong> Level 2</strong> is a dedicated wall charger (typically 7–22 kW, vehicle‑dependent) for faster, everyday charging at home or work.
                  </p>
                </Card>
                <Card className="p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <Car className="h-5 w-5 text-brand-secondary" />
                    <h4 className="font-semibold">Plugs in AU</h4>
                  </div>
                  <p className="text-sm text-gray-700">
                    Most new EVs in Australia use a <strong>Type 2</strong> AC inlet and <strong>CCS2</strong> for DC fast charging; many public AC posts are untethered, so a Type 2 cable can be handy.
                  </p>
                </Card>
              </div>
            </Section>

            <Section id="checklist" title="2) Connection Checklist (What Your Electrician Confirms)">
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="p-5 border-l-4 border-blue-500">
                  <div className="flex items-center gap-3 mb-2">
                    <Gauge className="h-5 w-5 text-blue-600" />
                    <h4 className="font-semibold">Capacity & Circuit</h4>
                  </div>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Spare capacity at the switchboard & service</li>
                    <li>• Dedicated final sub‑circuit sized to the EVSE</li>
                    <li>• Cable route, derating & enclosure protection</li>
                    <li>• Earthing, surge & isolation as required</li>
                  </ul>
                </Card>
                <Card className="p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <ShieldCheck className="h-5 w-5 text-brand-secondary" />
                    <h4 className="font-semibold">RCD Protection</h4>
                  </div>
                  <p className="text-sm text-gray-700">
                    If the charger includes 6 mA DC fault detection, an upstream Type A RCD/RCBO is commonly used; otherwise (or if specified), a Type B is selected. Your installer follows the wiring rules and the charger datasheet.
                  </p>
                </Card>
              </div>
            </Section>

            <Section id="sizing" title="3) Sizing & Load Management (Single vs Three‑phase)">
              <p>
                Pick a charge rate that suits your driving and supply—single‑phase often supports ~7 kW hardware; three‑phase allows higher outputs (11–22 kW) where the EV can accept it. Dynamic load management can automatically
                throttle the charger to stay within your main supply limits.
              </p>
              <div className="bg-white border rounded-xl p-5 shadow-sm mt-4">
                <div className="flex items-start gap-4">
                  <Cpu className="h-6 w-6 text-amber-600 mt-1" />
                  <div>
                    <h4 className="font-semibold">Smart limits</h4>
                    <ul className="mt-2 text-sm text-gray-700 space-y-1">
                      <li>• Set current caps to avoid nuisance trips</li>
                      <li>• Schedule off‑peak or solar‑only windows</li>
                      <li>• Use CT clamps for whole‑home load awareness</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Section>

            <Section id="smart" title="4) Smart Charging & Solar Integration">
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="p-5 border-l-4 border-green-500">
                  <div className="flex items-center gap-3 mb-2">
                    <Sun className="h-5 w-5 text-green-600" />
                    <h4 className="font-semibold">Solar‑aware modes</h4>
                  </div>
                  <p className="text-sm text-gray-700">
                    Many chargers can follow excess PV export, biasing charge when the sun is strong—useful with TOU tariffs and battery storage strategies.
                  </p>
                </Card>
                <Card className="p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="h-5 w-5 text-brand-secondary" />
                    <h4 className="font-semibold">Automation</h4>
                  </div>
                  <p className="text-sm text-gray-700">
                    Create schedules around cheap windows, weather, or EV APIs. Consider OCPP‑capable hardware if you want vendor‑agnostic controls.
                  </p>
                </Card>
              </div>
            </Section>

            <Section id="steps" title="5) Installation Steps (What Happens on the Day)">
              <ol className="list-decimal pl-6">
                <li><strong>Site check & design:</strong> switchboard, spare capacity, cable route, charger position.</li>
                <li><strong>Quote & approvals:</strong> scope any switchboard upgrades; your DNSP may have simple notifications for standard installs.</li>
                <li><strong>Install & test:</strong> mount EVSE, wire dedicated circuit, set RCD/SPD/isolation per design.</li>
                <li><strong>Commission:</strong> firmware/app setup, current limits, schedules, CT sensing if used.</li>
              </ol>
            </Section>

            <Section id="apartments" title="6) Apartments & Strata (Shared Parking)">
              <p>
                For shared garages, plan cable pathways, metering, load management and cost allocation upfront. Untethered (socketed) chargers plus personal Type 2 cables are common in shared AC bays; some buildings deploy
                centralised load‑controlled systems with OCPP for billing.
              </p>
            </Section>

            <Section id="faqs" title="7) FAQs">
              <div className="space-y-6">
                {faqItems.map((f, i) => (
                  <div key={i} className="bg-white border rounded-xl p-5 shadow-sm">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="text-green-600 h-5 w-5 shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold">{f.q}</h4>
                        <p className="mt-1 text-gray-700">{f.a}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            <Section id="cta" title="8) Ready to Install or Upgrade?">
              <p>
                We’ll assess your switchboard and usage, recommend the right charger, and configure smart schedules for off‑peak or solar‑first charging.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Button className="bg-brand-secondary text-black hover:bg-brand-secondary/90" asChild>
                  <Link href="/contact">Book a Charger Assessment</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/pv-battery#faq">Read PV & Battery FAQs</Link>
                </Button>
              </div>
            </Section>
          </main>

          {/* TOC */}
          <aside
            id="toc"
            className="lg:sticky lg:top-24 h-max bg-white border rounded-xl p-5 shadow-sm"
          >
            <h4 className="font-semibold text-gray-800 mb-3">On this page</h4>
            <nav className="text-sm space-y-2">
              <a className="block text-blue-700 hover:underline" href="#types">1. Charger Types</a>
              <a className="block text-blue-700 hover:underline" href="#checklist">2. Connection Checklist</a>
              <a className="block text-blue-700 hover:underline" href="#sizing">3. Sizing & Load</a>
              <a className="block text-blue-700 hover:underline" href="#smart">4. Smart & Solar</a>
              <a className="block text-blue-700 hover:underline" href="#steps">5. Install Steps</a>
              <a className="block text-blue-700 hover:underline" href="#apartments">6. Apartments</a>
              <a className="block text-blue-700 hover:underline" href="#faqs">7. FAQs</a>
              <a className="block text-blue-700 hover:underline" href="#cta">8. Get Started</a>
            </nav>
            <div className="mt-5">
              <Button asChild className="w-full">
                <Link href="/contact">Get a Quote</Link>
              </Button>
            </div>
          </aside>
        </div>
      </div>

      {/* DISCLAIMER */}
      <div className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Notes & Disclaimers</h3>
              <p className="text-sm text-gray-600">
                Electrical work must be performed by a licensed electrician. Requirements vary by jurisdiction and may change—your installer will confirm local standards, service & installation rules, and product datasheets during design.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}