export type VideoItem = {
  id: string
  title: string
  description?: string
  category: 'Getting Started' | 'Workflows' | 'Tips & Tricks' | 'Release Highlights'
  source: { kind: 'youtube' | 'vimeo' | 'mp4'; id?: string; url?: string }
  durationSec?: number
  publishedAt: string // ISO
  thumbnailUrl?: string
}

export type NewsPost = {
  slug: string
  title: string
  tag: 'Release' | 'Feature' | 'Guide'
  excerpt: string
  body: string // support markdown
  publishedAt: string // ISO
}

export type Announcement = {
  id: string
  title: string
  body: string
  publishedAt: string
}

// Optional category enum used by /x-classes page
export type VideoCategory = 'Getting Started' | 'Workflows' | 'Tips & Tricks' | 'Release Highlights'

// Utility type for X-Vrything/X-verything alias
export type XProductName = 'X-Vrything' | 'X-verything'

// Utility function to normalize product names
export const normalizeXProductName = (name: string): XProductName => {
  const normalized = name.toLowerCase().trim()
  if (normalized.includes('vrthing')) return 'X-Vrything'
  if (normalized.includes('verything')) return 'X-verything'
  return 'X-Vrything' // default
}

// Utility function to get display name
export const getXProductDisplayName = (): string => {
  return 'X-Vrything / X-verything'
}
