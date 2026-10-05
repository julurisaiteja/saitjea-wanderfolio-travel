"use client";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { CartItem, Product } from "@/lib/types";

type CartCtx = {
  items: CartItem[];
  wish: string[];
  add: (p: Product, qty?: number, variant?: string) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  toggleWish: (id: string) => void;
  count: number;
  subtotal: number;
  coupon: string;
  setCoupon: (c: string) => void;
  discount: number;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "sai-wanderfolio-travel-cart-v2";
const WKEY = "sai-wanderfolio-travel-wish";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [wish, setWish] = useState<string[]>([]);
  const [coupon, setCoupon] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
      const w = localStorage.getItem(WKEY);
      if (w) setWish(JSON.parse(w));
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(KEY, JSON.stringify(items));
  }, [items, ready]);
  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(WKEY, JSON.stringify(wish));
  }, [wish, ready]);

  const api = useMemo<CartCtx>(() => {
        const subtotal = items.reduce((a, i) => a + i.price * i.qty, 0);
    const code = coupon.trim().toUpperCase();
    const offerCode: string = "WANDER200";
    let discount = 0;
    if (code && code === offerCode) {
      if (code.includes("15") || code.includes("10")) discount = Math.round(subtotal * 0.1);
      else if (code.includes("20")) discount = Math.min(20, subtotal);
      else if (code.includes("200")) discount = Math.min(200, subtotal);
      else if (code.includes("500")) discount = Math.min(500, subtotal);
      else if (code.includes("EARLY") || code.includes("BIRD")) discount = Math.min(10, subtotal);
      else discount = Math.round(subtotal * 0.08);
    }
    return {
      items,
      wish,
      add: (p, qty = 1, variant) =>
        setItems((prev) => {
          const key = p.id + (variant || "");
          const hit = prev.find((i) => i.id + (i.variant || "") === key);
          if (hit) return prev.map((i) => (i.id + (i.variant || "") === key ? { ...i, qty: i.qty + qty } : i));
          return [...prev, { ...p, qty, variant }];
        }),
      remove: (id) => setItems((prev) => prev.filter((i) => i.id !== id)),
      setQty: (id, qty) => setItems((prev) => prev.flatMap((i) => (i.id !== id ? [i] : qty <= 0 ? [] : [{ ...i, qty }]))),
      clear: () => setItems([]),
      toggleWish: (id) => setWish((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])),
      count: items.reduce((a, i) => a + i.qty, 0),
      subtotal,
      coupon,
      setCoupon,
      discount,
    };
  }, [items, wish, coupon]);

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useCart() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useCart outside provider");
  return v;
}
