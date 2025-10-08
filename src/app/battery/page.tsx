import { Metadata } from "next";
import { BatteryClient } from "@/components/battery/BatteryClient";

export const metadata: Metadata = {
  title: "Battery Storage Solutions | xTechs Renewables",
  description: "Professional battery storage installation for homes and businesses. Tesla Powerwall, Alpha ESS, and other premium battery systems with solar integration and smart energy management.",
  keywords: "battery storage, home battery, Tesla Powerwall, Alpha ESS, battery installation, energy storage, solar battery, smart battery, off-grid battery, commercial battery storage",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Battery Storage Solutions",
  "description": "Professional battery storage installation services for homes and businesses",
  "url": "https://xtechs.com.au/battery",
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
        "name": "Solutions",
        "item": "https://xtechs.com.au/solutions"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Battery Storage",
        "item": "https://xtechs.com.au/battery"
      }
    ]
  }
};

export default function BatteryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BatteryClient />
    </>
  );
}
