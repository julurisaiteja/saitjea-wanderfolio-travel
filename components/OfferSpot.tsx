"use client";
import Link from "next/link";
import data from "@/lib/data.json";
import { MotionReveal } from "./MotionReveal";

export function OfferSpot() {
  const o = data.brand.offer;
  const civic = data.brand.mode === "civic";
  return (
    <MotionReveal className="tc-offer">
      <div>
        <p className="text-xs uppercase tracking-[0.2em]" style={{ color: "var(--muted)" }}>
          {civic ? "Fee credit" : "Limited offer"}
        </p>
        <h2 className="mt-2 font-display text-3xl md:text-4xl">{o.title}</h2>
        <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>{o.detail}</p>
      </div>
      <div className="tc-offer-code">
        <span>{o.code}</span>
        <Link href={civic ? "/checkout" : "/shop"} className="tc-offer-link">
          {civic ? "Apply at fee pay" : "Shop with code"} →
        </Link>
      </div>
    </MotionReveal>
  );
}
