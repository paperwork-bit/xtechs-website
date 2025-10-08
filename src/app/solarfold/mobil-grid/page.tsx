"use client";

import Image from "next/image";
import Link from "next/link";
import { ImageAutoSlider } from "@/components/ui/image-auto-slider";

export default function MobilGridProductPage() {
  const highlights = [
    {
      t: "ISO/CSC Container",
      d: "Standard maritime container integrating a pre‑wired photovoltaic plant, with insulated and air‑conditioned technical room."
    },
    {
      t: "Power Options",
      d: "Up to 72 kWp in 20′ on‑grid; up to 54 kWp / 91 kWh off‑grid (depending on configuration)."
    },
    {
      t: "Pre‑assembled Wings",
      d: "Modules assembled per set of 8 panels (≈3–3.5 kWp per wing) for rapid deployment and easy maintenance."
    },
    {
      t: "Scalable & Linkable",
      d: "Containers can be linked together to build larger plants; transport room serves as pre‑wired plant room."
    }
  ];

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Hero */}
      <section className="relative grid grid-cols-1 lg:grid-cols-2 min-h-[60vh]">
        <div className="relative h-[320px] lg:h-[60vh]">
          <Image src="/products/mobil-grid/1.jpg" alt="Mobil‑Grid® solar container" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
        <div className="flex flex-col justify-center px-6 lg:px-12 py-10">
          <span className="text-xs font-semibold tracking-widest text-primary/80">Mobil‑Grid®</span>
          <h1 className="mt-2 text-3xl lg:text-5xl font-bold">Semi‑mobile solar container</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl">Ideal for 6 months to 10 years projects. Extremely easy to deploy and link, with integrated technical room and optional storage.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="#highlights" className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition">Key Highlights</Link>
            <Link href="#gallery" className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-5 py-3 text-sm font-medium text-gray-900 hover:bg-gray-50 transition">Gallery</Link>
          </div>
          <div className="mt-6 text-sm text-gray-500">In collaboration with <span className="font-semibold">EcoSun Innovations</span>.</div>
        </div>
      </section>

      {/* Highlights */}
      <section id="highlights" className="mx-auto max-w-7xl px-6 py-14 md:py-20">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Key Highlights</h2>
          <p className="text-gray-600 mt-2">Deploy quickly, scale easily, and operate reliably with an integrated plant room.</p>
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

      {/* Gallery */}
      <section id="gallery" className="bg-gray-50 py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Gallery</h2>
          <div className="rounded-2xl border border-gray-200 bg-white p-3">
            <ImageAutoSlider
              images={[
                { src: "/products/mobil-grid/1.jpg", alt: "Mobil‑Grid — container" },
                { src: "/products/mobil-grid/2.jpg", alt: "Mobil‑Grid — deployment" },
                { src: "/products/mobil-grid/3.jpg", alt: "Mobil‑Grid — site view" },
                { src: "/products/mobil-grid/4.jpg", alt: "Mobil‑Grid — detail" },
              ]}
              speedSec={22}
              size="md"
              direction="left"
              maskEdges
              className="rounded-xl"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold">Need a semi‑mobile PV plant?</h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">We’ll help you size, deploy and link multiple containers, and integrate storage when needed.</p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Link href="/contact" className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition">Request a proposal</Link>
            <Link href="/solarfold" className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-6 py-3 text-sm font-medium text-gray-900 hover:bg-gray-50 transition">Back to SolarFold overview</Link>
          </div>
        </div>
      </section>
    </main>
  )
}


