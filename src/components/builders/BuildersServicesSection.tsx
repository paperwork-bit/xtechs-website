"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useIsMounted } from "@/lib/use-is-mounted";
import { disableAnim } from "@/lib/flags";
import { 
  Settings, 
  Wrench, 
  CheckCircle, 
  Calendar,
  FileText,
  Plus,
  Shield
} from "lucide-react";
// No images on this page – match Battery page style (icons + cards)

export function BuildersServicesSection() {
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
      icon: Settings,
      title: "Design & specification",
      points: [
        "Standardised packages by home typology",
        "Single‑line diagrams and switchboard allowances",
        "Clear roof, inverter and battery placements",
      ],
      hint: "Standardised packages for consistent results",
    },
    {
      icon: Wrench,
      title: "Pre‑wire & rough‑in",
      points: [
        "Conduits and cable routes at framing",
        "Neat, weather‑tight penetrations",
        "Ready for array and battery install",
      ],
      hint: "Clean penetrations and weather‑tight installation",
    },
    {
      icon: CheckCircle,
      title: "Approvals, export limits & metering",
      points: [
        "Distributor approvals and export caps",
        "Commission inverter settings to limit",
        "Metering coordination with retailer",
      ],
      hint: "Complete approvals and metering coordination",
    },
    {
      icon: Calendar,
      title: "Staging & scheduling",
      points: [
        "Sequenced around other trades",
        "Site‑ready checks before attendance",
        "Multi‑lot roll‑outs to keep programmes moving",
      ],
      hint: "Coordinated scheduling with other trades",
    },
    {
      icon: FileText,
      title: "Compliance & homeowner handover",
      points: [
        "CEC standards and test results",
        "Photo records and warranties bundled",
        "Simple homeowner pack for monitoring",
      ],
      hint: "Complete documentation and homeowner guidance",
    },
    {
      icon: Plus,
      title: "Client options & upgrades",
      points: [
        "Capacity for EV chargers and backup circuits",
        "Heat‑pump hot water ready",
        "Future‑ready infrastructure without rework",
      ],
      hint: "Future‑ready infrastructure for easy upgrades",
    },
    {
      icon: Shield,
      title: "Aftercare & warranty support",
      points: [
        "Defect‑liability period assistance",
        "Early performance monitoring help",
        "Brand warranty liaison as required",
      ],
      hint: "Comprehensive support after handover",
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
              Builder Services
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Everything you need for seamless solar integration during construction — from
              design to handover.
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
