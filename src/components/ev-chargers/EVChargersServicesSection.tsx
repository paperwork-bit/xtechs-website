"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useIsMounted } from "@/lib/use-is-mounted";
import { disableAnim } from "@/lib/flags";
import { 
  Zap,
  Car,
  Battery,
  Smartphone,
  Home,
  Building,
  Shield,
  CheckCircle
} from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: Home,
    title: "Residential EV Charging",
    description: "Home EV charger installation with smart features and solar integration.",
    features: [
      "Level 2 AC Chargers (7kW-22kW)",
      "Smart scheduling and mobile app control",
      "Solar power integration",
      "Load balancing and energy monitoring",
      "Weatherproof outdoor installation"
    ],
    badge: "Most Popular",
    badgeColor: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
  },
  {
    icon: Building,
    title: "Commercial EV Charging",
    description: "Business and fleet charging solutions with management and billing systems.",
    features: [
      "DC Fast Chargers (50kW-150kW)",
      "Multiple charging standards (CCS, CHAdeMO)",
      "Payment and access control systems",
      "Fleet management integration",
      "24/7 monitoring and support"
    ],
    badge: "Business",
    badgeColor: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
  },
  {
    icon: Zap,
    title: "Smart Charging Solutions",
    description: "Advanced charging systems with energy management and grid integration.",
    features: [
      "Bidirectional charging (V2G/V2H)",
      "Dynamic load management",
      "Time-of-use optimization",
      "Grid services integration",
      "Advanced analytics and reporting"
    ],
    badge: "Advanced",
    badgeColor: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
  }
];

const chargerTypes = [
  {
    icon: Car,
    title: "Level 2 AC Chargers",
    description: "Fast home and workplace charging",
    specs: ["7kW - 22kW power", "3-8 hours charge time", "Smart features", "Solar integration"],
    price: "From $2,500"
  },
  {
    icon: Battery,
    title: "DC Fast Chargers",
    description: "High-speed commercial charging",
    specs: ["50kW - 150kW power", "30-60 minutes charge time", "Multiple standards", "Payment systems"],
    price: "From $25,000"
  },
  {
    icon: Smartphone,
    title: "Smart Features",
    description: "Intelligent charging management",
    specs: ["Mobile app control", "Scheduling & optimization", "Energy monitoring", "Remote diagnostics"],
    price: "Included"
  }
];

export function EVChargersServicesSection() {
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
              EV Charging Solutions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              From home charging to commercial fleet solutions, we provide comprehensive 
              EV charging infrastructure tailored to your needs.
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
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-900/30 transition-colors">
                    <service.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
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

                <Button className="w-full" variant="outline">
                  Learn More
                </Button>
              </motion.div>
            ))}
          </div>

          {/* Charger Types */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl lg:text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
              Charger Types & Features
            </h3>
            
            <div className="grid md:grid-cols-3 gap-8">
              {chargerTypes.map((type, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
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
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        {spec}
                      </li>
                    ))}
                  </ul>

                  <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    {type.price}
                  </div>
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
                Charge Your EV with Solar Power
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Combine solar panels with EV charging for truly sustainable transportation. 
                Charge during the day with free solar energy and reduce your electricity costs.
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
                Site inspection fees apply. xTechs Renewables will provide a detailed quote & site inspection report after assessing your property.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
