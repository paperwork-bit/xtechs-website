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

export function BusinessServicesSection() {
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
            Business services
          </motion.h2>
          <motion.p
            variants={shouldAnimate ? itemVariants : undefined}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Everything you need for a modern business energy setup—clear specs, professional installs, and ongoing support.
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
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop"
                    alt="Commercial solar installation on business building"
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
                  We design commercial arrays for maximum daytime load offset and peak demand reduction. Panels and mounting are specified for your roof type, load capacity, and shading conditions, with commissioning including comprehensive monitoring so you can track production and savings from day one. All export-limit approvals are handled with your distributor.
                </p>
                <p className="text-sm text-muted-foreground/80 italic">
                  Typical system range: 15–200 kW solar
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
                  Storage is sized to your load profile and peak demand patterns so it effectively cycles and delivers ROI. When configured for backup, essential circuits like lighting, refrigeration, and critical systems can keep running during outages. We commission charge and discharge windows optimized for your tariff structure and leave room for future upgrades such as additional capacity or EV charging.
                </p>
                <p className="text-sm text-muted-foreground/80 italic">
                  Typical range: 10–200 kWh battery
                </p>
              </div>
            </div>

            {/* Image Section */}
            <div className="lg:col-span-5 lg:order-2">
              <div className="relative group overflow-hidden rounded-2xl shadow-lg">
                <div className="relative h-64 lg:h-80">
                  <Image
                    src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop"
                    alt="Commercial battery storage system"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
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
                    src="https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=600&h=400&fit=crop"
                    alt="Commercial EV charger installation"
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
                  We match the charger to your switchboard capacity and cable run, set up load management so it doesn't trip the main, and enable solar-aware charging modes where supported. Wallbox location and cable routing are planned for daily convenience, safe clearances, and future fleet expansion. Commercial-grade equipment ensures reliability and performance.
                </p>
                <p className="text-sm text-muted-foreground/80 italic">
                  Load management & solar-aware charging
                </p>
              </div>
            </div>
          </motion.div>

          {/* Commercial Electrical Work - Image Right */}
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
                    Commercial electrical work
                  </h3>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  From switchboard upgrades and safety switches to lighting, earthing, and rewires, our licensed team delivers neat, compliant work with clear documentation. We coordinate metering visits when needed so you're not left waiting, and handle all necessary permits and approvals for commercial installations.
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
                    src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&h=400&fit=crop"
                    alt="Commercial electrical work and switchboard"
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
