"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const comparisonVariants = {
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

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
  },
  hover: {
    y: -4,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: { duration: 0.2 }
  }
};

const comparisonData = [
  {
    title: "Residential",
    features: ["Self-consumption", "Backup", "EV-ready"],
    href: "/pv-battery/residential",
    color: "blue"
  },
  {
    title: "Business", 
    features: ["Cost reduction", "Peak-shaving", "Reports"],
    href: "/pv-battery/business",
    color: "green"
  },
  {
    title: "Off-Grid",
    features: ["Hybrid genset", "Rugged", "Remote"],
    href: "/pv-battery/off-grid", 
    color: "orange"
  },
  {
    title: "Builders",
    features: ["Pre-wire", "Staged install", "Handover"],
    href: "/pv-battery/builders",
    color: "purple"
  }
];

export function ComparisonStrip() {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const scrollToTile = (href: string) => {
    // For now, just navigate to the page
    // In a full implementation, you might scroll to the specific tile section
    window.location.href = href;
  };

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          variants={comparisonVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="max-w-6xl mx-auto"
        >
          {/* Section header */}
          <div className="text-center mb-6">
            <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3">
              Compare Your Options
            </h2>
            <p className="text-sm text-gray-600 max-w-2xl mx-auto">
              Quick overview of our four main solution paths to help you find the right fit.
            </p>
          </div>

          {/* Desktop scroll controls */}
          <div className="hidden lg:flex items-center justify-between mb-4">
            <button
              onClick={scrollLeft}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={scrollRight}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Comparison cards */}
          <div 
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {comparisonData.map((item, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover="hover"
                className="flex-shrink-0 w-72 snap-center"
              >
                <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-lg hover:shadow-xl transition-shadow duration-200 h-full">
                  {/* Card header */}
                  <div className="mb-3">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <div className={`w-12 h-1 rounded-full bg-${item.color}-600`} />
                  </div>

                  {/* Features */}
                  <div className="space-y-2 mb-4">
                    {item.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2 text-gray-600">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <button
                    onClick={() => scrollToTile(item.href)}
                    className="w-full flex items-center justify-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors group"
                  >
                    See details
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile scroll indicator */}
          <div className="lg:hidden flex justify-center mt-4">
            <div className="flex gap-2">
              {comparisonData.map((_, index) => (
                <div key={index} className="w-2 h-2 bg-gray-300 rounded-full" />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default ComparisonStrip;
