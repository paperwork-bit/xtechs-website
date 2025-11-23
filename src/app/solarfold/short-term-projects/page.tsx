import Link from "next/link";
import Image from "next/image";

export default function SolarFoldShortTermProjectsPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <Image
          src="/applications/short-term-projects/hero.jpg"
          alt="Short‑Term & Crisis Deployments"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white px-6">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Short‑Term & Crisis Deployments</h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto">
              Speed and flexibility for temporary missions
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="order-2 lg:order-1">
            <Image
              src="/applications/short-term-projects/hero.jpg"
              alt="Short-term projects with xTechs solar solutions"
              width={600}
              height={400}
              className="rounded-lg shadow-lg object-cover w-full h-auto"
            />
          </div>
          
          {/* Text Content */}
          <div className="order-1 lg:order-2 space-y-6">
            <div>
              <p className="text-gray-600 text-lg leading-relaxed">
                Temporary missions demand speed and flexibility. Our solar‑hybrid kits energize operations immediately and can be redeployed as objectives change.
              </p>
            </div>

            <div className="text-gray-700 leading-relaxed">
              <p>
                For short‑term missions and crisis response, speed and redeployment are essential. The
                <Link href="/solarfold/solarfold" className="underline underline-offset-4"> SolarFold (Mobil‑Grid® 500+)</Link> delivers 130 kWp of clean power within hours and packs down to move with the mission. Build larger
                temporary networks using <Link href="/solarfold/mobil-grid" className="underline underline-offset-4">Mobil‑Grid® containers</Link> — pre‑wired PV with minimal site works — and secure night autonomy with the
                <Link href="/solarfold/solar-hybrid-box" className="underline underline-offset-4"> Solar Hybrid Box®</Link> to manage PV, batteries and backup gensets under remote supervision.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed benefits */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-14 md:py-20">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">How our solutions help short‑term deployments</h2>
            <p className="text-gray-600 mb-8 max-w-4xl mx-auto">With <span className="font-semibold">EcoSun Innovations</span>, we deliver rapid power with easy redeployment and hybrid autonomy to match mission timelines.</p>
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
                <li>Deploys within hours; motorized fold option.</li>
                <li>Shift power assets as priorities change.</li>
                <li>Low noise for clinics, shelters and command.</li>
                <li>Pairs with Hybrid Box for night coverage.</li>
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
                <li>Pre‑wired PV for 6–24 month windows.</li>
                <li>Minimal ground works; operate on rough pads.</li>
                <li>Linkable for camp growth at short notice.</li>
                <li>Supports lighting, telecoms and water systems.</li>
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
                <li>Hybrid conversion + storage with remote supervision.</li>
                <li>Manages genset use; extends fuel and runtime.</li>
                <li>Delivers safe, stable power for critical loads.</li>
                <li>Integrates seamlessly with Mobil‑Grid/SolarFold.</li>
              </ul>
            </div>
      </div>
    </div>
      </section>
    </main>
  );
}
