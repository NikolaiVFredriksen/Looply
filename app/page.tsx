"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  const [closingId, setClosingId] = useState<string | null>(null);
  const [closedCircleId, setClosedCircleId] = useState<string | null>(null);
  const [exitingId, setExitingId] = useState<string | null>(null);
  const [releasingId, setReleasingId] = useState<string | null>(null);
  const [releasingCircleId, setReleasingCircleId] = useState<string | null>(
    null,
  );

  useEffect(() => {
    const onboarded = localStorage.getItem("onboarded");
    if (!onboarded) {
      window.location.href = "/onboarding";
      return;
    }
    const saved = localStorage.getItem("loops");
    if (saved) setLoops(JSON.parse(saved));
    const showNewLoop = localStorage.getItem("showNewLoop");
    if (showNewLoop === "true") {
      setShowModal(true);
      localStorage.removeItem("showNewLoop");
    }
  }, []);

  const save = (updated: Loop[]) => {
    setLoops(updated);
    localStorage.setItem("loops", JSON.stringify(updated));
  };

  const handleAdd = () => {
    if (!form.title.trim()) return;
    save([...loops, { id: Date.now().toString(), ...form }]);
    setForm({ title: "", description: "", why: "" });
    setShowModal(false);
  };

  return (
    <main
      onClick={() => setActiveId(null)}
      style={{
        minHeight: "100vh",
        width: "100%",
        minWidth: 280,
        maxWidth: 480,
        margin: "0 auto",
        padding: "72px 24px 140px",
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 48 }}>
        <h1
          style={{
            fontFamily: "var(--font-dm-serif)",
            fontSize: 32,
            color: "#1E1810",
            fontWeight: 300,
            margin: "0 0 6px",
            letterSpacing: "-0.02em",
          }}
        >
          Looply
        </h1>
      </div>

      {/* Empty state */}
      {loops.length === 0 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "80px 0",
            gap: 16,
          }}
        >
          <svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            className="spin-slow"
          >
            <path
              d="M32 8 A24 24 0 1 0 56 32"
              stroke="#D4C4B0"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
          <p
            style={{
              color: "#C4B4A0",
              fontSize: 14,
              fontWeight: 300,
              textAlign: "center",
            }}
          >
            no open loops
          </p>
          <p style={{ color: "#D4C4B0", fontSize: 13, fontWeight: 300 }}>
            nice.
          </p>
        </div>
      )}

      {/* Loop list */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          width: "100%",
          alignItems: "center",
        }}
      >
        <AnimatePresence>
          {loops.map((loop, index) => {
            const isActive = activeId === loop.id;
            return (
              <motion.div
                key={loop.id}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  exitingId === loop.id
                    ? { opacity: 0, scale: 0.95 }
                    : releasingId === loop.id
                      ? { opacity: 0, y: -20 }
                      : { opacity: 1, scale: 1, y: 0 }
                }
                transition={
                  releasingId === loop.id
                    ? { duration: 1.0, ease: "easeOut", delay: 0.8 }
                    : { duration: 0.4, ease: "easeInOut" }
                }
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveId(isActive ? null : loop.id);
                }}
                style={{
                  width: "100%",
                  minWidth: 250,
                  maxWidth: 350,
                  boxSizing: "border-box",
                  background: "rgba(255,255,255,0.75)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  borderRadius: 24,
                  padding: "20px 22px",
                  cursor: "pointer",
                  boxShadow: isActive
                    ? "0 12px 40px rgba(30,24,16,0.12), 0 2px 8px rgba(30,24,16,0.06)"
                    : "0 2px 12px rgba(30,24,16,0.07), 0 1px 3px rgba(30,24,16,0.04)",
                  border: "0.5px solid rgba(180,155,120,0.2)",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "flex-start", gap: 18 }}
                >
                  {/* Circle */}
                  <div
                    style={{
                      flexShrink: 0,
                      marginTop: 2,
                      width: 36,
                      height: 36,
                      position: "relative",
                    }}
                  >
                    {closedCircleId === loop.id ? (
                      <svg
                        width="36"
                        height="36"
                        viewBox="0 0 36 36"
                        fill="none"
                      >
                        <circle
                          cx="18"
                          cy="18"
                          r="14"
                          stroke="#C4B4A0"
                          strokeWidth="1.5"
                          fill="none"
                          strokeDasharray="88"
                          strokeDashoffset="0"
                          style={{
                            animation: "drawCircle 0.5s ease-out forwards",
                          }}
                        />
                        <motion.path
                          d="M12 18 L16 22 L24 14"
                          stroke="#C4B4A0"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                        />
                      </svg>
                    ) : releasingCircleId === loop.id ? (
                      <motion.svg
                        width="36"
                        height="36"
                        viewBox="0 0 36 36"
                        fill="none"
                        initial={{ opacity: 1, y: 0, scale: 1 }}
                        animate={{ opacity: 0, y: -1, scale: 1.1 }}
                        transition={{
                          duration: 1.2,
                          ease: "easeOut",
                          delay: 0.5,
                        }}
                      >
                        <circle
                          cx="18"
                          cy="18"
                          r="14"
                          stroke="#C4B4A0"
                          strokeWidth="1.5"
                          fill="none"
                          strokeDasharray="88"
                          strokeDashoffset="0"
                          style={{
                            animation: "drawCircle 0.8s ease-out forwards",
                          }}
                        />
                      </motion.svg>
                    ) : (
                      <svg
                        width="36"
                        height="36"
                        viewBox="0 0 36 36"
                        fill="none"
                        className="spin-slow"
                        style={{
                          animationDuration:
                            closingId === loop.id
                              ? "0.8s"
                              : `${10 + index * 3}s`,
                        }}
                      >
                        <path
                          d="M18 4 A14 14 0 1 0 32 18"
                          stroke="#C4B4A0"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          fill="none"
                        />
                      </svg>
                    )}
                  </div>

                  {/* Text */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p
                      style={{
                        fontSize: 15,
                        fontWeight: 400,
                        color: "#1E1810",
                        margin: "0 0 5px",
                        lineHeight: 1.4,
                      }}
                    >
                      {loop.title}
                    </p>
                    <p
                      style={{
                        fontSize: 13,
                        color: "#A89880",
                        fontWeight: 300,
                        margin: 0,
                        lineHeight: 1.6,
                      }}
                    >
                      {loop.description}
                    </p>
                    {loop.why && (
                      <p
                        style={{
                          fontSize: 12,
                          color: "#C4B4A0",
                          fontStyle: "italic",
                          margin: "5px 0 0",
                          fontWeight: 300,
                        }}
                      >
                        {loop.why}
                      </p>
                    )}
                  </div>
                </div>

                {/* Actions */}
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      marginTop: 18,
                      paddingTop: 16,
                      borderTop: "0.5px solid rgba(180,155,120,0.12)",
                    }}
                  >
                    <button
                      onClick={() => {
                        setClosingId(loop.id);
                        setTimeout(() => setClosedCircleId(loop.id), 100);
                        setTimeout(() => setExitingId(loop.id), 1200);
                        setTimeout(() => {
                          const closedLoop = {
                            ...loop,
                            closedAt: new Date().toISOString(),
                          };
                          const existing = JSON.parse(
                            localStorage.getItem("closedLoops") || "[]",
                          );
                          localStorage.setItem(
                            "closedLoops",
                            JSON.stringify([closedLoop, ...existing]),
                          );
                          save(loops.filter((l) => l.id !== loop.id));
                          setActiveId(null);
                          setClosingId(null);
                          setClosedCircleId(null);
                          setExitingId(null);
                        }, 1600);
                      }}
                      style={{
                        flex: 1,
                        background: "#2C2018",
                        color: "#F7F4F0",
                        border: "none",
                        borderRadius: 14,
                        padding: "12px 0",
                        fontSize: 13,
                        fontWeight: 400,
                        cursor: "pointer",
                        fontFamily: "var(--font-dm-sans)",
                      }}
                    >
                      close loop
                    </button>
                    <button
                      onClick={() => {
                        setReleasingId(loop.id);
                        setTimeout(() => setReleasingCircleId(loop.id), 100);
                        setTimeout(() => {
                          save(loops.filter((l) => l.id !== loop.id));
                          setActiveId(null);
                          setReleasingId(null);
                          setReleasingCircleId(null);
                        }, 2600);
                      }}
                      style={{
                        flex: 1,
                        background: "rgba(180,155,120,0.12)",
                        color: "#A89880",
                        border: "none",
                        borderRadius: 14,
                        padding: "12px 0",
                        fontSize: 13,
                        fontWeight: 400,
                        cursor: "pointer",
                        fontFamily: "var(--font-dm-sans)",
                      }}
                    >
                      release
                    </button>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Add button */}
      <div style={{ marginTop: 16, display: "flex", justifyContent: "center" }}>
        <button
          onClick={() => setShowModal(true)}
          style={{
            padding: "16px 48px",
            borderRadius: 16,
            border: "none",
            background: "#2C2018",
            fontSize: 14,
            color: "#F7F4F0",
            fontWeight: 400,
            cursor: "pointer",
            fontFamily: "var(--font-dm-sans)",
            letterSpacing: "0.03em",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          {/* <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="6.5" stroke="#F7F4F0" strokeWidth="1.2" />
            <path
              d="M8 5v6M5 8h6"
              stroke="#F7F4F0"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg> */}
          add a loop
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(30,24,16,0.25)",
              backdropFilter: "blur(8px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 50,
              padding: "0 24px",
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: "#F7F4F0",
                width: "100%",
                maxWidth: 480,
                borderRadius: 28,
                padding: "32px 24px",
                display: "flex",
                flexDirection: "column",
                gap: 12,
                boxShadow: "0 24px 64px rgba(30,24,16,0.18)",
              }}
            >
              <h2
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: 18,
                  fontWeight: 300,
                  color: "#1E1810",
                  margin: "0 0 4px",
                  letterSpacing: "-0.01em",
                }}
              >
                new loop
              </h2>
              <p
                style={{
                  fontSize: 13,
                  color: "#C4B4A0",
                  fontWeight: 300,
                  margin: "0 0 8px",
                }}
              >
                what's been weighing on you?
              </p>
              <input
                type="text"
                placeholder="the thing on your mind..."
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                style={{
                  width: "100%",
                  background: "rgba(255,255,255,0.8)",
                  border: "0.5px solid rgba(180,155,120,0.2)",
                  borderRadius: 14,
                  padding: "13px 16px",
                  fontSize: 14,
                  fontWeight: 300,
                  color: "#1E1810",
                  outline: "none",
                  fontFamily: "var(--font-dm-sans)",
                  boxSizing: "border-box",
                }}
              />
              <textarea
                placeholder="why is it hard to close? (optional)"
                value={form.why}
                onChange={(e) => setForm({ ...form, why: e.target.value })}
                style={{
                  width: "100%",
                  background: "rgba(255,255,255,0.8)",
                  border: "0.5px solid rgba(180,155,120,0.2)",
                  borderRadius: 14,
                  padding: "13px 16px",
                  fontSize: 14,
                  fontWeight: 300,
                  color: "#1E1810",
                  outline: "none",
                  fontFamily: "var(--font-dm-sans)",
                  boxSizing: "border-box",
                  resize: "none",
                  height: 88,
                }}
              />
              <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
                <button
                  onClick={() => setShowModal(false)}
                  style={{
                    flex: 1,
                    padding: "13px 0",
                    borderRadius: 14,
                    border: "none",
                    background: "none",
                    fontSize: 14,
                    color: "#C4B4A0",
                    fontWeight: 300,
                    cursor: "pointer",
                    fontFamily: "var(--font-dm-sans)",
                  }}
                >
                  cancel
                </button>
                <button
                  onClick={handleAdd}
                  style={{
                    flex: 2,
                    padding: "13px 0",
                    borderRadius: 14,
                    border: "none",
                    background: "#2C2018",
                    color: "#F7F4F0",
                    fontSize: 14,
                    fontWeight: 400,
                    cursor: "pointer",
                    fontFamily: "var(--font-dm-sans)",
                  }}
                >
                  add loop
                </button>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}
    </main>
  );
}
