"use client";
import data from "@/lib/data.json";
import { MotionReveal } from "./MotionReveal";

export function ReviewRail() {
  const reviews = data.brand.reviews as { name: string; text: string; city: string; rating: number }[];
  return (
    <MotionReveal className="tc-reviews">
      <div className="mb-6 px-4 md:px-6">
        <p className="text-xs uppercase tracking-[0.2em]" style={{ color: "var(--muted)" }}>Voice of the room</p>
        <h2 className="font-display text-3xl md:text-4xl">Reviews</h2>
      </div>
      <div className="tc-review-row">
        {reviews.map((r) => (
          <blockquote key={r.name} className="tc-review-card">
            <p className="tc-stars">{"★".repeat(Math.round(r.rating || 5))}</p>
            <p>“{r.text}”</p>
            <footer>
              {r.name} · {r.city}
            </footer>
          </blockquote>
        ))}
      </div>
    </MotionReveal>
  );
}
