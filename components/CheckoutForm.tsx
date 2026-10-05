"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "./CartProvider";
import { money } from "@/lib/format";
import data from "@/lib/data.json";

export function CheckoutForm() {
  const { items, subtotal, clear, coupon, setCoupon, discount } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const mode = data.brand.mode;
  const total = Math.max(0, subtotal - discount);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr("");
    if (!items.length) {
      setErr("Your basket is empty.");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1100));
    const order = {
      id: (mode === "civic" ? "FIL-" : mode === "booking" ? "RSV-" : "ORD-") + Math.random().toString(36).slice(2, 8).toUpperCase(),
      total,
      discount,
      coupon,
      items,
      at: new Date().toISOString(),
    };
    sessionStorage.setItem("sai-last-order", JSON.stringify(order));
    clear();
    setLoading(false);
    router.push("/success");
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
      <section className="space-y-5 rounded-2xl border p-5 md:p-6" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
        <h2 className="font-display text-2xl">{mode === "civic" ? "Applicant & payment" : "Checkout"}</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-1 text-sm"><span>Full name</span><input required name="name" className="rounded-xl border px-3 py-2.5 outline-none" style={{ borderColor: "var(--border)", background: "var(--bg)" }} placeholder="Alex Rivera" /></label>
          <label className="grid gap-1 text-sm"><span>Email</span><input required type="email" name="email" className="rounded-xl border px-3 py-2.5 outline-none" style={{ borderColor: "var(--border)", background: "var(--bg)" }} placeholder="alex@email.com" /></label>
          {(mode === "booking" || data.brand.niche === "bikes" || data.brand.niche === "hotel") && (
            <>
              <label className="grid gap-1 text-sm"><span>{mode === "booking" ? "Start date" : "Service / arrival"}</span><input required type="date" name="start" className="rounded-xl border px-3 py-2.5" style={{ borderColor: "var(--border)", background: "var(--bg)" }} /></label>
              <label className="grid gap-1 text-sm"><span>{mode === "booking" ? "End / event date" : "Preferred slot"}</span><input required type="date" name="end" className="rounded-xl border px-3 py-2.5" style={{ borderColor: "var(--border)", background: "var(--bg)" }} /></label>
            </>
          )}
          {mode === "civic" && (
            <>
              <label className="grid gap-1 text-sm md:col-span-2"><span>Service address / parcel ID</span><input required name="address" className="rounded-xl border px-3 py-2.5" style={{ borderColor: "var(--border)", background: "var(--bg)" }} placeholder="123 Civic Way / APN 00-000" /></label>
              <label className="grid gap-1 text-sm md:col-span-2"><span>Appointment preference</span>
                <select className="rounded-xl border px-3 py-2.5" style={{ borderColor: "var(--border)", background: "var(--bg)" }}>
                  <option>Next available review slot</option>
                  <option>Tue 10:00</option>
                  <option>Wed 14:30</option>
                  <option>Thu 9:00</option>
                </select>
              </label>
            </>
          )}
          {mode !== "civic" && (
            <label className="grid gap-1 text-sm md:col-span-2"><span>Address</span><input required name="address" className="rounded-xl border px-3 py-2.5" style={{ borderColor: "var(--border)", background: "var(--bg)" }} placeholder="Street, city, ZIP" /></label>
          )}
        </div>
        <div className="rounded-2xl border p-4" style={{ borderColor: "var(--border)" }}>
          <p className="text-sm font-semibold">Card details <span className="font-normal" style={{ color: "var(--muted)" }}>(demo only)</span></p>
          <div className="mt-3 grid gap-3">
            <input required name="card" placeholder="4242 4242 4242 4242" className="rounded-xl border px-3 py-2.5" style={{ borderColor: "var(--border)", background: "var(--bg)" }} />
            <div className="grid grid-cols-2 gap-3">
              <input required name="exp" placeholder="MM/YY" className="rounded-xl border px-3 py-2.5" style={{ borderColor: "var(--border)", background: "var(--bg)" }} />
              <input required name="cvc" placeholder="CVC" className="rounded-xl border px-3 py-2.5" style={{ borderColor: "var(--border)", background: "var(--bg)" }} />
            </div>
          </div>
        </div>
        {err && <p className="text-sm" style={{ color: "#b91c1c" }}>{err}</p>}
        <button disabled={loading} className="w-full rounded-xl px-4 py-3 text-sm font-semibold transition disabled:opacity-60" style={{ background: "var(--accent)", color: data.brand.dark ? "#111" : "#fff" }}>
          {loading ? "Processing…" : mode === "civic" ? `Submit & pay ${money(total)} (simulated)` : `Pay ${money(total)} (simulated)`}
        </button>
      </section>
      <aside className="h-fit space-y-4 rounded-2xl border p-5" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
        <h3 className="font-display text-xl">Order summary</h3>
        <ul className="mt-2 space-y-3 text-sm">
          {items.map((i) => (
            <li key={i.id + (i.variant || "")} className="flex justify-between gap-3">
              <span>{i.title}{i.variant ? ` · ${i.variant}` : ""} × {i.qty}</span>
              <span>{money(i.price * i.qty)}</span>
            </li>
          ))}
          {!items.length && <li style={{ color: "var(--muted)" }}>No items yet.</li>}
        </ul>
        <label className="grid gap-1 text-sm">
          <span>Promo code</span>
          <div className="flex gap-2">
            <input value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder={data.brand.offer.code} className="flex-1 rounded-xl border px-3 py-2" style={{ borderColor: "var(--border)", background: "var(--bg)" }} />
          </div>
        </label>
        {discount > 0 && (
          <div className="flex justify-between text-sm" style={{ color: "var(--accent2)" }}>
            <span>Discount</span><span>-{money(discount)}</span>
          </div>
        )}
        <div className="flex justify-between border-t pt-4 text-sm font-semibold" style={{ borderColor: "var(--border)" }}>
          <span>Total</span>
          <span>{money(total)}</span>
        </div>
      </aside>
    </form>
  );
}
