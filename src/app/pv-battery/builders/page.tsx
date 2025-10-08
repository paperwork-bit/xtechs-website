import { Metadata } from "next";
import { BuildersClient } from "@/components/builders/BuildersClient";

export const metadata: Metadata = {
  title: "Solar & Battery for Builders | xTechs Renewables",
  description: "Solar & battery for builders—seamless during construction. We coordinate pre-wire, rough-in and final fit-off to match your build stages so handover is clean, compliant and client-ready.",
  keywords: "solar for builders, construction solar, new home solar, builder solar packages, pre-wire solar, construction coordination, builder handover, solar rough-in",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Solar & Battery for Builders",
  "description": "Professional solar and battery installations coordinated with construction timelines",
  "url": "https://xtechs.com.au/pv-battery/builders",
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
        "name": "For Builders",
        "item": "https://xtechs.com.au/pv-battery/builders"
      }
    ]
  }
};

export default function BuildersPage() {
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
