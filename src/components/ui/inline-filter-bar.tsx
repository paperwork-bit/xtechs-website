'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Filter } from 'lucide-react'
import { videoCategories, type VideoCategory } from '@/lib/xclasses'
import { sampleVideos } from '@/data/xclasses/videos'

interface InlineFilterBarProps {
  selectedCategory: VideoCategory
  onCategoryChange: (category: VideoCategory) => void
  className?: string
}

export function InlineFilterBar({ 
  selectedCategory, 
  onCategoryChange, 
  className = '' 
}: InlineFilterBarProps) {
  // Calculate video counts for each category
  const getVideoCount = (category: VideoCategory) => {
    if (category === 'All') return sampleVideos.length
    return sampleVideos.filter(video => video.category === category).length
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex items-center gap-2 flex-wrap ${className}`}
    >
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Filter className="w-4 h-4" />
        <span>Filter by category:</span>
      </div>
      
      <div className="flex items-center gap-2 flex-wrap">
        {videoCategories.map((category) => {
          const count = getVideoCount(category)
          return (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onCategoryChange(category)}
              className="h-8 px-3 text-xs"
              disabled={count === 0}
            >
              {category}
              <Badge variant="secondary" className="ml-2 h-4 px-1 text-xs">
                {count}
              </Badge>
            </Button>
          )
        })}
      </div>
    </motion.div>
  )
}
