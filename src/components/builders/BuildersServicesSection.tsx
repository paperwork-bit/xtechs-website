"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useIsMounted } from "@/lib/use-is-mounted";
import { disableAnim } from "@/lib/flags";
import { 
  Settings, 
  Wrench, 
  CheckCircle, 
  Calendar,
  FileText,
  Plus,
  Shield
} from "lucide-react";
import Image from "next/image";

export function BuildersServicesSection() {
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
            Builder services
          </motion.h2>
          <motion.p
            variants={shouldAnimate ? itemVariants : undefined}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Everything you need for seamless solar integration during construction—from design to handover.
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
          {/* Design & Specification - Image Left */}
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
                    src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop"
                    alt="Solar system design and specification for builders"
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
                  <Settings className="h-5 w-5 text-orange-600 flex-shrink-0" />
                  <h3 className="text-xl font-semibold text-gray-900" style={{ textWrap: "balance" }}>
                    Design & specification
                  </h3>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Standardised packages align to your home typologies with single-line diagrams, switchboard allowances, roof layout, inverter location and battery placement set out clearly.
                </p>
                <p className="text-sm text-muted-foreground/80 italic">
                  Standardized packages for consistent results
                </p>
              </div>
            </div>
          </motion.div>

          {/* Pre-wire & Rough-in - Image Right */}
          <motion.div
            variants={shouldAnimate ? itemVariants : undefined}
            transition={shouldAnimate ? { duration: 0.6, ease: "easeOut" } : undefined}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
          >
            {/* Content Section */}
            <div className="lg:col-span-7 lg:order-1 p-6 sm:p-8">
              <div className="max-w-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Wrench className="h-5 w-5 text-orange-600 flex-shrink-0" />
                  <h3 className="text-xl font-semibold text-gray-900" style={{ textWrap: "balance" }}>
                    Pre-wire & rough-in
                  </h3>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Conduits, isolators and cable routes are installed at framing so penetrations are neat, weather-tight and compliant when arrays and batteries arrive.
                </p>
                <p className="text-sm text-muted-foreground/80 italic">
                  Clean penetrations and weather-tight installation
                </p>
              </div>
            </div>

            {/* Image Section */}
            <div className="lg:col-span-5 lg:order-2">
              <div className="relative group overflow-hidden rounded-2xl shadow-lg">
                <div className="relative h-64 lg:h-80">
                  <Image
                    src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&h=400&fit=crop"
                    alt="Pre-wire and rough-in electrical work"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Approvals, Export Limits & Metering - Image Left */}
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
                    src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop"
                    alt="Solar system approvals and metering"
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
                  <CheckCircle className="h-5 w-5 text-orange-600 flex-shrink-0" />
                  <h3 className="text-xl font-semibold text-gray-900" style={{ textWrap: "balance" }}>
                    Approvals, export limits & metering
                  </h3>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We manage distributor approvals and export caps, commission inverter settings to the approved limit and coordinate metering so clients aren't left waiting.
                </p>
                <p className="text-sm text-muted-foreground/80 italic">
                  Complete approvals and metering coordination
                </p>
              </div>
            </div>
          </motion.div>

          {/* Staging & Scheduling - Image Right */}
          <motion.div
            variants={shouldAnimate ? itemVariants : undefined}
            transition={shouldAnimate ? { duration: 0.6, ease: "easeOut" } : undefined}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
          >
            {/* Content Section */}
            <div className="lg:col-span-7 lg:order-1 p-6 sm:p-8">
              <div className="max-w-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="h-5 w-5 text-orange-600 flex-shrink-0" />
                  <h3 className="text-xl font-semibold text-gray-900" style={{ textWrap: "balance" }}>
                    Staging & scheduling
                  </h3>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Works are sequenced around other trades and weather, with site-ready checks and multi-lot rollouts to keep programmes moving.
                </p>
                <p className="text-sm text-muted-foreground/80 italic">
                  Coordinated scheduling with other trades
                </p>
              </div>
            </div>

            {/* Image Section */}
            <div className="lg:col-span-5 lg:order-2">
              <div className="relative group overflow-hidden rounded-2xl shadow-lg">
                <div className="relative h-64 lg:h-80">
                  <Image
                    src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=400&fit=crop"
                    alt="Construction scheduling and staging"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Compliance & Homeowner Handover - Image Left */}
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
                    src="https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&h=400&fit=crop"
                    alt="Compliance documentation and homeowner handover"
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
                  <FileText className="h-5 w-5 text-orange-600 flex-shrink-0" />
                  <h3 className="text-xl font-semibold text-gray-900" style={{ textWrap: "balance" }}>
                    Compliance & homeowner handover
                  </h3>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  CEC standards, test results and photo records are bundled with warranties and a homeowner pack, including simple steps to activate monitoring.
                </p>
                <p className="text-sm text-muted-foreground/80 italic">
                  Complete documentation and homeowner guidance
                </p>
              </div>
            </div>
          </motion.div>

          {/* Client Options & Upgrades - Image Right */}
          <motion.div
            variants={shouldAnimate ? itemVariants : undefined}
            transition={shouldAnimate ? { duration: 0.6, ease: "easeOut" } : undefined}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
          >
            {/* Content Section */}
            <div className="lg:col-span-7 lg:order-1 p-6 sm:p-8">
              <div className="max-w-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Plus className="h-5 w-5 text-orange-600 flex-shrink-0" />
                  <h3 className="text-xl font-semibold text-gray-900" style={{ textWrap: "balance" }}>
                    Client options & upgrades
                  </h3>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Pre-wire leaves capacity for EV chargers, backup circuits or heat-pump hot water so buyers can add features without rework.
                </p>
                <p className="text-sm text-muted-foreground/80 italic">
                  Future-ready infrastructure for easy upgrades
                </p>
              </div>
            </div>

            {/* Image Section */}
            <div className="lg:col-span-5 lg:order-2">
              <div className="relative group overflow-hidden rounded-2xl shadow-lg">
                <div className="relative h-64 lg:h-80">
                  <Image
                    src="https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=600&h=400&fit=crop"
                    alt="Client options and upgrade infrastructure"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Aftercare & Warranty Support - Image Left */}
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
                    src="https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&h=400&fit=crop"
                    alt="Aftercare and warranty support for builders"
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
                  <Shield className="h-5 w-5 text-orange-600 flex-shrink-0" />
                  <h3 className="text-xl font-semibold text-gray-900" style={{ textWrap: "balance" }}>
                    Aftercare & warranty support
                  </h3>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We assist during the defect-liability period, help monitor early performance and handle brand warranty liaisons where needed.
                </p>
                <p className="text-sm text-muted-foreground/80 italic">
                  Comprehensive support during defect-liability period
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
