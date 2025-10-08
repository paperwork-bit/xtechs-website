import Link from "next/link";
import Image from "next/image";

export default function SolarFoldEmergencyPowerPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <Image
          src="/applications/emergency-power/hero.jpg"
          alt="Emergency & Mobile Worksites"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white px-6">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Emergency & Mobile Worksites</h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto">
              Power when needed now - fast setup, reliable and safe
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="order-2 lg:order-1">
            <Image
              src="/applications/emergency-power/hero.jpg"
              alt="Emergency power with xTechs solar solutions"
              width={600}
              height={400}
              className="rounded-lg shadow-lg object-cover w-full h-auto"
            />
          </div>
          
          {/* Text Content */}
          <div className="order-1 lg:order-2 space-y-6">
            <div>
              <p className="text-gray-600 text-lg leading-relaxed">
                When power is needed now, setup speed, reliability and safety matter most. Our systems energize field hospitals, command posts and mobile bases without the noise and delays of diesel‑only fleets.
              </p>
            </div>

            <div className="text-gray-700 leading-relaxed">
              <p>
                xTechs equips relief teams and mobile worksites with dependable power on day one. Deploy the
                <Link href="/solarfold/solarfold" className="underline underline-offset-4"> SolarFold (Mobil‑Grid® 500+)</Link> to energize triage tents and logistics zones within hours, then relocate as priorities shift. Build larger
                temporary grids using <Link href="/solarfold/mobil-grid" className="underline underline-offset-4">Mobil‑Grid® containers</Link>, pre‑wired with PV and an integrated technical room for fast setup. Maintain night
                autonomy and safe, supervised operation with the <Link href="/solarfold/solar-hybrid-box" className="underline underline-offset-4">Solar Hybrid Box®</Link>, orchestrating PV, batteries and backup gensets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed benefits */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-14 md:py-20">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">How our solutions support emergency power</h2>
            <p className="text-gray-600 mb-8 max-w-4xl mx-auto">With <span className="font-semibold">EcoSun Innovations</span>, we deliver fast, silent and efficient power for relief agencies and temporary operations.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="font-semibold">
                <Link href="/solarfold/solarfold" className="hover:text-brand-primary transition-colors">
                  SolarFold (Mobil‑Grid® 500+)
                </Link>
              </h3>
              <ul className="mt-3 text-sm text-gray-700 space-y-2 list-disc pl-5">
                <li>Rapidly energize field hospitals and command posts.</li>
                <li>Move assets as needs shift between zones.</li>
                <li>Low noise facilitates medical and coordination work.</li>
                <li>Reduces diesel reliance and logistics burden.</li>
              </ul>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="font-semibold">
                <Link href="/solarfold/mobil-grid" className="hover:text-brand-primary transition-colors">
                  Mobil‑Grid® Solar Container
                </Link>
              </h3>
              <ul className="mt-3 text-sm text-gray-700 space-y-2 list-disc pl-5">
                <li>Plug‑and‑play PV with integrated plant room for quick setup.</li>
                <li>Link containers for larger camps and work fronts.</li>
                <li>Suitable for telecoms, lighting and water treatment loads.</li>
                <li>Minimal ground works; deploy on rough surfaces.</li>
              </ul>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="font-semibold">
                <Link href="/solarfold/solar-hybrid-box" className="hover:text-brand-primary transition-colors">
                  Solar Hybrid Box®
                </Link>
              </h3>
              <ul className="mt-3 text-sm text-gray-700 space-y-2 list-disc pl-5">
                <li>Hybrid conversion + storage keeps critical loads on 24/7.</li>
                <li>Remote supervision; safe automated operation.</li>
                <li>Integrates PV with backup genset for resilience.</li>
                <li>Enables night autonomy where grid is unavailable.</li>
              </ul>
            </div>
      </div>
    </div>
      </section>
    </main>
  );
}
