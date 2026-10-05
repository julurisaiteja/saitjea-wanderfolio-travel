"use client";
import Link from "next/link";
import data from "@/lib/data.json";
import { useCart } from "@/components/CartProvider";

type Loc = { name?: string; city?: string; address: string; hours?: string; note?: string };

export default function AccountPage() {
  const { wish, count } = useCart();
  const civic = data.brand.mode === "civic";
  const locations = data.brand.locations as Loc[];
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      <h1 className="font-display text-4xl">{civic ? "My CivicGate" : "Account"}</h1>
      <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
        {civic ? "Demo citizen profile — preferences persist in this browser." : "Demo profile — preferences persist in this browser."}
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border p-5" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
          <p className="text-xs uppercase tracking-[0.16em]" style={{ color: "var(--muted)" }}>{civic ? "Saved services" : "Wishlist"}</p>
          <p className="mt-2 font-display text-3xl">{wish.length}</p>
          <Link href="/shop" className="mt-3 inline-block text-sm" style={{ color: "var(--accent)" }}>{civic ? "Browse services →" : "Find more →"}</Link>
        </div>
        <div className="rounded-2xl border p-5" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
          <p className="text-xs uppercase tracking-[0.16em]" style={{ color: "var(--muted)" }}>{data.brand.labels.cart}</p>
          <p className="mt-2 font-display text-3xl">{count}</p>
          <Link href="/cart" className="mt-3 inline-block text-sm" style={{ color: "var(--accent)" }}>Open →</Link>
        </div>
        <div className="rounded-2xl border p-5" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
          <p className="text-xs uppercase tracking-[0.16em]" style={{ color: "var(--muted)" }}>{civic ? "Status" : "Loyalty"}</p>
          <p className="mt-2 font-display text-3xl">{civic ? "Verified" : "Member"}</p>
          <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
            {civic ? `Fee credit ${data.brand.offer.code} available on eligible filings.` : `Earn points on demo checkouts. Code ${data.brand.offer.code} stacks.`}
          </p>
        </div>
      </div>
      <div className="mt-8 rounded-2xl border p-5" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
        <h2 className="font-display text-2xl">{civic ? "Preferred centers" : "Saved locations"}</h2>
        <ul className="mt-4 space-y-2 text-sm">
          {locations.map((l) => {
            const label = l.name || l.city || l.address;
            return (
              <li key={label}>
                <strong>{label}</strong> — {l.address}
                {l.hours ? <span style={{ color: "var(--muted)" }}> · {l.hours}</span> : null}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
