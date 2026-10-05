"use client";
import data from "@/lib/data.json";
import type { Product } from "@/lib/types";
import Link from "next/link";
import { MotionReveal } from "./MotionReveal";

export function FilmStrip() {
  const products = (data.products as Product[]).slice(0, 10);
  const brand = data.brand;
  const civic = brand.mode === "civic";
  return (
    <MotionReveal className="diamond-filmstrip tc-filmstrip">
      <div className="mb-4 flex items-end justify-between gap-4 px-4 md:px-6">
        <div>
          <p className="text-xs uppercase tracking-[0.2em]" style={{ color: "var(--muted)" }}>
            {civic ? "Service stills" : "Cinema strip"}
          </p>
          <h2 className="font-display text-3xl">{civic ? "Counter & kiosk frames" : "Lookbook reel"}</h2>
        </div>
        <Link href="/shop" className="text-sm font-semibold" style={{ color: "var(--accent)" }}>
          {brand.labels.shop} →
        </Link>
      </div>
      <div className="diamond-filmstrip-row">
        {products.map((p) => (
          <Link key={p.id} href={"/product/" + p.id} className="diamond-filmstrip-card tc-film-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.image} alt="" />
            <span>{p.title}</span>
          </Link>
        ))}
      </div>
    </MotionReveal>
  );
}
