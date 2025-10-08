import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { ArrowLeft, Calendar, Share2, Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { getNewsPostBySlug, getNewsPosts, formatDate } from '@/lib/xclasses'
import Link from 'next/link'

interface NewsPostPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const posts = await getNewsPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: NewsPostPageProps): Promise<Metadata> {
  const post = await getNewsPostBySlug(params.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found | X-Classes',
    }
  }

  return {
    title: `${post.title} | X-Classes`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
    },
  }
}

export default async function NewsPostPage({ params }: NewsPostPageProps) {
  const post = await getNewsPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/x-classes" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to X-Classes
              </Link>
            </Button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
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

            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              {post.title}
            </h1>

            <p className="text-lg text-muted-foreground">
              {post.excerpt}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <article className="prose prose-gray max-w-none">
          <div 
            className="whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ __html: post.body.replace(/\n/g, '<br>') }}
          />
        </article>

        {/* Share Section */}
        <div className="mt-12 pt-8 border-t">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold mb-2">Share this post</h3>
              <p className="text-sm text-muted-foreground">
                Help others discover this content
              </p>
            </div>
            
            <Button variant="outline" className="flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              Share
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 pt-8 border-t">
          <Button variant="outline" asChild>
            <Link href="/x-classes" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to X-Classes
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
