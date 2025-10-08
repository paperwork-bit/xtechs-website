import { VideoItem } from '@/types/xclasses'

export const sampleVideos: VideoItem[] = [
  {
    id: 'company-podcast',
    title: 'Company Podcast - Renewable Energy Insights',
    description: 'Join us for an insightful discussion about the latest trends and innovations in renewable energy technology.',
    category: 'Release Highlights',
    source: { kind: 'youtube', id: 'yTGwyprrWeo' },
    durationSec: 0, // Duration removed - will not display
    publishedAt: '2024-12-01T10:00:00Z',
    thumbnailUrl: 'https://img.youtube.com/vi/yTGwyprrWeo/maxresdefault.jpg'
  },
  {
    id: 'company-competition',
    title: 'Company Competition - Innovation Challenge',
    description: 'Watch our exciting competition showcasing cutting-edge renewable energy solutions and innovative projects.',
    category: 'Release Highlights',
    source: { kind: 'youtube', id: 'hDGqzp1-E9c' },
    durationSec: 0, // Duration removed - will not display
    publishedAt: '2024-12-01T14:00:00Z',
    thumbnailUrl: 'https://img.youtube.com/vi/hDGqzp1-E9c/maxresdefault.jpg'
  },
  {
    id: 'new-video-gaRlbufKnkE',
    title: 'New Video - xTechs Renewable Energy Solutions',
    description: 'Learn about xTechs innovative renewable energy solutions and how we are transforming the clean energy landscape.',
    category: 'Getting Started',
    source: { kind: 'youtube', id: 'gaRlbufKnkE' },
    durationSec: 0, // Duration removed - will not display
    publishedAt: '2024-12-15T10:00:00Z',
    thumbnailUrl: 'https://img.youtube.com/vi/gaRlbufKnkE/maxresdefault.jpg'
  }
]
