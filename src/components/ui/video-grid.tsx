'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Play, Clock } from 'lucide-react'
import { VideoItem } from '@/types/xclasses'
import { formatDuration } from '@/lib/xclasses'
import { VideoPlayerModal } from './video-player-modal'

interface VideoGridProps {
  videos: VideoItem[]
  className?: string
}

export function VideoGrid({ videos, className = '' }: VideoGridProps) {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null)

  if (videos.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
            <Play className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No videos yet</h3>
          <p className="text-muted-foreground">
            We're working on creating amazing tutorial content. Check back soon!
          </p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
        {videos.map((video, index) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card 
              className="group cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden h-full flex flex-col"
              onClick={() => {
                if (video.source.kind === 'youtube') {
                  window.open(`https://www.youtube.com/watch?v=${video.source.id}`, '_blank')
                } else {
                  setSelectedVideo(video)
                }
              }}
            >
              <div className="relative aspect-video bg-muted flex-shrink-0">
                {video.thumbnailUrl ? (
                  <img 
                    src={video.thumbnailUrl} 
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Play className="w-12 h-12 text-muted-foreground" />
                  </div>
                )}
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                      <Play className="w-6 h-6 text-black ml-1" />
                    </div>
                  </div>
                </div>
                
                {/* Duration badge */}
                {video.durationSec > 0 && (
                  <div className="absolute bottom-2 right-2">
                    <Badge variant="secondary" className="bg-black/80 text-white border-0">
                      <Clock className="w-3 h-3 mr-1" />
                      {formatDuration(video.durationSec)}
                    </Badge>
                  </div>
                )}
              </div>
              
              <CardContent className="p-4 flex-1 flex flex-col">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <Badge variant="outline" className="text-xs">
                    {video.category}
                  </Badge>
                </div>
                
                <h3 className="font-semibold text-sm mb-2 line-clamp-2 group-hover:text-primary transition-colors flex-1">
                  {video.title}
                </h3>
                
                {video.description && (
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {video.description}
                  </p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      
      {selectedVideo && (
        <VideoPlayerModal 
          video={selectedVideo}
          isOpen={!!selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </>
  )
}
