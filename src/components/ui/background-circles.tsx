"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import clsx from "clsx";

type BackgroundCirclesProps = {
  className?: string;
  variant?: "sun" | "brand";
  fadeOnScroll?: boolean;
};

const VARIANTS: Record<Required<BackgroundCirclesProps>["variant"], {
  ringA: string;
  ringB: string;
  ringC: string;
  glowFrom: string;
}> = {
  sun: {
    ringA: "border-amber-500/60",
    ringB: "border-orange-400/50",
    ringC: "border-slate-600/30",
    glowFrom: "from-amber-500/30",
  },
  brand: {
    ringA: "border-brand/60",
    ringB: "border-brand/40",
    ringC: "border-slate-600/30",
    glowFrom: "from-brand/30",
  },
};

export function BackgroundCircles({ className, variant = "sun", fadeOnScroll = true }: BackgroundCirclesProps) {
  const v = VARIANTS[variant];
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const opacity = prefersReduced || !fadeOnScroll
    ? 1
    : useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const scale = prefersReduced || !fadeOnScroll
    ? 1
    : useTransform(scrollYProgress, [0, 0.25], [1, 0.98]);

  if (!mounted) {
    return null;
  }

  return (
    <motion.div
      aria-hidden="true"
      className={clsx(
        "pointer-events-none fixed inset-0 -z-10 overflow-hidden select-none",
        className,
      )}
      style={{ opacity: prefersReduced ? 1 : opacity as any, scale: prefersReduced ? 1 : scale as any }}
    >
      {/* Subtle animated grid mask */}
      <motion.div
        className="absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,black,transparent)]"
        animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(100,116,139,0.12) 0px, rgba(100,116,139,0.12) 1px, transparent 1px, transparent 16px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Radial glow background */}
      <div className={clsx("absolute inset-0 bg-gradient-radial to-transparent", v.glowFrom)} />

      {/* Concentric animated rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className={clsx("rounded-full border", v.ringA)}
          style={{ width: 480, height: 480 }}
          animate={{ rotate: 360, scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className={clsx("absolute rounded-full border", v.ringB)}
          style={{ width: 720, height: 720 }}
          animate={{ rotate: -360, scale: [1, 1.07, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className={clsx("absolute rounded-full border", v.ringC)}
          style={{ width: 1040, height: 1040 }}
          animate={{ rotate: 360, scale: [1, 1.09, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Company Logo in center */}
        <motion.div
          className="absolute flex items-center justify-center"
          animate={{ 
            scale: [1, 1.05, 1], 
            opacity: [0.5, 0.5, 0.5]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <img 
            src="/xlogo.png" 
            alt="xTechs Logo" 
            className="w-64 h-64 md:w-80 md:h-80 object-contain"
            width={320}
            height={320}
            decoding="async"
            fetchpriority="high"
            loading="eager"
          />
        </motion.div>
      </div>

      {/* Soft blurred corner glows for depth */}
      <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-[28rem] w-[28rem] rounded-full bg-white/5 blur-3xl" />
    </motion.div>
  );
}

export default BackgroundCircles;


