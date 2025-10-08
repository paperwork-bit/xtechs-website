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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-8 lg:py-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-gray-50" />
        
        <div className="container mx-auto px-4 relative">
          <motion.div
            variants={shouldAnimate ? containerVariants : undefined}
            initial={shouldAnimate ? "hidden" : false}
            animate={shouldAnimate ? "visible" : undefined}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div variants={shouldAnimate ? itemVariants : undefined} className="mb-3">
              <Badge variant="outline" className="text-orange-600 border-orange-200 bg-orange-50">
                For Builders
              </Badge>
            </motion.div>

            <motion.h1
              variants={shouldAnimate ? itemVariants : undefined}
              className="text-2xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight"
              style={{ textWrap: "nowrap" }}
            >
              <AnimatedUnderline
                trigger="hover"
                from="center"
                thickness="0.2em"
                offset="0.14em"
                colorClass="text-gray-900"
              >
                Seamless integration during construction
              </AnimatedUnderline>
            </motion.h1>

            <motion.p
              variants={shouldAnimate ? itemVariants : undefined}
              className="text-base text-gray-600 mb-6 max-w-xl mx-auto leading-relaxed"
            >
              We coordinate pre-wire, rough-in and final fit-off to match your build stages so handover is clean, compliant and client-ready.
            </motion.p>

            <motion.div
              variants={shouldAnimate ? itemVariants : undefined}
              className="flex flex-col sm:flex-row gap-3 justify-center"
            >
              <Button asChild className="bg-orange-600 hover:bg-orange-700">
                <Link href="/contact">
                  Book Site Assessment
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link 
                  href="https://calendly.com/inquiries-xtechsrenewables/30min" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => trackCalendlyBooking('builders-hero', 'builder-consultation')}
                >
                  Book Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="tel:+61400000000">
                  <Phone className="mr-2 h-4 w-4" />
                  Call Now
                </Link>
              </Button>
            </motion.div>
          </motion.div>
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
      <div className="py-8 lg:py-12 bg-orange-600">
        <div className="container mx-auto px-4">
          <motion.div
            variants={shouldAnimate ? containerVariants : undefined}
            initial={shouldAnimate ? "hidden" : false}
            whileInView={shouldAnimate ? "visible" : undefined}
            viewport={shouldAnimate ? { once: true, margin: "-100px" } : undefined}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h2
              variants={shouldAnimate ? itemVariants : undefined}
              className="text-2xl lg:text-3xl font-bold text-white mb-4"
            >
              Ready to Integrate Solar into Your Builds?
            </motion.h2>
            <motion.p
              variants={shouldAnimate ? itemVariants : undefined}
              className="text-orange-100 mb-6 max-w-2xl mx-auto"
            >
              Send plans and a lot schedule and we'll return a repeatable spec, programme and pricing model tailored to your builds.
            </motion.p>
            <motion.div
              variants={shouldAnimate ? itemVariants : undefined}
              className="flex flex-col sm:flex-row gap-3 justify-center"
            >
              <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
                <Link href="/contact">
                  Get Your Builder Package
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600">
                <Link href="tel:+61400000000">
                  <Phone className="mr-2 h-4 w-4" />
                  Call Our Experts
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
