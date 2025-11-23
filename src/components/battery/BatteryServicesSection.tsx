"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useIsMounted } from "@/lib/use-is-mounted";
import { disableAnim } from "@/lib/flags";
import { 
  Battery,
  Home,
  Building,
  Shield,
  Smartphone,
  Zap,
  CheckCircle,
  Phone
} from "lucide-react";
import Link from "next/link";
import { trackCalendlyBooking } from "@/lib/analytics";

const services = [
  {
    icon: Home,
    title: "Residential Battery Storage",
    description: "Home battery systems that store solar energy and provide backup power during outages.",
    features: [
      "Tesla Powerwall 2 & 3",
      "Alpha ESS battery systems",
      "Smart energy management",
      "Backup power circuits",
      "Mobile app monitoring",
      "Warranty & support"
    ],
    badge: "Most Popular",
    badgeColor: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
  },
  {
    icon: Building,
    title: "Commercial Battery Storage",
    description: "Large-scale battery storage solutions for businesses and commercial properties.",
    features: [
      "Commercial-grade batteries",
      "Peak demand management",
      "Energy arbitrage systems",
      "Grid services integration",
      "Remote monitoring",
      "Maintenance programs"
    ],
    badge: "Business",
    badgeColor: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
  },
  {
    icon: Zap,
    title: "Solar + Battery Packages",
    description: "Complete solar and battery storage systems for maximum energy independence.",
    features: [
      "Integrated system design",
      "Optimized energy storage",
      "Smart load management",
      "Backup power circuits",
      "Single warranty coverage",
      "Comprehensive monitoring"
    ],
    badge: "Complete Solution",
    badgeColor: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
  }
];

const batteryTypes = [
  {
    icon: Battery,
    title: "Tesla Powerwall",
    description: "Premium residential battery storage",
    specs: ["13.5kWh capacity", "5kW continuous power", "10-year warranty", "Smart app control"],
    price: "From $15,000"
  },
  {
    icon: Shield,
    title: "Alpha ESS",
    description: "Reliable commercial-grade systems",
    specs: ["5-20kWh capacity", "High efficiency", "Modular design", "Advanced monitoring"],
    price: "From $8,000"
  },
  {
    icon: Smartphone,
    title: "Smart Management",
    description: "Intelligent energy control",
    specs: ["Mobile app control", "Load management", "Grid services", "Real-time monitoring"],
    price: "Included"
  }
];

export function BatteryServicesSection() {
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
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={shouldAnimate ? containerVariants : undefined}
          initial={shouldAnimate ? "hidden" : "visible"}
          animate="visible"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Battery Storage Solutions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Professional battery storage systems for homes and businesses. From Tesla Powerwall 
              to commercial-grade solutions, we provide the right battery system for your needs.
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid lg:grid-cols-3 gap-8 mb-20">
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 relative group hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center group-hover:bg-green-200 dark:group-hover:bg-green-900/30 transition-colors">
                    <service.icon className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                  <Badge className={service.badgeColor}>
                    {service.badge}
                  </Badge>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {service.description}
                </p>

                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Removed Learn More button as requested */}
              </motion.div>
            ))}
          </div>

          {/* Battery Types */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl lg:text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
              Battery Types & Features
            </h3>
            
            <div className="grid md:grid-cols-3 gap-8">
              {batteryTypes.map((type, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600 transition-colors"
                >
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mb-4">
                    <type.icon className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {type.title}
                  </h4>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {type.description}
                  </p>

                  <ul className="space-y-2 mb-4">
                    {type.specs.map((spec, specIndex) => (
                      <li key={specIndex} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        {spec}
                      </li>
                    ))}
                  </ul>

                  {/* Price removed as requested */}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Solar Integration CTA */}
          <motion.div
            variants={itemVariants}
            className="mt-16 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl p-8 text-center"
          >
            <div className="max-w-3xl mx-auto">
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Maximize Your Solar Investment
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Combine solar panels with battery storage for complete energy independence. 
                Store excess solar energy during the day and use it at night or during outages.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white" asChild>
                  <Link href="/contact">
                    Book Site Assessment
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link 
                    href="https://calendly.com/inquiries-xtechsrenewables/30min" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Book Consultation
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/pv-battery">
                    View Solar Solutions
                  </Link>
                </Button>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                Site inspection fees apply. We'll provide a detailed quote after assessing your property.
              </p>
            </div>
          </motion.div>

          {/* Backup Power Highlight */}
          <motion.div
            variants={itemVariants}
            className="mt-12 bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800"
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  24/7 Backup Power Protection
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Battery storage systems provide automatic backup power during blackouts and grid outages. 
                  Keep your essential appliances running and your home comfortable when the power goes out.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  Instant
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Automatic switching
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
