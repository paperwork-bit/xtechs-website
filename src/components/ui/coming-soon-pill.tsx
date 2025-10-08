'use client'

import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { getXProductDisplayName } from '@/types/xclasses'

interface ComingSoonPillProps {
  className?: string
}

export function ComingSoonPill({ className }: ComingSoonPillProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge 
            variant="secondary" 
            className={`bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20 text-primary hover:from-primary/20 hover:to-accent/20 transition-all duration-300 ${className}`}
          >
            {getXProductDisplayName()} — Coming Soon
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>Limited access available. Join our beta program for early access!</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
