"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AnimatedUnderline } from "@/components/ui/animated-underline";
import { useIsMounted } from "@/lib/use-is-mounted";
import { disableAnim } from "@/lib/flags";
import { 
  CheckCircle, 
  ArrowRight,
  Shield,
  Clock,
  Award,
  Users,
  Phone
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { BuildersServicesSection } from "./BuildersServicesSection";
import { ProcessSteps } from "@/components/ui/process-steps";
import { trackCalendlyBooking } from "@/lib/analytics";
import { CTASection } from "@/components/ui/cta-section";

const benefits = [
  {
    icon: Shield,
    title: "Construction Coordination",
    description: "Seamless integration with your build timeline and other trades."
  },
  {
    icon: Award,
    title: "Standardized Packages",
    description: "Repeatable specs and pricing models for consistent results."
  },
  {
    icon: Clock,
    title: "Fast Handover",
    description: "Clean, compliant, and client-ready systems on day one."
  },
  {
    icon: Users,
    title: "Builder Support",
    description: "Dedicated support during defect-liability period and beyond."
  }
];

export function BuildersClient() {
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
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800"
      variants={shouldAnimate ? containerVariants : undefined}
      initial={shouldAnimate ? "hidden" : "visible"}
      animate="visible"
    >
      {/* Hero Section (mirrors Battery style) */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants}>
              <Badge className="mb-4 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                Builder Solutions
              </Badge>

              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Builder
                <br />
                <AnimatedUnderline className="text-blue-600 dark:text-blue-400">
                  Packages
                </AnimatedUnderline>
              </h1>

              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Seamless solar and battery integration during construction. We align pre‑wire,
                rough‑in and final fit‑off to your programme so handover is clean, compliant and
                client‑ready.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white" asChild>
                  <Link href="/contact">
                    Book Site Assessment
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link 
                    href="https://calendly.com/inquiries-xtechsrenewables/30min" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={() => trackCalendlyBooking('builders-hero', 'builder-consultation')}
                  >
                    Book Consultation
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="relative">
              <div className="relative z-10">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
                  <h3 className="text-2xl font-bold text-center mb-4">Builder Integration</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700 dark:text-gray-300">Pre‑wire and rough‑in</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700 dark:text-gray-300">Approvals, export limits & metering</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700 dark:text-gray-300">Staging & scheduling with trades</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700 dark:text-gray-300">Compliance & homeowner handover</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-green-500 rounded-full opacity-20"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-500 rounded-full opacity-20"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <BuildersServicesSection />

      {/* Process Section */}
      <ProcessSteps />

      {/* Benefits Section */}
      <div className="py-8 lg:py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            variants={shouldAnimate ? containerVariants : undefined}
            initial={shouldAnimate ? "hidden" : false}
            whileInView={shouldAnimate ? "visible" : undefined}
            viewport={shouldAnimate ? { once: true, margin: "-100px" } : undefined}
            className="max-w-6xl mx-auto"
          >
            <motion.div variants={shouldAnimate ? itemVariants : undefined} className="text-center mb-12">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                Why Choose xTechs for Builders?
              </h2>
              <p className="text-base text-gray-600 max-w-2xl mx-auto">
                We're committed to delivering seamless solar integration that keeps your builds on schedule and your clients happy.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  variants={shouldAnimate ? itemVariants : undefined}
                  className="text-center"
                >
                  <div className="mb-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mb-3">
                      <benefit.icon className="h-6 w-6 text-orange-600" />
                    </div>
                    <h3 className="text-base font-semibold text-gray-900 mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <CTASection
        title="Ready to Integrate Solar into Your Builds?"
        description="Send plans and a lot schedule and we'll return a repeatable spec, programme and pricing model tailored to your builds."
        primaryButtonText="Get Your Builder Package"
        primaryButtonHref="/contact"
        secondaryButtonText="Book Consultation"
        secondaryButtonHref="https://calendly.com/inquiries-xtechsrenewables/30min"
        backgroundColor="bg-orange-600"
        textColor="text-orange-100"
        buttonColor="text-orange-600"
        phoneNumber="1300 983 247"
        onCalendlyClick={() => trackCalendlyBooking('builders-cta', 'builders-consultation')}
      />
    </motion.div>
  );
}
