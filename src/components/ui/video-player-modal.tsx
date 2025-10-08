'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { VideoItem } from '@/types/xclasses'

interface VideoPlayerModalProps {
  video: VideoItem
  isOpen: boolean
  onClose: () => void
}

export function VideoPlayerModal({ video, isOpen, onClose }: VideoPlayerModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  const renderVideoPlayer = () => {
    switch (video.source.kind) {
      case 'youtube':
        return (
          <iframe
            src={`https://www.youtube.com/embed/${video.source.id}?autoplay=1&rel=0`}
            title={video.title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )
      
      case 'vimeo':
        return (
          <iframe
            src={`https://player.vimeo.com/video/${video.source.id}?autoplay=1`}
            title={video.title}
            className="w-full h-full"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        )
      
      case 'mp4':
        return (
          <video
            ref={videoRef}
            src={video.source.url}
            controls
            autoPlay
            playsInline
            preload="metadata"
            className="w-full h-full"
            onEnded={onClose}
          />
        )
      
      default:
        return (
          <div className="w-full h-full flex items-center justify-center bg-muted">
            <p className="text-muted-foreground">Unsupported video format</p>
          </div>
        )
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="max-w-none w-[98vw] h-[95vh] p-0 overflow-hidden">
            <div className="relative w-full h-full">
              {/* Close button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white"
                onClick={onClose}
                aria-label="Close video"
              >
                <X className="w-4 h-4" />
              </Button>
              
              {/* Video player - full size with proper aspect ratio */}
              <div className="w-full h-full bg-black flex items-center justify-center">
                <div 
                  className="w-full h-full"
                  style={{ 
                    aspectRatio: '16/9',
                    maxWidth: 'calc(95vh * 16 / 9)',
                    maxHeight: '95vh'
                  }}
                >
                  {renderVideoPlayer()}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  )
}
