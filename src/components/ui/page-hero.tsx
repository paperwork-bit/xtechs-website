'use client'

import { motion } from 'framer-motion'
import { ComingSoonPill } from './coming-soon-pill'
import { Button } from './button'
import { Mail, Users } from 'lucide-react'

interface PageHeroProps {
  title: string
  subtitle: string
  onSubscribe?: () => void
  onJoinCommunity?: () => void
  className?: string
}

export function PageHero({ 
  title, 
  subtitle, 
  onSubscribe, 
  onJoinCommunity,
  className = '' 
}: PageHeroProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          {/* Left content */}
          <div className="flex-1">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-4"
            >
              {title}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-muted-foreground max-w-2xl"
            >
              {subtitle}
            </motion.p>
          </div>
          
          {/* Right content */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-4 lg:items-end">
            {/* Coming Soon Pill */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex justify-center lg:justify-end"
            >
              <ComingSoonPill />
            </motion.div>
            
            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Button 
                onClick={onSubscribe}
                className="flex items-center gap-2"
                size="lg"
              >
                <Mail className="w-4 h-4" />
                Subscribe
              </Button>
              <Button 
                onClick={onJoinCommunity}
                variant="outline"
                className="flex items-center gap-2"
                size="lg"
              >
                <Users className="w-4 h-4" />
                Join Community
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
