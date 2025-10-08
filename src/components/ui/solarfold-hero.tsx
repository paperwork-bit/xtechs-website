'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Zap, Shield, Clock } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export function SolarFoldHero() {
  const features = [
    {
      icon: Clock,
      title: "Rapid Deployment",
      description: "Set up in minutes, not hours"
    },
    {
      icon: Shield,
      title: "Rugged Design",
      description: "Built for harsh environments"
    },
    {
      icon: Zap,
      title: "High Output",
      description: "Maximum power generation"
    }
  ]

  return (
    <section className="min-h-screen bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left Side - Full Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative h-[500px] lg:h-screen"
        >
          <Image
            src="/solarfold-hero.jpg"
            alt="SolarFold rapid-deploy solar array"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay gradient for better text contrast if needed */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </motion.div>

        {/* Right Side - Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col justify-center px-8 lg:px-12 xl:px-16 py-12 lg:py-16 space-y-8"
        >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5">
                Off-Grid & Rapid-Deploy Power
              </Badge>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="space-y-4"
            >
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
                SolarFold by xTechs
              </h1>
              <p className="text-xl lg:text-2xl text-gray-600 font-medium">
                Hero 130KW deployed within few hours which usually takes weeks, sometime even months.
              </p>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-lg text-gray-600 leading-relaxed"
            >
              Fold-out solar arrays, portable hybrid grids, and containerized BESS — engineered for
              remote, emergency, and mobile operations. Built for demanding environments where grid power
              is unavailable, unreliable, or too costly.
            </motion.p>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4"
            >
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">{feature.title}</h3>
                    <p className="text-xs text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Info Panels (Only in hero) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.75 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {/* Capabilities */}
              <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">What you can deploy</h3>
                <ul className="space-y-2 text-sm text-gray-700 list-disc pl-5">
                  <li>Fold-out PV arrays from 5 kW to 100+ kW</li>
                  <li>Portable hybrid grids (PV + battery + genset ready)</li>
                  <li>Containerized BESS with smart EMS</li>
                  <li>Plug-and-play AC distribution and protection</li>
                </ul>
              </div>

              {/* Partnerships */}
              <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Delivered with our partner</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Developed in collaboration with <span className="font-semibold">EcoSun Innovations</span>.
                  xTechs holds <span className="font-semibold">exclusive installation rights across Australia</span>,
                  ensuring factory-backed engineering, compliant installation, and national support.
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center rounded-md border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-700">EcoSun Innovations Partner</span>
                  <span className="inline-flex items-center rounded-md border border-primary/20 bg-primary/5 px-2.5 py-1 text-xs font-medium text-primary">Exclusive AU Installer</span>
                </div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button asChild size="lg" className="flex items-center gap-2">
                <Link href="#products">
                  Explore Products
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="#applications">
                  See Applications
                </Link>
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="pt-6 border-t border-gray-200"
            >
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Military Grade</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Weather Resistant</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Modular Design</span>
                </div>
              </div>
            </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
