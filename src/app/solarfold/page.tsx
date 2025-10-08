"use client";

import Link from "next/link";
import { SolarFoldHero } from "@/components/ui/solarfold-hero";

const products = [
  {
    slug: "solarfold",
    title: "SolarFold (Mobil‑Grid® 500+)",
    tagline: "Redeployable 130 kWp solar plant in a 20′ ISO High Cube container",
    points: [
      "Pre‑assembled / pre‑wired — plug & play",
      "130 kWp in compact 20′ ISO container",
      "Quick fold / unfold; redeployable"
    ],
    image: "/products/solarfold/1.jpg",
    cta: "Explore SolarFold",
  },
  {
    slug: "mobil-grid",
    title: "Mobil‑Grid® Solar Container",
    tagline: "Semi‑mobile PV plant — fast to deploy, 6 months to 10 years projects",
    points: [
      "ISO, CSC‑approved container with pre‑wired PV",
      "Up to 72 kWp in 20′ on‑grid; up to 54 kWp / 91 kWh off‑grid",
      "Integrated, insulated technical room"
    ],
    image: "/products/mobil-grid/1.jpg",
    cta: "Explore Mobil‑Grid",
  },
  {
    slug: "solar-hybrid-box",
    title: "Solar Hybrid Box®",
    tagline: "Energy conversion & storage — from 3.5 to 180 kVA, 14.4 to 520 kWh",
    points: [
      "Plug‑and‑Play hybrid power cabinets & containers",
      "Integrate PV, batteries, grid, and genset",
      "Remote supervision, scalable and mobile"
    ],
    image: "/products/solar-hybrid-box/1.jpg",
    cta: "Explore Solar Hybrid Box",
  },
];

const applications = [
  { title: "Mining & Remote Camps", blurb: "Clean, quiet power for exploration and camps." },
  { title: "Disaster Relief & Emergency", blurb: "Rapid deployment where grid is down." },
  { title: "Defense & Field Ops", blurb: "Ruggedized systems for mobile operations." },
  { title: "Construction Sites", blurb: "Temporary power with lower OPEX than diesel." },
  { title: "Events & Festivals", blurb: "Silent power for stages, lighting and vendors." },
  { title: "Telecom & Off-Grid Assets", blurb: "Primary/backup power for towers and huts." },
];

export default function SolarFoldPage() {
  return (
    <main className="min-h-screen">
      {/* New Hero Section */}
      <SolarFoldHero />

      {/* PRODUCTS */}
      <section id="products" className="bg-gray-50 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900">Flagship Systems</h2>
            <p className="text-xl text-gray-600">
              Three hero products to cover rapid deployment, hybrid portability, and utility storage
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 items-stretch">
            {products.map((p, idx) => (
              <div key={p.slug} className="rounded-lg bg-white p-0 shadow-lg hover:shadow-xl transition-shadow overflow-hidden flex flex-col">
                <div className="p-6">
                  <span className="mb-2 inline-block text-xs font-medium tracking-wide text-primary/80">{idx === 0 ? 'Flagship' : 'Variant'}</span>
                  <h3 className="mb-1 text-2xl font-semibold text-gray-900">{p.title}</h3>
                  <p className="mb-4 text-sm text-gray-600">{p.tagline}</p>
                </div>
                {p.image && (
                  <div className="aspect-[16/9] w-full bg-gray-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.image} alt={p.title} className="h-full w-full object-cover" />
                  </div>
                )}
                <div className="p-6 flex-1 flex flex-col">
                  <ul className="mb-6 space-y-2 text-gray-700">
                    {p.points.map((pt) => <li key={pt}>• {pt}</li>)}
                  </ul>
                  <Link
                    href={`/solarfold/${p.slug}`}
                    className="mt-auto inline-flex w-full items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition"
                  >
                    {p.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APPLICATIONS */}
      <section id="applications" className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900">Applications</h2>
            <p className="text-xl text-gray-600">
              Built for demanding environments where grid power is unavailable, unreliable, or too costly.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {applications.map((a) => (
              <div key={a.title} className="rounded-lg bg-gray-50 p-6 shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900">{a.title}</h3>
                <p className="mt-2 text-sm text-gray-700">{a.blurb}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="https://calendly.com/inquiries-xtechsrenewables/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition shadow-lg"
            >
              Book Consultation
              <svg className="ml-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}