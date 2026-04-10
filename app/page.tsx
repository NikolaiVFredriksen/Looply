"use client";

import { useState, useEffect } from "react";

type Loop = {
  id: string;
  title: string;
  description: string;
  why: string;
};

export default function Home() {
  const [loops, setLoops] = useState<Loop[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", why: "" });

  useEffect(() => {
    const saved = localStorage.getItem("loops");
    if (saved) setLoops(JSON.parse(saved));
  }, []);

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

  const handleKeep = (id: string) => {
    setActiveId(null);
  };

  const handleRelease = (id: string) => {
    save(loops.filter((l) => l.id !== id));
    setActiveId(null);
  };

  return (
    <main className="min-h-screen px-6 py-12 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold tracking-tight mb-8">Looply</h1>

      {loops.length === 0 && (
        <p className="text-sm text-[#AAAAAA] text-center mt-20">
          No open loops. Nice.
        </p>
      )}

      <div className="flex flex-col gap-4">
        {loops.map((loop) => {
          const isActive = activeId === loop.id;
          return (
            <div
              key={loop.id}
              onClick={() => setActiveId(isActive ? null : loop.id)}
              className={`bg-white/60 rounded-2xl p-5 shadow-sm cursor-pointer transition-all duration-300 ${
                isActive ? "shadow-md" : ""
              }`}
            >
              <h2 className="font-medium text-lg">{loop.title}</h2>
              <p className="text-sm text-[#7A7A7A] mt-1">{loop.description}</p>
              {loop.why && (
                <p className="text-xs text-[#AAAAAA] mt-2 italic">{loop.why}</p>
              )}
              {isActive && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="mt-5 flex items-center justify-between gap-3"
                >
                  <button
                    onClick={() => handleKeep(loop.id)}
                    className="text-sm text-[#AAAAAA] hover:text-[#7A7A7A] transition-colors"
                  >
                    Keep
                  </button>
                  <button
                    onClick={() => handleClose(loop.id)}
                    className="flex-1 bg-[#2C2C2C] text-white text-sm font-medium py-2.5 rounded-xl hover:bg-[#1a1a1a] transition-colors"
                  >
                    Close loop
                  </button>
                  <button
                    onClick={() => handleRelease(loop.id)}
                    className="text-sm text-[#AAAAAA] hover:text-[#7A7A7A] transition-colors"
                  >
                    Release
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          setShowModal(true);
        }}
        className="mt-8 w-full py-3 rounded-2xl border border-[#2C2C2C]/20 text-sm text-[#7A7A7A] hover:text-[#2C2C2C] hover:border-[#2C2C2C]/40 transition-all"
      >
        + Add a loop
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black/20 flex items-end justify-center z-50">
          <div className="bg-[#FAF8F5] w-full max-w-lg rounded-t-3xl p-6 flex flex-col gap-4">
            <h2 className="text-lg font-semibold">New loop</h2>
            <input
              type="text"
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full bg-white/60 rounded-xl px-4 py-3 text-sm outline-none placeholder:text-[#AAAAAA]"
            />
            <textarea
              placeholder="What's the loop about?"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="w-full bg-white/60 rounded-xl px-4 py-3 text-sm outline-none placeholder:text-[#AAAAAA] resize-none h-24"
            />
            <textarea
              placeholder="Why is it hard to close? (optional)"
              value={form.why}
              onChange={(e) => setForm({ ...form, why: e.target.value })}
              className="w-full bg-white/60 rounded-xl px-4 py-3 text-sm outline-none placeholder:text-[#AAAAAA] resize-none h-20"
            />
            <div className="flex gap-3 mt-2">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-3 rounded-xl text-sm text-[#AAAAAA] hover:text-[#2C2C2C] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                className="flex-1 bg-[#2C2C2C] text-white text-sm font-medium py-3 rounded-xl hover:bg-[#1a1a1a] transition-colors"
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
