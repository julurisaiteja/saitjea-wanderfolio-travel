"use client";
import { useState } from "react";
import data from "@/lib/data.json";

export function NicheTool() {
  const tool = data.brand.tool as { type: string; label: string; options: string[] };
  const brand = data.brand;
  const civic = brand.mode === "civic";
  const [picked, setPicked] = useState(tool.options[0]);
  const [result, setResult] = useState("");
  return (
    <section className="tc-tool">
      <p className="text-xs uppercase tracking-[0.2em]" style={{ color: "var(--muted)" }}>
        {civic ? "Eligibility" : "Interactive"}
      </p>
      <h2 className="mt-2 font-display text-3xl">{tool.label}</h2>
      <div className="mt-5 flex flex-wrap gap-2">
        {tool.options.map((o) => (
          <button
            key={o}
            onClick={() => setPicked(o)}
            className="tap tc-chip"
            style={{
              borderColor: picked === o ? "var(--accent)" : "var(--border)",
              background: picked === o ? "color-mix(in srgb, var(--accent) 14%, transparent)" : "transparent",
            }}
          >
            {o}
          </button>
        ))}
      </div>
      <button
        className="tap mt-5 tc-tool-cta"
        style={{ background: "var(--accent)", color: brand.dark ? "#111" : "#fff" }}
        onClick={() =>
          setResult(
            civic
              ? `Path “${picked}” looks eligible in this demo. Apply fee credit ${brand.offer.code} at checkout.`
              : `Matched “${picked}” — curated picks are in ${brand.labels.shop}. Code ${brand.offer.code} still applies.`
          )
        }
      >
        {civic ? "Check eligibility" : "Show matches"}
      </button>
      {result ? <p className="mt-4 text-sm" style={{ color: "var(--muted)" }}>{result}</p> : null}
    </section>
  );
}
