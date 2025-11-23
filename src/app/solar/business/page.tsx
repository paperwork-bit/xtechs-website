import { Metadata } from "next";
import { BusinessClient } from "@/components/business/BusinessClient";

export const metadata: Metadata = {
  title: "Commercial Solar & Battery Installation | Business Victoria",
  description: "Professional commercial solar panel and battery storage installation for Victorian businesses. Large-scale PV systems, commercial EV charging, energy management. CEC-accredited installers.",
  keywords: "commercial solar Victoria, business solar installation Melbourne, commercial battery storage, large-scale solar, business EV charging, commercial energy management, solar for businesses",
  openGraph: {
    title: "Commercial Solar & Battery Solutions for Victorian Businesses",
    description: "Professional commercial solar and battery installations for businesses across Victoria. Large-scale PV systems with smart energy management.",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Commercial Solar & Battery Installation",
  "description": "Professional solar panel and battery storage installation for Victorian businesses",
  "provider": {
    "@type": "Organization",
    "name": "xTechs Renewables",
    "url": "https://www.xtechsrenewables.com.au"
  },
  "areaServed": {
    "@type": "State",
    "name": "Victoria, Australia"
  },
  "serviceType": [
    "Commercial Solar Panel Installation",
    "Business Battery Storage Systems",
    "Commercial EV Charging",
    "Energy Management Systems"
  ],
  "offers": {
    "@type": "Offer",
    "description": "Large-scale commercial solar and battery solutions with smart energy management"
  }
};

export default function SolarBusinessPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BusinessClient />
    </>
  );
}
