import { VideoItem, NewsPost, Announcement } from '@/types/xclasses'
import { sampleVideos } from '@/data/xclasses/videos'
import { sampleNews } from '@/data/xclasses/news'
import { sampleAnnouncements } from '@/data/xclasses/announcements'

// Data access functions for X-Classes content
// These can be easily swapped out for CMS integration later

export const getVideos = async (category?: string): Promise<VideoItem[]> => {
  // Simulate async data fetching
  await new Promise(resolve => setTimeout(resolve, 100))
  
  if (category && category !== 'All') {
    return sampleVideos.filter(video => video.category === category)
  }
  
  return sampleVideos
}

export const getVideoById = async (id: string): Promise<VideoItem | null> => {
  await new Promise(resolve => setTimeout(resolve, 50))
  return sampleVideos.find(video => video.id === id) || null
}

export const getNewsPosts = async (): Promise<NewsPost[]> => {
  await new Promise(resolve => setTimeout(resolve, 100))
  return sampleNews.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}

export const getNewsPostBySlug = async (slug: string): Promise<NewsPost | null> => {
  await new Promise(resolve => setTimeout(resolve, 50))
  return sampleNews.find(post => post.slug === slug) || null
}

export const getAnnouncements = async (): Promise<Announcement[]> => {
  await new Promise(resolve => setTimeout(resolve, 50))
  return sampleAnnouncements.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}

// Utility functions for formatting
export const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export const formatRelativeDate = (dateString: string): string => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInMs = now.getTime() - date.getTime()
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
  
  if (diffInDays === 0) return 'Today'
  if (diffInDays === 1) return 'Yesterday'
  if (diffInDays < 7) return `${diffInDays} days ago`
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`
  return `${Math.floor(diffInDays / 365)} years ago`
}

// Video category options
export const videoCategories = [
  'All',
  'Getting Started',
  'Workflows',
  'Tips & Tricks',
  'Release Highlights'
] as const

export type VideoCategory = typeof videoCategories[number]
