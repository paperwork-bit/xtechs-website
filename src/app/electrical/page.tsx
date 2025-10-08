import { Metadata } from "next";
import { ElectricalClient } from "@/components/electrical/ElectricalClient";

export const metadata: Metadata = {
  title: "Electrical & Home Automation | xTechs Renewables",
  description: "Professional electrical services and smart home automation solutions. Licensed electricians for installations, repairs, and modern home automation systems.",
  keywords: "electrical services, home automation, smart home, electrical installation, electrical repairs, licensed electricians, electrical safety, commercial electrical",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Electrical & Home Automation Services",
  "description": "Professional electrical services and smart home automation solutions",
  "url": "https://xtechs.com.au/electrical",
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
        "name": "Electrical & Home Automation",
        "item": "https://xtechs.com.au/electrical"
      }
    ]
  }
};

export default function ElectricalPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ElectricalClient />
    </>
  );
}
