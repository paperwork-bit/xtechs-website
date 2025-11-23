export const runtime = 'edge';

export default function BlogPostPage({ params }: { params: { post: string } }) {
  return (
    <div className="min-h-screen">
      <h1 className="text-4xl font-bold text-center py-20">Blog Post: {params.post}</h1>
      <div className="container mx-auto px-4">
        <p className="text-center text-lg text-muted-foreground">
          Blog post content
        </p>
      </div>
    </div>
  );
}
