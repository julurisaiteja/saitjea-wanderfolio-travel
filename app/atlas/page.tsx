"use client";
import Link from "next/link";
import data from "@/lib/data.json";
import { ProductCard } from "@/components/ProductCard";
import { MotionReveal } from "@/components/MotionReveal";
import { NicheTool } from "@/components/NicheTool";
import type { Product } from "@/lib/types";

export default function NicheDiamondPage() {
  const brand = data.brand;
  const products = data.products as Product[];
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      <p className="text-xs uppercase tracking-[0.2em]" style={{ color: "var(--muted)" }}>{brand.styleDirection || brand.niche}</p>
      <h1 className="mt-2 font-display text-4xl md:text-5xl">Stamp atlas</h1>
      <p className="mt-3 max-w-2xl text-sm" style={{ color: "var(--muted)" }}>Airmail routes, visa tips, and stamped itineraries ready to hold.</p>
      <div className="mt-10"><NicheTool /></div>
      <MotionReveal className="mt-12">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display text-3xl">Featured picks</h2>
          <Link href="/shop" className="text-sm font-semibold" style={{ color: "var(--accent)" }}>{brand.labels.shop} →</Link>
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.slice(0, 6).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </MotionReveal>
      <MotionReveal className="mt-12 grid gap-4 md:grid-cols-2">
        {(brand.features as { title: string; desc: string }[]).map((f) => (
          <div key={f.title} className="diamond-panel">
            <h3 className="font-display text-2xl">{f.title}</h3>
            <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>{f.desc}</p>
          </div>
        ))}
      </MotionReveal>
    </div>
  );
}
