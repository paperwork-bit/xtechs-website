"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useIsMounted } from "@/lib/use-is-mounted";
import { disableAnim } from "@/lib/flags";
import { 
  MapPin, 
  Settings, 
  Zap, 
  Monitor,
  Wrench,
  Battery,
  Plus,
  Users
} from "lucide-react";
import Image from "next/image";

export function OffGridServicesSection() {
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
            Off-grid services
          </motion.h2>
          <motion.p
            variants={shouldAnimate ? itemVariants : undefined}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Everything you need for reliable off-grid power—from design to ongoing support in remote locations.
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
          {/* Site & Load Assessment - Image Left */}
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
                    src="https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600&h=400&fit=crop"
                    alt="Remote off-grid solar installation site assessment"
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
                  <MapPin className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <h3 className="text-xl font-semibold text-gray-900" style={{ textWrap: "balance" }}>
                    Site & load assessment
                  </h3>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We model your actual consumption and local solar yield, then size array and storage for practical autonomy while accounting for daily spikes and seasonal swings.
                </p>
                <p className="text-sm text-muted-foreground/80 italic">
                  Comprehensive analysis for optimal system sizing
                </p>
              </div>
            </div>
          </motion.div>

          {/* System Architecture & Design - Image Right */}
          <motion.div
            variants={shouldAnimate ? itemVariants : undefined}
            transition={shouldAnimate ? { duration: 0.6, ease: "easeOut" } : undefined}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
          >
            {/* Content Section */}
            <div className="lg:col-span-7 lg:order-1 p-6 sm:p-8">
              <div className="max-w-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Settings className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <h3 className="text-xl font-semibold text-gray-900" style={{ textWrap: "balance" }}>
                    System architecture & design
                  </h3>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We specify proven DC- or AC-coupled hybrids with the right inverter power, MPPT capacity and protections so essentials run smoothly and heavy loads are planned, not guessed.
                </p>
                <p className="text-sm text-muted-foreground/80 italic">
                  Proven hybrid system architecture
                </p>
              </div>
            </div>

            {/* Image Section */}
            <div className="lg:col-span-5 lg:order-2">
              <div className="relative group overflow-hidden rounded-2xl shadow-lg">
                <div className="relative h-64 lg:h-80">
                  <Image
                    src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop"
                    alt="Off-grid system architecture and design"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Generator Integration & Fuel Strategy - Image Left */}
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
                    alt="Generator integration for off-grid systems"
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
                  <Zap className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <h3 className="text-xl font-semibold text-gray-900" style={{ textWrap: "balance" }}>
                    Generator integration & fuel strategy
                  </h3>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We integrate a correctly sized generator with smart start windows and charge thresholds to minimise fuel use while protecting battery health.
                </p>
                <p className="text-sm text-muted-foreground/80 italic">
                  Smart generator integration for fuel efficiency
                </p>
              </div>
            </div>
          </motion.div>

          {/* Controls, Monitoring & Alerts - Image Right */}
          <motion.div
            variants={shouldAnimate ? itemVariants : undefined}
            transition={shouldAnimate ? { duration: 0.6, ease: "easeOut" } : undefined}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
          >
            {/* Content Section */}
            <div className="lg:col-span-7 lg:order-1 p-6 sm:p-8">
              <div className="max-w-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Monitor className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <h3 className="text-xl font-semibold text-gray-900" style={{ textWrap: "balance" }}>
                    Controls, monitoring & alerts
                  </h3>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  You get live visibility of production, usage and state of charge, with alerts for low SOC or extended genset runtime and remote support when you need help.
                </p>
                <p className="text-sm text-muted-foreground/80 italic">
                  Live monitoring with remote support
                </p>
              </div>
            </div>

            {/* Image Section */}
            <div className="lg:col-span-5 lg:order-2">
              <div className="relative group overflow-hidden rounded-2xl shadow-lg">
                <div className="relative h-64 lg:h-80">
                  <Image
                    src="https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&h=400&fit=crop"
                    alt="Off-grid system monitoring and controls"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Installation, Commissioning & Handover - Image Left */}
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
                    src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&h=400&fit=crop"
                    alt="Off-grid system installation and commissioning"
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
                  <Wrench className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <h3 className="text-xl font-semibold text-gray-900" style={{ textWrap: "balance" }}>
                    Installation, commissioning & handover
                  </h3>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Hardware is installed to spec, firmware updated, and settings commissioned to your design. Your handover pack includes diagrams, settings and safety guidance.
                </p>
                <p className="text-sm text-muted-foreground/80 italic">
                  Complete installation with comprehensive handover
                </p>
              </div>
            </div>
          </motion.div>

          {/* Storage Choices That Fit - Image Right */}
          <motion.div
            variants={shouldAnimate ? itemVariants : undefined}
            transition={shouldAnimate ? { duration: 0.6, ease: "easeOut" } : undefined}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
          >
            {/* Content Section */}
            <div className="lg:col-span-7 lg:order-1 p-6 sm:p-8">
              <div className="max-w-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Battery className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <h3 className="text-xl font-semibold text-gray-900" style={{ textWrap: "balance" }}>
                    Storage choices that fit
                  </h3>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Batteries are sized to cycle efficiently, with realistic depth-of-discharge and temperature considerations, plus enclosures or thermal management where the climate demands it.
                </p>
                <p className="text-sm text-muted-foreground/80 italic">
                  Climate-appropriate battery solutions
                </p>
              </div>
            </div>

            {/* Image Section */}
            <div className="lg:col-span-5 lg:order-2">
              <div className="relative group overflow-hidden rounded-2xl shadow-lg">
                <div className="relative h-64 lg:h-80">
                  <Image
                    src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop"
                    alt="Off-grid battery storage solutions"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Expansion & Future-Proofing - Image Left */}
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
                    src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=400&fit=crop"
                    alt="Expandable off-grid solar system"
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
                  <Plus className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <h3 className="text-xl font-semibold text-gray-900" style={{ textWrap: "balance" }}>
                    Expansion & future-proofing
                  </h3>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We leave room to grow—extra PV strings, additional battery cabinets or higher inverter capacity—so new appliances or site changes are an upgrade, not a rebuild.
                </p>
                <p className="text-sm text-muted-foreground/80 italic">
                  Scalable design for future growth
                </p>
              </div>
            </div>
          </motion.div>

          {/* Operations & Support - Image Right */}
          <motion.div
            variants={shouldAnimate ? itemVariants : undefined}
            transition={shouldAnimate ? { duration: 0.6, ease: "easeOut" } : undefined}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
          >
            {/* Content Section */}
            <div className="lg:col-span-7 lg:order-1 p-6 sm:p-8">
              <div className="max-w-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <h3 className="text-xl font-semibold text-gray-900" style={{ textWrap: "balance" }}>
                    Operations & support
                  </h3>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We provide scheduled check-ins, performance reviews and tuning for seasons or load changes so the system stays dependable.
                </p>
                <p className="text-sm text-muted-foreground/80 italic">
                  Ongoing support for reliable operation
                </p>
              </div>
            </div>

            {/* Image Section */}
            <div className="lg:col-span-5 lg:order-2">
              <div className="relative group overflow-hidden rounded-2xl shadow-lg">
                <div className="relative h-64 lg:h-80">
                  <Image
                    src="https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&h=400&fit=crop"
                    alt="Off-grid system operations and support"
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
