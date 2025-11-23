"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { AnimatedUnderline } from "@/components/ui/animated-underline";
import { disableAnim } from "@/lib/flags";
import { useIsMounted } from "@/lib/use-is-mounted";

const heroVariants = {
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

const chipVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
  },
  hover: {
    y: -2,
    boxShadow: "0 8px 25px -5px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.2 }
  }
};

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();
  const isMounted = useIsMounted();
  const [activeChips, setActiveChips] = React.useState<string[]>([]);
  
  const shouldAnimate = isMounted && !disableAnim() && !prefersReducedMotion;

  const filterChips = [
    "High Savings",
    "Backup Power", 
    "Low Maintenance",
    "Fastest Install"
  ];

  const handleChipClick = (chip: string) => {
    setActiveChips(prev => 
      prev.includes(chip) 
        ? prev.filter(c => c !== chip)
        : [...prev, chip]
    );
  };

  return (
    <section className="relative py-8 lg:py-12 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-gray-50" />
        
        {/* Floating gradient blobs */}
        {shouldAnimate && (
          <>
            <motion.div
              className="absolute top-20 left-10 w-72 h-72 bg-blue-100/30 rounded-full blur-3xl"
              animate={{
                x: [0, 30, 0],
                y: [0, -20, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute bottom-20 right-10 w-96 h-96 bg-gray-100/40 rounded-full blur-3xl"
              animate={{
                x: [0, -40, 0],
                y: [0, 30, 0],
                scale: [1, 0.9, 1],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </>
        )}

        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.div
          variants={shouldAnimate ? heroVariants : undefined}
          initial={shouldAnimate ? "hidden" : false}
          whileInView={shouldAnimate ? "visible" : undefined}
          viewport={shouldAnimate ? { once: true, amount: 0.2 } : undefined}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Subheading */}
          <motion.div variants={shouldAnimate ? heroVariants : undefined} className="mb-4">
            <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">
              PV & Battery
            </Badge>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            variants={shouldAnimate ? heroVariants : undefined}
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
              Choose the best path to clean energy
            </AnimatedUnderline>
          </motion.h1>

          {/* Value proposition */}
          <motion.p
            variants={shouldAnimate ? heroVariants : undefined}
            className="text-base text-gray-600 mb-6 max-w-xl mx-auto leading-relaxed"
          >
            Professional solar and battery solutions engineered for performance, reliability, and maximum savings across Victoria.
          </motion.p>

          {/* Filter chips */}
          <motion.div
            variants={shouldAnimate ? heroVariants : undefined}
            className="flex flex-wrap justify-center gap-2"
          >
            {filterChips.map((chip) => (
              <motion.div
                key={chip}
                variants={shouldAnimate ? chipVariants : undefined}
                whileHover={shouldAnimate ? "hover" : undefined}
                whileTap={shouldAnimate ? { scale: 0.98 } : undefined}
              >
                <button
                  onClick={() => handleChipClick(chip)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeChips.includes(chip)
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  {chip}
                </button>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default HeroSection;
