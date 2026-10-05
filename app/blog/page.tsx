import Link from "next/link";
import data from "@/lib/data.json";

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      <h1 className="font-display text-4xl">Journal</h1>
      <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>Tips and stories from {data.brand.name}.</p>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {data.brand.blog.map((b: { title: string; excerpt: string }) => (
          <article key={b.title} className="rounded-2xl border p-6" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
            <h2 className="font-display text-2xl">{b.title}</h2>
            <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>{b.excerpt}</p>
            <p className="mt-4 text-xs uppercase tracking-[0.16em]" style={{ color: "var(--accent)" }}>3 min read · demo</p>
          </article>
        ))}
        {data.brand.faqs.map((f: { q: string; a: string }) => (
          <article key={f.q} className="rounded-2xl border p-6" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
            <h2 className="font-display text-2xl">{f.q}</h2>
            <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>{f.a}</p>
          </article>
        ))}
      </div>
      <Link href="/shop" className="mt-8 inline-block text-sm font-semibold" style={{ color: "var(--accent)" }}>Back to {data.brand.labels.shop} →</Link>
    </div>
  );
}
