import Link from "next/link";
import Image from "next/image";

export default function SolarFoldCommunitiesPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <Image
          src="/applications/communities/hero.jpg"
          alt="Communities & Rural Electrification"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white px-6">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Communities & Rural Electrification</h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto">
              Dependable power delivered quickly and grown over time
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="order-2 lg:order-1">
            <Image
              src="/applications/communities/hero.jpg"
              alt="Communities with xTechs solar solutions"
              width={600}
              height={400}
              className="rounded-lg shadow-lg object-cover w-full h-auto"
            />
          </div>
          
          {/* Text Content */}
          <div className="order-1 lg:order-2 space-y-6">
            <div>
              <p className="text-gray-600 text-lg leading-relaxed">
                Communities need dependable power that can be delivered quickly and grown over time. Our modular microgrids enable clinics, schools and commerce to operate with low running costs and minimal disruption.
              </p>
            </div>

            <div className="text-gray-700 leading-relaxed">
              <p>
                xTechs builds affordable, expandable microgrids for villages and growing towns. Start with
                <Link href="/solarfold/mobil-grid" className="underline underline-offset-4"> Mobil‑Grid® solar containers</Link> to form 54–72 kWp PV blocks that link into a resilient local grid with minimal civil works. Add
                deployable daytime capacity with the <Link href="/solarfold/solarfold" className="underline underline-offset-4">SolarFold (Mobil‑Grid® 500+)</Link> for clinics, water pumps and schools during roll‑out.
                For night supply and cost optimization, the <Link href="/solarfold/solar-hybrid-box" className="underline underline-offset-4">Solar Hybrid Box®</Link> manages PV, batteries, grid and diesel under remote supervision.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed benefits */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-14 md:py-20">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">How our solutions help communities</h2>
            <p className="text-gray-600 mb-8 max-w-4xl mx-auto">In partnership with <span className="font-semibold">EcoSun Innovations</span>, we create reliable microgrids with low ownership costs and rapid delivery, ideal for rural electrification.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="font-semibold">Mobil‑Grid® Solar Container</h3>
              <ul className="mt-3 text-sm text-gray-700 space-y-2 list-disc pl-5">
                <li>54–72 kWp PV blocks; linkable for village microgrids.</li>
                <li>Minimal civil works; fast commissioning.</li>
                <li>Feeds pumps, clinics, schools and public lighting.</li>
                <li>Expandable with additional containers as demand grows.</li>
              </ul>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="font-semibold">Solar Hybrid Box®</h3>
              <ul className="mt-3 text-sm text-gray-700 space-y-2 list-disc pl-5">
                <li>Hybrid conversion & storage for night supply and resiliency.</li>
                <li>Remote supervision; efficient genset control where needed.</li>
                <li>Optimized tariff structures for community operators.</li>
                <li>Integrates seamlessly with Mobil‑Grid and SolarFold arrays.</li>
              </ul>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="font-semibold">SolarFold (Mobil‑Grid® 500+)</h3>
              <ul className="mt-3 text-sm text-gray-700 space-y-2 list-disc pl-5">
                <li>130 kWp deployable PV to accelerate initial electrification.</li>
                <li>Move or expand as new villages connect.</li>
                <li>Low noise and clean operation for populated areas.</li>
                <li>Pairs with Hybrid Box for full day/night availability.</li>
              </ul>
            </div>
      </div>
    </div>
      </section>
    </main>
  );
}
