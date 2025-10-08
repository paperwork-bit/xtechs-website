# X-Classes Implementation

This document describes the X-Classes page implementation for the xTechs website.

## Overview

X-Classes is a central hub for:
- Tutorial videos for X-vrthing/X-verything
- News and updates about the product and company
- Community connections and resources
- Coming Soon notifications for X-vrthing/X-verything

## File Structure

```
src/
├── app/
│   └── x-classes/
│       ├── page.tsx                    # Main X-Classes page
│       └── news/
│           └── [slug]/
│               └── page.tsx            # Dynamic news post pages
├── components/
│   └── ui/
│       ├── coming-soon-pill.tsx        # Coming soon badge
│       ├── coming-soon-inline.tsx      # Inline coming soon notice
│       ├── page-hero.tsx               # Page hero section
│       ├── video-grid.tsx              # Video grid component
│       ├── video-player-modal.tsx      # Video player modal
│       ├── news-list.tsx               # News list component
│       ├── news-modal.tsx              # News detail modal
│       ├── community-panel.tsx         # Community panel
│       ├── subscribe-dialog.tsx        # Newsletter subscription
│       └── inline-filter-bar.tsx       # Video category filters
├── types/
│   └── xclasses.ts                     # TypeScript types
├── data/
│   └── xclasses/
│       ├── videos.ts                   # Sample video data
│       ├── news.ts                     # Sample news data
│       └── announcements.ts            # Sample announcements
└── lib/
    ├── xclasses.ts                     # Data access functions
    └── newsletter.ts                   # Newsletter utilities
```

## How to Add New Content

### Adding a New Video

1. Open `src/data/xclasses/videos.ts`
2. Add a new video object to the `sampleVideos` array:

```typescript
{
  id: 'unique-video-id',
  title: 'Video Title',
  description: 'Video description',
  category: 'Getting Started' | 'Workflows' | 'Tips & Tricks' | 'Release Highlights',
  source: { 
    kind: 'youtube' | 'vimeo' | 'mp4', 
    id: 'video-id', // for YouTube/Vimeo
    url: '/videos/video.mp4' // for MP4 files
  },
  durationSec: 180, // duration in seconds
  publishedAt: '2024-01-15T10:00:00Z', // ISO date
  thumbnailUrl: 'https://example.com/thumb.jpg' // optional
}
```

### Adding a New News Post

1. Open `src/data/xclasses/news.ts`
2. Add a new post object to the `sampleNews` array:

```typescript
{
  slug: 'url-friendly-slug',
  title: 'Post Title',
  tag: 'Release' | 'Feature' | 'Guide',
  excerpt: 'Brief description of the post',
  body: `# Post Content

Full post content in markdown format...`,
  publishedAt: '2024-01-15T10:00:00Z'
}
```

### Adding a New Announcement

1. Open `src/data/xclasses/announcements.ts`
2. Add a new announcement object to the `sampleAnnouncements` array:

```typescript
{
  id: 'unique-announcement-id',
  title: 'Announcement Title',
  body: 'Announcement content',
  publishedAt: '2024-01-15T10:00:00Z'
}
```

## Features

### Video Support
- YouTube videos (embed with autoplay)
- Vimeo videos (embed with autoplay)
- Local MP4 files (native video player)
- Responsive grid layout
- Category filtering
- Duration display
- Thumbnail support

### News System
- Markdown content support
- Tag-based categorization
- Modal and dedicated page views
- Share functionality
- SEO optimization

### Community Features
- FAQ accordion
- Quick links
- Community platform integration
- Announcements feed
- Newsletter subscription

### Accessibility
- Keyboard navigation
- Focus management
- Screen reader support
- Reduced motion support
- ARIA labels and roles

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimization
- Touch-friendly interactions
- Adaptive layouts

## Environment Variables

Add these to your `.env.local` file:

```env
DISCORD_URL=https://discord.gg/QPw8VrSc
```

## Future CMS Integration

The data access layer in `src/lib/xclasses.ts` is designed to be easily swapped out for a CMS:

1. Replace the mock data functions with API calls
2. Update the data fetching logic
3. The UI components will work without changes

## Testing

The implementation includes:
- Loading states
- Error handling
- Empty states
- Responsive breakpoints
- Accessibility compliance

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Progressive enhancement for older browsers
