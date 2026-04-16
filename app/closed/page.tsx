"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ClosedLoop } from "../types";
import ClosedLoopCard from "../components/ClosedLoopCard";

export default function ClosedPage() {
  const [closed, setClosed] = useState<ClosedLoop[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("closedLoops");
    if (saved) setClosed(JSON.parse(saved));
  }, []);

  const handleRestore = (loop: ClosedLoop) => {
    const { closedAt, ...restored } = loop;
    const openLoops = JSON.parse(localStorage.getItem("loops") || "[]");
    localStorage.setItem("loops", JSON.stringify([...openLoops, restored]));
    const updated = closed.filter((l) => l.id !== loop.id);
    setClosed(updated);
    localStorage.setItem("closedLoops", JSON.stringify(updated));
  };

  const handleDelete = (id: string) => {
    const updated = closed.filter((l) => l.id !== id);
    setClosed(updated);
    localStorage.setItem("closedLoops", JSON.stringify(updated));
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        maxWidth: 480,
        margin: "0 auto",
        padding: "72px 24px 140px",
      }}
    >
      <div style={{ marginBottom: 48 }}>
        <h1
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: 32,
            color: "#1E1810",
            fontWeight: 300,
            margin: "0 0 6px",
            letterSpacing: "-0.02em",
          }}
        >
          closed loops
        </h1>
        <p
          style={{ color: "#B8A898", fontSize: 13, margin: 0, fontWeight: 300 }}
        >
          {closed.length === 0
            ? "nothing yet."
            : `${closed.length} loop${closed.length === 1 ? "" : "s"} closed`}
        </p>
      </div>

      {closed.length === 0 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "80px 0",
            gap: 16,
          }}
        >
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <circle
              cx="24"
              cy="24"
              r="18"
              stroke="#D4C4B0"
              strokeWidth="1.5"
              fill="none"
            />
          </svg>
          <p style={{ color: "#C4B4A0", fontSize: 14, fontWeight: 300 }}>
            close a loop to see it here
          </p>
        </div>
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          alignItems: "center",
        }}
      >
        <AnimatePresence>
          {closed.map((loop) => (
            <ClosedLoopCard
              key={loop.id}
              loop={loop}
              isActive={activeId === loop.id}
              onSelect={() =>
                setActiveId(activeId === loop.id ? null : loop.id)
              }
              onRestore={() => handleRestore(loop)}
              onDelete={() => handleDelete(loop.id)}
            />
          ))}
        </AnimatePresence>
      </div>
    </main>
  );
}
