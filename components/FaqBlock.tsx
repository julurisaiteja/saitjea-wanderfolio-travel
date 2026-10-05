"use client";
import { useState } from "react";
import data from "@/lib/data.json";
import { MotionReveal } from "./MotionReveal";

export function FaqBlock() {
  const faqs = (data.brand.faqs as { q: string; a: string }[]).slice(0, 5);
  const [open, setOpen] = useState(0);
  return (
    <MotionReveal className="tc-faq mx-auto max-w-6xl px-4 py-12 md:px-6">
      <p className="text-xs uppercase tracking-[0.2em]" style={{ color: "var(--muted)" }}>Answers</p>
      <h2 className="mt-2 font-display text-3xl md:text-4xl">Before you go further</h2>
      <div className="mt-6 divide-y" style={{ borderColor: "var(--border)" }}>
        {faqs.map((f, i) => (
          <div key={f.q} className="border-t" style={{ borderColor: "var(--border)" }}>
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 py-4 text-left text-base font-semibold"
              onClick={() => setOpen(open === i ? -1 : i)}
              aria-expanded={open === i}
            >
              {f.q}
              <span aria-hidden>{open === i ? "−" : "+"}</span>
            </button>
            {open === i ? (
              <p className="pb-4 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                {f.a}
              </p>
            ) : null}
          </div>
        ))}
      </div>
    </MotionReveal>
  );
}
