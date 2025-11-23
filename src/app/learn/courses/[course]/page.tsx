export default function CoursePage({ params }: { params: { course: string } }) {
  return (
    <div className="min-h-screen">
      <h1 className="text-4xl font-bold text-center py-20">Course: {params.course}</h1>
      <div className="container mx-auto px-4">
        <p className="text-center text-lg text-muted-foreground">
          Course content and lessons
        </p>
      </div>
    </div>
  );
}
