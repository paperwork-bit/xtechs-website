'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { X, Calendar, Share2, Copy, Check } from 'lucide-react'
import { useState } from 'react'
import { NewsPost } from '@/types/xclasses'
import { formatDate } from '@/lib/xclasses'

interface NewsModalProps {
  post: NewsPost | null
  isOpen: boolean
  onClose: () => void
}

export function NewsModal({ post, isOpen, onClose }: NewsModalProps) {
  const [copied, setCopied] = useState(false)

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

  const handleShare = async () => {
    if (navigator.share && post) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href
        })
      } catch (error) {
        // Fallback to copy
        handleCopy()
      }
    } else {
      handleCopy()
    }
  }

  const handleCopy = async () => {
    if (post) {
      try {
        await navigator.clipboard.writeText(window.location.href)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (error) {
        console.error('Failed to copy:', error)
      }
    }
  }

  if (!post) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex-shrink-0 mb-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge 
                      variant={post.tag === 'Release' ? 'default' : post.tag === 'Feature' ? 'secondary' : 'outline'}
                    >
                      {post.tag}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      {formatDate(post.publishedAt)}
                    </div>
                  </div>
                  <DialogTitle className="text-2xl font-bold">
                    {post.title}
                  </DialogTitle>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="ml-4"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="prose prose-gray max-w-none"
                dangerouslySetInnerHTML={{ __html: post.body.replace(/\n/g, '<br>') }}
              />
            </div>
            
            <div className="flex-shrink-0 border-t pt-4 mt-4">
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={handleShare}
                  className="flex items-center gap-2"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Share2 className="w-4 h-4" />
                      Share
                    </>
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  )
}
