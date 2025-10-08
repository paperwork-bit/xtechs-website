import Link from "next/link";
import Image from "next/image";

export default function SolarFoldMiningPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <Image
          src="/applications/mining/hero.jpg"
          alt="Mining & Remote Operations"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white px-6">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Mining & Remote Operations</h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto">
              Reliable, clean and fast to deploy power for exploration to production
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="order-2 lg:order-1">
            <Image
              src="/applications/mining/hero.jpg"
              alt="Mining operations with xTechs solar solutions"
              width={600}
              height={400}
              className="rounded-lg shadow-lg object-cover w-full h-auto"
            />
          </div>
          
          {/* Text Content */}
          <div className="order-1 lg:order-2 space-y-6">
            <div>
              <p className="text-gray-600 text-lg leading-relaxed">
                From exploration to production, power must be reliable, clean and fast to deploy. Our modular solar‑hybrid plant reduces diesel burn and permits while scaling with pit development and camp growth.
              </p>
            </div>

            <div className="text-gray-700 leading-relaxed">
              <p>
                For mining and remote extraction, xTechs designs solar‑hybrid power systems that lower fuel costs,
                simplify approvals and scale with your operation. <Link href="/solarfold/mobil-grid" className="underline underline-offset-4">Mobil‑Grid® solar containers</Link> provide pre‑wired 54–72 kWp PV blocks with an insulated
                technical room that can be linked to form reliable microgrids across camps, workshops and security
                perimeters. For mid‑term pads and satellite pits, the <Link href="/solarfold/solarfold" className="underline underline-offset-4">SolarFold (Mobil‑Grid® 500+)</Link> redeployable array adds 130 kWp of silent
                generation that can be moved as benches evolve. To deliver 24/7 supply and optimize genset runtime,
                the <Link href="/solarfold/solar-hybrid-box" className="underline underline-offset-4">Solar Hybrid Box®</Link> integrates PV, batteries, grid and diesel with remote supervision, ensuring night autonomy and stable
                power for crushers, conveyors and camp base loads.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed benefits */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-14 md:py-20">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">How our solutions help mining operations</h2>
            <p className="text-gray-600 mb-8 max-w-4xl mx-auto">Together with <span className="font-semibold">EcoSun Innovations</span>, we deliver robust solar‑hybrid plants that reduce diesel exposure, noise and maintenance, while scaling from prospecting to production.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="font-semibold">Mobil‑Grid® Solar Container</h3>
              <ul className="mt-3 text-sm text-gray-700 space-y-2 list-disc pl-5">
                <li>54–72 kWp modules form microgrids for camps and workshops.</li>
                <li>Fast setup; minimized ground disturbance, lower approvals.</li>
                <li>Linkable containers scale with pit development.</li>
                <li>Ideal for remote comms, lighting and security power.</li>
              </ul>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="font-semibold">SolarFold (Mobil‑Grid® 500+)</h3>
              <ul className="mt-3 text-sm text-gray-700 space-y-2 list-disc pl-5">
                <li>130 kWp quick‑deploy array for mid‑term projects.</li>
                <li>Relocate rapidly between benches and satellite sites.</li>
                <li>Lower LCOE compared with diesel‑only fleets.</li>
                <li>Complements Mobil‑Grid and Hybrid Box for 24/7 supply.</li>
              </ul>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="font-semibold">Solar Hybrid Box®</h3>
              <ul className="mt-3 text-sm text-gray-700 space-y-2 list-disc pl-5">
                <li>Hybrid conversion and storage (3.5–180 kVA / up to 520 kWh).</li>
                <li>Manages PV + gensets; enables night autonomy.</li>
                <li>Remote supervision reduces call‑outs and downtime.</li>
                <li>Supports crushers, conveyors and camp base loads.</li>
              </ul>
            </div>
      </div>
    </div>
      </section>
    </main>
  );
}
