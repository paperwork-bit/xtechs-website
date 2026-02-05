"use client"

import * as React from "react"
import { useState, useEffect, useRef } from "react"
import {
  Home, Building2, BatteryCharging, Car, PlugZap, ShieldCheck, Award, Users,
  ArrowRight, Zap, TrendingUp, Sun
} from "lucide-react"
import { motion, useInView } from "framer-motion"
import type { Variants } from "framer-motion"

/* ---------------------------------------------
 * Small classnames helper
 * --------------------------------------------- */
function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ")
}

/* ---------------------------------------------
 * Detect very short landscape (e.g., iPhone SE landscape ~320px height)
 * Used to reduce paddings and cap media height so nothing is pushed off-screen.
 * --------------------------------------------- */
function useShortLandscape(threshold = 420) {
  const [short, setShort] = useState(false)
  useEffect(() => {
    const check = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      setShort(w > h && h <= threshold)
    }
    check()
    window.addEventListener("resize", check)
    window.addEventListener("orientationchange", check)
    return () => {
      window.removeEventListener("resize", check)
      window.removeEventListener("orientationchange", check)
    }
  }, [threshold])
  return short
}

/* ---------------------------------------------
 * Values data (7 items) — simple and easy to edit
 * --------------------------------------------- */
const VALUES = [
  { key: "integrity",     title: "Integrity",     desc: "We act with honesty and uphold the highest ethical standards in every decision and installation.", Icon: ShieldCheck },
  { key: "responsibility",title: "Responsibility",desc: "We take ownership of outcomes and prioritise safety, compliance, and the environment.", Icon: ShieldCheck },
  { key: "accountability",title: "Accountability",desc: "We deliver on our promises and stand behind our workmanship and service.", Icon: Award },
  { key: "quality",       title: "Quality",       desc: "We use proven, tier‑one products and neat, standards‑compliant installs that stand the test of time.", Icon: Sun },
  { key: "teamwork",      title: "Team Work",     desc: "We collaborate closely with clients, suppliers and each other to get great results.", Icon: Users },
  { key: "innovation",    title: "Innovation",    desc: "We embrace modern technologies and smarter ways of working to create better systems.", Icon: Zap },
  { key: "leadership",    title: "Leadership",    desc: "We set the bar for professionalism and customer care across every project stage.", Icon: TrendingUp },
] as const

/* ---------------------------------------------
 * Services and Stats (as in your original)
 * --------------------------------------------- */
const SERVICES = [
  {
    icon: <Home className="w-6 h-6" />,
    title: "Residential Solar PV & Batteries",
    description:
      "Tailored systems for family homes — neat switchboards, clean cabling, and guidance on Solar Victoria rebates.",
    position: "left" as const,
  },
  {
    icon: <Building2 className="w-6 h-6" />,
    title: "Business & Commercial Energy",
    description:
      "Data‑driven designs for shops, offices and industrial sites. Export‑limit approvals and smart monitoring included.",
    position: "left" as const,
  },
  {
    icon: <PlugZap className="w-6 h-6" />,
    title: "Off‑Grid & Hybrid Systems",
    description:
      "Robust off‑grid and hybrid setups for remote sites and critical operations — sized for your loads and growth.",
    position: "left" as const,
  },
  {
    icon: <BatteryCharging className="w-6 h-6" />,
    title: "Home & Business Batteries",
    description:
      "BYD, Tesla, Sungrow and more. Safe LFP options, backup power and seamless inverter integration.",
    position: "right" as const,
  },
  {
    icon: <Car className="w-6 h-6" />,
    title: "EV Charging",
    description:
      "Tesla Wall Connector, Zappi, SigEnergy and Wattpilot — smart solar charging and dynamic load management.",
    position: "right" as const,
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "SolarFold Rapid‑Deploy Power",
    description:
      "Mobile, fast‑deploy arrays for military, mining, events and emergency power — short or long‑term projects.",
    position: "right" as const,
  },
]

