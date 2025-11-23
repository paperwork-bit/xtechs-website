"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import {
  Home,
  Building2,
  BatteryCharging,
  Car,
  PlugZap,
  ShieldCheck,
  Award,
  Users,
  Calendar,
  CheckCircle,
  Sparkles,
  Star,
  ArrowRight,
  Zap,
  TrendingUp,
  Sun,
} from "lucide-react"
import { motion, useInView, useSpring, useTransform } from "framer-motion"
import type { Variants } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollReveal, StaggerReveal } from "@/components/scroll-reveal"

export default function AboutUsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [showFullPhoto, setShowFullPhoto] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 })
  const isStatsInView = useInView(statsRef, { once: false, amount: 0.3 })

  // Minimal backdrop; remove parallax decorative elements for a clean look

  useEffect(() => { setIsVisible(true) }, [])
  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowFullPhoto(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
  }

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  }

  // === xTechs offerings mapped to the UI ===
  const services = [
    {
      icon: <Home className="w-6 h-6" />, // Residential
      secondaryIcon: <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-emerald-600/60" />,
      title: "Residential Solar PV & Batteries",
      description:
        "Tailored systems for family homes — neat switchboards, clean cabling, and guidance on Solar Victoria rebates.",
      position: "left",
    },
    {
      icon: <Building2 className="w-6 h-6" />, // Business
      secondaryIcon: <CheckCircle className="w-4 h-4 absolute -top-1 -right-1 text-emerald-600/60" />,
      title: "Business & Commercial Energy",
      description:
        "Data‑driven designs for shops, offices and industrial sites. Export‑limit approvals and smart monitoring included.",
      position: "left",
    },
    {
      icon: <PlugZap className="w-6 h-6" />, // Off‑grid / Hybrid
      secondaryIcon: <Star className="w-4 h-4 absolute -top-1 -right-1 text-emerald-600/60" />,
      title: "Off‑Grid & Hybrid Systems",
      description:
        "Robust off‑grid and hybrid setups for remote sites and critical operations — sized for your loads and growth.",
      position: "left",
    },
    {
      icon: <BatteryCharging className="w-6 h-6" />, // Batteries
      secondaryIcon: <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-emerald-600/60" />,
      title: "Home & Business Batteries",
      description:
        "BYD, Tesla, Sungrow and more. Safe LFP options, backup power and seamless inverter integration.",
      position: "right",
    },
    {
      icon: <Car className="w-6 h-6" />, // EV Charging
      secondaryIcon: <CheckCircle className="w-4 h-4 absolute -top-1 -right-1 text-emerald-600/60" />,
      title: "EV Charging",
      description:
        "Tesla Wall Connector, Zappi, SigEnergy and Wattpilot — smart solar charging and dynamic load management.",
      position: "right",
    },
    {
      icon: <Zap className="w-6 h-6" />, // SolarFold
      secondaryIcon: <Star className="w-4 h-4 absolute -top-1 -right-1 text-emerald-600/60" />,
      title: "SolarFold Rapid‑Deploy Power",
      description:
        "Mobile, fast‑deploy arrays for military, mining, events and emergency power — short or long‑term projects.",
      position: "right",
    },
  ] as const

  // NOTE: Numbers below are placeholders — keep them easy to edit.
  const stats = [
    { icon: <Award />, value: 300, label: "Systems Delivered", suffix: "+" },
    { icon: <TrendingUp />, value: 1000, label: "kW Deployed", suffix: "+ kW" },
    { icon: <ShieldCheck />, value: 100, label: "CEC‑Accredited on Jobs", suffix: "%" },
    { icon: <Users />, value: 98, label: "Customer Satisfaction", suffix: "%" },
  ]

  // Our Values data used in the grid below
  const values = [
    { key: 'integrity', title: 'Integrity', desc: 'We act with honesty and uphold the highest ethical standards in every decision and installation.', Icon: ShieldCheck },
    { key: 'responsibility', title: 'Responsibility', desc: 'We take ownership of outcomes and prioritise safety, compliance, and the environment.', Icon: CheckCircle },
    { key: 'accountability', title: 'Accountability', desc: 'We deliver on our promises and stand behind our workmanship and service.', Icon: Award },
    { key: 'quality', title: 'Quality', desc: 'We use proven, tier‑one products and neat, standards‑compliant installs that stand the test of time.', Icon: Star },
    { key: 'teamwork', title: 'Team Work', desc: 'We collaborate closely with clients, suppliers and each other to get great results.', Icon: Users },
    { key: 'innovation', title: 'Innovation', desc: 'We embrace modern technologies and smarter ways of working to create better systems.', Icon: Zap },
    { key: 'leadership', title: 'Leadership', desc: 'We set the bar for professionalism and customer care across every project stage.', Icon: TrendingUp },
  ] as const

  const renderValueCard = ({ key, title, desc, Icon }: { key: string; title: string; desc: string; Icon: any }) => (
    <div key={key} className="rounded-xl border border-neutral-200 bg-white shadow-sm hover:shadow-md transition p-6 h-full flex flex-col items-center text-center">
      <Icon aria-hidden="true" className="h-8 w-8 text-emerald-700" />
      <h3 className="text-lg font-semibold text-neutral-900 mt-4">{title}</h3>
      <p className="text-sm text-neutral-600 mt-2 leading-relaxed">{desc}</p>
    </div>
  )

  return (
    <>
    <section id="about-section" ref={sectionRef} className="w-full py-24 px-4 bg-white text-[#202e44]">

      <motion.div className="container mx-auto max-w-6xl relative z-10" initial="hidden" animate={isInView ? "visible" : "hidden"} variants={containerVariants}>
        {/* Heading */}
        <motion.div className="flex flex-col items-center mb-6" variants={itemVariants}>
          <motion.span className="text-emerald-700 font-medium mb-2 flex items-center gap-2" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <Sun className="w-4 h-4" /> DISCOVER OUR STORY
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-light mb-4 text-center">About xTechs Renewables</h2>
          <motion.div className="w-24 h-1 bg-emerald-700" initial={{ width: 0 }} animate={{ width: 96 }} transition={{ duration: 1, delay: 0.5 }} />
        </motion.div>

        {/* Intro */}
        <motion.p className="text-center max-w-2xl mx-auto mb-16 text-[#202e44]/80" variants={itemVariants}>
          We design and deliver <strong>solar PV, batteries, EV charging and heat pumps</strong> across Victoria (and select interstate). Safety and compliance are non‑negotiable — we're CEC‑accredited and guide you through Solar Victoria rebates and approvals. Clean installs. Clear paperwork. Strong after‑sales.
        </motion.p>

        {/* Services columns + center image */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Left Column */}
          <div className="space-y-16">
            {services.filter((s) => s.position === "left").map((s, i) => (
              <ServiceItem key={`left-${i}`} icon={s.icon} secondaryIcon={s.secondaryIcon} title={s.title} description={s.description} variants={itemVariants} delay={i * 0.2} direction="left" />
            ))}
          </div>

          {/* Center Media: Our Equipped & Certified Team (Hero with photo) */}
          <div className="order-first md:order-none mb-8 md:mb-0 md:row-span-2">
            <motion.div
              role="region"
              aria-label="Our equipped and certified team"
              className="relative w-full"
              variants={itemVariants}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="rounded-2xl overflow-hidden shadow-xl border-slate-200/60">
                <div className="flex flex-col">
                  {/* Landscape image area */}
                  <div
                    className="relative w-full aspect-video bg-slate-100 group cursor-zoom-in"
                    onClick={() => setShowFullPhoto(true)}
                    aria-label="Preview full team photo"
                  >
                    <img
                      src="/team.png"
                      alt="xTechs Renewables team of accredited installers and electricians"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200" aria-hidden="true">
                      <div className="absolute inset-0 bg-black/10" />
                      <div className="absolute bottom-3 right-3 text-[11px] px-2 py-1 rounded bg-white/80 text-slate-700 shadow-sm">Click to view</div>
                    </div>
                  </div>

                  {/* Content below the photo */}
                  <div className="p-6 sm:p-8">
                    <div className="max-w-2xl">
                      <h3 className="text-[#202e44] text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight">Our Equipped & Certified Team</h3>
                      <p className="mt-3 text-[#202e44]/80 text-sm sm:text-base leading-relaxed">
                        Our team of CEC-accredited installers and licensed electricians is fully qualified to deliver end-to-end energy solutions — from solar PV and batteries to EV charging, off-grid systems, business energy, and rapid-deploy power. Safety, compliance, and quality are at the heart of every project.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-16">
            {services.filter((s) => s.position === "right").map((s, i) => (
              <ServiceItem key={`right-${i}`} icon={s.icon} secondaryIcon={s.secondaryIcon} title={s.title} description={s.description} variants={itemVariants} delay={i * 0.2} direction="right" />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <motion.div ref={statsRef} className="mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8" initial="hidden" animate={isStatsInView ? "visible" : "hidden"} variants={containerVariants}>
          {stats.map((stat, i) => (
            <StatCounter key={i} icon={stat.icon} value={stat.value} label={stat.label} suffix={stat.suffix} delay={i * 0.1} />
          ))}
        </motion.div>

        {/* Our Values Section (above CTA) */}
        <section className="py-16 sm:py-20 lg:py-24 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-900 text-center mb-12">Our Values</h2>

            {/* Desktop (lg): full four-column grid; Tablet/Mobile: 2/1 columns with bottom row centered */}
            <div className="hidden lg:grid grid-cols-4 gap-6 lg:gap-8 items-stretch">
              {values.slice(0, 4).map(renderValueCard)}
              <div className="lg:col-span-4 grid grid-cols-3 gap-6 justify-items-center">
                {values.slice(4).map(renderValueCard)}
              </div>
            </div>

            <div className="grid lg:hidden grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 items-stretch">
              {/* First 4 cards flow normally */}
              {values.slice(0, 4).map(renderValueCard)}
              {/* Last 3 centered as a row of 3 on tablet; centered stack on mobile */}
              <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-3 place-items-center gap-6">
                {values.slice(4).map(renderValueCard)}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <motion.div className="mt-20 bg-[#202e44] text-white p-8 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }} transition={{ duration: 0.8, delay: 0.5 }}>
          <div className="flex-1">
            <h3 className="text-2xl font-medium mb-2">Ready to plan a compliant, great‑looking solar system?</h3>
            <p className="text-white/80">Talk to our CEC‑accredited team. We'll design, install and support.</p>
          </div>
          <motion.a href="/contact" className="bg-emerald-700 hover:bg-emerald-700/90 text-white px-6 py-3 rounded-lg flex items-center gap-2 font-medium transition-colors" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            Request a Quote <ArrowRight className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </motion.div>
      {/* Full photo popup overlay */}
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
            <img
              src="/team.png"
              alt="xTechs Renewables team of accredited installers and electricians"
              className="w-full h-full object-contain rounded-lg shadow-2xl bg-slate-100"
            />
            <button
              className="absolute top-3 right-3 text-xs px-2 py-1 rounded bg-white/90 text-slate-800 shadow"
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

interface ServiceItemProps {
  icon: React.ReactNode
  secondaryIcon?: React.ReactNode
  title: string
  description: string
  variants: Variants
  delay: number
  direction: "left" | "right"
}

function ServiceItem({ icon, secondaryIcon, title, description, variants, delay, direction }: ServiceItemProps) {
  return (
    <motion.div className="flex flex-col group" variants={variants} transition={{ delay }} whileHover={{ y: -5, transition: { duration: 0.2 } }}>
      <motion.div className="flex items-center gap-3 mb-3" initial={{ x: direction === "left" ? -20 : 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.6, delay: delay + 0.2 }}>
        <motion.div className="text-emerald-700 bg-emerald-700/10 p-3 rounded-lg transition-colors duration-300 group-hover:bg-emerald-700/20 relative" whileHover={{ rotate: [0, -10, 10, -5, 0], transition: { duration: 0.5 } }}>
          {icon}
          {secondaryIcon}
        </motion.div>
        <h3 className="text-xl font-medium text-[#202e44] group-hover:text-emerald-700 transition-colors duration-300">{title}</h3>
      </motion.div>
      <motion.p className="text-sm text-[#202e44]/80 leading-relaxed pl-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: delay + 0.4 }}>
        {description}
      </motion.p>
      <motion.div className="mt-3 pl-12 flex items-center text-emerald-700 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300" initial={{ opacity: 0 }} animate={{ opacity: 0 }}>
        <span className="flex items-center gap-1">Learn more <ArrowRight className="w-3 h-3" /></span>
      </motion.div>
    </motion.div>
  )
}

interface StatCounterProps { icon: React.ReactNode; value: number; label: string; suffix: string; delay: number }

function StatCounter({ icon, value, label, suffix, delay }: StatCounterProps) {
  const countRef = useRef(null)
  const isInView = useInView(countRef, { once: false })
  const [hasAnimated, setHasAnimated] = useState(false)
  const springValue = useSpring(0, { stiffness: 50, damping: 10 })

  useEffect(() => {
    if (isInView && !hasAnimated) { springValue.set(value); setHasAnimated(true) }
    else if (!isInView && hasAnimated) { springValue.set(0); setHasAnimated(false) }
  }, [isInView, value, springValue, hasAnimated])

  const displayValue = useTransform(springValue, (latest) => Math.floor(latest))

  return (
    <motion.div className="bg-white/50 backdrop-blur-sm p-6 rounded-xl flex flex-col items-center text-center group hover:bg-white transition-colors duration-300" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay } } }} whileHover={{ y: -5, transition: { duration: 0.2 } }}>
      <motion.div className="w-14 h-14 rounded-full bg-[#202e44]/5 flex items-center justify-center mb-4 text-emerald-700 group-hover:bg-emerald-700/10 transition-colors duration-300" whileHover={{ rotate: 360, transition: { duration: 0.8 } }}>
        {icon}
      </motion.div>
      <motion.div ref={countRef} className="text-3xl font-bold text-[#202e44] flex items-center">
        <motion.span>{displayValue}</motion.span>
        <span>{suffix}</span>
      </motion.div>
      <p className="text-[#202e44]/70 text-sm mt-1">{label}</p>
      <motion.div className="w-10 h-0.5 bg-emerald-700 mt-3 group-hover:w-16 transition-all duration-300" />
    </motion.div>
  )
}
