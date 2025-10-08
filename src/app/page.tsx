import { Hero } from "@/components/ui/animated-hero";
import BackgroundCircles from "@/components/ui/background-circles";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SolarAdvantageCalculator from "@/components/SolarAdvantageCalculator";
import { ClientOnly } from "@/components/ClientOnly";
import { ProcessSteps } from "@/components/ui/process-steps";
import ServicesSection from "@/components/ui/services";
import { GoogleReviewsSlider } from "@/components/ui/google-reviews-slider";
 

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
          <ClientOnly>
            <ServicesSection />
          </ClientOnly>
        </div>
      </section>
      
      {/* Our Process */}
      <section id="process-tile" className="bg-slate-50 dark:bg-slate-900/40">
        <ClientOnly>
          <ProcessSteps />
        </ClientOnly>
      </section>

      {/* Solar Advantage Calculator */}
      <section id="calculator-tile" className="bg-white">
        <div className="mx-auto max-w-5xl px-4 md:px-6 py-12 md:py-16">
          <div className="px-2 md:px-0 py-3 text-center">
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Solar Advantage Calculator</h1>
            <p className="text-sm md:text-base text-muted-foreground">Estimate federal STCs and Victoria rebates for PV & battery.</p>
          </div>
          <div className="mt-4">
            <ClientOnly>
              <SolarAdvantageCalculator />
            </ClientOnly>
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
