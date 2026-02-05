import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import BackgroundCircles from "@/components/ui/background-circles";
import { ProcessSteps } from "@/components/ui/process-steps";
import ServicesSection from "@/components/ui/services";
import { Button } from "@/components/ui/button";
import { Check, MapPin, Shield, BatteryCharging, Sun } from "lucide-react";

export const metadata: Metadata = {
  title: "Solar & Battery Installation Geelong | xTechs Renewables",
  description:
    "CEC-accredited solar & battery installation in Geelong. PV systems, battery storage, EV chargers, and commercial solar.",
  alternates: { canonical: "/locations/geelong" },
  openGraph: {
    title: "Solar & Battery Installation Geelong | xTechs Renewables",
    description:
      "High‑performance residential & commercial solar services across Geelong.",
    url: "https://www.xtechsrenewables.com.au/locations/geelong",
    images: ["/og/location-geelong.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Solar & Battery Installation Geelong | xTechs Renewables",
    description:
      "Premium PV, battery storage & EV charging for Geelong homes & businesses.",
    images: ["/og/location-geelong.jpg"],
  },
};

export default function GeelongPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://www.xtechsrenewables.com.au/locations/geelong#localbusiness",
    name: "xTechs Renewables — Geelong",
    url: "https://www.xtechsrenewables.com.au/locations/geelong",
    image: "https://www.xtechsrenewables.com.au/og.jpg",
    logo: "https://www.xtechsrenewables.com.au/xlogo.png",
    telephone: "+61 3 0000 0000",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Business Street",
      addressLocality: "Geelong",
      addressRegion: "VIC",
      postalCode: "3220",
      addressCountry: "AU",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -38.172,
      longitude: 144.384,
    },
    areaServed: [{ "@type": "AdministrativeArea", name: "Geelong" }],
     openingHoursSpecification: "Mo-Fr 08:00-17:00",

  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <BackgroundCircles variant="sun" />
        <div className="relative z-10">
          <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                  <MapPin className="h-4 w-4" />
                  Geelong
                </span>
                <h1 className="mt-4 text-4xl md:text-5xl font-bold leading-tight">
                  Solar & Battery Solutions <span className="text-emerald-600">for Geelong</span>
                </h1>
                <p className="mt-4 text-lg text-gray-700 max-w-2xl">
                  Reliable PV, battery backup and EV charging for homes, new builds
                  and commercial sites throughout Geelong and surrounds.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <Button asChild size="lg">
                    <Link href="/contact">Get a Quote</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link href="/pv-battery">Explore PV & Battery</Link>
                  </Button>
                </div>
                <ul className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                  <li className="flex items-center gap-2 text-gray-700">
                    <Shield className="h-4 w-4 text-emerald-600" />
                    CEC‑accredited
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <BatteryCharging className="h-4 w-4 text-emerald-600" />
                    Backup‑ready systems
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <Sun className="h-4 w-4 text-emerald-600" />
                    Tier‑one panels
                  </li>
                </ul>
              </div>
              <div className="relative">
                <div className="aspect-[4/3] w-full rounded-xl border bg-white/60 backdrop-blur shadow-sm overflow-hidden">
                  <Image
                    src="/geelong/geelong.webp"
                    alt="Geelong rooftops"
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  *Ask us about builder‑ready workflows for new developments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services-tile" className="bg-white">
        <div className="mx-auto max-w-6xl px-4 md:px-6 py-12 md:py-16">
          <header className="mb-8">
            <h2 className="text-3xl font-semibold">Popular Services in Geelong</h2>
            <p className="text-gray-600">
              PV arrays, battery storage, EV charging & commercial solutions.
            </p>
          </header>
          <ServicesSection />
        </div>
      </section>

      {/* Why Us */}
      <section className="bg-slate-50 dark:bg-slate-900/40">
        <div className="mx-auto max-w-6xl px-4 md:px-6 py-12 md:py-16">
          <h2 className="text-3xl font-semibold mb-6">Why xTechs for Geelong</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Design to Targets",
                desc: "Yield models aligned with your savings goals.",
              },
              {
                title: "Battery Backup",
                desc: "Essential circuits on during outages.",
              },
              {
                title: "Compliance",
                desc: "Approvals, metering & export limits handled.",
              },
              {
                title: "Monitoring",
                desc: "Remote monitoring & support plans offered.",
              },
              {
                title: "Premium Hardware",
                desc: "Panels, inverters & batteries we trust.",
              },
              { title: "Neat Installs", desc: "Clean workmanship & tidy cabling." },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border bg-white p-6">
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-emerald-600 mt-0.5" />
                  <div>
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process-tile" className="bg-white">
        <ProcessSteps />
      </section>

      {/* Areas We Cover */}
      <section className="bg-slate-50 dark:bg-slate-900/40">
        <div className="mx-auto max-w-6xl px-4 md:px-6 py-12 md:py-16">
          <h2 className="text-3xl font-semibold mb-4">Areas We Cover</h2>
          <p className="text-gray-600 mb-6">Common Geelong areas we service.</p>
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            {[
              "Geelong",
              "Belmont",
              "Highton",
              "Newtown",
              "Waurn Ponds",
              "Grovedale",
              "Lara",
              "Torquay",
            ].map((name) => (
              <li key={name} className="rounded-lg border bg-white px-3 py-2">
                {name}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Map */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 md:px-6 py-12 md:py-16">
          <h2 className="text-3xl font-semibold mb-6">Find Us</h2>
          <div className="w-full overflow-hidden rounded-xl border">
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3143.058486054349!2d145.11353587619786!3d-38.02241597192406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad66db36c6b8917%3A0x81ad2dc996edb760!2sxTechs%20Renewables!5e0!3m2!1sen!2s!4v1770078343341!5m2!1sen!2s"
                title="xTechs Renewables — Geelong"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute left-0 top-0 h-full w-full border-0"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-slate-50 dark:bg-slate-900/40">
        <div className="mx-auto max-w-6xl px-4 md:px-6 py-12 md:py-16">
          <h2 className="text-3xl font-semibold mb-6">FAQ — Geelong</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { q: "Thời gian lắp đặt?", a: "Thường 1–2 ngày cho nhà ở; thương mại tuỳ quy mô." },
              { q: "Có hỗ trợ export limit không?", a: "Có—DNSP & cấu hình inverter đầy đủ." },
              {
                q: "Bảo hành phần cứng?",
                a: "Panels 25‑30 năm hiệu suất; inverter ~10 năm; battery ~10 năm (tuỳ model).",
              },
              {
                q: "Có monitoring & bảo trì?",
                a: "Có—chúng tôi thiết lập giám sát & gói hỗ trợ.",
              },
            ].map((item) => (
              <div key={item.q} className="rounded-xl border bg-white p-6">
                <h3 className="font-medium">{item.q}</h3>
                <p className="text-sm text-gray-600 mt-2">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 md:px-6 py-12 md:py-16 text-center">
          <h2 className="text-3xl font-semibold">
            Get a tailored quote for Geelong
          </h2>
          <p className="text-gray-600 mt-2">
            Book a site assessment or speak with our CEC‑accredited team today.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/contact">Book Assessment</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/pv-battery">View PV & Battery</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}