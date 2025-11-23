'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { PageHero } from '@/components/ui/page-hero'
import { VideoGrid } from '@/components/ui/video-grid'
import { CommunityPanel } from '@/components/ui/community-panel'
import { SubscribeDialog } from '@/components/ui/subscribe-dialog'
import { ComingSoonInline } from '@/components/ui/coming-soon-inline'
import { InlineFilterBar } from '@/components/ui/inline-filter-bar'
import { Play, Users } from 'lucide-react'
import { VideoItem, Announcement, VideoCategory } from '@/types/xclasses'
import { getVideos, getAnnouncements } from '@/lib/xclasses'

export default function XClassesPage() {
  const [activeTab, setActiveTab] = useState('videos')
  const [selectedCategory, setSelectedCategory] = useState<VideoCategory>('All')
  const [videos, setVideos] = useState<VideoItem[]>([])
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Load data
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      try {
        const [videosData, announcementsData] = await Promise.all([
          getVideos(selectedCategory === 'All' ? undefined : selectedCategory),
          getAnnouncements()
        ])
        setVideos(videosData)
        setAnnouncements(announcementsData)
      } catch (error) {
        console.error('Failed to load data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [selectedCategory])

  const handleCategoryChange = (category: VideoCategory) => {
    setSelectedCategory(category)
  }


  const handleJoinCommunity = () => {
    window.open('https://discord.gg/QPw8VrSc', '_blank')
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <PageHero
        title="X-Classes"
        subtitle="Learn, stay updated, and connect with the community."
        onSubscribe={() => setIsSubscribeOpen(true)}
        onJoinCommunity={handleJoinCommunity}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Desktop Tabs */}
        <div className="hidden md:block">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="videos" className="flex items-center gap-2">
                <Play className="w-4 h-4" />
                Videos
              </TabsTrigger>
              <TabsTrigger value="community" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Community
              </TabsTrigger>
            </TabsList>

            <TabsContent value="videos" className="space-y-6">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="bg-muted aspect-video rounded-lg mb-4" />
                      <div className="space-y-2">
                        <div className="h-4 bg-muted rounded w-3/4" />
                        <div className="h-3 bg-muted rounded w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <VideoGrid videos={videos} />
              )}
            </TabsContent>

            <TabsContent value="community" className="space-y-6">
              {isLoading ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-64 bg-muted rounded-lg" />
                    </div>
                  ))}
                </div>
              ) : (
                <CommunityPanel announcements={announcements} />
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Mobile Select */}
        <div className="md:hidden space-y-6">
          <Select value={activeTab} onValueChange={setActiveTab}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="videos">
                <div className="flex items-center gap-2">
                  <Play className="w-4 h-4" />
                  Videos
                </div>
              </SelectItem>
              <SelectItem value="community">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Community
                </div>
              </SelectItem>
            </SelectContent>
          </Select>

          <AnimatePresence mode="wait">
            {activeTab === 'videos' && (
              <motion.div
                key="videos"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {isLoading ? (
                  <div className="grid grid-cols-1 gap-6">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="animate-pulse">
                        <div className="bg-muted aspect-video rounded-lg mb-4" />
                        <div className="space-y-2">
                          <div className="h-4 bg-muted rounded w-3/4" />
                          <div className="h-3 bg-muted rounded w-1/2" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <VideoGrid videos={videos} />
                )}
              </motion.div>
            )}

            {activeTab === 'community' && (
              <motion.div
                key="community"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {isLoading ? (
                  <div className="space-y-6">
                    {[...Array(2)].map((_, i) => (
                      <div key={i} className="animate-pulse">
                        <div className="h-64 bg-muted rounded-lg" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <CommunityPanel announcements={announcements} />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Modals */}
      <SubscribeDialog
        isOpen={isSubscribeOpen}
        onClose={() => setIsSubscribeOpen(false)}
      />
    </div>
  )
}
