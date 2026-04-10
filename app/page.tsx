"use client";

import { useState } from "react";

const mockLoops = [
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
];

export default function Home() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <main className="min-h-screen px-6 py-12 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold tracking-tight mb-8">Looply</h1>
      <div className="flex flex-col gap-4">
        {mockLoops.map((loop) => {
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
                <div className="mt-5 flex items-center justify-between gap-3">
                  <button className="text-sm text-[#AAAAAA] hover:text-[#7A7A7A] transition-colors">
                    Keep
                  </button>
                  <button className="flex-1 bg-[#2C2C2C] text-white text-sm font-medium py-2.5 rounded-xl hover:bg-[#1a1a1a] transition-colors">
                    Close loop
                  </button>
                  <button className="text-sm text-[#AAAAAA] hover:text-[#7A7A7A] transition-colors">
                    Release
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}
