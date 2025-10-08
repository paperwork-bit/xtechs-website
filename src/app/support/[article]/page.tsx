export default function SupportArticlePage({ params }: { params: { article: string } }) {
  return (
    <div className="min-h-screen">
      <h1 className="text-4xl font-bold text-center py-20">Support Article: {params.article}</h1>
      <div className="container mx-auto px-4">
        <p className="text-center text-lg text-muted-foreground">
          Support article content
        </p>
      </div>
    </div>
  );
}
