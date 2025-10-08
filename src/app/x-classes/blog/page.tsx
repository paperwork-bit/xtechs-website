import Link from "next/link";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

type Post = { slug: string; title: string; excerpt: string; date: string; category?: string };

export default async function BlogIndex() {
  const dir = path.join(process.cwd(), "xtechs-website", "content", "blog");
  let posts: Post[] = [];
  try {
    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));
    posts = files.map((file) => {
      const slug = file.replace(/\.(md|mdx)$/i, "");
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const { data } = matter(raw);
      return {
        slug,
        title: data.title || slug,
        excerpt: data.excerpt || "",
        date: data.date || new Date().toISOString(),
        category: data.category || "General",
      } as Post;
    });
    posts.sort((a, b) => +new Date(b.date) - +new Date(a.date));
  } catch {}

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-bold">Blog</h1>
          <p className="mt-4 text-gray-600 max-w-3xl mx-auto">Case studies, product updates and practical guides from the xTechs team.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {posts.map((p) => (
            <article key={p.slug} className="rounded-xl border bg-white p-6 shadow-sm">
              <div className="text-xs text-muted-foreground mb-2">{p.category} · {new Date(p.date).toLocaleDateString()}</div>
              <h2 className="font-semibold text-lg mb-2">{p.title}</h2>
              <p className="text-sm text-gray-700 mb-4 line-clamp-3">{p.excerpt}</p>
              <Link href={`/x-classes/blog/${p.slug}`} className="inline-flex rounded-lg bg-primary px-3 py-2 text-sm text-primary-foreground hover:bg-primary/90">Read more</Link>
            </article>
          ))}
          {!posts.length && (
            <div className="col-span-full text-center text-muted-foreground">No posts yet. Add markdown files under <code>/content/blog</code>.</div>
          )}
        </div>
      </section>
    </main>
  );
}


