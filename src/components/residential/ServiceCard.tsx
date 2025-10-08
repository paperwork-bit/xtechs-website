"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useIsMounted } from "@/lib/use-is-mounted";
import { disableAnim } from "@/lib/flags";
import Image from "next/image";

interface ServiceCardProps {
  title: string;
  description: string;       // paragraph-only
  footnote?: string;         // optional one-liner
  icon?: React.ElementType;  // lucide icon, optional
  imageSrc?: string;         // optional decorative image
  imageAlt?: string;
}

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

export function ServiceCard({
  title,
  description,
  footnote,
  icon: Icon,
  imageSrc,
  imageAlt
}: ServiceCardProps) {
  const isMounted = useIsMounted();
  const shouldAnimate = isMounted && !disableAnim();

  return (
    <motion.div
      variants={shouldAnimate ? cardVariants : undefined}
      initial={shouldAnimate ? "hidden" : false}
      whileInView={shouldAnimate ? "visible" : undefined}
      viewport={shouldAnimate ? { once: true, margin: "-50px" } : undefined}
      className="rounded-2xl border border-border/40 bg-background/70 shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <div className="p-6 sm:p-8">
        {/* Image Section */}
        {imageSrc && (
          <div className="relative mb-6 rounded-xl overflow-hidden aspect-[16/10]">
            <Image
              src={imageSrc}
              alt={imageAlt || title}
              fill
              className="object-cover transition-transform duration-300 hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        )}

        {/* Title Row */}
        <div className="flex items-center gap-3 mb-4">
          {Icon && !imageSrc && (
            <Icon className="h-5 w-5 text-blue-600 flex-shrink-0" />
          )}
          <h3 
            className="text-xl font-semibold text-gray-900"
            style={{ textWrap: "balance" }}
          >
            {title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-muted-foreground leading-relaxed mb-4">
          {description}
        </p>

        {/* Footnote */}
        {footnote && (
          <p className="text-sm text-muted-foreground/80 italic">
            {footnote}
          </p>
        )}
      </div>
    </motion.div>
  );
}
