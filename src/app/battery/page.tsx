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

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How long will my battery last during a blackout?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Battery backup duration depends on capacity and usage. A Tesla Powerwall 3 can power essential loads for 12-24 hours, while larger systems can provide 2-3 days of backup power."
      }
    },
    {
      "@type": "Question",
      "name": "Can I add a battery to my existing solar system?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, most solar systems can be retrofitted with battery storage. We assess your current setup and recommend compatible battery solutions for optimal performance."
      }
    },
    {
      "@type": "Question",
      "name": "What's the difference between AC and DC coupled batteries?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "AC coupled batteries work with any inverter, while DC coupled batteries are more efficient but require compatible inverters. We recommend the best option based on your system."
      }
    },
    {
      "@type": "Question",
      "name": "How much maintenance do batteries require?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Modern lithium batteries require minimal maintenance. We provide monitoring systems and annual health checks to ensure optimal performance and longevity."
      }
    }
  ]
};

export default function BatteryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <BatteryClient />
    </>
  );
}
