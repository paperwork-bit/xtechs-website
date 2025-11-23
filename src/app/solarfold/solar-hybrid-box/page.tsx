"use client";

import Image from "next/image";
import Link from "next/link";
import { ImageAutoSlider } from "@/components/ui/image-auto-slider";

export default function SolarHybridBoxPage() {
  const highlights = [
    { t: "Wide Range", d: "From electrical boxes (3.5–15 kVA) to 10′/20′ containers up to 180 kVA and 520 kWh." },
    { t: "Plug‑and‑Play Hybrid", d: "Pre‑tested units ready to connect; manage PV, batteries, grid and genset to optimize costs." },
    { t: "Mobile / Semi‑mobile / Stationary", d: "Can be used in diverse deployment modes with remote supervision." },
    { t: "Control Generators", d: "System can control connected diesel gensets for fuel savings and runtime reduction." },
  ];

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Hero */}
      <section className="relative grid grid-cols-1 lg:grid-cols-2 min-h-[60vh]">
        <div className="relative h-[320px] lg:h-[60vh]">
          <Image src="/products/solar-hybrid-box/1.jpg" alt="Solar Hybrid Box®" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
        <div className="flex flex-col justify-center px-6 lg:px-12 py-10">
          <span className="text-xs font-semibold tracking-widest text-primary/80">Solar Hybrid Box®</span>
          <h1 className="mt-2 text-3xl lg:text-5xl font-bold">Energy conversion & storage</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl">Electrical cabinets and containers that integrate PV inverters, battery inverters and storage with supervision — a turnkey hybrid power core.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="#highlights" className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition">Key Highlights</Link>
          </div>
          <div className="mt-6 text-sm text-gray-500">In collaboration with <span className="font-semibold">EcoSun Innovations</span>.</div>
        </div>
      </section>

      {/* Highlights */}
      <section id="highlights" className="mx-auto max-w-7xl px-6 py-14 md:py-20">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Key Highlights</h2>
          <p className="text-gray-600 mt-2">Flexible hybrid power building blocks that pair perfectly with SolarFold and Mobil‑Grid.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {highlights.map((h) => (
            <div key={h.t} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-900">{h.t}</h3>
              <p className="mt-2 text-sm text-gray-700 leading-relaxed">{h.d}</p>
            </div>
          ))}
        </div>
      </section>


      {/* CTA */}
      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold">Integrate with SolarFold or Mobil‑Grid</h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">Build a complete hybrid system — PV generation plus storage and intelligent conversion — all factory‑tested and ready to connect.</p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Link href="/contact" className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition">Request a proposal</Link>
            <Link href="/solarfold" className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-6 py-3 text-sm font-medium text-gray-900 hover:bg-gray-50 transition">Back to SolarFold overview</Link>
          </div>
        </div>
      </section>
    </main>
  )
}


