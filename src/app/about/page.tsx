import AboutUsSection from "@/components/ui/about-us-section"

import Script from "next/script";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About xTechs Renewables | Solar & Battery Experts",
  description:
    "Learn about xTechs Renewables—our mission, team, and commitment to delivering premium solar and battery storage solutions across Australia.",
  alternates: { canonical: "https://xtechs.com.au/about" },
  keywords: [
    "about xTechs",
    "xTechs Renewables",
    "about us",
    "solar company Australia",
    "battery storage experts",
  ],
};


const aboutWebPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://xtechs.com.au/about#webpage",
    url: "https://xtechs.com.au/about",
    name: "About xTechs Renewables",
    description:
      "Learn about xTechs Renewables—our mission, team, and commitment to premium solar and battery storage solutions.",
    inLanguage: "en-AU",
    isPartOf: {
      "@type": "WebSite",
      "@id": "https://xtechs.com.au/#website",
    },
  };

  // --- JSON-LD: BreadcrumbList ---
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": "https://xtechs.com.au/about#breadcrumb",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "WebSite",
          "@id": "https://xtechs.com.au/#website",
          url: "https://xtechs.com.au",
          name: "Home",
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@type": "WebPage",
          "@id": "https://xtechs.com.au/about#webpage",
          url: "https://xtechs.com.au/about",
          name: "About",
        },
      },
    ],
  };


export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <AboutUsSection />

      
 <Script
        id="about-webpage-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutWebPageJsonLd) }}
      />
      <Script
        id="about-breadcrumb-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />


    </div>

    
  );
}
