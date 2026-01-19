import HeroSection from "@/components/ui/hero-section";
import { ProcessSteps } from "@/components/ui/process-steps";
import ServicesSection from "@/components/ui/services";
import HomeInteractiveWidgets from "@/components/home/interactive-widgets";
 

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      
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

    </div>
  );
}
