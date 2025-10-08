import { Metadata } from "next";
import { PVIndexClient } from "@/components/pv/PVIndexClient";

export const metadata: Metadata = {
  title: "PV & Battery | xTechs Renewables",
  description: "Explore Residential, Business, Off-Grid and Builder solutions: solar + batteries engineered for performance, reliability and clean energy savings.",
};

// JSON-LD structured data for breadcrumbs
const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://xtechs.au"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "PV & Battery",
      "item": "https://xtechs.au/pv-battery"
    }
  ]
};

// JSON-LD structured data for FAQ
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Will a battery keep my lights on in a blackout?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes—when sized and configured for backup, essential circuits can keep running during an outage (lighting, refrigeration, comms). We'll confirm your essential loads and design accordingly."
      }
    },
    {
      "@type": "Question",
      "name": "Can I add a battery later?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Often yes. Many inverters support staged upgrades. We'll size your solar and specify hardware that keeps the upgrade path clean."
      }
    },
    {
      "@type": "Question",
      "name": "How much backup can I get?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Depends on battery capacity, inverter output, and your essential circuits. Typical homes back up lights, fridge, internet, and a few GPOs; heavy loads are optional."
      }
    },
    {
      "@type": "Question",
      "name": "How fast is the installation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Residential installs are commonly 1–2 days (site-dependent). Larger business/off-grid projects vary with scope and switchboard works."
      }
    },
    {
      "@type": "Question",
      "name": "Do you handle export limits and approvals?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes—we coordinate with your local distributor, apply export caps where required, and set compliant limits in the inverter."
      }
    },
    {
      "@type": "Question",
      "name": "What if my roof is complex?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We design around orientation, shading, and roof type (tile/metal/flat). If needed we use optimizers or adjust array layout."
      }
    },
    {
      "@type": "Question",
      "name": "What maintenance is required?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Minimal. Online monitoring, occasional visual checks, and firmware updates. We provide guidance and can monitor systems under support plans."
      }
    },
    {
      "@type": "Question",
      "name": "What happens if my system underperforms?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We review monitoring data, check for shading/faults, and perform diagnostics. Warranty processes are handled with manufacturers where applicable."
      }
    },
    {
      "@type": "Question",
      "name": "Will firmware updates break anything?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Updates improve performance and safety. We schedule them appropriately and validate after major updates."
      }
    },
    {
      "@type": "Question",
      "name": "Which brands do you carry?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Tier-one panels, reputable inverters, and proven batteries suited for Australian conditions. We'll recommend options that match your use-case and budget."
      }
    },
    {
      "@type": "Question",
      "name": "How long are the warranties?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Panels typically 20–25 yrs product / 25–30 yrs performance, inverters ~10 yrs, batteries ~10 yrs (model-specific)."
      }
    },
    {
      "@type": "Question",
      "name": "Can I integrate an EV charger or heat pump later?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes—systems are designed to be compatible with EV charging and efficient hot-water solutions. We'll leave room in the design for future add-ons."
      }
    }
  ]
};

export default function PVBatteryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      
      <PVIndexClient />
    </>
  );
}