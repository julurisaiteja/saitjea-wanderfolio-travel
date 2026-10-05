import { Suspense } from "react";
export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<div className="mx-auto max-w-6xl px-4 py-20">Loading catalog…</div>}>{children}</Suspense>;
}
