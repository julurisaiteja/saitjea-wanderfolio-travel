"use client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import data from "@/lib/data.json";
import { money } from "@/lib/format";
import { useCart } from "@/components/CartProvider";
import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@/lib/types";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const products = data.products as Product[];
  const product = products.find((p) => p.id === id);
  const { add, toggleWish, wish } = useCart();
  const [variant, setVariant] = useState(product?.variants?.[0] || "");
  const [img, setImg] = useState(0);
  const related = useMemo(() => products.filter((p) => p.category === product?.category && p.id !== product?.id).slice(0, 3), [products, product]);

  if (!product) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-20 md:px-6">
        <h1 className="font-display text-3xl">Not found</h1>
        <Link href="/shop" className="mt-4 inline-block" style={{ color: "var(--accent)" }}>Back to {data.brand.labels.shop}</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <div className="relative aspect-square overflow-hidden rounded-3xl border" style={{ borderColor: "var(--border)" }}>
            <Image src={product.images[img] || product.image} alt={product.title} fill className="object-cover" sizes="50vw" priority />
          </div>
          <div className="mt-3 flex gap-2">
            {product.images.map((src, i) => (
              <button key={src + i} onClick={() => setImg(i)} className="relative h-20 w-20 overflow-hidden rounded-xl border" style={{ borderColor: img === i ? "var(--accent)" : "var(--border)" }}>
                <Image src={src} alt="" fill className="object-cover" sizes="80px" />
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.18em]" style={{ color: "var(--muted)" }}>{product.category}</p>
          <h1 className="mt-2 font-display text-4xl md:text-5xl">{product.title}</h1>
          <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>★ {product.rating.toFixed(1)} · {product.reviewCount} reviews</p>
          <p className="mt-4 text-2xl font-semibold">{money(product.price)}</p>
          <p className="mt-4 text-base leading-relaxed" style={{ color: "var(--muted)" }}>{product.description}</p>
          <div className="mt-6">
            <p className="text-sm font-semibold">Options</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.variants.map((v) => (
                <button key={v} onClick={() => setVariant(v)} className="rounded-xl border px-3 py-2 text-sm" style={{ borderColor: variant === v ? "var(--accent)" : "var(--border)", background: variant === v ? "color-mix(in srgb, var(--accent) 14%, transparent)" : "transparent" }}>{v}</button>
              ))}
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <button onClick={() => add(product, 1, variant)} className="rounded-xl px-5 py-3 text-sm font-semibold" style={{ background: "var(--accent)", color: data.brand.dark ? "#111" : "#fff" }}>{data.brand.labels.cta}</button>
            <button onClick={() => toggleWish(product.id)} className="rounded-xl border px-5 py-3 text-sm font-semibold" style={{ borderColor: "var(--border)" }}>{wish.includes(product.id) ? "Saved" : "Wishlist"}</button>
          </div>
          <dl className="mt-8 grid gap-3 rounded-2xl border p-4 text-sm md:grid-cols-2" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
            {product.specs.map(([k, v]) => (
              <div key={k}><dt style={{ color: "var(--muted)" }}>{k}</dt><dd className="font-semibold">{v}</dd></div>
            ))}
            <div><dt style={{ color: "var(--muted)" }}>Care</dt><dd className="font-semibold">{data.brand.pdpExtras.care}</dd></div>
            <div><dt style={{ color: "var(--muted)" }}>Fulfillment</dt><dd className="font-semibold">{data.brand.pdpExtras.ships}</dd></div>
          </dl>
          <div className="mt-8 space-y-3">
            <h2 className="font-display text-2xl">FAQ</h2>
            {product.faq.map((f) => (
              <details key={f.q} className="rounded-xl border px-4 py-3" style={{ borderColor: "var(--border)" }}>
                <summary className="cursor-pointer font-semibold">{f.q}</summary>
                <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-3xl">Related</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
