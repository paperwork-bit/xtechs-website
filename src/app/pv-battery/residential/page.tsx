import { Metadata } from "next";
import { ResidentialClient } from "@/components/residential/ResidentialClient";

export const metadata: Metadata = {
  title: "Residential Solar & Battery Solutions | xTechs Renewables",
  description: "Complete residential energy solutions: solar panels, battery storage, EV charging, electrical work, and home automation. Professional installation across Victoria.",
  keywords: "residential solar, home battery, EV charger installation, house electrical work, home automation, Victoria solar installers",
};

// JSON-LD structured data
const residentialJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Residential Solar & Battery Solutions",
  "description": "Complete residential energy solutions including solar panels, battery storage, EV charging, electrical work, and home automation.",
  "provider": {
    "@type": "Organization",
    "name": "xTechs Renewables",
    "url": "https://xtechs.com.au"
  },
  "areaServed": {
    "@type": "State",
    "name": "Victoria, Australia"
  },
  "serviceType": [
    "Solar Panel Installation",
    "Battery Storage Systems",
    "EV Charger Installation",
    "Residential Electrical Work",
    "Home Automation"
  ]
};

export default function ResidentialPage() {
  return (
    <div suppressHydrationWarning>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(residentialJsonLd) }}
      />
      <ResidentialClient />
    </div>
  );
}
