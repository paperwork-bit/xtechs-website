import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Battery,
  Zap,
  ShieldCheck,
  Gauge,
  Sun,
  PlugZap,
  BarChart3,
  CheckCircle2,
  Clock,
  Cpu,
  Leaf,
  DollarSign,
} from "lucide-react";


const CANONICAL_URL = "https://xtechs.com.au/guides/battery-storage-explained";

export const metadata: Metadata = {
  title: "Battery Storage Explained (Home Batteries 101) | xTechs Renewables",
  description:
    "A plain‑English guide to home batteries: how they work, sizing, AC vs DC coupling, backup, economics, safety, and FAQs.",
  alternates: { canonical: CANONICAL_URL },
  openGraph: {
    title: "Battery Storage Explained (Home Batteries 101)",
    description:
      "How home batteries work, how to size them, what they cost, backup options, and whether they stack up for your home.",
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
  name: "Battery Storage Explained (Home Batteries 101)",
  description:
    "A comprehensive homeowner guide to batteries: sizing, economics, safety and installation.",
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
        name: "Battery Storage Explained (Home Batteries 101)",
      },
    },
  ],
};

const faqItems = [
  {
    q: "Do I need solar panels to install a home battery?",
    a: "No. Batteries can be installed without PV and charged from the grid. However, pairing with solar usually delivers better economics via solar self-consumption and off-peak charging.",
  },
  {
    q: "How big should my battery be?",
    a: "A working rule-of-thumb is to size to roughly cover your typical evening and overnight use (kWh), with a margin for backup if desired. Common ranges: 6–10 kWh for smaller homes, 10–15 kWh for typical homes, 15–20+ kWh for high usage or EV charging.",
  },
  {
    q: "What’s the difference between AC-coupled and DC-coupled batteries?",
    a: "AC-coupled batteries connect on the AC side (often easier to retrofit and flexible with existing inverters). DC-coupled systems integrate via a hybrid inverter for higher round-trip efficiency and tighter control, often best when planning PV + battery together.",
  },
  {
    q: "Will a battery power my house during a blackout?",
    a: "Only if your system includes backup capability (islanding). Some systems support whole-of-home backup; others back up selected essential circuits. Discuss backup expectations and switchboard setup during design.",
  },
  {
    q: "How long do home batteries last?",
    a: "Most reputable batteries offer around 10-year warranties with throughput (MWh) limits. Real-world life depends on cycling, temperature, and charge windows. Good thermal management and conservative settings can extend life.",
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

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  mainEntityOfPage: { "@type": "WebPage", "@id": `${CANONICAL_URL}#webpage` },
  headline: "Battery Storage Explained (Home Batteries 101)",
  description:
    "How home batteries work, sizing guidance, AC vs DC coupling, backup options, economics, safety, and installation.",
  author: { "@type": "Organization", name: "xTechs Renewables" },
  publisher: {
    "@type": "Organization",
    name: "xTechs Renewables",
    logo: {
      "@type": "ImageObject",
      url: "https://xtechs.com.au/android-chrome-512x512.png",
    },
  },
  inLanguage: "en-AU",
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

export default function BatteryStorageExplainedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* JSON-LD */}
      <Script
        id="battery-webpage-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <Script
        id="battery-breadcrumb-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Script
        id="battery-article-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Script
        id="battery-faq-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* HERO (new layout, same colour system) */}
      <div className="relative overflow-hidden bg-gradient-brand-primary text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <Kicker>Home Battery Guide</Kicker>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-brand-secondary-light">Battery Storage</span> Explained
            </h1>
            <p className="text-lg md:text-2xl text-white/90 mb-8">
              Understand how home batteries work, how to size them, whether they’re worth it,
              and what to expect from backup and safety.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-brand-secondary hover:bg-brand-secondary/90 text-black font-semibold"
              >
                <Link href="/contact">Get a Battery Quote</Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-white text-brand-primary hover:bg-gray-100 font-semibold border-2 border-white"
              >
                <Link href="#quickstart">Quick Start</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* QUICK BENEFITS (3-up cards) */}
      <div className="container mx-auto px-4 -mt-8 md:-mt-12">
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="p-5 bg-white/90 backdrop-blur border-l-4 border-brand-secondary">
            <div className="flex items-center gap-3">
              <DollarSign className="text-brand-secondary h-6 w-6" />
              <h3 className="font-semibold">Maximise Self‑Consumption</h3>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Store daytime solar to use at night and during peak tariffs—reduces grid draw and bill volatility.
            </p>
          </Card>
          <Card className="p-5 bg-white/90 backdrop-blur border-l-4 border-green-500">
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-green-600 h-6 w-6" />
              <h3 className="font-semibold">Backup (Optional)</h3>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Keep essentials running in an outage with an islanding gateway or hybrid inverter setup.
            </p>
          </Card>
          <Card className="p-5 bg-white/90 backdrop-blur border-l-4 border-blue-500">
            <div className="flex items-center gap-3">
              <Leaf className="text-blue-600 h-6 w-6" />
              <h3 className="font-semibold">Electrification Ready</h3>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Pair with heat pumps and EV charging to shift loads and accelerate decarbonisation.
            </p>
          </Card>
        </div>
      </div>

      {/* BODY */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">
          {/* MAIN CONTENT */}
          <main className="space-y-12">
            <Section id="quickstart" title="1) How Home Batteries Work (Quick Start)">
              <p>
                A home battery stores energy (usually from your solar) and discharges later to meet your
                household loads. A battery system includes cells (Li‑ion chemistry is most common),
                a Battery Management System (BMS), and power electronics (inverter/charger). Systems may be
                <strong> AC‑coupled</strong> (separate battery inverter) or <strong>DC‑coupled</strong>
                (hybrid inverter).
              </p>
              <ul>
                <li><strong>Charge sources:</strong> solar PV, off‑peak grid, or combinations with smart control.</li>
                <li><strong>Discharge uses:</strong> evening loads, peak tariff windows, or backup circuits.</li>
                <li><strong>Smart control:</strong> time‑of‑use optimisation, weather pre‑charge, and VPPs (optional).</li>
              </ul>
            </Section>

            <Section id="usecases" title="2) Popular Use‑Cases">
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <PlugZap className="h-5 w-5 text-brand-secondary" />
                    <h4 className="font-semibold">Night‑time Solar</h4>
                  </div>
                  <p className="text-sm text-gray-700">
                    Store surplus solar and use it after sunset to cut evening grid imports.
                  </p>
                </Card>
                <Card className="p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="h-5 w-5 text-brand-secondary" />
                    <h4 className="font-semibold">Tariff Shifting</h4>
                  </div>
                  <p className="text-sm text-gray-700">
                    Charge off‑peak, discharge at peak. Works with or without PV (check tariff spread and round‑trip loss).
                  </p>
                </Card>
                <Card className="p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <Sun className="h-5 w-5 text-brand-secondary" />
                    <h4 className="font-semibold">Backup Power</h4>
                  </div>
                  <p className="text-sm text-gray-700">
                    Power essentials when the grid goes down—design switchboard with backed‑up circuits.
                  </p>
                </Card>
              </div>
            </Section>

            <Section id="sizing" title="3) Which Battery Size Fits My Home?">
              <div className="bg-white border rounded-xl p-5 shadow-sm">
                <div className="flex items-start gap-4">
                  <Gauge className="h-6 w-6 text-blue-600 mt-1" />
                  <div>
                    <h4 className="font-semibold">Quick sizing rule‑of‑thumb</h4>
                    <p className="text-gray-700">
                      Size for your typical evening+overnight usage. If you export lots of solar daily, add capacity.
                      If you want outage coverage, include a buffer for your backed‑up circuits.
                    </p>
                    <ul className="mt-3 space-y-1 text-sm text-gray-700">
                      <li>• 6–10 kWh → smaller homes / essentials</li>
                      <li>• 10–15 kWh → typical homes</li>
                      <li>• 15–20+ kWh → high usage / EV / all‑electric</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 text-sm text-gray-600">
                  Tip: enable consumption monitoring for at least a week to see your night loads and peaks.
                </div>
              </div>
            </Section>

            <Section id="economics" title="4) Economics & What Affects Payback">
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="p-5 border-l-4 border-amber-500">
                  <div className="flex items-center gap-3 mb-2">
                    <BarChart3 className="h-5 w-5 text-amber-600" />
                    <h4 className="font-semibold">Key levers</h4>
                  </div>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Tariff structure (peak vs off‑peak spread)</li>
                    <li>• Solar surplus available most days</li>
                    <li>• Battery round‑trip efficiency & degradation</li>
                    <li>• VPP payments or demand response (optional)</li>
                    <li>• Installed cost, warranty term & throughput cap</li>
                  </ul>
                </Card>
                <Card className="p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <Cpu className="h-5 w-5 text-brand-secondary" />
                    <h4 className="font-semibold">Smart control ideas</h4>
                  </div>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Pre‑charge before forecasted cloudy days</li>
                    <li>• Discharge during peak tariff windows</li>
                    <li>• Reserve % SoC for backup (configurable)</li>
                    <li>• Align EV/heat‑pump with battery strategy</li>
                  </ul>
                </Card>
              </div>
              <p className="mt-4 text-sm text-gray-600">
                Want a tailored ROI model? We can run a scenario with your interval data and tariffs.
              </p>
            </Section>

            <Section id="coupling" title="5) AC vs DC Coupling (Retrofit vs New Builds)">
              <div className="overflow-x-auto mt-2">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left p-3 font-semibold">Aspect</th>
                      <th className="text-left p-3 font-semibold">AC‑Coupled</th>
                      <th className="text-left p-3 font-semibold">DC‑Coupled (Hybrid)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="p-3">Best for</td>
                      <td className="p-3">Retrofits; keep existing string inverter</td>
                      <td className="p-3">New PV + battery; integrated design</td>
                    </tr>
                    <tr>
                      <td className="p-3">Efficiency</td>
                      <td className="p-3">Extra AC/DC conversions</td>
                      <td className="p-3">Fewer conversions; higher round‑trip</td>
                    </tr>
                    <tr>
                      <td className="p-3">Complexity</td>
                      <td className="p-3">Generally simpler to add later</td>
                      <td className="p-3">More design upfront; streamlined system</td>
                    </tr>
                    <tr>
                      <td className="p-3">Backup</td>
                      <td className="p-3">Often via external gateway</td>
                      <td className="p-3">Often native with hybrid inverter</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Section>

            <Section id="safety" title="6) Safety, Standards & Installation">
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="p-5 border-l-4 border-blue-500">
                  <div className="flex items-center gap-3 mb-2">
                    <ShieldCheck className="h-5 w-5 text-blue-600" />
                    <h4 className="font-semibold">Safety basics</h4>
                  </div>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Use approved products with proven BMS and certifications</li>
                    <li>• Follow manufacturer clearance & wall rating requirements</li>
                    <li>• Keep away from ignition sources; comply with setback rules</li>
                    <li>• Ventilation and ambient temperature limits matter</li>
                  </ul>
                </Card>
                <Card className="p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <Zap className="h-5 w-5 text-brand-secondary" />
                    <h4 className="font-semibold">Installation flow</h4>
                  </div>
                  <ol className="list-decimal pl-5 text-sm text-gray-700 space-y-1">
                    <li>Site check: switchboard, space, mounting surface, clearances</li>
                    <li>Design: backup circuits, inverter choice, monitoring</li>
                    <li>Install & commission: firmware, apps, grid paperwork</li>
                    <li>Optimise: SoC reserve, schedules, tariff rules, alerts</li>
                  </ol>
                </Card>
              </div>
            </Section>

            <Section id="glossary" title="7) Quick Glossary">
              <ul>
                <li><strong>SoC (State of Charge):</strong> % of battery charge available.</li>
                <li><strong>BMS:</strong> Battery Management System that protects cells and manages charge/discharge.</li>
                <li><strong>Round‑trip Efficiency:</strong> Energy out ÷ energy in (charging + discharging losses).</li>
                <li><strong>DoD (Depth of Discharge):</strong> Portion of capacity used per cycle.</li>
                <li><strong>Islanding/Backup:</strong> Ability to power circuits when grid is down.</li>
              </ul>
            </Section>

            <Section id="faqs" title="8) FAQs">
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

            <Section id="cta" title="9) Ready to Explore a Battery for Your Home?">
              <p>
                We’ll review your usage, tariffs and roof system to recommend the right size and coupling
                approach. If you want outage protection, we’ll design appropriate backup circuits too.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Button className="bg-brand-secondary text-black hover:bg-brand-secondary/90" asChild>
                  <Link href="/contact">Book a Battery Assessment</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/pv-battery#faq">Read PV & Battery FAQs</Link>
                </Button>
              </div>
            </Section>
          </main>

          {/* RIGHT SIDEBAR (TOC + Action) */}
          <aside className="lg:sticky lg:top-24 h-max bg-white border rounded-xl p-5 shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-3">On this page</h4>
            <nav className="text-sm space-y-2">
              <a className="block text-blue-700 hover:underline" href="#quickstart">1. How Batteries Work</a>
              <a className="block text-blue-700 hover:underline" href="#usecases">2. Use‑Cases</a>
              <a className="block text-blue-700 hover:underline" href="#sizing">3. Sizing</a>
              <a className="block text-blue-700 hover:underline" href="#economics">4. Economics</a>
              <a className="block text-blue-700 hover:underline" href="#coupling">5. AC vs DC</a>
              <a className="block text-blue-700 hover:underline" href="#safety">6. Safety & Install</a>
              <a className="block text-blue-700 hover:underline" href="#glossary">7. Glossary</a>
              <a className="block text-blue-700 hover:underline" href="#faqs">8. FAQs</a>
              <a className="block text-blue-700 hover:underline" href="#cta">9. Get Started</a>
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
              <h3 className="text-lg font-semibold mb-2 text-gray-800">
                Notes & Disclaimers
              </h3>
              <p className="text-sm text-gray-600">
                Pricing, incentives and grid rules change periodically. Always confirm current details
                with your installer and energy retailer. Battery suitability depends on your loads,
                tariffs, site conditions and warranty terms.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
