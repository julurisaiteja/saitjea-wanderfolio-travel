"use client";
import { useMemo, useState } from "react";
import data from "@/lib/data.json";
import { IconChat, IconClose } from "./Icons";

type Msg = { role: "user" | "assistant"; text: string };

export function AIAssistant() {
  const faqs = data.brand.ai as { q: string; a: string }[];
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "assistant", text: `Hi — I am the ${data.brand.name} assistant. Ask about ${data.brand.niche}, offers, or how checkout works in this demo.` },
  ]);

  const suggestions = useMemo(() => faqs.map((f) => f.q).slice(0, 4), [faqs]);

  function reply(q: string) {
    const hit = faqs.find((f) => f.q.toLowerCase() === q.toLowerCase())
      || faqs.find((f) => q.toLowerCase().split(" ").some((w) => w.length > 3 && (f.q.toLowerCase().includes(w) || f.a.toLowerCase().includes(w))));
    const text = hit
      ? hit.a
      : `I can help with ${data.brand.labels.shop.toLowerCase()}, sizing/booking, and code ${data.brand.offer.code}. Try one of the suggested questions — this demo uses rich canned answers.`;
    setMsgs((m) => [...m, { role: "user", text: q }, { role: "assistant", text }]);
  }

  function onSend(e: React.FormEvent) {
    e.preventDefault();
    const q = input.trim();
    if (!q) return;
    setInput("");
    reply(q);
  }

  return (
    <div className="fixed bottom-4 right-4 z-[60] flex flex-col items-end gap-3">
      {open && (
        <div className="flex h-[min(70vh,520px)] w-[min(92vw,380px)] flex-col overflow-hidden rounded-2xl border shadow-2xl animate-floatIn" style={{ borderColor: "var(--border)", background: "var(--surface)", color: "var(--fg)" }}>
          <div className="flex items-center justify-between px-4 py-3" style={{ background: "var(--accent)", color: data.brand.dark ? "#111" : "#fff" }}>
            <div>
              <p className="text-sm font-semibold">{data.brand.name} AI</p>
              <p className="text-[11px] opacity-90">Live demo assistant</p>
            </div>
            <button onClick={() => setOpen(false)} className="tap inline-flex items-center justify-center rounded-md" aria-label="Close chat"><IconClose /></button>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto px-3 py-3 text-sm">
            {msgs.map((m, i) => (
              <div key={i} className={`max-w-[90%] rounded-2xl px-3 py-2 ${m.role === "user" ? "ml-auto" : ""}`} style={{ background: m.role === "user" ? "color-mix(in srgb, var(--accent) 18%, var(--bg))" : "var(--bg)", border: "1px solid var(--border)" }}>
                {m.text}
              </div>
            ))}
            <div className="flex flex-wrap gap-2 pt-1">
              {suggestions.map((s) => (
                <button key={s} onClick={() => reply(s)} className="tap rounded-full border px-3 text-[11px] text-left transition duration-200" style={{ borderColor: "var(--border)" }}>
                  {s}
                </button>
              ))}
            </div>
          </div>
          <form onSubmit={onSend} className="flex gap-2 border-t p-3" style={{ borderColor: "var(--border)" }}>
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask anything…" className="flex-1 rounded-xl border px-3 py-2 text-sm outline-none" style={{ borderColor: "var(--border)", background: "var(--bg)" }} />
            <button className="tap rounded-xl px-4 text-sm font-semibold transition duration-200" style={{ background: "var(--accent)", color: data.brand.dark ? "#111" : "#fff" }}>Send</button>
          </form>
        </div>
      )}
      <button onClick={() => setOpen((v) => !v)} className="tap inline-flex items-center gap-2 rounded-full px-4 text-sm font-semibold shadow-lg transition duration-200 hover:opacity-90" style={{ background: "var(--accent)", color: data.brand.dark ? "#111" : "#fff" }} aria-expanded={open}>
        {open ? <><IconClose /> Close chat</> : <><IconChat /> Ask AI</>}
      </button>
    </div>
  );
}
