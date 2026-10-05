"use client";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import data from "@/lib/data.json";
import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@/lib/types";
import { MotionReveal } from "@/components/MotionReveal";

export default function ShopPage() {
  const products = data.products as Product[];
  const brand = data.brand;
  const civic = brand.mode === "civic";
  const sp = useSearchParams();
  const initial = sp.get("cat") || "All";
  const [cat, setCat] = useState(initial);
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("featured");

  const list = useMemo(() => {
    let out = products.filter((p) => (cat === "All" ? true : p.category === cat));
    if (q.trim()) {
      const s = q.toLowerCase();
      out = out.filter((p) => p.title.toLowerCase().includes(s) || p.description.toLowerCase().includes(s));
    }
    if (sort === "price-asc") out = [...out].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") out = [...out].sort((a, b) => b.price - a.price);
    if (sort === "rating") out = [...out].sort((a, b) => b.rating - a.rating);
    return out;
  }, [products, cat, q, sort]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em]" style={{ color: "var(--muted)" }}>{brand.labels.shop}</p>
          <h1 className="font-display text-4xl md:text-5xl">
            {civic ? "Citizen services directory" : "Catalog with filters that matter"}
          </h1>
        </div>
        <p className="text-sm" style={{ color: "var(--muted)" }}>{list.length} results · promo {brand.offer.code}</p>
      </div>
      <div className="mt-8 flex flex-col gap-3 rounded-2xl border p-4 md:flex-row md:items-center" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={civic ? "Search services…" : "Search…"} className="flex-1 rounded-xl border px-3 py-2.5 text-sm" style={{ borderColor: "var(--border)", background: "var(--bg)" }} />
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-xl border px-3 py-2.5 text-sm" style={{ borderColor: "var(--border)", background: "var(--bg)" }}>
          <option value="featured">Featured</option>
          <option value="price-asc">Price ↑</option>
          <option value="price-desc">Price ↓</option>
          <option value="rating">Top rated</option>
        </select>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {["All", ...brand.categories].map((c: string) => (
          <button key={c} onClick={() => setCat(c)} className="rounded-full border px-3 py-1.5 text-sm" style={{ borderColor: cat === c ? "var(--accent)" : "var(--border)", background: cat === c ? "color-mix(in srgb, var(--accent) 14%, transparent)" : "transparent" }}>{c}</button>
        ))}
      </div>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p, i) => (
          <MotionReveal key={p.id} delay={(i % 6) * 40}>
            <ProductCard product={p} />
          </MotionReveal>
        ))}
      </div>
    </div>
  );
}
