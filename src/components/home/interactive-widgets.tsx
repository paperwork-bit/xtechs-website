"use client";

import dynamic from "next/dynamic";

const SectionSkeleton = ({ title }: { title: string }) => (
  <div className="w-full rounded-xl border border-dashed border-gray-300 p-6 text-center">
    <p className="text-sm text-gray-500 animate-pulse">{title}</p>
  </div>
);

const SolarAdvantageCalculator = dynamic(
  () => import("@/components/SolarAdvantageCalculator"),
  {
    ssr: false,
    loading: () => <SectionSkeleton title="Loading Solar Advantage Calculator…" />,
  }
);

const GoogleReviewsSlider = dynamic(
  () =>
    import("@/components/ui/google-reviews-slider").then((mod) => ({
      default: mod.GoogleReviewsSlider,
    })),
  {
    ssr: false,
    loading: () => <SectionSkeleton title="Fetching recent Google reviews…" />,
  }
);

export function HomeInteractiveWidgets() {
  return (
    <>
      {/* Solar Advantage Calculator */}
      <section id="calculator-tile" className="bg-white">
        <div className="mx-auto max-w-5xl px-4 md:px-6 py-12 md:py-16">
          <div className="px-2 md:px-0 py-3 text-center">
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
              Solar Advantage Calculator
            </h1>
            <p className="text-sm md:text-base text-muted-foreground">
              Estimate federal STCs and Victoria rebates for PV & battery.
            </p>
          </div>
          <div className="mt-4">
            <SolarAdvantageCalculator />
          </div>
        </div>
      </section>

      {/* Google Reviews Slider */}
      <GoogleReviewsSlider />
    </>
  );
}

export default HomeInteractiveWidgets;

