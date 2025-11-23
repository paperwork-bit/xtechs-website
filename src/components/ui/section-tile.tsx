"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { disableAnim } from "@/lib/flags";
import { useIsMounted } from "@/lib/use-is-mounted";

export interface SectionTileProps {
  orientation: "image-left" | "image-right";
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
  chips: string[];
  brands?: string[];
  ctaHref: string;
  ctaLabel: string;
  imageSrc: string;
  imageAlt: string;
  priority?: boolean;
  imagePosition?: string;
}

const tileVariants = {
  hidden: { opacity: 0, y: 24 },
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

const imageVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  },
  hover: { 
    scale: 1.03,
    transition: { 
      duration: 0.3, 
      ease: [0.16, 1, 0.3, 1] 
    }
  },
  kenBurns: {
    scale: [1, 1.01, 1],
    transition: {
      duration: 12,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

const buttonVariants = {
  hover: { 
    y: -2,
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: { 
      duration: 0.2, 
      ease: [0.16, 1, 0.3, 1] 
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
    y: -1,
    boxShadow: "0 4px 12px -2px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.2 }
  }
};

export function SectionTile({
  orientation,
  eyebrow,
  title,
  description,
  bullets,
  chips,
  brands = [],
  ctaHref,
  ctaLabel,
  imageSrc,
  imageAlt,
  priority = false,
  imagePosition = "object-center",
}: SectionTileProps) {
  const isImageLeft = orientation === "image-left";
  const prefersReducedMotion = useReducedMotion();
  const isMounted = useIsMounted();
  
  const shouldAnimate = isMounted && !disableAnim() && !prefersReducedMotion;

  return (
    <motion.div
      variants={shouldAnimate ? tileVariants : undefined}
      initial={shouldAnimate ? "hidden" : false}
      whileInView={shouldAnimate ? "visible" : undefined}
      viewport={shouldAnimate ? { once: true, margin: "-100px" } : undefined}
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[350px] lg:min-h-[450px]"
    >
      {/* Image Section */}
      <div className={`lg:col-span-5 ${isImageLeft ? 'lg:order-1' : 'lg:order-2'}`}>
        <motion.div
          variants={shouldAnimate ? imageVariants : undefined}
          initial={shouldAnimate ? "hidden" : false}
          whileInView={shouldAnimate ? "visible" : undefined}
          whileHover={shouldAnimate ? "hover" : undefined}
          animate={shouldAnimate ? "kenBurns" : undefined}
          className="relative aspect-[4/3] lg:aspect-[3/2] rounded-2xl overflow-hidden shadow-xl group"
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className={`object-cover ${imagePosition}`}
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
          />
          {/* Subtle gradient overlay for better text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          {/* Hover glare effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
        </motion.div>
      </div>

      {/* Content Section */}
      <div className={`lg:col-span-7 ${isImageLeft ? 'lg:order-2' : 'lg:order-1'} px-4 lg:px-8`}>
        <div className="max-w-xl">
          {/* Eyebrow */}
          <motion.div
            variants={shouldAnimate ? tileVariants : undefined}
            className="text-sm font-medium text-blue-600 mb-3"
          >
            {eyebrow}
          </motion.div>

          {/* Title */}
          <motion.h2
            variants={shouldAnimate ? tileVariants : undefined}
            className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight"
            style={{ textWrap: "balance" }}
          >
            {title}
          </motion.h2>

          {/* Description */}
          <motion.p
            variants={shouldAnimate ? tileVariants : undefined}
            className="text-base text-gray-600 mb-6 leading-relaxed"
          >
            {description}
          </motion.p>

          {/* Bullets */}
          <motion.ul
            variants={shouldAnimate ? tileVariants : undefined}
            className="space-y-3 mb-6"
          >
            {bullets.map((bullet, index) => (
              <motion.li
                key={index}
                variants={shouldAnimate ? tileVariants : undefined}
                className="flex items-start gap-3 text-gray-600"
              >
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                <span>{bullet}</span>
              </motion.li>
            ))}
          </motion.ul>

          {/* At-a-glance chips */}
          <motion.div
            variants={shouldAnimate ? tileVariants : undefined}
            className="flex flex-wrap gap-2 mb-4"
          >
            {chips.map((chip, index) => (
              <motion.div
                key={index}
                variants={shouldAnimate ? chipVariants : undefined}
                whileHover={shouldAnimate ? "hover" : undefined}
              >
                <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
                  {chip}
                </Badge>
              </motion.div>
            ))}
          </motion.div>

          {/* Popular pairings */}
          {brands.length > 0 && (
            <motion.div
              variants={shouldAnimate ? tileVariants : undefined}
              className="mb-6"
            >
              <p className="text-sm text-gray-500 mb-2">Popular pairings:</p>
              <div className="flex flex-wrap gap-2">
                {brands.map((brand, index) => (
                  <motion.div
                    key={index}
                    variants={shouldAnimate ? chipVariants : undefined}
                    whileHover={shouldAnimate ? "hover" : undefined}
                  >
                    <Badge variant="outline" className="text-xs border-blue-200 text-blue-700 hover:bg-blue-50">
                      {brand}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* CTA Section */}
          <motion.div
            variants={shouldAnimate ? tileVariants : undefined}
            className="flex flex-col sm:flex-row gap-4 items-start sm:items-center"
          >
            <motion.div variants={shouldAnimate ? buttonVariants : undefined} whileHover={shouldAnimate ? "hover" : undefined}>
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                <Link href={ctaHref} className="flex items-center gap-2">
                  {ctaLabel}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </motion.div>
            
            <Link
              href={ctaHref}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1 transition-colors"
            >
              Learn more
              <ArrowRight className="w-3 h-3" />
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default SectionTile;
