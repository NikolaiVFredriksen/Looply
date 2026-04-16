"use client";

import { motion } from "framer-motion";
import { ClosedLoop } from "../types";

type Props = {
  loop: ClosedLoop;
  isActive: boolean;
  onSelect: () => void;
  onRestore: () => void;
  onDelete: () => void;
};

export default function ClosedLoopCard({
  loop,
  isActive,
  onSelect,
  onRestore,
  onDelete,
}: Props) {
  return (
    <motion.div
      key={loop.id}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      animate={{ scale: isActive ? 1.02 : 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={onSelect}
      style={{
        width: "100%",
        minWidth: 250,
        maxWidth: 400,
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
      <div style={{ display: "flex", alignItems: "flex-start", gap: 18 }}>
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
            onClick={(e) => {
              e.stopPropagation();
              onRestore();
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
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
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
  );
}
