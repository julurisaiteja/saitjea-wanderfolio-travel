"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { money } from "@/lib/format";
import data from "@/lib/data.json";

type Order = { id: string; total: number; discount?: number; coupon?: string; items: { title: string; qty: number; price: number }[]; at: string };

export default function SuccessPage() {
  const [order, setOrder] = useState<Order | null>(null);
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("sai-last-order");
      if (raw) setOrder(JSON.parse(raw));
    } catch {}
  }, []);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-6">
      <p className="text-xs uppercase tracking-[0.2em]" style={{ color: "var(--accent)" }}>{data.brand.labels.success}</p>
      <h1 className="mt-2 font-display text-4xl md:text-5xl">You are all set.</h1>
      <p className="mt-3 text-sm" style={{ color: "var(--muted)" }}>
        {data.brand.mode === "civic"
          ? "Simulated filing accepted. Track status on the timeline below — nothing was submitted to a real agency."
          : "Simulated payment captured. This receipt is for demo UX only."}
      </p>
      {order ? (
        <div className="mt-8 space-y-4 rounded-2xl border p-6" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
          <div className="flex justify-between gap-3 text-sm">
            <span>Reference</span><strong>{order.id}</strong>
          </div>
          <div className="flex justify-between gap-3 text-sm">
            <span>Total</span><strong>{money(order.total)}</strong>
          </div>
          {order.coupon && <div className="flex justify-between gap-3 text-sm"><span>Promo</span><strong>{order.coupon}</strong></div>}
          <ul className="space-y-2 border-t pt-4 text-sm" style={{ borderColor: "var(--border)" }}>
            {order.items.map((i, idx) => (
              <li key={idx} className="flex justify-between gap-3"><span>{i.title} × {i.qty}</span><span>{money(i.price * i.qty)}</span></li>
            ))}
          </ul>
          {data.brand.mode === "civic" && (
            <ol className="space-y-2 border-t pt-4 text-sm" style={{ borderColor: "var(--border)" }}>
              {["Submitted", "In review", "Decision pending"].map((s, i) => (
                <li key={s} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold text-white" style={{ background: i === 0 ? "var(--accent)" : "var(--muted)" }}>{i + 1}</span>
                  {s}
                </li>
              ))}
            </ol>
          )}
        </div>
      ) : (
        <p className="mt-8 text-sm" style={{ color: "var(--muted)" }}>No recent demo order found.</p>
      )}
      <Link href="/shop" className="mt-8 inline-block font-semibold" style={{ color: "var(--accent)" }}>Continue browsing →</Link>
    </div>
  );
}
