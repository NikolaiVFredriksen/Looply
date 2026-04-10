"use client";

import { useState } from "react";

type Loop = {
  id: string;
  title: string;
  description: string;
  why: string;
};

export default function Home() {
  const [loops, setLoops] = useState<Loop[]>([
    {
      id: "1",
      title: "Reach out to Martin",
      description:
        "We talked about meeting up but neither of us followed through.",
      why: "Not sure if he wants to hear from me.",
    },
    {
      id: "2",
      title: "Learn to make pasta from scratch",
      description:
        "Been wanting to do this for a long time but never got around to it.",
      why: "",
    },
    {
      id: "3",
      title: "Fix the squeaky door",
      description: "It's been bothering me for months.",
      why: "",
    },
  ]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", why: "" });

  const save = (updated: Loop[]) => {
    setLoops(updated);
    localStorage.setItem("loops", JSON.stringify(updated));
  };

  const handleAdd = () => {
    if (!form.title.trim()) return;
    const newLoop: Loop = {
      id: Date.now().toString(),
      title: form.title,
      description: form.description,
      why: form.why,
    };
    save([...loops, newLoop]);
    setForm({ title: "", description: "", why: "" });
    setShowModal(false);
  };

  const handleClose = (id: string) => {
    save(loops.filter((l) => l.id !== id));
    setActiveId(null);
  };

  const handleRelease = (id: string) => {
    save(loops.filter((l) => l.id !== id));
    setActiveId(null);
  };

  return (
    <main className="min-h-screen px-6 py-12 max-w-lg mx-auto relative overflow-hidden">
      {/* Background ring */}
      <div
        className="pointer-events-none absolute -top-20 -right-20 rounded-full"
        style={{
          width: 340,
          height: 340,
          border: "48px solid rgba(180, 160, 130, 0.08)",
        }}
      />

      {/* Header */}
      <h1
        className="text-3xl mb-1"
        style={{
          fontFamily: "var(--font-dm-serif)",
          color: "#2C2416",
          fontWeight: 400,
        }}
      >
        Looply
      </h1>
      <p className="text-sm mb-8" style={{ color: "#A89880", fontWeight: 300 }}>
        {loops.length} open {loops.length === 1 ? "loop" : "loops"}
      </p>

      {/* Loop list */}
      <div className="flex flex-col gap-3">
        {loops.map((loop) => {
          const isActive = activeId === loop.id;
          return (
            <div
              key={loop.id}
              onClick={() => setActiveId(isActive ? null : loop.id)}
              className="rounded-2xl p-5 cursor-pointer transition-all duration-200"
              style={{
                background: isActive
                  ? "rgba(255,255,255,0.9)"
                  : "rgba(255,255,255,0.55)",
                border: isActive
                  ? "0.5px solid rgba(180,160,130,0.35)"
                  : "0.5px solid rgba(180,160,130,0.15)",
              }}
            >
              <div className="flex items-start gap-3">
                {/* Open loop dot indicator */}
                <div
                  className="mt-1 shrink-0 rounded-full"
                  style={{
                    width: 8,
                    height: 8,
                    border: "1.5px solid #C4B4A0",
                    background: "transparent",
                  }}
                />
                <div className="flex-1">
                  <p
                    className="text-sm font-medium"
                    style={{ color: "#2C2416" }}
                  >
                    {loop.title}
                  </p>
                  <p
                    className="text-sm mt-1"
                    style={{ color: "#A89880", fontWeight: 300 }}
                  >
                    {loop.description}
                  </p>
                  {loop.why && (
                    <p
                      className="text-xs mt-1 italic"
                      style={{ color: "#C4B4A0" }}
                    >
                      {loop.why}
                    </p>
                  )}
                </div>
              </div>

              {/* Actions */}
              {isActive && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-3 mt-4 pt-4"
                  style={{ borderTop: "0.5px solid rgba(180,160,130,0.15)" }}
                >
                  <button
                    onClick={() => setActiveId(null)}
                    className="text-sm transition-colors"
                    style={{ color: "#C4B4A0", fontWeight: 300 }}
                  >
                    Keep
                  </button>
                  <button
                    onClick={() => handleClose(loop.id)}
                    className="flex-1 rounded-xl py-2.5 text-sm font-medium transition-all"
                    style={{ background: "#2C2416", color: "#F7F4F0" }}
                  >
                    Close loop
                  </button>
                  <button
                    onClick={() => handleRelease(loop.id)}
                    className="text-sm transition-colors"
                    style={{ color: "#C4B4A0", fontWeight: 300 }}
                  >
                    Release
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add button */}
      <button
        onClick={() => setShowModal(true)}
        className="mt-6 w-full py-3.5 rounded-2xl text-sm transition-all"
        style={{
          border: "0.5px solid rgba(180,160,130,0.3)",
          color: "#A89880",
          fontWeight: 300,
          background: "transparent",
        }}
      >
        + Add a loop
      </button>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 flex items-end justify-center z-50"
          style={{ background: "rgba(44,36,22,0.15)" }}
          onClick={() => setShowModal(false)}
        >
          <div
            className="w-full max-w-lg rounded-t-3xl p-6 flex flex-col gap-4"
            style={{ background: "#F7F4F0" }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2
              className="text-lg"
              style={{
                fontFamily: "var(--font-dm-serif)",
                fontWeight: 400,
                color: "#2C2416",
              }}
            >
              New loop
            </h2>
            <input
              type="text"
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full rounded-xl px-4 py-3 text-sm outline-none"
              style={{ background: "rgba(255,255,255,0.7)", color: "#2C2416" }}
            />
            <textarea
              placeholder="What's the loop about?"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="w-full rounded-xl px-4 py-3 text-sm outline-none resize-none h-24"
              style={{ background: "rgba(255,255,255,0.7)", color: "#2C2416" }}
            />
            <textarea
              placeholder="Why is it hard to close? (optional)"
              value={form.why}
              onChange={(e) => setForm({ ...form, why: e.target.value })}
              className="w-full rounded-xl px-4 py-3 text-sm outline-none resize-none h-20"
              style={{ background: "rgba(255,255,255,0.7)", color: "#2C2416" }}
            />
            <div className="flex gap-3 mt-2">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-3 rounded-xl text-sm"
                style={{ color: "#A89880", fontWeight: 300 }}
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                className="flex-1 py-3 rounded-xl text-sm font-medium"
                style={{ background: "#2C2416", color: "#F7F4F0" }}
              >
                Add loop
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
