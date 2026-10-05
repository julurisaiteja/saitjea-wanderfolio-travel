"use client";
import { MotionReveal } from "./MotionReveal";
import data from "@/lib/data.json";

export function StatRow() {
  const stats = data.brand.stats as { label: string; value: string }[];
  return (
    <MotionReveal className="diamond-stats tc-stats">
      {stats.map((s) => (
        <div key={s.label} className="diamond-stat tc-stat">
          <p className="diamond-stat-value font-display">{s.value}</p>
          <p className="diamond-stat-label">{s.label}</p>
        </div>
      ))}
    </MotionReveal>
  );
}
