'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, ArrowRight } from 'lucide-react'
import { NewsPost } from '@/types/xclasses'
import { formatDate } from '@/lib/xclasses'

interface NewsListProps {
  posts: NewsPost[]
  onSelect?: (post: NewsPost) => void
  className?: string
}

export function NewsList({ posts, onSelect, className = '' }: NewsListProps) {
  if (posts.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
            <Calendar className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No news yet</h3>
          <p className="text-muted-foreground">
            We're working on creating great content. Check back soon!
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {posts.map((post, index) => (
        <motion.div
          key={post.slug}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="hover:shadow-md transition-all duration-300 cursor-pointer group">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge 
                      variant={post.tag === 'Release' ? 'default' : post.tag === 'Feature' ? 'secondary' : 'outline'}
                      className="text-xs"
                    >
                      {post.tag}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {formatDate(post.publishedAt)}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              <p className="text-muted-foreground mb-4 line-clamp-3">
                {post.excerpt}
              </p>
              
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onSelect?.(post)}
                className="group/btn"
              >
                Read more
                <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
