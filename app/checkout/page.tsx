import { CheckoutForm } from "@/components/CheckoutForm";
import data from "@/lib/data.json";

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      <p className="text-xs uppercase tracking-[0.2em]" style={{ color: "var(--muted)" }}>Secure demo checkout</p>
      <h1 className="font-display text-4xl">{data.brand.mode === "civic" ? "Pay fees & submit" : "Checkout"}</h1>
      <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>Stripe-style fields. No real charges. Try code {data.brand.offer.code}.</p>
      <div className="mt-8">
        <CheckoutForm />
      </div>
    </div>
  );
}
