"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import data from "@/lib/data.json";

export function StickyMobileCTA() {
  const path = usePathname();
  const brand = data.brand;
  if (path.startsWith("/checkout") || path.startsWith("/success")) return null;
  const href = brand.mode === "civic" ? "/shop" : "/shop";
  const label = brand.mode === "civic" ? "Find a service" : brand.labels.shop;
  return (
    <div className="diamond-sticky-cta lg:hidden">
      <Link href={href} className="diamond-sticky-btn">{label}</Link>
      <Link href="/cart" className="diamond-sticky-btn ghost">{brand.labels.cart}</Link>
    </div>
  );
}
