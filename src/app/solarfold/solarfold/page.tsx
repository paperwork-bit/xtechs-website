"use client";

import Image from "next/image";
import Link from "next/link";
import { ImageAutoSlider, type ImageAutoSliderImage } from "@/components/ui/image-auto-slider";

export default function SolarFoldProductPage() {
  const specs = [
    { k: "Total power", v: "130 kWp" },
    { k: "Container", v: "20′ ISO High Cube (CSC certified)" },
    { k: "Deployed length", v: "125 m" },
    { k: "Deployed width", v: "6 m" },
    { k: "Deployed height", v: "0.5 m" },
    { k: "Weight (incl. PV & inverters)", v: "≈ 13.5 t" },
  ];

  const highlights = [
    {
      t: "Plug‑and‑Play Plant",
      d: "Factory pre‑assembled and pre‑wired for fast site mobilization — crane down the 20′ module, make utility connections and begin generating."
    },
    {
      t: "130 kWp in 20′ ISO" ,
      d: "Very high specific capacity packaged in a CSC‑certified High Cube container for easy logistics, shipping and compliance."
    },
    {
      t: "Scale to Multi‑MW",
      d: "Interconnectable containers allow you to grow capacity in repeatable blocks and standardize deployment across projects."
    },
    {
      t: "Rapid Fold / Unfold",
      d: "Designed for quick set‑up and redeployment; motorized option performs unfolding/refolding in less than one hour."
    },
    {
      t: "On‑Grid or Off‑Grid",
      d: "Operate for self‑consumption on‑grid or pair with storage for autonomous hybrid systems at remote sites."
    },
    {
      t: "Light‑Touch Permitting",
      d: "Ground‑mounted, temporary installation that typically avoids major construction permits, helping compress project timelines."
    }
  ];

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Hero */}
      <section className="relative grid grid-cols-1 lg:grid-cols-2 min-h-[70vh]">
        <div className="relative h-[320px] lg:h-[70vh]">
          <Image
            src="/solarfold-hero.jpg"
            alt="SolarFold 130 kWp redeployable solar solution"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>

        <div className="flex flex-col justify-center px-6 lg:px-12 py-10">
          <span className="text-xs font-semibold tracking-widest text-primary/80">SolarFold</span>
          <h1 className="mt-2 text-3xl lg:text-5xl font-bold">Mobil‑Grid® 500+ — 130 kWp redeployable solar</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl">
            A pre‑wired, plug‑and‑play solar plant packaged in a 20′ ISO High Cube container. Designed for
            intermediate projects (1–5 years), fast deployment and rapid redeployment.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="#specs" className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition">
              View Specifications
            </Link>
            <Link href="#highlights" className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-5 py-3 text-sm font-medium text-gray-900 hover:bg-gray-50 transition">
              Key Highlights
            </Link>
          </div>
          <div className="mt-6 text-sm text-gray-500">
            In collaboration with <span className="font-semibold">EcoSun Innovations</span>.
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section id="highlights" className="mx-auto max-w-7xl px-6 py-14 md:py-20">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Key Highlights</h2>
          <p className="text-gray-600 mt-2">Engineered for rapid deployment, scalability and reliable operation across demanding environments.</p>
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

      {/* Image Slider */}
      <section className="bg-gray-50 py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Gallery</h2>
          <div className="rounded-2xl border border-gray-200 bg-white p-3">
            <ImageAutoSlider
              images={[
                { src: "/products/solarfold/1.jpg", alt: "SolarFold — container view" },
                { src: "/products/solarfold/2.jpg", alt: "SolarFold — deployed angle" },
                { src: "/products/solarfold/3.jpg", alt: "SolarFold — field deployment" },
                { src: "/products/solarfold/4.jpg", alt: "SolarFold — detail" },
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

      {/* Specs */}
      <section id="specs" className="bg-gray-50 py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Core Specifications</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <dl className="space-y-3">
                {specs.map((s) => (
                  <div key={s.k} className="flex items-center justify-between border-b border-gray-100 pb-2">
                    <dt className="text-sm text-gray-600">{s.k}</dt>
                    <dd className="text-sm font-semibold">{s.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="font-semibold mb-3">Deployment Footprint</h3>
              <ul className="text-sm text-gray-700 space-y-2 list-disc pl-5">
                <li>Length ≈ 125 m</li>
                <li>Width ≈ 6 m</li>
                <li>Height ≈ 0.5 m</li>
              </ul>
              <div className="mt-4 text-xs text-gray-500">
                Suitable for intermediate project durations (1–5 years) and sites requiring fast installation
                and potential redeployment.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold">Ready to scope your SolarFold deployment?</h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Talk to our engineering team about timelines, sites and storage options. We provide design,
            installation and national support as an exclusive partner.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Link href="/contact" className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition">
              Request a proposal
            </Link>
            <Link href="/solarfold" className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-6 py-3 text-sm font-medium text-gray-900 hover:bg-gray-50 transition">
              Back to SolarFold overview
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
