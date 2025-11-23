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
import { OffGridServicesSection } from "./OffGridServicesSection";
import { ProcessSteps } from "@/components/ui/process-steps";
import { trackCalendlyBooking } from "@/lib/analytics";
import { CTASection } from "@/components/ui/cta-section";

const benefits = [
  {
    icon: Shield,
    title: "Rugged Components",
    description: "Hardware designed for harsh conditions and remote environments."
  },
  {
    icon: Award,
    title: "Proven Systems",
    description: "Battle-tested off-grid solutions with reliable performance."
  },
  {
    icon: Clock,
    title: "24/7 Monitoring",
    description: "Remote monitoring and alerts for system health and performance."
  },
  {
    icon: Users,
    title: "Remote Support",
    description: "Expert support and troubleshooting for remote locations."
  }
];

export function OffGridClient() {
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
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-gray-50" />
        
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <motion.div
              variants={shouldAnimate ? containerVariants : undefined}
              initial={shouldAnimate ? "hidden" : false}
              animate={shouldAnimate ? "visible" : undefined}
              className="space-y-8"
            >
              <motion.div variants={shouldAnimate ? itemVariants : undefined}>
                <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50 mb-4">
                  Off-Grid Solutions
                </Badge>
              </motion.div>

              <motion.h1
                variants={shouldAnimate ? itemVariants : undefined}
                className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight"
                style={{ textWrap: "balance" }}
              >
                <AnimatedUnderline
                  trigger="hover"
                  from="center"
                  thickness="0.2em"
                  offset="0.14em"
                  colorClass="text-gray-900"
                >
                  Reliable power—anywhere you need it
                </AnimatedUnderline>
              </motion.h1>

              <motion.p
                variants={shouldAnimate ? itemVariants : undefined}
                className="text-lg text-gray-600 leading-relaxed"
              >
                We design standalone systems that combine solar, storage and a generator so your essentials run day and night—quietly, efficiently, and with clear monitoring from day one.
              </motion.p>

              <motion.div
                variants={shouldAnimate ? itemVariants : undefined}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
                  <Link href="/contact">
                    Book Site Assessment
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link 
                    href="https://calendly.com/inquiries-xtechsrenewables/30min" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={() => trackCalendlyBooking('off-grid-hero', 'off-grid-consultation')}
                  >
                    Book Consultation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            {/* Right Column - Feature Card */}
            <motion.div
              variants={shouldAnimate ? itemVariants : undefined}
              initial={shouldAnimate ? "hidden" : false}
              animate={shouldAnimate ? "visible" : undefined}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-8">
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Complete Off-Grid Solutions
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Everything you need for reliable power in remote locations
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Solar panel arrays</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Battery storage systems</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Backup generators</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Remote monitoring</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-sm text-gray-700">24/7 support</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <div className="text-center">
                      <p className="text-xs text-gray-500 mb-2">Ready to go off-grid?</p>
                      <Button asChild size="sm" className="w-full bg-green-600 hover:bg-green-700">
                        <Link href="/contact">
                          Get Your Free Design
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <OffGridServicesSection />

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
                Why Choose xTechs for Off-Grid?
              </h2>
              <p className="text-base text-gray-600 max-w-2xl mx-auto">
                We're committed to delivering reliable off-grid energy solutions that work in the most challenging environments.
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
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3">
                      <benefit.icon className="h-6 w-6 text-green-600" />
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
        title="Ready to Plan Your Off-Grid System?"
        description="Share your address and a recent load summary and we'll return a design sized for your autonomy target and budget."
        primaryButtonText="Get Your Free Design"
        primaryButtonHref="/contact"
        secondaryButtonText="Book Consultation"
        secondaryButtonHref="https://calendly.com/inquiries-xtechsrenewables/30min"
        backgroundColor="bg-green-600"
        textColor="text-green-100"
        buttonColor="text-green-600"
        phoneNumber="1300 983 247"
        onCalendlyClick={() => trackCalendlyBooking('off-grid-cta', 'off-grid-consultation')}
      />
    </div>
  );
}
