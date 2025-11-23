"use client";

import * as React from "react";
import { SectionTile } from "@/components/ui/section-tile";
import { HeroSection } from "@/components/ui/hero-section";
import { TrustRow } from "@/components/ui/trust-row";
import { ComparisonStrip } from "@/components/ui/comparison-strip";
import { FaqSection } from "@/components/faq/FaqSection";
import { StickyHelp } from "@/components/ui/sticky-help";
import { disableAnim, isDev } from "@/lib/flags";
import { useIsMounted } from "@/lib/use-is-mounted";

export function PVIndexClient() {
  const isMounted = useIsMounted();
  const shouldAnimate = isMounted && !disableAnim();

  return (
    <>
      
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <HeroSection />

        {/* Trust Row */}
        <TrustRow />

        {/* Main Content */}
        <div className="py-8 lg:py-12">
          <div className="container mx-auto px-4">
            <div className="space-y-12 lg:space-y-16">
              {/* Residential Solar & Battery */}
              <SectionTile
                orientation="image-left"
                eyebrow="Residential"
                title="Smart, quiet power for your home"
                description="Enjoy lower bills and peace-of-mind backup when the grid goes down. We design for self-consumption first, then layer the right battery sizing so you capture more of your own solar."
                bullets={[
                  "Self-consumption to cut bills",
                  "Backup for essential circuits",
                  "EV-ready options"
                ]}
                chips={[
                  "System size: 3–10 kW",
                  "Battery: 5–13.5 kWh",
                  "Export limit: per distributor",
                  "Roof types: tile/metal/flat"
                ]}
                brands={["Tesla PW3", "Sungrow", "Sigenergy"]}
                ctaHref="/pv-battery/residential"
                ctaLabel="Explore Residential"
                imageSrc="/services/residential-hero.jpg"
                imageAlt="Modern residential home with solar panels on roof"
                priority={true}
              />

              {/* Commercial Solar & Battery */}
              <SectionTile
                orientation="image-right"
                eyebrow="Business"
                title="Cut operating costs with clean power"
                description="Generate onsite power to reduce daytime loads and peak charges. We right-size arrays and batteries for your load profile—with room to scale as you grow."
                bullets={[
                  "Lower daytime energy spend",
                  "Peak-shaving & load control",
                  "Monitoring & reporting"
                ]}
                chips={[
                  "Array size: 10–200 kW+",
                  "Battery: 10–200 kWh+",
                  "Roof/ground mount",
                  "Power quality focus"
                ]}
                brands={["Sungrow C&I", "GoodWe", "Sigenergy"]}
                ctaHref="/pv-battery/business"
                ctaLabel="Explore Business"
                imageSrc="/services/commercial-hero.jpg"
                imageAlt="Commercial building with solar panel installation"
              />
            </div>
          </div>
        </div>

        {/* Comparison Strip */}
        <ComparisonStrip />

        {/* Continue with remaining tiles */}
        <div className="py-8 lg:py-12">
          <div className="container mx-auto px-4">
            <div className="space-y-12 lg:space-y-16">
              {/* Off-Grid Solar & Battery */}
              <SectionTile
                orientation="image-left"
                eyebrow="Off-Grid"
                title="Reliable power—anywhere you need it"
                description="Engineered systems for remote homes, farms, and sites. Hybrid setups with generators and robust storage keep essentials running—day and night."
                bullets={[
                  "Solar + battery + genset hybrids",
                  "Ruggedized components",
                  "Remote monitoring"
                ]}
                chips={[
                  "Solar: 5–20 kW",
                  "Storage: 10–40 kWh+",
                  "Generator integration",
                  "Weather-hardening"
                ]}
                brands={["Sigenergy", "Victron", "Sungrow hybrid"]}
                ctaHref="/pv-battery/off-grid"
                ctaLabel="Explore Off-Grid"
                imageSrc="/services/offgrid-hero.jpg"
                imageAlt="Remote off-grid solar installation in natural setting"
                imagePosition="object-bottom"
              />

              {/* Builders Solar & Battery */}
              <SectionTile
                orientation="image-right"
                eyebrow="Builders"
                title="Seamless integration during construction"
                description="We coordinate pre-wire, rough-in, and install to match your build stages—so handover is clean, compliant, and client-ready."
                bullets={[
                  "Pre-construction rough-in",
                  "Fast staged installs",
                  "Handover documentation"
                ]}
                chips={[
                  "Multi-lot rollouts",
                  "Meter/main switchboard coordination",
                  "Export limits handled",
                  "Compliance packs"
                ]}
                brands={["Tesla PW3", "Sungrow", "GoodWe"]}
                ctaHref="/pv-battery/builders"
                ctaLabel="Explore Builders"
                imageSrc="/services/builders-hero.jpg"
                imageAlt="Construction site with solar panel installation in progress"
                imagePosition="object-bottom"
              />
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <FaqSection />

        {/* Sticky Help Button */}
        <StickyHelp />
      </div>
    </>
  );
}

export default PVIndexClient;
