"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useIsMounted } from "@/lib/use-is-mounted";
import { disableAnim } from "@/lib/flags";
import { 
  Zap,
  Home,
  Building,
  Shield,
  Smartphone,
  Wrench,
  Lightbulb,
  CheckCircle,
  Phone
} from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: Home,
    title: "Residential Electrical",
    description: "Complete electrical services for homes, from basic repairs to full rewiring and upgrades.",
    features: [
      "Power point and switch installation",
      "Lighting design and installation",
      "Circuit breaker and fuse box upgrades",
      "Electrical fault finding and repairs",
      "Safety switch installation and testing",
      "Ceiling fan installation"
    ],
    badge: "Most Popular",
    badgeColor: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
  },
  {
    icon: Building,
    title: "Commercial Electrical",
    description: "Professional electrical services for businesses, offices, and commercial properties.",
    features: [
      "Office fit-outs and renovations",
      "Commercial lighting solutions",
      "Data and communications cabling",
      "Emergency lighting systems",
      "Power distribution upgrades",
      "Electrical compliance testing"
    ],
    badge: "Business",
    badgeColor: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
  },
  {
    icon: Smartphone,
    title: "Home Automation",
    description: "Smart home systems and automation for modern, connected living.",
    features: [
      "Smart lighting control systems",
      "Automated blinds and curtains",
      "Smart security and surveillance",
      "Climate control automation",
      "Voice control integration",
      "Energy monitoring systems"
    ],
    badge: "Smart Home",
    badgeColor: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
  }
];

const serviceCategories = [
  {
    icon: Lightbulb,
    title: "Lighting Solutions",
    description: "Modern lighting design and installation",
    services: ["LED Lighting", "Smart Lighting", "Outdoor Lighting", "Commercial Lighting"],
    emergency: false
  },
  {
    icon: Shield,
    title: "Safety & Compliance",
    description: "Electrical safety inspections and compliance",
    services: ["Safety Inspections", "RCD Testing", "Compliance Certificates", "Hazard Assessments"],
    emergency: false
  },
  {
    icon: Wrench,
    title: "Repairs & Maintenance",
    description: "Electrical repairs and ongoing maintenance",
    services: ["Fault Finding", "Repairs", "Maintenance Programs", "Upgrades"],
    emergency: true
  },
  {
    icon: Zap,
    title: "Installation & Upgrades",
    description: "New installations and system upgrades",
    services: ["New Installations", "System Upgrades", "Rewiring", "Panel Upgrades"],
    emergency: false
  }
];

export function ElectricalServicesSection() {
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
              Electrical Services
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Comprehensive electrical services for residential and commercial properties. 
              From basic electrical work to advanced smart home automation systems.
            </p>
          </motion.div>

          {/* Main Services Grid */}
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

          {/* Service Categories */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl lg:text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
              Service Categories
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {serviceCategories.map((category, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-colors relative"
                >
                  {category.emergency && (
                    <div className="absolute -top-2 -right-2">
                      <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 text-xs">
                        24/7
                      </Badge>
                    </div>
                  )}
                  
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mb-4">
                    <category.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {category.title}
                  </h4>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                    {category.description}
                  </p>

                  <ul className="space-y-2">
                    {category.services.map((service, serviceIndex) => (
                      <li key={serviceIndex} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        {service}
                      </li>
                    ))}
                  </ul>

                  {category.emergency && (
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm font-medium">
                        <Phone className="w-4 h-4" />
                        Emergency Service
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Smart Home Integration CTA */}
          <motion.div
            variants={itemVariants}
            className="mt-16 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl p-8 text-center"
          >
            <div className="max-w-3xl mx-auto">
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Transform Your Home with Smart Technology
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Upgrade your home with smart lighting, automated systems, and energy monitoring. 
                Control everything from your smartphone and reduce your energy consumption.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white" asChild>
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
                  <Link href="/contact">
                    Schedule Consultation
                  </Link>
                </Button>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                Site inspection fees apply. xTechs Renewables will provide a detailed quote & site inspection report after assessing your property.
              </p>
            </div>
          </motion.div>

          {/* Emergency Services Highlight */}
          <motion.div
            variants={itemVariants}
            className="mt-12 bg-red-50 dark:bg-red-900/20 rounded-2xl p-8 border border-red-200 dark:border-red-800"
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Phone className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Emergency Electrical Services
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Electrical emergencies require immediate attention. Our 24/7 emergency service 
                  ensures your safety and quick resolution of urgent electrical issues.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">
                  1300 983 247
                </div>
                <Button className="bg-red-600 hover:bg-red-700 text-white">
                  <Phone className="mr-2 w-4 h-4" />
                  Call Now
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
