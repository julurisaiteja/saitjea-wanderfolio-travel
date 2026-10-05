"use client";
import data from "@/lib/data.json";

export function Marquee() {
  const items = (data.brand.marquee as string[]) || [];
  if (!items.length) return null;
  const line = [...items, ...items, ...items].join(" · ");
  return (
    <div className="diamond-marquee tc-marquee" aria-hidden="true">
      <div className="diamond-marquee-track">
        <span>{line}</span>
        <span>{line}</span>
      </div>
    </div>
  );
}
