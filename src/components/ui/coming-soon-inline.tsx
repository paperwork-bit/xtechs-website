'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, Sparkles } from 'lucide-react'
import { getXProductDisplayName } from '@/types/xclasses'

interface ComingSoonInlineProps {
  className?: string
}

export function ComingSoonInline({ className = '' }: ComingSoonInlineProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                  <Clock className="w-3 h-3 mr-1" />
                  Coming Soon
                </Badge>
              </div>
              
              <h3 className="font-semibold text-lg mb-2">
                {getXProductDisplayName()} is coming soon
              </h3>
              
              <p className="text-muted-foreground">
                We're publishing progress and tutorials here in X-Classes—stay tuned for updates, 
                behind-the-scenes content, and early access opportunities.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
