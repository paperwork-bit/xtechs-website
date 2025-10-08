"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";

type ServiceCard = {
  title: string;
  image: string;        // back image
  overlayImage: string; // front image
  href: string;         // navigation link
};

const services: ServiceCard[] = [
  {
    title: "Residential Solar",
    image:
      "https://source.unsplash.com/featured/512x512?solar,house,roof",
    overlayImage:
      "https://source.unsplash.com/featured/512x512?photovoltaic,rooftop",
    href: "/solar/residential", // PV&Battery for Family
  },
  {
    title: "Commercial Solar",
    image:
      "https://source.unsplash.com/featured/512x512?solar,commercial,panels",
    overlayImage:
      "https://source.unsplash.com/featured/512x512?solar,warehouse,rooftop",
    href: "/solar/business", // Business
  },
  {
    title: "SolarFold",
    image:
      "https://source.unsplash.com/featured/512x512?portable,solar,generator",
    overlayImage:
      "https://source.unsplash.com/featured/512x512?foldable,solar,offgrid",
    href: "/solarfold", // SolarFold
  },
  {
    title: "Off-grid Systems",
    image:
      "https://source.unsplash.com/featured/512x512?offgrid,solar,cabin",
    overlayImage:
      "https://source.unsplash.com/featured/512x512?inverter,battery,offgrid",
    href: "/solar/off-grid", // PV&Battery off-grid
  },
  {
    title: "Solar Batteries",
    image:
      "https://source.unsplash.com/featured/512x512?lithium,battery,energy",
    overlayImage:
      "https://source.unsplash.com/featured/512x512?battery,storage,ess",
    href: "/solar/residential", // PV&Battery for Family
  },
  {
    title: "EV Chargers",
    image:
      "https://source.unsplash.com/featured/512x512?ev,charger,charging",
    overlayImage:
      "https://source.unsplash.com/featured/512x512?electric,vehicle,charger",
    href: "/solar/residential", // PV&Battery for Family
  },
];

// Build a default link map by title so remote data without hrefs still routes correctly
const defaultHrefByTitle: Record<string, string> = services.reduce(
  (acc, svc) => {
    acc[svc.title.toLowerCase()] = svc.href;
    return acc;
  },
  {} as Record<string, string>
);

function SafeImage({
  src,
  alt,
  className,
  width = 176,
  height = 176,
}: {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}) {
  const [currentSrc, setCurrentSrc] = React.useState(src);
  return (
    <Image
      src={currentSrc}
      alt={alt}
      width={width}
      height={height}
      unoptimized
      className={className}
      onError={() =>
        setCurrentSrc(
          "https://placehold.co/176x176/e2e8f0/1f2937?text=Image"
        )
      }
    />
  );
}

export default function ServicesSection() {
  const [remote, setRemote] = React.useState<null | { services: ServiceCard[] }>(null);
  React.useEffect(() => {
    fetch("/api/services", { cache: "no-store" })
      .then((r) => r.json())
      .then((json) => setRemote(json))
      .catch(() => {});
  }, []);
  
  // Ensure all services have href property and fallback to default services
  const source = React.useMemo(() => {
    if (remote?.services?.length) {
      return remote.services.map(service => {
        const key = (service.title || "").toLowerCase();
        const resolvedHref = service.href || defaultHrefByTitle[key] || "/contact";
        return { ...service, href: resolvedHref } as ServiceCard;
      });
    }
    return services;
  }, [remote]);
  return (
    <div className="bg-white dark:bg-gray-900 w-full flex items-center justify-center font-sans">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');
          body { font-family: 'Inter', sans-serif; }
        `}
      </style>

      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 w-full">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 tracking-tight">
              Our Services
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 font-light">
              Grid & off-grid solar, batteries, EV charging, and rapid-deploy SolarFold—built the xTechs way.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {source.map((service, idx) => (
              <Link
                key={service.title + idx}
                href={service.href}
                className="group bg-gray-50 dark:bg-gray-800/50 rounded-3xl p-6 flex flex-col h-[320px] transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus-within:ring-2 focus-within:ring-gray-300 dark:focus-within:ring-gray-700 outline-none cursor-pointer"
                aria-label={service.title}
              >
                {/* Image Container */}
                <div className="relative flex-grow flex items-center justify-center mb-4">
                  {/* Back Image */}
                  <SafeImage
                    src={service.image}
                    alt={`${service.title} — background`}
                    className="absolute rounded-lg shadow-md -rotate-6 transition-all duration-300 ease-in-out group-hover:-rotate-12 group-hover:scale-105"
                  />
                  {/* Front Image */}
                  <SafeImage
                    src={service.overlayImage}
                    alt={`${service.title} — foreground`}
                    className="absolute rounded-lg shadow-lg rotate-3 transition-all duration-300 ease-in-out group-hover:rotate-6 group-hover:scale-105"
                  />
                </div>

                {/* Title */}
                <h3 className="text-center text-lg font-medium text-gray-800 dark:text-gray-100 mt-auto">
                  {service.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
