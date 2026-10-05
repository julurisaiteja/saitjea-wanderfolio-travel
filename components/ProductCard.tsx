"use client";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { IconStar } from "./Icons";
import { money } from "@/lib/format";
import { useCart } from "./CartProvider";
import data from "@/lib/data.json";

export function ProductCard({ product }: { product: Product }) {
  const { add, toggleWish, wish } = useCart();
  const mode = data.brand.mode;
  const saved = wish.includes(product.id);
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border transition duration-300 hover:-translate-y-1" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
      <div className="relative aspect-[4/3] overflow-hidden">
        <Link href={`/product/${product.id}`}>
          <Image src={product.image} alt={product.title} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="(max-width:768px) 100vw, 33vw" />
        </Link>
        <button onClick={() => toggleWish(product.id)} className="tap absolute right-3 top-3 rounded-full px-3 text-xs font-semibold backdrop-blur transition duration-200" style={{ background: "color-mix(in srgb, var(--bg) 80%, transparent)", color: saved ? "var(--accent)" : "var(--fg)" }}>
          {saved ? "Saved" : "Save"}
        </button>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.16em]" style={{ color: "var(--muted)" }}>{product.category}</p>
            <Link href={`/product/${product.id}`} className="font-display text-xl leading-tight">{product.title}</Link>
            <p className="mt-1 inline-flex flex-wrap items-center gap-1 text-xs" style={{ color: "var(--muted)" }}><IconStar className="icon-svg h-3.5 w-3.5" aria-hidden="true" /> <span>{product.rating.toFixed(1)} · {product.reviewCount} reviews</span></p>
          </div>
          <p className="shrink-0 text-sm font-semibold">{money(product.price)}{mode === "booking" && data.brand.niche === "hotel" ? <span className="font-normal" style={{ color: "var(--muted)" }}>/night</span> : null}</p>
        </div>
        <p className="line-clamp-2 text-sm" style={{ color: "var(--muted)" }}>{product.description}</p>
        <button onClick={() => add(product)} className="tap mt-auto rounded-xl px-4 text-sm font-semibold transition duration-200 hover:opacity-90" style={{ background: "var(--accent)", color: data.brand.dark ? "#111" : "#fff" }}>{data.brand.labels.cta}</button>
      </div>
    </article>
  );
}
