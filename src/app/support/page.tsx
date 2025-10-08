export default function SupportPage() {
  return (
    <div className="min-h-screen">
      <h1 className="text-4xl font-bold text-center py-20">Support</h1>
      <div className="container mx-auto px-4">
        <p className="text-center text-lg text-muted-foreground mb-8">
          Get help with your renewable energy questions
        </p>
        <div className="max-w-md mx-auto">
          <input 
            type="search" 
            placeholder="Search support articles..." 
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
      </div>
    </div>
  );
}
