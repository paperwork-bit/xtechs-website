import { Metadata } from "next";
import { BuildersClient } from "@/components/builders/BuildersClient";

export const metadata: Metadata = {
  title: "Solar Installation for Builders | Construction Victoria",
  description: "Professional solar installation services for Victorian builders and construction companies. Pre-wire, approvals, compliance, and handover services. CEC-accredited installers.",
  keywords: "solar for builders Victoria, construction solar installation, builder solar services, pre-wire solar, solar compliance builders, construction electrical, solar handover",
  openGraph: {
    title: "Solar Installation Services for Victorian Builders",
    description: "Complete solar installation services for builders including pre-wire, approvals, compliance, and handover. Streamlined construction workflows.",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Solar Installation for Builders",
  "description": "Professional solar installation services for Victorian builders and construction companies",
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
    "Solar Pre-wire Services",
    "Builder Solar Approvals",
    "Construction Solar Compliance",
    "Solar Handover Services"
  ],
  "offers": {
    "@type": "Offer",
    "description": "Streamlined solar installation services for construction projects"
  }
};

export default function SolarBuildersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BuildersClient />
    </>
  );
}
