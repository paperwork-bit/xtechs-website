import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import BackgroundCircles from "@/components/ui/background-circles";
import { ProcessSteps } from "@/components/ui/process-steps";
import ServicesSection from "@/components/ui/services";
import { Button } from "@/components/ui/button";
import { Check, MapPin, Shield, BatteryCharging, Sun } from "lucide-react";

export const metadata: Metadata = {
  title: "Solar & Battery Installation Mornington Peninsula | xTechs Renewables",
  description:
    "CEC-accredited solar panel & battery installation across the Mornington Peninsula. PV, battery storage, EV chargers, and off-grid.",
  alternates: { canonical: "/locations/mornington-peninsula" },
  openGraph: {
    title:
      "Solar & Battery Installation Mornington Peninsula | xTechs Renewables",
    description:
      "High-performance residential & commercial solar for the Peninsula.",
    url: "https://www.xtechsrenewables.com.au/locations/mornington-peninsula",
    images: ["/og/location-mornington-peninsula.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Solar & Battery Installation Mornington Peninsula | xTechs Renewables",
    description: "Premium PV, batteries & EV charging for coastal sites.",
    images: ["/og/location-mornington-peninsula.jpg"],
  },
};

export default function MorningtonPeninsulaPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id":
      "https://www.xtechsrenewables.com.au/locations/mornington-peninsula#localbusiness",
    name: "xTechs Renewables — Mornington Peninsula",
    url: "https://www.xtechsrenewables.com.au/locations/mornington-peninsula",
    image: "https://www.xtechsrenewables.com.au/og.jpg",
    logo: "https://www.xtechsrenewables.com.au/xlogo.png",
    telephone: "+61 3 0000 0000",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Business Street",
      addressLocality: "Mornington",
      addressRegion: "VIC",
      postalCode: "3931",
      addressCountry: "AU",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -38.3400,
      longitude: 145.0000,
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Mornington Peninsula" },
    ],
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
                  Mornington Peninsula
                </span>
                <h1 className="mt-4 text-4xl md:text-5xl font-bold leading-tight">
                  Solar & Battery Solutions{" "}
                  <span className="text-emerald-600">for the Peninsula</span>
                </h1>
                <p className="mt-4 text-lg text-gray-700 max-w-2xl">
                  Coastal‑grade designs for salt‑air environments, battery
                  backup for outages, and EV charging for home & holiday homes.
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
                    Backup‑ready solutions
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <Sun className="h-4 w-4 text-emerald-600" />
                    25‑yr panel performance
                  </li>
                </ul>
              </div>
              <div className="relative">
                <div className="aspect-[4/3] w-full rounded-xl border bg-white/60 backdrop-blur shadow-sm overflow-hidden">
                  <Image
                    src="/images/mornington-solar.jpg"
                    alt="Mornington Peninsula rooftops"
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  *We specify corrosion‑resistant hardware for coastal installs.
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
            <h2 className="text-3xl font-semibold">Popular Services on the Peninsula</h2>
            <p className="text-gray-600">
              PV + battery, coastal‑grade components, compliant EV charging.
            </p>
          </header>
          <ServicesSection />
        </div>
      </section>

      {/* Why Us */}
      <section className="bg-slate-50 dark:bg-slate-900/40">
        <div className="mx-auto max-w-6xl px-4 md:px-6 py-12 md:py-16">
          <h2 className="text-3xl font-semibold mb-6">Why xTechs for the Peninsula</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Coastal Durability",
                desc: "Hardware & fixings specified for salt‑air conditions.",
              },
              {
                title: "Battery Backup",
                desc: "Keep essentials on during storms & outages.",
              },
              {
                title: "Grid & Compliance",
                desc: "DNSP applications, metering & export limits.",
              },
              {
                title: "Monitoring",
                desc: "Remote monitoring & optional support plans.",
              },
              { title: "Premium Components", desc: "Panels, inverters, batteries we trust." },
              { title: "Neat Installs", desc: "Careful roof work & tidy cable runs." },
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
          <p className="text-gray-600 mb-6">
            We service the broader Mornington Peninsula—here are common areas.
          </p>
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            {[
              "Mornington",
              "Mount Martha",
              "Mount Eliza",
              "Frankston",
              "Dromana",
              "Rosebud",
              "Rye",
              "Sorrento",
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
                title="xTechs Renewables — Mornington Peninsula"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute left-0 top-0 h-full w-full border-0"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      
      {/* Final CTA */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 md:px-6 py-12 md:py-16 text-center">
          <h2 className="text-3xl font-semibold">
            Get a tailored quote for Mornington Peninsula
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
