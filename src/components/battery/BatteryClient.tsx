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
  Battery,
  Clock,
  Award,
  Shield,
  Phone,
  Home,
  Building,
  Zap,
  Smartphone
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { BatteryServicesSection } from "./BatteryServicesSection";
import { ProcessSteps } from "@/components/ui/process-steps";
import { trackCalendlyBooking } from "@/lib/analytics";
import { CTASection } from "@/components/ui/cta-section";
import { FAQSection, batteryFAQs } from "@/components/ui/faq-section";

const benefits = [
  {
    icon: Battery,
    title: "Energy Independence",
    description: "Store solar energy during the day and use it at night, reducing reliance on the grid."
  },
  {
    icon: Award,
    title: "Premium Technology",
    description: "Tesla Powerwall, Alpha ESS, and other leading battery storage systems."
  },
  {
    icon: Clock,
    title: "24/7 Backup Power",
    description: "Keep your home powered during blackouts and grid outages."
  },
  {
    icon: Shield,
    title: "Smart Management",
    description: "Intelligent energy management with mobile app control and monitoring."
  }
];

export function BatteryClient() {
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
      <section className="relative overflow-hidden bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants}>
              <Badge className="mb-4 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                <Battery className="w-4 h-4 mr-2" />
                Energy Storage Solutions
              </Badge>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Battery
                <br />
                <AnimatedUnderline className="text-blue-600 dark:text-blue-400">
                  Storage
                </AnimatedUnderline>
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Professional battery storage installation for homes and businesses. 
                Store solar energy, reduce electricity costs, and ensure backup power 
                with premium battery systems like Tesla Powerwall and Alpha ESS.
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
                    onClick={() => trackCalendlyBooking('battery-hero', 'battery-consultation')}
                  >
                    Book Consultation
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                Site inspection fees apply. xTechs Renewables will provide a detailed quote & site inspection report after assessing your property.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="relative">
              <div className="relative z-10">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
                  <div className="flex items-center justify-center mb-6">
                    <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                      <Battery className="w-10 h-10 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-center mb-4">Smart Energy Storage</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700 dark:text-gray-300">Tesla Powerwall</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700 dark:text-gray-300">Alpha ESS Systems</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700 dark:text-gray-300">Smart Energy Management</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700 dark:text-gray-300">Backup Power Protection</span>
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

      {/* Benefits Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Battery Storage?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Professional battery storage solutions that maximize your solar investment 
              and provide reliable backup power when you need it most.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center group"
              >
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 dark:group-hover:bg-green-900/30 transition-colors">
                  <benefit.icon className="w-8 h-8 text-green-600 dark:text-green-400" />
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
        title="Our Battery Installation Process"
        steps={[
          {
            number: "01",
            title: "Energy Assessment",
            description: "We analyze your energy usage patterns and solar system to determine optimal battery size and placement."
          },
          {
            number: "02",
            title: "System Design",
            description: "Custom battery storage design with proper sizing, backup circuits, and smart energy management."
          },
          {
            number: "03",
            title: "Professional Installation",
            description: "Certified installers mount your battery system with proper permits and safety compliance."
          },
          {
            number: "04",
            title: "Testing & Commissioning",
            description: "Comprehensive testing, app setup, and training on smart energy management features."
          }
        ]}
      />

      {/* Services Section */}
      <BatteryServicesSection />

      {/* FAQ Section */}
      <FAQSection 
        faqs={batteryFAQs}
        title="Battery Storage FAQs"
        description="Common questions about battery storage systems and installation"
      />

      {/* CTA Section */}
      <CTASection
        title="Ready to Store Your Solar Energy?"
        description="Get a free consultation and quote for professional battery storage installation. Maximize your solar investment and ensure backup power for your home."
        primaryButtonText="Book Site Assessment"
        primaryButtonHref="/contact"
        secondaryButtonText="Book Consultation"
        secondaryButtonHref="https://calendly.com/inquiries-xtechsrenewables/30min"
        backgroundColor="bg-gradient-to-r from-green-600 to-blue-600"
        textColor="text-green-100"
        buttonColor="text-green-600"
        disclaimer="Site inspection fees apply. xTechs Renewables will provide a detailed quote & site inspection report after assessing your property."
        onCalendlyClick={() => trackCalendlyBooking('battery-cta', 'battery-consultation')}
      />
    </motion.div>
  );
}
