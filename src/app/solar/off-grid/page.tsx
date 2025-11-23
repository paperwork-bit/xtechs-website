import { Metadata } from "next";
import { OffGridClient } from "@/components/off-grid/OffGridClient";

export const metadata: Metadata = {
  title: "Off-Grid Solar & Battery Systems | Remote Victoria",
  description: "Professional off-grid solar and battery systems for remote Victorian locations. Standalone power solutions with generators, monitoring, and 24/7 support. CEC-accredited installers.",
  keywords: "off-grid solar Victoria, remote solar installation, standalone power systems, off-grid battery storage, remote solar monitoring, generator integration, off-grid electrical",
  openGraph: {
    title: "Off-Grid Solar & Battery Solutions for Remote Victoria",
    description: "Complete off-grid solar and battery systems for remote locations across Victoria. Reliable standalone power with monitoring and support.",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Off-Grid Solar & Battery Systems",
  "description": "Professional off-grid solar and battery systems for remote Victorian locations",
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
    "Off-Grid Solar Installation",
    "Standalone Battery Systems",
    "Generator Integration",
    "Remote Monitoring Systems"
  ],
  "offers": {
    "@type": "Offer",
    "description": "Complete off-grid power solutions for remote locations"
  }
};

export default function SolarOffGridPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <OffGridClient />
    </>
  );
}
