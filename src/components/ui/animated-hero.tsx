"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MoveRight, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

/**
 * Desktop restores large sizes:
 * - Heading up to 56–64px on xl (configurable)
 * - Animated line up to 36–40px on xl
 * Mobile remains compact & readable.
 * CTA centered on desktop, full-width on mobile.
 */

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
    <section aria-labelledby="hero-heading" className="w-full relative z-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center gap-5 pt-14 pb-10 md:pt-24 md:pb-16 lg:pt-32 lg:pb-24">
          {/* Main Hero Content */}
          <div className="flex flex-col items-center text-center gap-3 md:gap-4">
            <h1
              id="hero-heading"
              className="
                mt-0
                font-regular tracking-tight
                leading-[1.15] md:leading-[1.12] lg:leading-[1.1]
                /* Mobile fluid base */
                text-[clamp(24px,5.6vw,30px)]
                /* Tablet */
                sm:text-[clamp(28px,3.8vw,40px)]
                /* Desktop large */
                lg:text-[52px]
                /* Desktop x-large (restore 'big' look) */
                xl:text-[60px] 2xl:text-[64px]
              "
            >
              <span className="block font-semibold text-logo-deep dark:text-logo-teal-light">
                Solar Was Step One.
              </span>
              <span className="block mt-1 md:mt-2 lg:mt-3 pb-[2px] font-semibold text-gradient-logo">
                This Is the Upgrade
              </span>
            </h1>

            {/* Animated line — BEFORE paragraph */}
            <div className="relative w-full text-center mt-4 sm:mt-6 md:mt-8 lg:mt-10">
              <div className="relative min-h-[2.0em] sm:min-h-[2.2em]">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={titleNumber}
                    className="
                      absolute inset-0 flex items-center justify-center
                      px-2 sm:px-3
                      /* Mobile compact */
                      text-[clamp(15px,5vw,18px)]
                      /* Tablet */
                      sm:text-[clamp(18px,2.6vw,26px)]
                      /* Desktop */
                      md:text-[clamp(22px,2.2vw,30px)]
                      /* Desktop large - restore bigger */
                      lg:text-[32px]
                      xl:text-[36px] 2xl:text-[40px]
                      font-semibold tracking-tight
                      text-logo-charcoal dark:text-gray-100
                      drop-shadow-sm
                    "
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ type: "tween", duration: 0.45, ease: "easeInOut" }}
                  >
                    {titles[titleNumber]}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>

            {/* Paragraph */}
            <p
              className="
                mt-3 sm:mt-5 md:mt-6 lg:mt-8
                mx-auto text-center font-medium
                max-w-[48rem]           
                text-[16px]             
                sm:text-[17px]
                md:text-[18px]
                lg:text-[19px]
                xl:text-[20px] 2xl:text-[21px]  
                leading-[1.6]          
                tracking-tight
                text-gray-900 dark:text-gray-100
              "
            >
              Power your home or business with clean, cheap &amp; green solar energy. At
              xTechs Renewables, we design and install smart PV and Battery systems
              across Victoria helping families, builders, and businesses nullify energy
              costs, gain energy independence, and embrace a sustainable future.
            </p>
          </div>

          {/* CTA Buttons — centered on desktop */}
          <div
            className="
              mt-6 md:mt-8
              flex flex-col sm:flex-row
              gap-3 sm:gap-4
              w-full
              max-w-xs sm:max-w-none
              mx-auto
              sm:justify-center sm:items-center
            "
          >
            <Button
              size="lg"
              className="gap-3 w-full sm:w-auto"
              variant="outline"
              onClick={() => window.open('tel:1300983247')}
            >
              Call 1300 983 247 <PhoneCall className="w-4 h-4" aria-hidden="true" />
            </Button>

            <Button size="lg" className="gap-3 w-full sm:w-auto" asChild>
              <Link href="/contact">
                Book Site Inspection <MoveRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>

          {/* Site Inspection Notice */}
          <p className="text-[12.5px] sm:text-sm lg:text-[14px] text-gray-800/90 dark:text-gray-200/90 text-center max-w-[38rem] font-medium mt-3 md:mt-4 mx-auto">
            Site inspection fees apply. xTechs Renewables will provide a detailed quote &amp;
            site inspection report after assessing your property.
          </p>
        </div>
      </div>
    </section>
  );
}

export { Hero };