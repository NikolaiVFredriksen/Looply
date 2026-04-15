"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type ClosedLoop = {
  id: string;
  title: string;
  why: string;
  closedAt: string;
};

export default function ClosedPage() {
  const [closed, setClosed] = useState<ClosedLoop[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("closedLoops");
    if (saved) setClosed(JSON.parse(saved));
  }, []);

  return (
    <main
      onClick={() => {}}
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

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <AnimatePresence>
          {closed.map((loop) => (
            <motion.div
              key={loop.id}
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              animate={{
                scale: activeId === loop.id ? 1.02 : 1,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
              onClick={() => setActiveId(activeId === loop.id ? null : loop.id)}
              style={{
                width: "100%",
                boxSizing: "border-box",
                background: "rgba(255,255,255,0.75)",
                borderRadius: 24,
                padding: "18px 22px",
                border: "0.5px solid rgba(180,155,120,0.2)",
                cursor: "pointer",
                boxShadow:
                  "0 2px 12px rgba(30,24,16,0.07), 0 1px 3px rgba(30,24,16,0.04)",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "flex-start", gap: 18 }}
              >
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                  fill="none"
                  style={{ flexShrink: 0, marginTop: 2 }}
                >
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    stroke="#D4C4B0"
                    strokeWidth="1.5"
                    fill="none"
                  />
                </svg>
                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      fontSize: 15,
                      fontWeight: 400,
                      color: "#A89880",
                      margin: "0 0 4px",
                      lineHeight: 1.4,
                    }}
                  >
                    {loop.title}
                  </p>
                  <p
                    style={{
                      fontSize: 12,
                      color: "#7A6A5A",
                      fontWeight: 300,
                      margin: 0,
                    }}
                  >
                    {new Date(loop.closedAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 8,
                    flexShrink: 0,
                  }}
                >
                  <button
                    onClick={() => {
                      const toRestore = closed.find((l) => l.id === loop.id);
                      if (!toRestore) return;
                      const { closedAt, ...restored } = toRestore;
                      const openLoops = JSON.parse(
                        localStorage.getItem("loops") || "[]",
                      );
                      localStorage.setItem(
                        "loops",
                        JSON.stringify([...openLoops, restored]),
                      );
                      const updated = closed.filter((l) => l.id !== loop.id);
                      setClosed(updated);
                      localStorage.setItem(
                        "closedLoops",
                        JSON.stringify(updated),
                      );
                    }}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: "4px",
                      color: "#D4C4B0",
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 10h13a5 5 0 0 1 0 10H6" />
                      <polyline points="7 6 3 10 7 14" />
                    </svg>
                  </button>
                  <button
                    onClick={() => {
                      const updated = closed.filter((l) => l.id !== loop.id);
                      setClosed(updated);
                      localStorage.setItem(
                        "closedLoops",
                        JSON.stringify(updated),
                      );
                    }}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: "4px",
                      color: "#D4C4B0",
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6l-1 14H6L5 6" />
                      <path d="M10 11v6M14 11v6" />
                      <path d="M9 6V4h6v2" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </main>
  );
}
