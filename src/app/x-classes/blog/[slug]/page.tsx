import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

type Params = { params: { slug: string } };

export default async function BlogPost({ params }: Params) {
  const file = path.join(process.cwd(), "xtechs-website", "content", "blog", `${params.slug}.md`);
  const raw = fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
  const { data, content } = matter(raw || "---\ntitle: Post\nexcerpt: \n---\n");
  const html = marked.parse(content || "") as string;

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <section className="mx-auto max-w-3xl px-6 py-16 md:py-20">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">{data.title || params.slug}</h1>
        <div className="text-sm text-muted-foreground mb-8">{data.date ? new Date(data.date).toLocaleDateString() : ""}</div>
        <article className="prose prose-gray max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
      </section>
    </main>
  );
}


