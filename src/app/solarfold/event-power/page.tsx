import Link from "next/link";
import Image from "next/image";

export default function SolarFoldEventPowerPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <Image
          src="/applications/event-power/hero.jpg"
          alt="Events & Temporary Venues"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white px-6">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Events & Temporary Venues</h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto">
              Silent solar‑hybrid systems for clean, comfortable experiences
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="order-2 lg:order-1">
            <Image
              src="/applications/event-power/hero.jpg"
              alt="Event power with xTechs solar solutions"
              width={600}
              height={400}
              className="rounded-lg shadow-lg object-cover w-full h-auto"
            />
          </div>
          
          {/* Text Content */}
          <div className="order-1 lg:order-2 space-y-6">
            <div>
              <p className="text-gray-600 text-lg leading-relaxed">
                Audiences expect a clean, comfortable experience. Our silent solar‑hybrid systems power stages, vendors and lighting while cutting fuel costs and emissions.
              </p>
            </div>

            <div className="text-gray-700 leading-relaxed">
              <p>
                For festivals and temporary venues, our solar‑hybrid stack delivers a premium audience
                experience. Scale daytime generation with <Link href="/solarfold/mobil-grid" className="underline underline-offset-4">Mobil‑Grid® containers</Link> and add silent, portable PV
                using the <Link href="/solarfold/solarfold" className="underline underline-offset-4">SolarFold (Mobil‑Grid® 500+)</Link> for build and rehearsal windows. The
                <Link href="/solarfold/solar-hybrid-box" className="underline underline-offset-4"> Solar Hybrid Box®</Link> provides battery buffering and smart generator control for
                reliable night shows, lower fuel costs and minimal noise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed benefits */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-14 md:py-20">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">How our solutions power events</h2>
            <p className="text-gray-600 mb-8 max-w-4xl mx-auto">xTechs and <span className="font-semibold">EcoSun Innovations</span> provide quiet, clean and scalable power for events without diesel nuisances.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
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
                <li>Rapid to set up; use multiple for main + side stages.</li>
                <li>Power vendor alleys, back‑of‑house and lighting rigs.</li>
                <li>Lower rental fuel costs and site emissions.</li>
                <li>Minimal footprint and clean audience experience.</li>
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
                <li>Battery buffer for peaks and night shows.</li>
                <li>Smart control of PV + genset for assured supply.</li>
                <li>Remote supervision for safety and uptime.</li>
                <li>Great for noise‑sensitive venues.</li>
              </ul>
            </div>
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
                <li>High daytime PV to offset rigging and sound loads.</li>
                <li>Redeploy quickly between venues/festivals.</li>
                <li>Clean, quiet power improving visitor comfort.</li>
                <li>Complements Hybrid Box for full day/night solutions.</li>
              </ul>
            </div>
      </div>
    </div>
      </section>
    </main>
  );
}
