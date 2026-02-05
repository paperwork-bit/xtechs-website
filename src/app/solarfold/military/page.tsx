import Link from "next/link";
import Image from "next/image";

export default function SolarFoldMilitaryPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <Image
          src="/applications/military/military_hero.webp"
          alt="Military & Peacekeeping Operations"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white px-6">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Military & Peacekeeping</h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto">
              Power that moves with the force, sets up fast and runs quietly
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="order-2 lg:order-1">
            <Image
              src="/applications/military/military_hero.webp"
              alt="Military operations with xTechs solar solutions"
              width={600}
              height={400}
              className="rounded-lg shadow-lg object-cover w-full h-auto"
            />
          </div>
          
          {/* Text Content */}
          <div className="order-1 lg:order-2 space-y-6">
            <div>
              <p className="text-gray-600 text-lg leading-relaxed">
                Missions need power that moves with the force, sets up fast and runs quietly. Our solar‑hybrid
                systems create forward operating energy hubs that cut fuel convoys, shrink the acoustic/IR
                footprint and keep critical comms and medical loads online.
              </p>
            </div>

            <div className="text-gray-700 leading-relaxed">
              <p>
                xTechs delivers a cohesive, mobile energy strategy. Use the <Link href="/solarfold/solarfold" className="underline underline-offset-4">SolarFold (Mobil‑Grid® 500+)</Link> to generate high daytime PV near the
                front line with a low visual and acoustic signature. Establish semi‑permanent generation with
                <Link href="/solarfold/mobil-grid" className="underline underline-offset-4"> Mobil‑Grid® solar containers</Link> that link into reliable camp microgrids and are simple to transport with standard handling.
                For 24/7 autonomy and intelligent generator control, the <Link href="/solarfold/solar-hybrid-box" className="underline underline-offset-4">Solar Hybrid Box®</Link> unifies PV, batteries, grid/shore and diesel under remote supervision.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed benefits */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-14 md:py-20">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">How our solutions help in military operations</h2>
            <p className="text-gray-600 mb-8 max-w-4xl mx-auto">
            xTechs, in partnership with <span className="font-semibold">EcoSun Innovations</span>, delivers
            rapidly deployable solar‑hybrid power that reduces fuel convoys, noise and maintenance while
            improving autonomy and energy security.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm group hover:shadow-lg transition-all duration-300">
              <h3 className="font-semibold">
                <Link 
                  href="/solarfold/solarfold" 
                  className="inline-block hover:text-brand-primary transition-all duration-300 hover:scale-105 active:scale-95 transform"
                >
                  SolarFold (Mobil‑Grid® 500+)
                </Link>
              </h3>
              <ul className="mt-3 text-sm text-gray-700 space-y-2 list-disc pl-5">
                <li>Establishes a 130 kWp array within hours; redeployable between theatres.</li>
                <li>Silent, low‑heat signature power improves force protection.</li>
                <li>Pairs with Hybrid Box for night autonomy and load management.</li>
                <li>Cuts diesel burn; fewer resupply missions and lower risk.</li>
              </ul>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm group hover:shadow-lg transition-all duration-300">
              <h3 className="font-semibold">
                <Link 
                  href="/solarfold/mobil-grid" 
                  className="inline-block hover:text-brand-primary transition-all duration-300 hover:scale-105 active:scale-95 transform"
                >
                  Mobil‑Grid® Solar Container
                </Link>
              </h3>
              <ul className="mt-3 text-sm text-gray-700 space-y-2 list-disc pl-5">
                <li>ISO/CSC unit with pre‑wired PV and insulated technical room.</li>
                <li>Link containers to scale for camps, radar and telecoms sites.</li>
                <li>Minimal civil works; quick in/out logistics with standard lifting.</li>
                <li>Provides daytime PV power and reduces genset runtime.</li>
              </ul>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm group hover:shadow-lg transition-all duration-300">
              <h3 className="font-semibold">
                <Link 
                  href="/solarfold/solar-hybrid-box" 
                  className="inline-block hover:text-brand-primary transition-all duration-300 hover:scale-105 active:scale-95 transform"
                >
                  Solar Hybrid Box®
                </Link>
              </h3>
              <ul className="mt-3 text-sm text-gray-700 space-y-2 list-disc pl-5">
                <li>Hybrid conversion + storage core with remote supervision.</li>
                <li>Integrates PV, batteries, grid/shore and diesel backup automatically.</li>
                <li>Supports 24/7 operations with reduced acoustic footprint.</li>
                <li>Orchestrates gensets for optimal fuel use and reliability.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
