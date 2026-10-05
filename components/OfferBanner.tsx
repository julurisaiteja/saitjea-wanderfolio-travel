"use client";
import { useState } from "react";
import data from "@/lib/data.json";
import { IconClose } from "./Icons";

export function OfferBanner() {
  const [open, setOpen] = useState(true);
  const o = data.brand.offer;
  if (!open) return null;
  return (
    <div className="relative z-50 text-center text-sm" style={{ background: "var(--accent)", color: data.brand.dark ? "#111" : "#fff" }}>
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-3 px-4 py-2 md:px-6">
        <p className="animate-pulseSoft">
          <strong className="font-semibold">{o.title}</strong>
          <span className="mx-2 opacity-80">·</span>
          <span className="opacity-95">{o.detail}</span>
          <span className="ml-2 inline-block rounded px-1.5 py-0.5 text-[11px] font-bold tracking-wide" style={{ background: "color-mix(in srgb, #000 18%, transparent)" }}>
            {o.code}
          </span>
        </p>
        <button aria-label="Dismiss offer" onClick={() => setOpen(false)} className="tap absolute right-2 top-1/2 inline-flex -translate-y-1/2 items-center justify-center rounded-md opacity-90 transition duration-200 hover:opacity-100">
          <IconClose />
        </button>
      </div>
    </div>
  );
}