const STATS = [
  { icon: <Award />,       value: 300,  label: "Systems Delivered",      suffix: "+" },
  { icon: <TrendingUp />,  value: 1000, label: "kW Deployed",            suffix: "+ kW" },
  { icon: <ShieldCheck />, value: 100,  label: "CEC‑Accredited on Jobs", suffix: "%" },
  { icon: <Users />,       value: 98,   label: "Customer Satisfaction",  suffix: "%" },
]

/* ---------------------------------------------
 * Component
 * --------------------------------------------- */
export default function AboutUsSection() {
  const [showFullPhoto, setShowFullPhoto] = useState(false)
  const shortLandscape = useShortLandscape(420)

  // In‑view triggers (more forgiving margins for small heights)
  const sectionRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const sectionInView = useInView(sectionRef, { once: true, amount: 0.06, margin: "-12% 0px -12% 0px" })
  const statsInView   = useInView(statsRef,   { once: true, amount: 0.25, margin: "-12% 0px -12% 0px" })

  // Force visible on very short landscape to avoid opacity:0 states
  const sectionShouldAnimate = shortLandscape || sectionInView
  const statsShouldAnimate   = shortLandscape || statsInView

  const containerVariants: Variants = {
    hidden:  { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.18, delayChildren: 0.12 } },
  }

  const itemVariants: Variants = {
    hidden:  { y: 20, opacity: 0 },
    visible: { y: 0,  opacity: 1, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
  }

  return (
    <>
      <section
        id="about-section"
        ref={sectionRef}
        className={cn(
          "w-full px-4 bg-white text-[#202e44]",
          shortLandscape ? "py-12" : "py-24"
        )}
      >
        <motion.div
          className="container mx-auto max-w-6xl relative z-10"
          initial="hidden"
          animate={sectionShouldAnimate ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Heading */}
          <motion.div className="flex flex-col items-center mb-6" variants={itemVariants}>
            <motion.span
              className="text-emerald-700 font-medium mb-2 flex items-center gap-2"
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Sun className="w-4 h-4" /> DISCOVER OUR STORY
            </motion.span>
            <h2 className={cn("font-light mb-4 text-center", shortLandscape ? "text-3xl" : "text-4xl md:text-5xl")}>
              About xTechs Renewables
            </h2>
            <motion.div className="h-1 bg-emerald-700" initial={{ width: 0 }} animate={{ width: 96 }} transition={{ duration: 0.8, delay: 0.25 }} />
          </motion.div>

          {/* Intro */}
          <motion.p
            className={cn(
              "text-center mx-auto mb-12 text-[#202e44]/80",
              shortLandscape ? "max-w-xl" : "max-w-2xl"
            )}
            variants={itemVariants}
          >
            We design and deliver <strong>solar PV, batteries, EV charging and heat pumps</strong> across Victoria (and select interstate).
            Safety and compliance are non‑negotiable — we're CEC‑accredited and guide you through Solar Victoria rebates and approvals.
            Clean installs. Clear paperwork. Strong after‑sales.
          </motion.p>

          {/* Services columns + center image */}
          <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-8 relative", shortLandscape && "gap-6")}>
            {/* Left column */}
            <div className="space-y-12">
              {SERVICES.filter(s => s.position === "left").map((s, i) => (
                <ServiceItem
                  key={`left-${i}`}
                  icon={s.icon}
                  title={s.title}
                  description={s.description}
                  variants={itemVariants}
                  delay={i * 0.15}
                  direction="left"
                />
              ))}
            </div>

            {/* Center media (cap height on short landscape) */}
            <div className="order-first md:order-none mb-6 md:mb-0 md:row-span-2">
              <motion.div
                role="region"
                aria-label="Our equipped and certified team"
                className="relative w-full"
                variants={itemVariants}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <div className="rounded-2xl overflow-hidden shadow-xl border-slate-200/60 border">
                  <div className="flex flex-col">
                    <div
                      className={cn(
                        "relative w-full bg-slate-100 group cursor-zoom-in overflow-hidden",
                        shortLandscape ? "h-[38vh]" : "aspect-video"
                      )}
                      onClick={() => setShowFullPhoto(true)}
                      aria-label="Preview full team photo"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/uploads/team.png"
                        alt="xTechs Renewables team of accredited installers and electricians"
                        className="absolute inset-0 w-full h-full object-cover"
                        loading="eager"
                        width={1920}
                        height={1080}
                        decoding="async"
                        fetchpriority="high"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          if (target.src !== "/uploads/Team.jpg") target.src = "/uploads/Team.jpg"
                        }}
                      />
                      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200" aria-hidden="true">
                        <div className="absolute inset-0 bg-black/10" />
                        <div className="absolute bottom-3 right-3 text-[11px] px-2 py-1 rounded bg-white/80 text-slate-700 shadow-sm">Click to view</div>
                      </div>
                    </div>

                    <div className="p-5 sm:p-6">
                      <div className="max-w-2xl">
                        <h3 className={cn("text-[#202e44] font-semibold tracking-tight", shortLandscape ? "text-xl" : "text-2xl sm:text-3xl md:text-4xl")}>
                          Our Equipped & Certified Team
                        </h3>
                        <p className={cn("mt-3 text-[#202e44]/80 leading-relaxed", shortLandscape ? "text-sm" : "text-sm sm:text-base")}>
                          Our team of CEC-accredited installers and licensed electricians is fully qualified to deliver end-to-end energy solutions —
                          from solar PV and batteries to EV charging, off-grid systems, business energy, and rapid-deploy power. Safety, compliance,
                          and quality are at the heart of every project.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right column */}
            <div className="space-y-12">
              {SERVICES.filter(s => s.position === "right").map((s, i) => (
                <ServiceItem
                  key={`right-${i}`}
                  icon={s.icon}
                  title={s.title}
                  description={s.description}
                  variants={itemVariants}
                  delay={i * 0.15}
                  direction="right"
                />
              ))}
            </div>
          </div>

          {/* Stats */}
          <motion.div
            ref={statsRef}
            className={cn("mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6", shortLandscape && "mt-12")}
            initial="hidden"
            animate={statsShouldAnimate ? "visible" : "hidden"}
            variants={containerVariants}
          >
            {STATS.map((stat, i) => (
              <StatCounter key={i} icon={stat.icon} value={stat.value} label={stat.label} suffix={stat.suffix} delay={i * 0.1} />
            ))}
          </motion.div>

          {/* Our Values — simple single grid (no renderValueCard) */}
          <section className={cn("py-16 sm:py-20 lg:py-24 bg-white", shortLandscape && "py-12")}>
            <div className="container mx-auto px-0 sm:px-4">
              <h2 className={cn("font-semibold tracking-tight text-neutral-900 text-center mb-12", shortLandscape ? "text-2xl" : "text-3xl sm:text-4xl")}>
                Our Values
              </h2>

              <div
                className="
                  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
                  gap-6 lg:gap-8
                  auto-rows-fr
                "
              >
                {VALUES.map(({ key, title, desc, Icon }) => (
                  <div
                    key={key}
                    className="
                      rounded-xl border border-neutral-200 bg-white
                      shadow-sm hover:shadow-md transition
                      p-6 h-full flex flex-col items-center text-center
                    "
                  >
                    <Icon aria-hidden="true" className="h-8 w-8 text-emerald-700" />
                    <h3 className="text-lg font-semibold text-neutral-900 mt-4">{title}</h3>
                    <p className="text-sm text-neutral-600 mt-2 leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <motion.div
            className={cn(
              "mt-16 bg-[#202e44] text-white p-6 sm:p-8 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6",
              shortLandscape && "mt-12"
            )}
            initial={{ opacity: 0, y: 24 }}
            animate={sectionShouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="flex-1">
              <h3 className={cn("font-medium mb-2", shortLandscape ? "text-xl" : "text-2xl")}>
                Ready to plan a compliant, great‑looking solar system?
              </h3>
              <p className="text-white/80">Talk to our CEC‑accredited team. We'll design, install and support.</p>
            </div>
            <a
              href="/contact"
              className="bg-emerald-700 hover:bg-emerald-700/90 text-white px-6 py-3 rounded-lg flex items-center gap-2 font-medium transition-colors"
            >
              Request a Quote <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </motion.div>

        {/* Full photo popup */}
        {showFullPhoto && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowFullPhoto(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Full team photo"
          >
            <motion.div
              className="relative w-full h-full max-w-6xl max-h-[90vh]"
              initial={{ scale: 0.98, y: 8, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/uploads/team.png"
                alt="xTechs Renewables team of accredited installers and electricians"
                className="w-full h-full object-contain rounded-lg shadow-2xl bg-slate-100"
                width={1920}
                height={1080}
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  if (target.src !== "/uploads/Team.jpg") target.src = "/uploads/Team.jpg"
                }}
              />
              <button
                className="absolute top-3 right-3 text-xs px-2 py-1 rounded bg-white/90 text-slate-800 shadow z-10"
                onClick={(e) => { e.stopPropagation(); setShowFullPhoto(false) }}
                aria-label="Close full photo"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </section>
    </>
  )
}

/* ---------------------------------------------
 * Service item (kept simple)
 * --------------------------------------------- */
function ServiceItem({
  icon, title, description, variants, delay, direction,
}: {
  icon: React.ReactNode
  title: string
  description: string
  variants: Variants
  delay: number
  direction: "left" | "right"
}) {
  return (
    <motion.div
      className="flex flex-col group"
      variants={variants}
      transition={{ delay }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <motion.div
        className="flex items-center gap-3 mb-2"
        initial={{ x: direction === "left" ? -20 : 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.55, delay: delay + 0.1 }}
      >
        <div className="text-emerald-700 bg-emerald-700/10 p-3 rounded-lg">
          {icon}
        </div>
        <h3 className="text-lg md:text-xl font-medium text-[#202e44] group-hover:text-emerald-700 transition-colors duration-300">
          {title}
        </h3>
      </motion.div>
      <motion.p
        className="text-sm text-[#202e44]/80 leading-relaxed pl-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.55, delay: delay + 0.25 }}
      >
        {description}
      </motion.p>
    </motion.div>
  )
}

/* ---------------------------------------------
 * Stat item (lightweight counter)
 * --------------------------------------------- */
function StatCounter({
  icon, value, label, suffix, delay,
}: { icon: React.ReactNode; value: number; label: string; suffix: string; delay: number }) {
  const countRef = useRef<HTMLDivElement | null>(null)
  const inView = useInView(countRef, { once: true, amount: 0.3, margin: "-12% 0px -12% 0px" })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    let frame = 0
    const total = 40
    const step = () => {
      frame++
      const eased = Math.round(value * (frame / total))
      setDisplay(Math.min(eased, value))
      if (frame < total) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, value])

  return (
    <motion.div
      className="bg-white/50 backdrop-blur-sm p-6 rounded-xl flex flex-col items-center text-center group hover:bg-white transition-colors duration-300"
      variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, delay } } }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <div className="w-14 h-14 rounded-full bg-[#202e44]/5 flex items-center justify-center mb-4 text-emerald-700 group-hover:bg-emerald-700/10 transition-colors duration-300">
        {icon}
      </div>
      <div ref={countRef} className="text-3xl font-bold text-[#202e44] flex items-center">
        <span>{display}</span>
        <span>{suffix}</span>
      </div>
      <p className="text-[#202e44]/70 text-sm mt-1">{label}</p>
      <div className="w-10 h-0.5 bg-emerald-700 mt-3 group-hover:w-16 transition-all duration-300" />
    </motion.div>
  )
}
