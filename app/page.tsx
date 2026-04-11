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
    else
      setLoops([
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
      className="min-h-screen max-w-md mx-auto px-5"
      style={{ paddingTop: 64, paddingBottom: 48 }}
    >
      {/* Subtle background circle */}
      <div
        className="fixed pointer-events-none"
        style={{
          top: -120,
          right: -120,
          width: 420,
          height: 420,
          borderRadius: "50%",
          border: "56px solid rgba(180,155,120,0.07)",
        }}
      />
      <div
        className="fixed pointer-events-none"
        style={{
          bottom: -80,
          left: -80,
          width: 260,
          height: 260,
          borderRadius: "50%",
          border: "36px solid rgba(180,155,120,0.05)",
        }}
      />

      {/* Header */}
      <div style={{ marginBottom: 48 }}>
        <p
          className="text-xs uppercase tracking-widest mb-3"
          style={{ color: "#B8A898", fontWeight: 400, letterSpacing: "0.15em" }}
        >
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </p>
        <h1
          style={{
            fontFamily: "var(--font-dm-serif)",
            fontSize: 38,
            color: "#1E1810",
            fontWeight: 800,
            lineHeight: 1.1,
            margin: 0,
            letterSpacing: "-0.04em",
          }}
        >
          Looply
        </h1>
        <p
          style={{
            color: "#B8A898",
            fontSize: 14,
            marginTop: 8,
            fontWeight: 300,
          }}
        >
          {loops.length === 0
            ? "No open loops. Rare."
            : `${loops.length} open ${loops.length === 1 ? "loop" : "loops"}`}
        </p>
      </div>

      {/* Empty state */}
      {loops.length === 0 && (
        <div style={{ textAlign: "center", padding: "48px 0" }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              border: "2px solid rgba(180,155,120,0.25)",
              margin: "0 auto 16px",
            }}
          />
          <p style={{ color: "#C4B4A0", fontSize: 14, fontWeight: 300 }}>
            Your mind is clear.
          </p>
        </div>
      )}

      {/* Loop list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {loops.map((loop) => {
          const isActive = activeId === loop.id;
          return (
            <div
              key={loop.id}
              onClick={() => setActiveId(isActive ? null : loop.id)}
              style={{
                background: "rgba(255,255,255,0.72)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                borderRadius: 20,
                padding: isActive ? "22px 22px 18px" : "18px 22px",
                cursor: "pointer",
                transition: "all 0.25s ease",
                boxShadow: isActive
                  ? "0 8px 32px rgba(44,36,22,0.10), 0 1px 2px rgba(44,36,22,0.06)"
                  : "0 2px 8px rgba(44,36,22,0.06), 0 1px 2px rgba(44,36,22,0.04)",
                border: isActive
                  ? "0.5px solid rgba(180,155,120,0.3)"
                  : "0.5px solid rgba(180,155,120,0.15)",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "flex-start", gap: 14 }}
              >
                {/* Loop indicator */}
                <div
                  style={{
                    marginTop: 4,
                    flexShrink: 0,
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    border: "1.5px solid #C4B4A0",
                    background: "transparent",
                    transition: "border-color 0.2s",
                  }}
                />
                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      fontSize: 15,
                      fontWeight: 500,
                      color: "#1E1810",
                      margin: "0 0 4px",
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
                        margin: "6px 0 0",
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
                <div
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginTop: 18,
                    paddingTop: 16,
                    borderTop: "0.5px solid rgba(180,155,120,0.12)",
                  }}
                >
                  <button
                    onClick={() => setActiveId(null)}
                    style={{
                      background: "none",
                      border: "none",
                      fontSize: 13,
                      color: "#C4B4A0",
                      fontWeight: 300,
                      cursor: "pointer",
                      padding: "8px 4px",
                      fontFamily: "var(--font-dm-sans)",
                    }}
                  >
                    Keep
                  </button>
                  <button
                    onClick={() => {
                      save(loops.filter((l) => l.id !== loop.id));
                      setActiveId(null);
                    }}
                    style={{
                      flex: 1,
                      background: "#1E1810",
                      color: "#F7F4F0",
                      border: "none",
                      borderRadius: 12,
                      padding: "11px 0",
                      fontSize: 13,
                      fontWeight: 500,
                      cursor: "pointer",
                      fontFamily: "var(--font-dm-sans)",
                      letterSpacing: "0.01em",
                    }}
                  >
                    Close loop
                  </button>
                  <button
                    onClick={() => {
                      save(loops.filter((l) => l.id !== loop.id));
                      setActiveId(null);
                    }}
                    style={{
                      background: "none",
                      border: "none",
                      fontSize: 13,
                      color: "#C4B4A0",
                      fontWeight: 300,
                      cursor: "pointer",
                      padding: "8px 4px",
                      fontFamily: "var(--font-dm-sans)",
                    }}
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
        style={{
          marginTop: 16,
          width: "100%",
          padding: "16px 0",
          borderRadius: 20,
          border: "0.5px dashed rgba(180,155,120,0.35)",
          background: "transparent",
          fontSize: 13,
          color: "#B8A898",
          fontWeight: 300,
          cursor: "pointer",
          fontFamily: "var(--font-dm-sans)",
          letterSpacing: "0.01em",
        }}
      >
        + Add a loop
      </button>

      {/* Modal */}
      {showModal && (
        <div
          onClick={() => setShowModal(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(30,24,16,0.18)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            zIndex: 50,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#F7F4F0",
              width: "100%",
              maxWidth: 448,
              borderRadius: "28px 28px 0 0",
              padding: "28px 24px 40px",
              display: "flex",
              flexDirection: "column",
              gap: 12,
              boxShadow: "0 -8px 40px rgba(44,36,22,0.12)",
            }}
          >
            {/* Handle */}
            <div
              style={{
                width: 36,
                height: 4,
                borderRadius: 2,
                background: "rgba(180,155,120,0.3)",
                margin: "-12px auto 12px",
              }}
            />

            <h2
              style={{
                fontFamily: "var(--font-dm-serif)",
                fontSize: 22,
                fontWeight: 400,
                color: "#1E1810",
                margin: "0 0 4px",
              }}
            >
              New loop
            </h2>

            {[
              {
                key: "title",
                placeholder: "What's the loop?",
                multiline: false,
              },
              {
                key: "description",
                placeholder: "Tell me more about it...",
                multiline: true,
              },
              {
                key: "why",
                placeholder: "Why is it hard to close? (optional)",
                multiline: true,
              },
            ].map(({ key, placeholder, multiline }) =>
              multiline ? (
                <textarea
                  key={key}
                  placeholder={placeholder}
                  value={form[key as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  style={{
                    width: "100%",
                    background: "rgba(255,255,255,0.8)",
                    border: "0.5px solid rgba(180,155,120,0.2)",
                    borderRadius: 14,
                    padding: "13px 16px",
                    fontSize: 14,
                    fontWeight: 300,
                    color: "#1E1810",
                    resize: "none",
                    height: 88,
                    outline: "none",
                    fontFamily: "var(--font-dm-sans)",
                    boxSizing: "border-box",
                  }}
                />
              ) : (
                <input
                  key={key}
                  type="text"
                  placeholder={placeholder}
                  value={form[key as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
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
              ),
            )}

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
                  color: "#B8A898",
                  fontWeight: 300,
                  cursor: "pointer",
                  fontFamily: "var(--font-dm-sans)",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                style={{
                  flex: 2,
                  padding: "13px 0",
                  borderRadius: 14,
                  border: "none",
                  background: "#1E1810",
                  color: "#F7F4F0",
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: "pointer",
                  fontFamily: "var(--font-dm-sans)",
                }}
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
