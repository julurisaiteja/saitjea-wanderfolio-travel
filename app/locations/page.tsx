"use client";
import data from "@/lib/data.json";
import { MotionReveal } from "@/components/MotionReveal";
import { Newsletter } from "@/components/Newsletter";

type Loc = { name?: string; city?: string; address: string; hours?: string; note?: string };

export default function LocationsPage() {
  const brand = data.brand;
  const locations = brand.locations as Loc[];
  const civic = brand.mode === "civic";
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      <p className="text-xs uppercase tracking-[0.2em]" style={{ color: "var(--muted)" }}>
        {civic ? "Service centers" : "Visit"}
      </p>
      <h1 className="mt-2 font-display text-4xl md:text-5xl">
        {civic ? "Counter & kiosk locations" : "Studios & pickup points"}
      </h1>
      <p className="mt-3 max-w-2xl text-sm" style={{ color: "var(--muted)" }}>
        Real-feeling demo addresses for journey testing — not live operations.
      </p>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {locations.map((loc) => {
          const title = loc.name || loc.city || loc.address;
          return (
            <MotionReveal key={title} className="diamond-panel">
              <h2 className="font-display text-2xl">{title}</h2>
              <p className="mt-2 text-sm">{loc.address}</p>
              {loc.hours ? <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>{loc.hours}</p> : null}
              {loc.note ? <p className="mt-3 text-sm" style={{ color: "var(--accent2)" }}>{loc.note}</p> : null}
            </MotionReveal>
          );
        })}
      </div>
      <div className="mt-12"><Newsletter /></div>
    </div>
  );
}
