import Link from "next/link";
import Image from "next/image";

export default function SolarFoldLongTermProjectsPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <Image
          src="/applications/long-term-projects/hero.jpg"
          alt="Long‑Term Base Camps & Facilities"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white px-6">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Long‑Term Base Camps & Facilities</h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto">
              Stability and low operating costs for multi‑year projects
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="order-2 lg:order-1">
            <Image
              src="/applications/long-term-projects/hero.jpg"
              alt="Long-term projects with xTechs solar solutions"
              width={600}
              height={400}
              className="rounded-lg shadow-lg object-cover w-full h-auto"
            />
          </div>
          
          {/* Text Content */}
          <div className="order-1 lg:order-2 space-y-6">
            <div>
              <p className="text-gray-600 text-lg leading-relaxed">
                For multi‑year projects, stability and operating cost matter most. Our solar‑hybrid architecture creates dependable plants with remote supervision and storage, expandable as needs grow.
              </p>
            </div>

            <div className="text-gray-700 leading-relaxed">
              <p>
                For multi‑year bases and site facilities, build a dependable, low‑OPEX plant. Start with
                <Link href="/solarfold/mobil-grid" className="underline underline-offset-4"> Mobil‑Grid® containers</Link> as semi‑mobile PV blocks that can be linked and expanded. Use the
                <Link href="/solarfold/solar-hybrid-box" className="underline underline-offset-4"> Solar Hybrid Box®</Link> as the hybrid heart of the system — integrating PV, batteries, grid and diesel under remote
                supervision for night autonomy and peak shaving. Add daytime capacity rapidly with the
                <Link href="/solarfold/solarfold" className="underline underline-offset-4"> SolarFold (Mobil‑Grid® 500+)</Link> to support expansions or new production lines.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed benefits */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-14 md:py-20">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">How our solutions serve long‑term facilities</h2>
            <p className="text-gray-600 mb-8 max-w-4xl mx-auto">xTechs and <span className="font-semibold">EcoSun Innovations</span> deliver durable, low‑OPEX plants that scale with your base camp or site facility.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="font-semibold">
                <Link href="/solarfold/mobil-grid" className="hover:text-brand-primary transition-colors">
                  Mobil‑Grid® Solar Container
                </Link>
              </h3>
              <ul className="mt-3 text-sm text-gray-700 space-y-2 list-disc pl-5">
                <li>Semi‑mobile PV with integrated technical room.</li>
                <li>Link containers to increase capacity over time.</li>
                <li>Low maintenance; compatible with utility tie‑in.</li>
                <li>Supports production, accommodation and services.</li>
              </ul>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="font-semibold">
                <Link href="/solarfold/solar-hybrid-box" className="hover:text-brand-primary transition-colors">
                  Solar Hybrid Box®
                </Link>
              </h3>
              <ul className="mt-3 text-sm text-gray-700 space-y-2 list-disc pl-5">
                <li>Central hybrid core (3.5–180 kVA / up to 520 kWh).</li>
                <li>Remote monitoring; EMS for cost‑optimal operation.</li>
                <li>Ensures night supply and peak shaving.</li>
                <li>Integrates grid and diesel with PV for resilience.</li>
              </ul>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="font-semibold">
                <Link href="/solarfold/solarfold" className="hover:text-brand-primary transition-colors">
                  SolarFold (Mobil‑Grid® 500+)
                </Link>
              </h3>
              <ul className="mt-3 text-sm text-gray-700 space-y-2 list-disc pl-5">
                <li>Add daytime PV capacity quickly for expansions.</li>
                <li>Redeploy modules to new facilities as projects evolve.</li>
                <li>Quiet, clean generation improves working environment.</li>
                <li>Complements Hybrid Box for 24/7 reliability.</li>
              </ul>
            </div>
      </div>
    </div>
      </section>
    </main>
  );
}
