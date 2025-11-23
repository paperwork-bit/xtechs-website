import { Metadata } from "next";
import { ResidentialClient } from "@/components/residential/ResidentialClient";

export const metadata: Metadata = {
  title: "Residential Solar & Battery Installation | Family Homes Victoria",
  description: "Professional residential solar panel and battery storage installation for Victorian families. Tesla Powerwall, Alpha ESS, EV charging. CEC-accredited installers with 25-year warranty.",
  keywords: "residential solar Victoria, home solar installation Melbourne, family solar panels, residential battery storage, Tesla Powerwall installation, home EV charging, solar rebates Victoria",
  openGraph: {
    title: "Residential Solar & Battery Solutions for Victorian Families",
    description: "Complete residential energy solutions including solar panels, battery storage, EV charging, and electrical work. CEC-accredited installers across Victoria.",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Residential Solar & Battery Installation",
  "description": "Professional solar panel and battery storage installation for Victorian families",
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
    "Residential Solar Panel Installation",
    "Home Battery Storage Systems",
    "EV Charger Installation",
    "Residential Electrical Work"
  ],
  "offers": {
    "@type": "Offer",
    "description": "Complete residential solar and battery solutions with 25-year warranty"
  }
};

export default function SolarResidentialPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ResidentialClient />
    </>
  );
}
