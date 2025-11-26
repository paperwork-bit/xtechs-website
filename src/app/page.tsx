import dynamic from "next/dynamic";
import { Hero } from "@/components/ui/animated-hero";
import BackgroundCircles from "@/components/ui/background-circles";
import { Button } from "@/components/ui/button";
import { ProcessSteps } from "@/components/ui/process-steps";
import ServicesSection from "@/components/ui/services";

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
 

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with background */}
      <div className="relative">
        <BackgroundCircles variant="sun" />
        <div className="relative z-10">
          <Hero />
        </div>
      </div>
      
      {/* Services Section */}
      <section id="services-tile" className="bg-white">
        <div className="mx-auto max-w-5xl px-4 md:px-6 py-12 md:py-16">
          <ServicesSection />
        </div>
      </section>
      
      {/* Our Process */}
      <section id="process-tile" className="bg-slate-50 dark:bg-slate-900/40">
        <ProcessSteps />
      </section>

      {/* Solar Advantage Calculator */}
      <section id="calculator-tile" className="bg-white">
        <div className="mx-auto max-w-5xl px-4 md:px-6 py-12 md:py-16">
          <div className="px-2 md:px-0 py-3 text-center">
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Solar Advantage Calculator</h1>
            <p className="text-sm md:text-base text-muted-foreground">Estimate federal STCs and Victoria rebates for PV & battery.</p>
          </div>
          <div className="mt-4">
            <SolarAdvantageCalculator />
          </div>
        </div>
      </section>

      {/* Google Reviews Slider */}
      <GoogleReviewsSlider />



      {/* Sticky Help Bubble */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button 
          size="lg" 
          className="rounded-full shadow-lg hover:shadow-xl transition-shadow"
        >
          Need Help?
        </Button>
      </div>

    </div>
  );
}
