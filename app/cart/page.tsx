"use client";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { money } from "@/lib/format";
import data from "@/lib/data.json";

export default function CartPage() {
  const { items, setQty, remove, subtotal, coupon, setCoupon, discount } = useCart();
  const total = Math.max(0, subtotal - discount);
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      <h1 className="font-display text-4xl">{data.brand.labels.cart}</h1>
      {!items.length ? (
        <div className="mt-10 rounded-2xl border p-8 text-center" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
          <p style={{ color: "var(--muted)" }}>Nothing here yet.</p>
          <Link href="/shop" className="mt-4 inline-block font-semibold" style={{ color: "var(--accent)" }}>Browse {data.brand.labels.shop}</Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <ul className="space-y-4">
            {items.map((i) => (
              <li key={i.id + (i.variant || "")} className="flex gap-4 rounded-2xl border p-4" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
                <div className="relative h-24 w-24 overflow-hidden rounded-xl">
                  <Image src={i.image} alt="" fill className="object-cover" sizes="96px" />
                </div>
                <div className="flex flex-1 flex-col gap-2">
                  <div className="flex justify-between gap-3">
                    <div>
                      <Link href={`/product/${i.id}`} className="font-display text-xl">{i.title}</Link>
                      {i.variant && <p className="text-xs" style={{ color: "var(--muted)" }}>{i.variant}</p>}
                    </div>
                    <p className="font-semibold">{money(i.price * i.qty)}</p>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <label className="flex items-center gap-2">Qty
                      <input type="number" min={1} value={i.qty} onChange={(e) => setQty(i.id, Number(e.target.value))} className="w-16 rounded-lg border px-2 py-1" style={{ borderColor: "var(--border)", background: "var(--bg)" }} />
                    </label>
                    <button onClick={() => remove(i.id)} style={{ color: "var(--muted)" }}>Remove</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <aside className="h-fit rounded-2xl border p-5" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
            <p className="font-display text-2xl">Summary</p>
            <label className="mt-4 grid gap-1 text-sm">Promo
              <input value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder={data.brand.offer.code} className="rounded-xl border px-3 py-2" style={{ borderColor: "var(--border)", background: "var(--bg)" }} />
            </label>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between"><span>Subtotal</span><span>{money(subtotal)}</span></div>
              {discount > 0 && <div className="flex justify-between" style={{ color: "var(--accent2)" }}><span>Discount</span><span>-{money(discount)}</span></div>}
              <div className="flex justify-between border-t pt-3 font-semibold" style={{ borderColor: "var(--border)" }}><span>Total</span><span>{money(total)}</span></div>
            </div>
            <Link href="/checkout" className="mt-5 block rounded-xl px-4 py-3 text-center text-sm font-semibold" style={{ background: "var(--accent)", color: data.brand.dark ? "#111" : "#fff" }}>Continue to checkout</Link>
          </aside>
        </div>
      )}
    </div>
  );
}
