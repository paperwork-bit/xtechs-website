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
  Zap,
  Clock,
  Award,
  Shield,
  Phone,
  Car,
  Battery,
  Smartphone
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { EVChargersServicesSection } from "./EVChargersServicesSection";
import { ProcessSteps } from "@/components/ui/process-steps";
import { trackCalendlyBooking } from "@/lib/analytics";
import { CTASection } from "@/components/ui/cta-section";

const benefits = [
  {
    icon: Zap,
    title: "Fast Charging",
    description: "High-speed Level 2 and DC fast charging solutions for efficient EV charging."
  },
  {
    icon: Award,
    title: "Smart Integration",
    description: "Intelligent charging systems that integrate with solar and home energy management."
  },
  {
    icon: Clock,
    title: "Professional Installation",
    description: "Certified electricians ensure safe, compliant, and reliable installations."
  },
  {
    icon: Shield,
    title: "Future-Proof",
    description: "Modern charging standards and scalable solutions for growing EV fleets."
  }
];

export function EVChargersClient() {
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
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800"
      variants={shouldAnimate ? containerVariants : undefined}
      initial={shouldAnimate ? "hidden" : "visible"}
      animate="visible"
    >
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants}>
              <Badge className="mb-4 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                <Car className="w-4 h-4 mr-2" />
                Electric Vehicle Charging
              </Badge>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                EV Charger
                <br />
                <AnimatedUnderline className="text-green-600 dark:text-green-400">
                  Installation
                </AnimatedUnderline>
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Professional EV charger installation for homes and businesses. 
                Fast, smart, and solar-integrated charging solutions that power your 
                electric vehicle with clean energy.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white" asChild>
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
                    onClick={() => trackCalendlyBooking('ev-chargers-hero', 'ev-charger-consultation')}
                  >
                    Book Consultation
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                Site inspection fees apply. We'll provide a detailed quote after assessing your property.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="relative">
              <div className="relative z-10">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
                  <div className="flex items-center justify-center mb-6">
                    <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                      <Car className="w-10 h-10 text-green-600 dark:text-green-400" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-center mb-4">Smart EV Charging</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700 dark:text-gray-300">Level 2 AC Charging (7kW-22kW)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700 dark:text-gray-300">Solar Integration</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700 dark:text-gray-300">Smart Scheduling</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700 dark:text-gray-300">Mobile App Control</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500 rounded-full opacity-20"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-green-500 rounded-full opacity-20"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Our EV Charging Solutions?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Professional installation with smart features that make EV ownership 
              convenient and cost-effective.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center group"
              >
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/30 transition-colors">
                  <benefit.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <ProcessSteps
        title="Our EV Charger Installation Process"
        steps={[
          {
            number: "01",
            title: "Site Assessment",
            description: "We evaluate your property's electrical capacity and determine the best charger location and type for your needs."
          },
          {
            number: "02",
            title: "Design & Quote",
            description: "Custom solution design with detailed pricing, including any electrical upgrades needed."
          },
          {
            number: "03",
            title: "Professional Installation",
            description: "Certified electricians install your charger with proper permits and safety compliance."
          },
          {
            number: "04",
            title: "Testing & Training",
            description: "Comprehensive testing, mobile app setup, and training on smart charging features."
          }
        ]}
      />

      {/* Services Section */}
      <EVChargersServicesSection />

      {/* CTA Section */}
      <CTASection
        title="Ready to Charge Your EV with Clean Energy?"
        description="Get a free consultation and quote for professional EV charger installation. Start charging your electric vehicle with solar power today."
        primaryButtonText="Book Site Assessment"
        primaryButtonHref="/contact"
        secondaryButtonText="Book Consultation"
        secondaryButtonHref="https://calendly.com/inquiries-xtechsrenewables/30min"
        backgroundColor="bg-gradient-to-r from-blue-600 to-green-600"
        textColor="text-blue-100"
        buttonColor="text-blue-600"
        phoneNumber="1300 983 247"
        disclaimer="Site inspection fees apply. We'll provide a detailed quote after assessing your property."
        onCalendlyClick={() => trackCalendlyBooking('ev-chargers-cta', 'ev-charger-consultation')}
      />
    </motion.div>
  );
}
