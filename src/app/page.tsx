import { Hero } from "@/components/ui/animated-hero";
import { Metadata } from "next";

import BackgroundCircles from "@/components/ui/background-circles";
import { ProcessSteps } from "@/components/ui/process-steps";
import ServicesSection from "@/components/ui/services";
import HomeInteractiveWidgets from "@/components/home/interactive-widgets";


export const metadata:Metadata = {
  title: "Solar & Battery Storage Solutions | xTechs Renewables",
  description:
    "Leading solar and battery storage installation services for homes and businesses. We provide premium solar panels, Tesla Powerwall, Alpha ESS, EV charging, and full renewable energy solutions.",
  keywords:
    "solar panels, battery storage, Tesla Powerwall, Alpha ESS, solar installation, renewable energy, smart energy, off-grid systems, home solar, commercial solar",
};

const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://xtechs.com.au/#website",
    url: "https://xtechs.com.au",
    name: "xTechs Renewables",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://xtechs.com.au/?s={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  // --- JSON-LD: Organization ---
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://xtechs.com.au/#organization",
    name: "xTechs Renewables",
    url: "https://xtechs.com.au",
    logo: "https://xtechs.com.au/logo.png",
    sameAs: [
      "https://www.instagram.com/xtechsrenewables/",
    ],
  };


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

    </div>
  );
}
