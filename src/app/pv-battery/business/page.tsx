import { Metadata } from "next";
import { BusinessClient } from "@/components/business/BusinessClient";

export const metadata: Metadata = {
  title: "Business Solar & Battery Solutions | xTechs Renewables",
  description: "Cut operating costs with onsite clean energy. Solar offsets daytime loads while batteries help trim peaks and stabilise power quality. Professional commercial installations.",
  keywords: "commercial solar, business solar, commercial battery, business energy, solar for business, commercial installation, peak shaving, load management",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Business Solar & Battery Solutions",
  "description": "Professional commercial solar and battery installations for businesses",
  "url": "https://xtechs.com.au/pv-battery/business",
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
        "name": "Business Solutions",
        "item": "https://xtechs.com.au/pv-battery/business"
      }
    ]
  }
};

export default function BusinessPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BusinessClient />
    </>
  );
}
