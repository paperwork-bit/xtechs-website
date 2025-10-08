"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ShieldCheck, Users, Wrench, MapPin } from "lucide-react";

const trustVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
  },
  hover: {
    y: -2,
    transition: { duration: 0.2 }
  }
};

const trustItems = [
  {
    icon: ShieldCheck,
    label: "CEC-Accredited Installers",
    tooltip: "All our installers are Clean Energy Council accredited, ensuring the highest standards of safety and quality."
  },
  {
    icon: Users,
    label: "Designer-led System Sizing",
    tooltip: "Our experienced designers create custom solutions optimized for your specific energy needs and site conditions."
  },
  {
    icon: Wrench,
    label: "After-Sales Support",
    tooltip: "Comprehensive support including monitoring, maintenance, and warranty service to keep your system running optimally."
  },
  {
    icon: MapPin,
    label: "Local Warranty Help",
    tooltip: "Local Victorian team providing fast response times and personalized service for all warranty and support needs."
  }
];

export function TrustRow() {
  return (
    <section className="py-6 bg-gray-50/50">
      <div className="container mx-auto px-4">
        <motion.div
          variants={trustVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {trustItems.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover="hover"
                className="flex justify-center"
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-2 p-3 rounded-lg bg-white border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all duration-200 cursor-help">
                        <item.icon className="w-4 h-4 text-blue-600 flex-shrink-0" />
                        <span className="text-xs font-medium text-gray-700 text-center">
                          {item.label}
                        </span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-xs">
                      <p className="text-sm">{item.tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default TrustRow;
