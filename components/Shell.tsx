"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCart } from "./CartProvider";
import { OfferBanner } from "./OfferBanner";
import { AIAssistant } from "./AIAssistant";
import { StickyMobileCTA } from "./StickyMobileCTA";
import data from "@/lib/data.json";
import { IconCart, IconChevron } from "./Icons";

const brand = data.brand;

export function Shell({ children }: { children: React.ReactNode }) {
  const { count, wish } = useCart();
  const wishCount = wish.length;
  const path = usePathname();
  const [mega, setMega] = useState(false);
  const [open, setOpen] = useState(false);
  const nav = [
    ["/", "Home"],
    ["/shop", brand.labels.shop],
    ["/atlas", "Atlas"],
    ["/locations", "Locations"],
    ["/blog", "Journal"],
    ["/account", "Account"],
    ["/cart", brand.labels.cart],
  ] as const;

  return (
    <div className="min-h-screen flex flex-col tc-root" data-style="wanderfolio-travel" data-diamond="batch-4" data-topclass="1">
      <a href="#main" className="skip-link">Skip to content</a>
      <OfferBanner />
      <header className="shell-header tc-header sticky top-0 z-40 border-b" style={{ borderColor: "var(--border)" }}>
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
          <Link href="/" className="group flex flex-col leading-none">
            <span className="font-display text-2xl tracking-tight md:text-3xl brand-mark" style={{ color: "var(--fg)" }}>{brand.name}</span>
            <span className="mt-1 text-[11px] uppercase tracking-[0.16em]" style={{ color: "var(--muted)" }}>{brand.styleDirection || brand.niche}</span>
          </Link>
          <nav className="hidden items-center gap-1 text-sm lg:flex" aria-label="Primary">
            {nav.map(([href, label]) => {
              const active = path === href || (href !== "/" && path.startsWith(href));
              return (
                <Link key={href} href={href} className="tap relative rounded-md px-3 transition duration-200 hover:opacity-90" style={{ color: active ? "var(--accent)" : "var(--fg)", background: active ? "color-mix(in srgb, var(--accent) 12%, transparent)" : "transparent" }}>
                  {label}
                </Link>
              );
            })}
            <button type="button" className="tap ml-1 inline-flex items-center gap-1 rounded-md px-3" onClick={() => setMega((v) => !v)} aria-expanded={mega}>
              Explore <IconChevron />
            </button>
            <Link href="/cart" className="tap relative ml-2 inline-flex items-center gap-2 rounded-md border px-3" style={{ borderColor: "var(--border)" }}>
              <IconCart /> <span>{count}</span>
              {wishCount > 0 ? <span className="text-xs" style={{ color: "var(--accent2)" }}>♥{wishCount}</span> : null}
            </Link>
          </nav>
          <button type="button" className="tap rounded-md border px-3 py-2 text-sm lg:hidden" style={{ borderColor: "var(--border)" }} onClick={() => setOpen((v) => !v)} aria-expanded={open}>
            Menu
          </button>
        </div>
        {mega ? (
          <div className="border-t px-4 py-6 md:px-6 tc-mega" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
            <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {(brand.features as { title: string; desc: string }[]).slice(0, 6).map((f) => (
                <Link key={f.title} href="/shop" className="diamond-panel tc-mega-card !p-4 transition hover:-translate-y-0.5" onClick={() => setMega(false)}>
                  <p className="font-display text-xl">{f.title}</p>
                  <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>{f.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        ) : null}
        {open ? (
          <nav className="flex flex-col gap-1 border-t px-4 py-3 lg:hidden" style={{ borderColor: "var(--border)" }} aria-label="Mobile">
            {nav.map(([href, label]) => (
              <Link key={href} href={href} className="rounded-md px-3 py-3 text-sm" onClick={() => setOpen(false)}>{label}</Link>
            ))}
            <Link href="/checkout" className="rounded-md px-3 py-3 text-sm" onClick={() => setOpen(false)}>Checkout</Link>
          </nav>
        ) : null}
      </header>
      <main id="main" className="flex-1 pb-24 lg:pb-0">{children}</main>
      <footer className="border-t py-12 tc-footer" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
        <div className="mx-auto grid max-w-6xl gap-8 px-4 md:grid-cols-4 md:px-6">
          <div className="md:col-span-2">
            <p className="font-display text-3xl brand-mark">{brand.name}</p>
            <p className="mt-2 max-w-md text-sm" style={{ color: "var(--muted)" }}>{brand.tagline}</p>
          </div>
          <div className="text-sm" style={{ color: "var(--muted)" }}>
            <p>Demo storefront · fake payments · English UI</p>
            <p className="mt-1">Style: {brand.styleDirection}</p>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <Link href="/blog">Journal</Link>
            <Link href="/locations">Locations</Link>
            <Link href="/atlas">Atlas</Link>
            <Link href="/account">Account</Link>
          </div>
        </div>
      </footer>
      <AIAssistant />
      <StickyMobileCTA />
    </div>
  );
}
