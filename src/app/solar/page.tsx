import { Metadata } from "next";
import SolarClient from "./solar-client";

export const metadata: Metadata = {
  title: "Solar Panels & Battery Storage | Victoria Australia",
  description: "Professional solar panel and battery storage installation across Victoria. Residential, commercial, and off-grid solar solutions. Tesla Powerwall, Alpha ESS, EV charging. CEC-accredited installers.",
  keywords: "solar panels Victoria, battery storage Melbourne, solar installation, Tesla Powerwall, Alpha ESS, EV charging, residential solar, commercial solar, off-grid solar",
  openGraph: {
    title: "Solar Panels & Battery Storage Solutions for Victoria",
    description: "Complete solar and battery solutions for homes, businesses, and off-grid locations across Victoria. Professional installation with 25-year warranty.",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Solar Panels & Battery Storage Solutions",
  "description": "Professional solar panel and battery storage installation across Victoria",
  "url": "https://www.xtechsrenewables.com.au/solar",
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.xtechsrenewables.com.au"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Solar & Battery",
        "item": "https://www.xtechsrenewables.com.au/solar"
      }
    ]
  }
};

export default function SolarPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SolarClient />
    </>
  );
}