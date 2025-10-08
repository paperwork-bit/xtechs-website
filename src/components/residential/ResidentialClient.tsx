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
import { ServicesSection } from "./ServicesSection";
import { ProcessSteps } from "@/components/ui/process-steps";
import { trackCalendlyBooking } from "@/lib/analytics";



const benefits = [
  {
    icon: Shield,
    title: "CEC-Accredited Installers",
    description: "All our installers are Clean Energy Council accredited and fully licensed."
  },
  {
    icon: Award,
    title: "Premium Products",
    description: "We only use tier-1 solar panels and proven battery technologies."
  },
  {
    icon: Clock,
    title: "Fast Installation",
    description: "Most residential installations completed within 1-2 days."
  },
  {
    icon: Users,
    title: "Local Support",
    description: "Victorian-based team providing ongoing support and maintenance."
  }
];

export function ResidentialClient() {
  const isMounted = useIsMounted();
  const shouldAnimate = isMounted && !disableAnim();

  // Prevent hydration mismatch by not rendering until mounted
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-white">
        {/* Static fallback content */}
        <section className="relative py-8 lg:py-12 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-gray-50" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-3">
                <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">
                  Residential
                </Badge>
              </div>
              <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                Smart, quiet power for your home
              </h1>
              <p className="text-base text-gray-600 mb-6 max-w-xl mx-auto leading-relaxed">
                Complete residential energy solutions from solar panels and battery storage to EV charging, electrical work, and home automation. Enjoy lower bills, backup power, and a sustainable future.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild className="bg-blue-600 hover:bg-blue-700">
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
                    onClick={() => trackCalendlyBooking('residential-hero', 'residential-consultation')}
                  >
                    Book Consultation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <ServicesSection />
        <ProcessSteps />
      </div>
    );
  }

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
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-gray-50" />
        
        <div className="container mx-auto px-4 relative">
          <motion.div
            variants={shouldAnimate ? containerVariants : undefined}
            initial={shouldAnimate ? "hidden" : false}
            animate={shouldAnimate ? "visible" : undefined}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div variants={shouldAnimate ? itemVariants : undefined} className="mb-3">
              <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">
                Residential
              </Badge>
            </motion.div>

            <motion.h1
              variants={shouldAnimate ? itemVariants : undefined}
              className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight"
              style={{ textWrap: "balance" }}
            >
              <AnimatedUnderline
                trigger="hover"
                from="center"
                thickness="0.2em"
                offset="0.14em"
                colorClass="text-gray-900"
              >
                Smart, quiet power for your home
              </AnimatedUnderline>
            </motion.h1>

            <motion.p
              variants={shouldAnimate ? itemVariants : undefined}
              className="text-base text-gray-600 mb-6 max-w-xl mx-auto leading-relaxed"
            >
              Complete residential energy solutions from solar panels and battery storage to EV charging, electrical work, and home automation. Enjoy lower bills, backup power, and a sustainable future.
            </motion.p>

            <motion.div
              variants={shouldAnimate ? itemVariants : undefined}
              className="flex flex-col sm:flex-row gap-3 justify-center"
            >
              <Button asChild className="bg-blue-600 hover:bg-blue-700">
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
                  onClick={() => trackCalendlyBooking('residential-cta', 'residential-consultation')}
                >
                  Book Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <ServicesSection />

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
                Why Choose xTechs?
              </h2>
              <p className="text-base text-gray-600 max-w-2xl mx-auto">
                We're committed to delivering the highest quality residential energy solutions with exceptional service.
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
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
                      <benefit.icon className="h-6 w-6 text-blue-600" />
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
      <div className="py-8 lg:py-12 bg-blue-600">
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
              className="text-2xl lg:text-3xl font-bold text-white mb-3"
            >
              Ready to Transform Your Home?
            </motion.h2>
            <motion.p
              variants={shouldAnimate ? itemVariants : undefined}
              className="text-base text-blue-100 mb-6 max-w-2xl mx-auto"
            >
              Get a free consultation and quote for your residential energy solution. No obligation, just expert advice.
            </motion.p>
            <motion.div
              variants={shouldAnimate ? itemVariants : undefined}
              className="flex flex-col sm:flex-row gap-3 justify-center"
            >
              <Button asChild variant="secondary">
                <Link href="/contact">
                  Book Site Assessment
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                <Link 
                  href="https://calendly.com/inquiries-xtechsrenewables/30min" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => trackCalendlyBooking('residential-bottom-cta', 'residential-consultation')}
                >
                  Book Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
