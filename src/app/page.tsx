import { Hero } from "@/components/ui/animated-hero";
import BackgroundCircles from "@/components/ui/background-circles";
import { Button } from "@/components/ui/button";
import { ProcessSteps } from "@/components/ui/process-steps";
import ServicesSection from "@/components/ui/services";
import HomeInteractiveWidgets from "@/components/home/interactive-widgets";
 

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

      <HomeInteractiveWidgets />

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
