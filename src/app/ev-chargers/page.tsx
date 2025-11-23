import { Metadata } from "next";
import { EVChargersClient } from "@/components/ev-chargers/EVChargersClient";

export const metadata: Metadata = {
  title: "EV Charger Installation | Victoria Australia",
  description: "Professional EV charger installation for Victorian homes and businesses. Level 2 AC chargers, DC fast chargers, and smart charging solutions with solar integration. CEC-accredited installers.",
  keywords: "EV charger installation Victoria, electric vehicle charging Melbourne, home EV charger, commercial EV charging, smart charging, solar EV charging, Level 2 charger, DC fast charger, EV installation Rowville",
  openGraph: {
    title: "EV Charger Installation Services for Victoria",
    description: "Professional EV charger installation for homes and businesses across Victoria. Smart charging solutions with solar integration.",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "EV Charger Installation",
  "description": "Professional EV charger installation services for homes and businesses",
  "url": "https://xtechs.com.au/ev-chargers",
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
        "name": "EV Chargers",
        "item": "https://xtechs.com.au/ev-chargers"
      }
    ]
  }
};

export default function EVChargersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <EVChargersClient />
    </>
  );
}
