"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Loop } from "../types";

type Props = {
  loop: Loop;
  onChange: (loop: Loop) => void;
  onSave: () => void;
  onClose: () => void;
};

export default function EditLoopModal({
  loop,
  onChange,
  onSave,
  onClose,
}: Props) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
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
            edit loop
          </h2>
          <input
            type="text"
            value={loop.title}
            onChange={(e) => onChange({ ...loop, title: e.target.value })}
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
            value={loop.why}
            onChange={(e) => onChange({ ...loop, why: e.target.value })}
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
              onClick={onClose}
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
              onClick={onSave}
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
              save
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
