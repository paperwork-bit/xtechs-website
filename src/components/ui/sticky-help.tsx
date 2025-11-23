"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { MessageCircle, X } from "lucide-react";

const helpVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8,
    y: 20
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    y: 0,
    transition: { 
      duration: 0.3, 
      ease: [0.16, 1, 0.3, 1] 
    }
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: 20,
    transition: { duration: 0.2 }
  },
  hover: {
    scale: 1.05,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: { duration: 0.2 }
  },
  tap: {
    scale: 0.95,
    transition: { duration: 0.1 }
  }
};

export function StickyHelp() {
  const [isVisible, setIsVisible] = React.useState(true);
  const [hasScrolled, setHasScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setHasScrolled(scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {hasScrolled && (
        <motion.div
          variants={helpVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed bottom-6 right-6 z-50"
        >
          <div className="relative">
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute -top-2 -right-2 w-6 h-6 bg-gray-600 text-white rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors z-10"
              aria-label="Close help button"
            >
              <X className="w-3 h-3" />
            </button>

            {/* Main help button */}
            <motion.div
              variants={helpVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Link
                href="/contact"
                className="flex items-center gap-3 bg-blue-600 text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-shadow"
                aria-label="Talk to a specialist"
              >
                <MessageCircle className="w-5 h-5" />
                <span className="font-medium text-sm whitespace-nowrap">
                  Talk to a specialist
                </span>
              </Link>
            </motion.div>

            {/* Pulse animation */}
            <motion.div
              className="absolute inset-0 bg-blue-600 rounded-full opacity-30"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default StickyHelp;
