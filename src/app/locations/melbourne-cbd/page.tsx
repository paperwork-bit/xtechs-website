import type { Metadata } from "next";
import BackgroundCircles from "@/components/ui/background-circles";
import { ProcessSteps } from "@/components/ui/process-steps";
import ServicesSection from "@/components/ui/services";
import { Button } from "@/components/ui/button";
import { Check, MapPin, Shield, BatteryCharging, Sun } from "lucide-react";

export const metadata: Metadata = {
  title: "Solar & Battery Installation Melbourne CBD | xTechs Renewables",
  description:
    "CEC-accredited solar panel and battery installation in Melbourne CBD. PV systems, battery storage, EV chargers, and commercial solar.",
  alternates: { canonical: "/locations/melbourne-cbd" },
  openGraph: {
    title: "Solar & Battery Installation Melbourne CBD | xTechs Renewables",
    description:
      "CEC-accredited solar & battery installers serving Melbourne CBD. High-performance PV, battery storage, and EV chargers.",
    url: "https://www.xtechsrenewables.com.au/locations/melbourne-cbd",
    images: ["/og/location-melbourne-cbd.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Solar & Battery Installation Melbourne CBD | xTechs Renewables",
    description:
      "Premium residential & commercial solar services in Melbourne CBD.",
    images: ["/og/location-melbourne-cbd.jpg"],
  },
};

export default function MelbourneCBDPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://www.xtechsrenewables.com.au/locations/melbourne-cbd#localbusiness",
    name: "xTechs Renewables — Melbourne CBD",
    url: "https://www.xtechsrenewables.com.au/locations/melbourne-cbd",
    image: "https://www.xtechsrenewables.com.au/og.jpg",
    logo: "https://www.xtechsrenewables.com.au/xlogo.webp",
    telephone: "+61 3 0000 0000",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Business Street",
      addressLocality: "Melbourne",
      addressRegion: "VIC",
      postalCode: "3000",
      addressCountry: "AU",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -37.8126,
      longitude: 144.9623,
    },
    areaServed: [{ "@type": "AdministrativeArea", name: "Melbourne CBD" }],
    openingHoursSpecification: "Mo-Fr 08:00-17:00",

  };

  return (
    <div className="min-h-screen">
      {/* ===== Hero (Location-Specific) ===== */}
      <section className="relative overflow-hidden">
        <BackgroundCircles variant="sun" />
        <div className="relative z-10">
          <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              {/* Left: copy */}
              <div>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                  <MapPin className="h-4 w-4" />
                  Melbourne CBD
                </span>
                <h1 className="mt-4 text-4xl md:text-5xl font-bold leading-tight">
                  Solar & Battery Solutions <span className="text-emerald-600">for Melbourne CBD</span>
                </h1>
                <p className="mt-4 text-lg text-gray-700 max-w-2xl">
                  CEC‑accredited installations for apartments, townhouses, and commercial rooftops
                  in the CBD. High‑performance PV, battery storage, and EV charging—engineered for
                  urban efficiency and savings.
                </p>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <Button asChild size="lg">
                    <a href="/contact">Get a Quote</a>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <a href="/pv-battery">Explore PV & Battery</a>
                  </Button>
                </div>

                {/* Trust badges */}
                <ul className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                  <li className="flex items-center gap-2 text-gray-700">
                    <Shield className="h-4 w-4 text-emerald-600" />
                    CEC‑accredited
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <BatteryCharging className="h-4 w-4 text-emerald-600" />
                    10‑yr battery warranty*
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <Sun className="h-4 w-4 text-emerald-600" />
                    25‑yr panel performance
                  </li>
                </ul>
              </div>

              {/* Right: simple visual (optional) */}
              <div className="relative">
                <div className="aspect-[4/3] w-full rounded-xl border bg-white/60 backdrop-blur shadow-sm overflow-hidden">
                  {/* Bạn có thể thay bằng hình / video về CBD */}
                  <img
                    src="/images/cbd-solar-rooftops.jpg"
                    alt="Solar in Melbourne CBD"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  *Warranty depends on model. Ask us for model‑specific terms.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Services (re-use) ===== */}
      <section id="services-tile" className="bg-white">
        <div className="mx-auto max-w-6xl px-4 md:px-6 py-12 md:py-16">
          <header className="mb-8">
            <h2 className="text-3xl font-semibold">Popular Services in the CBD</h2>
            <p className="text-gray-600">
              From compact PV arrays to battery backup and EV charging in carparks.
            </p>
          </header>
          <ServicesSection />
        </div>
      </section>

      {/* ===== Why Choose Us (location-flavoured) ===== */}
      <section className="bg-slate-50 dark:bg-slate-900/40">
        <div className="mx-auto max-w-6xl px-4 md:px-6 py-12 md:py-16">
          <h2 className="text-3xl font-semibold mb-6">Why xTechs for Melbourne CBD</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Urban‑fit Designs",
                desc: "Shading analysis, inverter placement & strata‑friendly proposals.",
              },
              {
                title: "Battery‑Ready",
                desc: "Load calculations for backup of lifts, comms, and essential circuits.",
              },
              {
                title: "Compliance Handled",
                desc: "Export limits, metering, DNSP approvals & safety certificates.",
              },
              {
                title: "Monitoring & Support",
                desc: "We set up monitoring and offer optional support plans.",
              },
              {
                title: "Premium Hardware",
                desc: "Tier‑one panels, reputable inverters, proven batteries.",
              },
              {
                title: "Clean, Quiet Installs",
                desc: "Tidy works & scheduled for minimal disruption in high‑rise sites.",
              },
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

      {/* ===== Our Process (re-use) ===== */}
      <section id="process-tile" className="bg-white">
        <ProcessSteps />
      </section>

      {/* ===== Areas We Cover ===== */}
      <section className="bg-slate-50 dark:bg-slate-900/40">
        <div className="mx-auto max-w-6xl px-4 md:px-6 py-12 md:py-16">
          <h2 className="text-3xl font-semibold mb-4">Areas We Cover in & around the CBD</h2>
          <p className="text-gray-600 mb-6">
            We service Melbourne CBD and nearby suburbs.
          </p>
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            {[
              "Docklands",
              "Southbank",
              "West Melbourne",
              "East Melbourne",
              "Carlton",
              "Fitzroy",
              "Collingwood",
              "Port Melbourne",
            ].map((name) => (
              <li key={name} className="rounded-lg border bg-white px-3 py-2">
                {name}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== Map Embed ===== */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 md:px-6 py-12 md:py-16">
          <h2 className="text-3xl font-semibold mb-6">Find Us</h2>
          <div className="w-full overflow-hidden rounded-xl border">
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3143.058486054349!2d145.11353587619786!3d-38.02241597192406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad66db36c6b8917%3A0x81ad2dc996edb760!2sxTechs%20Renewables!5e0!3m2!1sen!2s!4v1770078343341!5m2!1sen!2s"
                title="xTechs Renewables Melbourne"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute left-0 top-0 h-full w-full border-0"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      

      {/* ===== Final CTA ===== */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 md:px-6 py-12 md:py-16 text-center">
          <h2 className="text-3xl font-semibold">Get a tailored quote for Melbourne CBD</h2>
          <p className="text-gray-600 mt-2">
            Book a site assessment or speak with our CEC‑accredited team today.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Button asChild size="lg">
              <a href="/contact-us">Book Assessment</a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="/pv-battery">View PV & Battery</a>
            </Button>
          </div>
        </div>
      </section>

      {/* ===== JSON-LD Schema ===== */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}