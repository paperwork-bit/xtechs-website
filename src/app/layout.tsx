import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { ShortlistTray } from "@/components/shortlist-tray";
import Footer from "@/components/ui/footer";
import CookieBanner from "@/components/compliance/cookie-banner";
import ConsentPreferences from "@/components/compliance/consent-preferences";
import ConsentScripts from "@/components/compliance/consent-scripts";
import { Chatbot } from "@/components/chatbot/chatbot";
import Script from "next/script";
import { PageViewTracker } from "@/components/analytics/pageview-tracker";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.xtechsrenewables.com.au"),
  title: {
    default: "xTechs Renewables | Solar, Batteries, EV & Electrical in Victoria",
    template: "%s | xTechs Renewables"
  },
  description:
    "Solar PV, batteries, EV chargers, off-grid solutions, and electrical by xTechs Renewables across Victoria. Builder-ready workflows and compliant installations.",
  alternates: { canonical: "/" },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  openGraph: {
    type: "website",
    siteName: "xTechs Renewables",
    url: "/",
    title: "Clean energy, done right in Victoria",
    description:
      "Solar PV & battery systems, EV charging, off-grid, and electrical services.",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "xTechs Renewables" }],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@xtechsrenewables",
    images: ["/og.jpg"],
  },
  robots: { index: true, follow: true },
  keywords: [
    "Solar Victoria", "Battery rebate", "PV installation", "EV charger", "Off-grid",
    "Electrical contractor", "Rowville", "Melbourne", "Victoria Australia"
  ],
  icons: {
    icon: [
      { url: '/xlogo.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    apple: { url: '/xlogo.png', sizes: '180x180', type: 'image/png' },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          as="image"
          href="/xlogo.png"
          type="image/png"
          fetchPriority="high"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        {/* Load scripts only after user consent */}
        <ConsentScripts />
        <PageViewTracker />
        
        {/* Cookie banner & preferences */}
        <CookieBanner />
        <ConsentPreferences />
        
        <Header />
        {children}
        <ShortlistTray />
        <Footer />
        <Chatbot />
        
        {/* JSON-LD structured data */}
        <Script
          id="org-jsonld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "xTechs Renewables",
              url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.xtechsrenewables.com.au",
              logo: "/xlogo.png",
              image: "/og.jpg",
              description: "Professional solar panel and battery storage installation across Victoria. CEC-accredited installers delivering reliable renewable energy solutions.",
              sameAs: [
                "https://www.instagram.com/xtechsrenewables",
                "https://www.linkedin.com/company/xtechs-renewables"
              ],
              address: {
                "@type": "PostalAddress",
                streetAddress: "123 Business Street",
                addressLocality: "Rowville",
                addressRegion: "VIC",
                postalCode: "3178",
                addressCountry: "AU"
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: "-37.9000",
                longitude: "145.2333"
              },
              contactPoint: [{
                "@type": "ContactPoint",
                contactType: "customer support",
                email: "hello@xtechsrenewables.com.au",
                telephone: "+61 3 0000 0000",
                areaServed: "AU",
                availableLanguage: "English"
              }],
              openingHours: "Mo-Fr 08:00-17:00",
              priceRange: "$$",
              serviceArea: {
                "@type": "GeoCircle",
                geoMidpoint: {
                  "@type": "GeoCoordinates",
                  latitude: "-37.9000",
                  longitude: "145.2333"
                },
                geoRadius: "100000"
              },
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Solar and Battery Services",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Residential Solar Installation",
                      description: "Solar panel installation for Victorian homes"
                    }
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Commercial Solar Installation",
                      description: "Large-scale solar systems for businesses"
                    }
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Battery Storage Installation",
                      description: "Tesla Powerwall and other battery storage systems"
                    }
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "EV Charger Installation",
                      description: "Electric vehicle charging station installation"
                    }
                  }
                ]
              }
            })
          }}
        />
      </body>
    </html>
  );
}
