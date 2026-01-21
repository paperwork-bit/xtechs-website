"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MoveRight, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => [
      "Solar Alone Isn’t Enough.",
      "Storage Changes Everything.",
      "This Is What’s Next.",
    ],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTitleNumber((n) => (n === titles.length - 1 ? 0 : n + 1));
    }, 2800);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles.length]);

  return (
    <div className="w-full">
      <div className="container mx-auto">
        <div className="flex gap-6 py-24 lg:py-40 items-center justify-center flex-col">
          {/* Main Hero Content */}
          <div className="flex gap-4 flex-col items-center">
            <h1 className="text-5xl md:text-7xl max-w-8xl tracking-tighter text-center font-regular">
              <span className="block font-semibold text-logo-deep dark:text-logo-teal-light">
                Solar Was Step One.
              </span>
              <span className="block font-semibold text-gradient-logo">
                This Is the Upgrade
              </span>
            </h1>

            {/* Rotating line */}
            <div className="relative mt-3 w-full max-w-3xl text-center">
              <div className="relative min-h-[2.6em] md:min-h-[2.4em]">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={titleNumber}
                    className="absolute inset-0 flex items-center justify-center px-4 text-xl md:text-2xl font-semibold tracking-tight text-logo-charcoal dark:text-gray-100"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ type: "tween", duration: 0.45, ease: "easeInOut" }}
                  >
                    {titles[titleNumber]}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>

            <p className="mt-16 md:mt-24 lg:mt-32 text-lg md:text-xl leading-relaxed tracking-tight text-gray-900 dark:text-gray-100 max-w-2xl text-center font-medium drop-shadow-lg">
              Power your home or business with clean, cheap & green solar energy. At
              xTechs Renewables, we design and install smart PV and Battery systems
              across Victoria helping families, builders, and businesses nullify energy
              costs, gain energy independence, and embrace a sustainable future.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="gap-4"
              variant="outline"
              onClick={() => window.open("tel:1300983247")}
            >
              Call 1300 983 247 <PhoneCall className="w-4 h-4" />
            </Button>
            <Button size="lg" className="gap-4" asChild>
              <Link href="/contact">
                Book Site Inspection <MoveRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          {/* Site Inspection Notice */}
          <p className="text-sm text-gray-800 dark:text-gray-200 text-center max-w-md font-medium drop-shadow-md">
            Site inspection fees apply. xTechs Renewables will provide a detailed quote
            & site inspection report after assessing your property.
          </p>
        </div>
      </div>
    </div>
  );
}

export { Hero };
