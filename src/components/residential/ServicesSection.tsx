"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useIsMounted } from "@/lib/use-is-mounted";
import { disableAnim } from "@/lib/flags";
import { 
  Sun, 
  Battery, 
  Zap, 
  Wrench
} from "lucide-react";
import Image from "next/image";

export function ServicesSection() {
  const isMounted = useIsMounted();
  const shouldAnimate = isMounted && !disableAnim();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-12 lg:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          variants={shouldAnimate ? containerVariants : undefined}
          initial={shouldAnimate ? "hidden" : false}
          whileInView={shouldAnimate ? "visible" : undefined}
          viewport={shouldAnimate ? { once: true, margin: "-100px" } : undefined}
          className="text-center mb-12"
        >
          <motion.h2
            variants={shouldAnimate ? itemVariants : undefined}
            className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
          >
            Residential services
          </motion.h2>
          <motion.p
            variants={shouldAnimate ? itemVariants : undefined}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Everything you need for a modern home energy setup—clear specs, neat installs, and support after commissioning.
          </motion.p>
        </motion.div>

        {/* Services Grid - Alternating Layout */}
        <motion.div
          variants={shouldAnimate ? containerVariants : undefined}
          initial={shouldAnimate ? "hidden" : false}
          whileInView={shouldAnimate ? "visible" : undefined}
          viewport={shouldAnimate ? { once: true, margin: "-100px" } : undefined}
          className="space-y-12 lg:space-y-16"
        >
          {/* Solar Installation & Supply - Image Left */}
          <motion.div
            variants={shouldAnimate ? itemVariants : undefined}
            transition={shouldAnimate ? { duration: 0.6, ease: "easeOut" } : undefined}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
          >
            {/* Image Section */}
            <div className="lg:col-span-5 lg:order-1">
              <div className="relative group overflow-hidden rounded-2xl shadow-lg">
                <div className="relative h-64 lg:h-80">
                  <Image
                    src="/services/residential-solar-install-and-supply.jpeg"
                    alt="Solar panels on residential roof"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="lg:col-span-7 lg:order-2 p-6 sm:p-8">
              <div className="max-w-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Sun className="h-5 w-5 text-blue-600 flex-shrink-0" />
                  <h3 className="text-xl font-semibold text-gray-900" style={{ textWrap: "balance" }}>
                    Solar installation & supply
                  </h3>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We design a home array for high self-consumption so more of your daytime use is powered by your own roof. Panels and mounting are specified for your roof type and shading, and commissioning includes monitoring so you can see production from day one. Export-limit approvals are handled with your distributor.
                </p>
                <p className="text-sm text-muted-foreground/80 italic">
                  Typical system range: 5–10 kW solar
                </p>
              </div>
            </div>
          </motion.div>

          {/* Battery Installation & Supply - Image Right */}
          <motion.div
            variants={shouldAnimate ? itemVariants : undefined}
            transition={shouldAnimate ? { duration: 0.6, ease: "easeOut" } : undefined}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
          >
            {/* Content Section */}
            <div className="lg:col-span-7 lg:order-1 p-6 sm:p-8">
              <div className="max-w-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Battery className="h-5 w-5 text-blue-600 flex-shrink-0" />
                  <h3 className="text-xl font-semibold text-gray-900" style={{ textWrap: "balance" }}>
                    Battery installation & supply
                  </h3>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Storage is sized to your usage pattern so it actually cycles and pays off. When configured for backup, essential circuits like lighting, refrigeration and internet can keep running during an outage. We commission charge and discharge windows and leave room for future upgrades such as EVs or hot-water.
                </p>
                <p className="text-sm text-muted-foreground/80 italic">
                  Typical range: 5–13.5 kWh battery
                </p>
              </div>
            </div>

            {/* Image Section */}
            <div className="lg:col-span-5 lg:order-2">
              <div className="relative group overflow-hidden rounded-2xl shadow-lg">
                <div className="relative h-64 lg:h-80 overflow-hidden bg-gray-100">
                  {/* Blurred backdrop so portrait images still look great in a landscape card */}
                  <div
                    className="absolute inset-0 scale-110 bg-cover bg-center blur-xl opacity-40"
                    style={{ backgroundImage: "url(/services/residential-battery-install-and-supply.jpeg)" }}
                    aria-hidden="true"
                  />

                  {/* Foreground image (full image, no crop) */}
                  <Image
                    src="/services/residential-battery-install-and-supply.jpeg"
                    alt="Home battery storage system"
                    fill
                    className="object-contain p-4 transition-transform duration-700 group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* EV Charger Installation & Supply - Image Left */}
          <motion.div
            variants={shouldAnimate ? itemVariants : undefined}
            transition={shouldAnimate ? { duration: 0.6, ease: "easeOut" } : undefined}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
          >
            {/* Image Section */}
            <div className="lg:col-span-5 lg:order-1">
              <div className="relative group overflow-hidden rounded-2xl shadow-lg">
                <div className="relative h-64 lg:h-80">
                  <Image
                    src="/services/residential-ev-charger.jpg"
                    alt="EV charger installation"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="lg:col-span-7 lg:order-2 p-6 sm:p-8">
              <div className="max-w-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="h-5 w-5 text-blue-600 flex-shrink-0" />
                  <h3 className="text-xl font-semibold text-gray-900" style={{ textWrap: "balance" }}>
                    EV-charger installation & supply
                  </h3>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We match the charger to your switchboard capacity and cable run, set up load management so it doesn't trip the main, and enable solar-aware charging modes where supported. Wallbox location and cable routing are planned for daily convenience and safe clearances.
                </p>
                <p className="text-sm text-muted-foreground/80 italic">
                  Load management & solar-aware charging
                </p>
              </div>
            </div>
          </motion.div>

          {/* House Electrical Work - Image Right */}
          <motion.div
            variants={shouldAnimate ? itemVariants : undefined}
            transition={shouldAnimate ? { duration: 0.6, ease: "easeOut" } : undefined}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
          >
            {/* Content Section */}
            <div className="lg:col-span-7 lg:order-1 p-6 sm:p-8">
              <div className="max-w-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Wrench className="h-5 w-5 text-blue-600 flex-shrink-0" />
                  <h3 className="text-xl font-semibold text-gray-900" style={{ textWrap: "balance" }}>
                    House electrical work
                  </h3>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  From switchboard upgrades and safety switches to lighting, earthing and rewires, our licensed team delivers neat, compliant work with clear documentation. We coordinate metering visits when needed so you're not left waiting.
                </p>
                <p className="text-sm text-muted-foreground/80 italic">
                  Licensed electricians & compliance documentation
                </p>
              </div>
            </div>

            {/* Image Section */}
            <div className="lg:col-span-5 lg:order-2">
              <div className="relative group overflow-hidden rounded-2xl shadow-lg">
                <div className="relative h-64 lg:h-80">
                  <Image
                    src="/services/residential-electrical.jpg"
                    alt="Electrical work and switchboard"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                </div>
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
