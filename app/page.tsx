"use client";
import Link from "next/link";
import data from "@/lib/data.json";
import { ProductCard } from "@/components/ProductCard";
import { NicheTool } from "@/components/NicheTool";
import { HeroFilm } from "@/components/HeroFilm";
import type { Product } from "@/lib/types";
import { Marquee } from "@/components/Marquee";
import { StatRow } from "@/components/StatRow";
import { FilmStrip } from "@/components/FilmStrip";
import { Newsletter } from "@/components/Newsletter";
import { MotionReveal } from "@/components/MotionReveal";
import { OfferSpot } from "@/components/OfferSpot";
import { ReviewRail } from "@/components/ReviewRail";
import { FaqBlock } from "@/components/FaqBlock";

const brand = data.brand;
const products = data.products as Product[];

export default function HomePage() {
  return (
    <>
      <Marquee />
      <div className="airmail" />
      <section className="wf-hero">
        <div className="postcard">
          <HeroFilm video={brand.heroVideo} image={brand.heroImage} className="!relative min-h-[100svh]" />
        </div>
        <div className="wf-hero-copy mx-auto w-full max-w-6xl md:px-6">
          <h1 className="font-display text-5xl leading-[1.05] md:text-6xl">{brand.name}</h1>
          <p className="mt-3 max-w-xl text-base md:text-lg" style={{ color: "var(--fg)" }}>{brand.tagline}</p>
          <div className="wf-cta-row flex flex-wrap gap-3">
            <Link href="/shop" className="rounded-md px-5 py-3 text-sm font-semibold text-white" style={{ background: "var(--accent)" }}>Browse packages</Link>
            <Link href="/atlas" className="rounded-md border px-5 py-3 text-sm font-semibold" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>Open atlas</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
        <div className="mb-8"><NicheTool /></div>
        <h2 className="font-display text-4xl">Stamped itineraries</h2>
        <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>{products.length} routes ready to hold</p>
        <div className="postcard-stack mt-8">
          {products.slice(0, 9).map((p, i) => (
            <MotionReveal key={p.id} delay={i * 35} className="postcard !p-3">
              <ProductCard product={p} />
            </MotionReveal>
          ))}
        </div>
      </section>
      <OfferSpot />
      <StatRow />
      <FilmStrip />
      <ReviewRail />
      <FaqBlock />
      <MotionReveal className="mx-auto max-w-6xl px-4 pb-16 md:px-6"><Newsletter /></MotionReveal>
    </>
  );
}
