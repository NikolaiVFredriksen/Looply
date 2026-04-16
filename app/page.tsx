"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Loop } from "./types";
import EmptyState from "./components/EmptyState";
import LoopList from "./components/LoopList";
import AddLoopModal from "./components/AddLoopModal";
import EditLoopModal from "./components/EditLoopModal";

export default function Home() {
  const [loops, setLoops] = useState<Loop[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingLoop, setEditingLoop] = useState<Loop | null>(null);
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

  const handleClose = (loop: Loop) => {
    setClosingId(loop.id);
    setTimeout(() => setClosedCircleId(loop.id), 100);
    setTimeout(() => setExitingId(loop.id), 1200);
    setTimeout(() => {
      const closedLoop = { ...loop, closedAt: new Date().toISOString() };
      const existing = JSON.parse(localStorage.getItem("closedLoops") || "[]");
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
  };

  const handleRelease = (id: string) => {
    setReleasingId(id);
    setTimeout(() => setReleasingCircleId(id), 100);
    setTimeout(() => {
      save(loops.filter((l) => l.id !== id));
      setActiveId(null);
      setReleasingId(null);
      setReleasingCircleId(null);
    }, 2600);
  };

  const handleEdit = (updated: Loop) => {
    save(loops.map((l) => (l.id === updated.id ? updated : l)));
    setEditingLoop(null);
  };

  return (
    <main
      onClick={() => setActiveId(null)}
      style={{
        minHeight: "100vh",
        width: "100%",
        maxWidth: 480,
        margin: "0 auto",
        padding: "72px 24px 140px",
        boxSizing: "border-box",
      }}
    >
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

      {loops.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <EmptyState />
        </motion.div>
      )}

      <LoopList
        loops={loops}
        activeId={activeId}
        closingId={closingId}
        closedCircleId={closedCircleId}
        exitingId={exitingId}
        releasingId={releasingId}
        releasingCircleId={releasingCircleId}
        onSelect={(id) => setActiveId(activeId === id ? null : id)}
        onClose={handleClose}
        onRelease={handleRelease}
        onEdit={(loop) => setEditingLoop(loop)}
      />

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
          }}
        >
          add a loop
        </button>
      </div>

      {showModal && (
        <AddLoopModal
          onAdd={(loop) => save([...loops, loop])}
          onClose={() => setShowModal(false)}
        />
      )}

      {editingLoop && (
        <EditLoopModal
          loop={editingLoop}
          onChange={setEditingLoop}
          onSave={() => handleEdit(editingLoop)}
          onClose={() => setEditingLoop(null)}
        />
      )}
    </main>
  );
}
