import { Metadata } from "next";
import { OffGridClient } from "@/components/off-grid/OffGridClient";

export const metadata: Metadata = {
  title: "Off-Grid Solar & Battery Solutions | xTechs Renewables",
  description: "Reliable power—anywhere. Standalone systems that combine solar, storage and a generator so your essentials run day and night—quietly, efficiently, and with clear monitoring.",
  keywords: "off-grid solar, remote power, standalone systems, off-grid battery, generator integration, remote monitoring, autonomous power, off-grid installation",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Off-Grid Solar & Battery Solutions",
  "description": "Professional off-grid solar and battery installations for remote locations",
  "url": "https://xtechs.com.au/pv-battery/off-grid",
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://xtechs.com.au"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "PV & Battery",
        "item": "https://xtechs.com.au/pv-battery"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Off-Grid Solutions",
        "item": "https://xtechs.com.au/pv-battery/off-grid"
      }
    ]
  }
};

export default function OffGridPage() {
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
