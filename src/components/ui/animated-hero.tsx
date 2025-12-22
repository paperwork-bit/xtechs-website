"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MoveRight, PhoneCall, CheckCircle, Star, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["sustainable", "renewable", "affordable", "powerful", "future-ready"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 3500);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className="w-full">
      <div className="container mx-auto">
        <div className="flex gap-6 py-24 lg:py-40 items-center justify-center flex-col">
			{/* Main Hero Content */}
			<div className="flex gap-4 flex-col items-center">
            <h1 className="text-5xl md:text-7xl max-w-8xl tracking-tighter text-center font-regular">
              <span className="text-blue-500">Solar is</span>
					<span className="relative block h-[2.6em] md:h-[2.6em] leading-none text-center">
                {" "}
                <AnimatePresence mode="wait">
                  <motion.span
                    key={titleNumber}
							className="absolute inset-0 font-semibold whitespace-nowrap flex items-center justify-center text-4xl md:text-6xl translate-y-[78px]"
								initial={{ opacity: 0, x: "-100%" }}
								animate={{ opacity: 1, x: "0%" }}
								exit={{ opacity: 0, x: "100%" }}
                    transition={{ type: "tween", duration: 0.6, ease: "easeInOut" }}
                  >
                    {titles[titleNumber].toUpperCase()}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>

				<p className="mt-16 md:mt-24 lg:mt-32 text-lg md:text-xl leading-relaxed tracking-tight text-gray-900 dark:text-gray-100 max-w-2xl text-center font-medium drop-shadow-lg">
              Power your home or business with clean, reliable solar energy. At xTechs Renewables, we design and install smart PV and battery systems across Victoria helping families, builders, and businesses cut costs, gain independence, and embrace a sustainable future.
            </p>
          </div>

          {/* CTA Buttons */}
			<div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="gap-4" variant="outline" onClick={() => window.open('tel:1300983247')}>
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
            Site inspection fees apply. We'll provide a detailed quote after assessing your property.
          </p>
        </div>
      </div>
    </div>
  );
}

export { Hero };
