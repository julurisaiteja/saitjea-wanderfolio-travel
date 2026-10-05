"use client";
import { useState } from "react";
import data from "@/lib/data.json";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const brand = data.brand;
  const civic = brand.mode === "civic";
  return (
    <section className="diamond-newsletter tc-newsletter">
      <div>
        <p className="text-xs uppercase tracking-[0.2em]" style={{ color: "var(--muted)" }}>
          {civic ? "Alerts" : "Correspondence"}
        </p>
        <h2 className="mt-2 font-display text-3xl md:text-4xl">
          {civic ? "Service alerts & filing reminders" : "Notes, drops & early offers"}
        </h2>
        <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
          {civic ? "Demo inbox — no real government mail is sent." : `Promo code ${brand.offer.code} · demo list only.`}
        </p>
      </div>
      {done ? (
        <p className="text-sm font-semibold" style={{ color: "var(--accent)" }}>You are on the list (demo).</p>
      ) : (
        <form
          className="flex flex-col gap-2 sm:flex-row"
          onSubmit={(e) => {
            e.preventDefault();
            if (email.includes("@")) setDone(true);
          }}
        >
          <label className="sr-only" htmlFor="diamond-email">Email</label>
          <input
            id="diamond-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="min-h-[44px] flex-1 rounded-xl border px-3 text-sm"
            style={{ borderColor: "var(--border)", background: "var(--bg)" }}
          />
          <button type="submit" className="min-h-[44px] rounded-xl px-5 text-sm font-semibold text-white" style={{ background: "var(--accent)" }}>
            {civic ? "Subscribe" : "Join"}
          </button>
        </form>
      )}
    </section>
  );
}
