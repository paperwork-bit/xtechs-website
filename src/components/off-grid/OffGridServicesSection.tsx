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

  // Card data (no images)
  const cards = [
    {
      icon: MapPin,
      title: "Site & load assessment",
      points: [
        "Model actual consumption and local solar yield",
        "Size array and storage for practical autonomy",
        "Account for daily spikes and seasonal swings",
      ],
      hint: "Comprehensive analysis for optimal system sizing",
    },
    {
      icon: Settings,
      title: "System architecture & design",
      points: [
        "Specify proven DC- or AC-coupled hybrids",
        "Right inverter power and MPPT capacity",
        "Proper protections for smooth operation",
      ],
      hint: "Proven hybrid system architecture",
    },
    {
      icon: Zap,
      title: "Generator integration & fuel strategy",
      points: [
        "Correctly sized generator integration",
        "Smart start windows and charge thresholds",
        "Minimise fuel use while protecting battery health",
      ],
      hint: "Smart generator integration for fuel efficiency",
    },
    {
      icon: Monitor,
      title: "Controls, monitoring & alerts",
      points: [
        "Live visibility of production and usage",
        "State of charge monitoring and alerts",
        "Remote support when you need help",
      ],
      hint: "Live monitoring with remote support",
    },
    {
      icon: Wrench,
      title: "Installation, commissioning & handover",
      points: [
        "Hardware installed to spec with firmware updates",
        "Settings commissioned to your design",
        "Complete handover pack with diagrams and guidance",
      ],
      hint: "Complete installation with comprehensive handover",
    },
    {
      icon: Battery,
      title: "Storage choices that fit",
      points: [
        "Batteries sized to cycle efficiently",
        "Realistic depth-of-discharge considerations",
        "Climate-appropriate enclosures and thermal management",
      ],
      hint: "Climate-appropriate battery solutions",
    },
    {
      icon: Plus,
      title: "Expansion & future-proofing",
      points: [
        "Room to grow with extra PV strings",
        "Additional battery cabinets or higher inverter capacity",
        "Scalable design for new appliances or site changes",
      ],
      hint: "Scalable design for future growth",
    },
    {
      icon: Users,
      title: "Operations & support",
      points: [
        "Scheduled check-ins and performance reviews",
        "Tuning for seasons or load changes",
        "Ongoing support for reliable operation",
      ],
      hint: "Ongoing support for reliable operation",
    },
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={shouldAnimate ? containerVariants : undefined}
          initial={shouldAnimate ? "hidden" : false}
          whileInView={shouldAnimate ? "visible" : undefined}
          viewport={shouldAnimate ? { once: true, margin: "-100px" } : undefined}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Off-Grid Services
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Everything you need for reliable off-grid power—from design to ongoing support in remote locations.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cards.map((c, i) => (
              <motion.div
                key={c.title}
                variants={itemVariants}
                className="rounded-2xl border bg-white dark:bg-gray-900 p-8 shadow-sm"
              >
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mb-4">
                  <c.icon className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {c.title}
                </h3>
                <ul className="space-y-2 mb-3">
                  {c.points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-gray-500 dark:text-gray-400 italic">{c.hint}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
