export default function LessonPage({ params }: { params: { course: string; lesson: string } }) {
  return (
    <div className="min-h-screen">
      <h1 className="text-4xl font-bold text-center py-20">Lesson: {params.lesson}</h1>
      <div className="container mx-auto px-4">
        <p className="text-center text-lg text-muted-foreground">
          Course: {params.course} - Lesson content
        </p>
      </div>
    </div>
  );
}
